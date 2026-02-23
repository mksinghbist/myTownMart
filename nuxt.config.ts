// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
      createUser: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_CREATE_USER_ENDPOINT}`,
      loginUser: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_LOGIN_ENDPOINT}`,
      userProfile: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_USER_PROFILE_ENDPOINT}`,
      updateProfile: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_UPDATE_PROFILE_ENDPOINT}`,
      logoutUser: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_LOGOUT_ENDPOINT}`,
      createProduct: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_PRODUCTS_CREATE_ENDPOINT}`,
      listProducts: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_PRODUCTS_LIST_ENDPOINT}`,
      detailProduct: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_PRODUCT_DETAIL_ENDPOINT}`,
      deleteProduct: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_PRODUCTS_DELETE_ENDPOINT}`,
      updateProduct: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_PRODUCTS_UPDATE_ID_ENDPOINT}`,
      createOrder: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_ORDERS_CREATE_ENDPOINT}`,
      listOrders: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_ORDERS_LIST_ENDPOINT}`,
      detailOrder: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_ORDERS_DETAIL_ENDPOINT}`,
      updateOrderStatus: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_ORDERS_UPDATE_STATUS_ENDPOINT}`,
      deleteOrder: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_ORDERS_DELETE_ENDPOINT}`,
      userOrders: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_ORDERS_USER_ORDERS_ENDPOINT}`,
      adminOrders: `${process.env.NUXT_API_BASE_URL}${process.env.NUXT_API_ORDERS_ADMIN_ORDERS_ENDPOINT}`
    }

  },
  css: ['vuetify/styles',
    '@mdi/font/css/materialdesignicons.css'
  ],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    define: { 'process.env.DEBUG': false }
  },

  modules: ['@pinia/nuxt']
})
