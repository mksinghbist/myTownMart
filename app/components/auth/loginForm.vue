<script setup lang="ts">
import type { Role } from '~/common/constant'
const props = defineProps<{
  role: Role
}>()

const emit = defineEmits(['success', 'switch'])
const { login } = useAuth()
const form = ref({ phone: '', password: '' })
const loading = ref(false)
const error = ref('')

async function userlogin() {
  try {
    const payload = {
      email: form.value.phone,
      password: form.value.password
    }
    const res =  await login(payload)
    emit('success')
  } catch (e: any) {
    error.value = e?.data?.message || 'Login failed'
  }
}
</script>

<template>
  <v-form @submit.prevent="userlogin">
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
