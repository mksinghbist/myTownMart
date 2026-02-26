<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
const cart = useCartStore()
const onCartClick = () => {
  navigateTo("/cart")
}
</script>

<template>
  <v-app-bar
    elevation="1"
    height="70"
    color="white"
    class="px-4"
  >
    <!-- LEFT SECTION -->
    <v-row
      class="align-center w-100"
      no-gutters
    >
      <!-- Logo -->
      <v-col cols="auto" class="d-flex align-center">
        <h2 class="logo-text">My Town Mart</h2>
      </v-col>

      <!-- SEARCH (Desktop & Tablet) -->
      <v-col
        class="px-6"
      >
        <search-auto-suggest />
      </v-col>

      <!-- RIGHT SECTION -->
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
    </v-row>
  </v-app-bar>
</template>

<style scoped>
.logo-text {
  font-weight: 700;
  color: #f43397;
  cursor: pointer;
  white-space: nowrap;
}

.action-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  text-transform: none;
}

.action-btn:hover {
  color: #f43397;
}
</style>