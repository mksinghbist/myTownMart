<script setup lang="ts">
import type { Role } from '~/common/constant'
const props = defineProps<{ role: Role }>()
const emit = defineEmits(['switch'])

const form = ref({
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const error = ref('')
const loading = ref(false)

async function register() {
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true

  try {
    await $fetch(`/api/auth/${props.role}/register`, {
      method: 'POST',
      body: form.value,
    })
    emit('switch')
  } catch (e: any) {
    error.value = e?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-form @submit.prevent="register">
    <v-alert v-if="error" type="error" variant="outlined">{{ error }}</v-alert>

    <v-text-field v-model="form.name" variant="outlined" label="Name" />
    <v-text-field v-model="form.phone" variant="outlined" label="Phone" />
    <v-text-field v-model="form.email" variant="outlined" label="Email" />
    <v-text-field v-model="form.password" variant="outlined" label="Password" type="password" />
    <v-text-field
      v-model="form.confirmPassword"
      variant="outlined"
      label="Confirm Password"
      type="password"
    />

    <v-btn block type="submit" :loading="loading">Register</v-btn>

    <div class="text-center mt-4">
      Already registered?
      <span class="text-primary cursor-pointer" @click="emit('switch')">
        Login
      </span>
    </div>
  </v-form>
</template>
