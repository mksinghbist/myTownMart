<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
const cart = useCartStore()
const order = useOrderStore()
const { isMobile } = useUseDevices()
const placeOrder = () => {
  order.placeOrder(cart.items)
  cart.clearCart()
  navigateTo('/')
}
</script>

<template>
  <nuxt-layout
    :name="isMobile ? 'mobile' : 'default'"
  >
    <v-container>

      <h3>Order Summary</h3>

      <v-card class="pa-3 mt-3">

        <div
          v-for="item in cart.items"
          :key="item.id"
          class="d-flex justify-space-between"
        >
          <span>{{ item.title }} x {{ item.qty }}</span>
          <span>₹{{ item.qty * item.price }}</span>
        </div>

        <v-divider class="my-2" />

        <div class="d-flex justify-space-between font-weight-bold">
          <span>Total</span>
          <span>₹{{ cart.totalAmount }}</span>
        </div>

      </v-card>

      <!-- PAYMENT BUTTON -->
      <v-btn
        block
        size="large"
        color="green"
        class="mt-4 text-white"
        @click="placeOrder"
      >
        Place Order
      </v-btn>

    </v-container>
  </nuxt-layout>  
</template>
