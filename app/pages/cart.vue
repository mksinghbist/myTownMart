<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const { isMobile } = useUseDevices()
const cart = useCartStore()
const router = useRouter()
const imgPath = '/product/'
const goCheckout = () => {
  router.push('/checkout/address')
}
</script>

<template>
  <nuxt-layout
    :name="isMobile ? 'mobile' : 'default'"
  >
    <v-container class="pa-2">

      <h3 class="mb-3">Shopping Cart</h3>

      <!-- Empty Cart -->
      <v-alert
        v-if="cart.items.length === 0"
        type="info"
      >
        Your cart is empty
      </v-alert>

      <!-- Cart Items -->
      <v-card
        v-for="(item, index) in cart.items"
        :key="index"
        class="mb-3 pa-2"
      >
        <div class="d-flex">

          <v-img
            :src="imgPath + item.image"
            width="90"
            height="90"
            cover
            class="rounded"
          />

          <div class="ml-3 flex-grow-1">

            <div class="font-weight-medium">
              {{ item.title }}
            </div>

            <div class="text-caption">
              Size : {{ item.size }}
            </div>

            <div class="font-weight-bold mt-1">
              ₹{{ item.price }}
            </div>

            <!-- Quantity Controls -->
            <div class="d-flex align-center mt-2">

              <v-btn
                size="small"
                @click="cart.decreaseQty(item)"
              >-</v-btn>

              <span class="mx-3">{{ item.qty }}</span>

              <v-btn
                size="small"
                @click="cart.increaseQty(item)"
              >+</v-btn>

              <v-spacer />

              <v-btn
                icon
                @click="cart.removeItem(index)"
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>

            </div>

          </div>
        </div>
      </v-card>

      <!-- PRICE SUMMARY -->
      <v-card class="pa-3 mt-4">

        <h4>Price Details</h4>

        <div class="d-flex justify-space-between">
          <span>Total Items</span>
          <span>{{ cart.totalItems }}</span>
        </div>

        <div class="d-flex justify-space-between mt-2">
          <span>Total Price</span>
          <span>₹{{ cart.totalPrice }}</span>
        </div>

      </v-card>

      <!-- CHECKOUT BUTTON -->
      <v-btn
        block
        size="large"
        color="pink"
        class="mt-4 text-white"
        @click="goCheckout"
      >
        Proceed to Checkout
      </v-btn>

    </v-container>
  </nuxt-layout>
</template>
