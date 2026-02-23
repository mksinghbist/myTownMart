<script setup lang="ts">
import type { Role } from '~/common/constant'
const props = defineProps<{
  role: Role
}>()

const emit = defineEmits(['success', 'switch'])

const form = ref({ phone: '', password: '' })
const loading = ref(false)
const error = ref('')

async function login() {
  loading.value = true
  error.value = ''

  try {
    const res: any = await $fetch(`/api/auth/${props.role}/login`, {
      method: 'POST',
      body: form.value,
    })

    localStorage.setItem('token', res.accessToken)
    localStorage.setItem('role', props.role)
    emit('success')
  } catch (e: any) {
    error.value = e?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-form @submit.prevent="login">
    <v-alert v-if="error" type="error" variant="outlined" class="mb-4">
      {{ error }}
    </v-alert>

    <v-text-field v-model="form.phone" variant="outlined" label="Mobile / Email" />

    <v-text-field
      v-model="form.password"
      label="Password"
      type="password"
      variant="outlined"
    />

    <v-btn type="submit" class="bg-blue" block :loading="loading">Login</v-btn>

    <div class="text-center mt-4">
      Don’t have an account?
      <span class="text-primary cursor-pointer" @click="emit('switch')">
        Register
      </span>
    </div>
  </v-form>
</template>
