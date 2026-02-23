export default defineNuxtRouteMiddleware((to) => {
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  if (to.path.startsWith('/admin') && role !== 'admin') {
    return navigateTo('/auth/admin')
  }

  if (to.path.startsWith('/vendor') && role !== 'vendor') {
    return navigateTo('/auth/vendor')
  }
  if (!token) return navigateTo('/auth/user')
})
