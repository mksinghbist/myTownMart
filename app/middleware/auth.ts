import { useAuth } from "~/composables/useAuth"

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn.value) {
    return navigateTo(`/auth/user?redirect=${to.fullPath}`)
  }
})