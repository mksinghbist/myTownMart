<script setup>
import { useCartStore } from '@/stores/cartStore'
const cart = useCartStore()

const onCartClick = () => {
  navigateTo("/cart")
}
</script>
<template>
  <v-app-bar
    app
    flat
    class="mobile-header"
    height="175"
  >
    <div class="w-100">
      <!-- Top Greeting Row -->
      <div class="d-flex justify-space-between align-center px-3 pt-2">
        <div class="d-flex align-center">
          <v-avatar size="38" @click="navigateTo('/')">
            <v-img src="https://i.pravatar.cc/100" />
          </v-avatar>
          <div class="ml-2">
            <div class="text-caption text-grey">Hello,</div>
            <div class="text-subtitle-2 font-weight-medium">
              Manoj Kumar Singh
            </div>
          </div>
        </div>

        <div class="d-flex align-center">
          <v-btn icon>
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>

          <v-badge :content="cart.cartCount ?? 0" color="pink">
            <v-btn icon  @click="onCartClick">
              <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
          </v-badge>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="px-3 pb-2 pt-2">
        <search-auto-suggest />
      </div>

      <!-- Filter Row -->
      <v-divider />
      <common-filter-bar></common-filter-bar>
    </div>
  </v-app-bar>
</template>

<style scoped>
.mobile-header {
  background: white;
  border-bottom: 1px solid #eee;
}

.filter-row {
  height: 40px;
  font-size: 13px;
}
</style>
