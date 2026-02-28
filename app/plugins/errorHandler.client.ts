export default defineNuxtPlugin((nuxtApp) => {
  // 1️⃣ Catch Vue errors
  nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
    console.error('Vue Error:', err)
    console.error('Component Info:', info)
  }

  // 2️⃣ Catch JS runtime errors
  window.addEventListener('error', (event) => {
    console.error('Global JS Error:', event.error)
  })

  // 3️⃣ Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise:', event.reason)
  })
})