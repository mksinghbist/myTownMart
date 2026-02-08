<template>
  <v-bottom-navigation
    grow
    app
    class="mobile-footer"
  >
    <v-btn value="home" @click="navigate('/')">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>

    <v-btn value="category" @click="navigate('/categories')">
      <v-icon>mdi-view-grid-outline</v-icon>
      <span>Categories</span>
    </v-btn>

    <v-btn value="orders" @click="navigate('/orders')">
      <v-icon>mdi-package-variant</v-icon>
      <span>My Orders</span>
    </v-btn>

    <v-btn value="account" @click="navigate('/account')">
      <v-icon>mdi-account-outline</v-icon>
      <span>Account</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
const router = useRouter()

const navigate = (path) => {
  router.push(path)
}
</script>

<style scoped>
.mobile-footer {
  border-top: 1px solid #eee;
  background: white;
}
</style>
