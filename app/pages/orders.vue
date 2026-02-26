<script setup>
import { useOrderStore } from '@/stores/orderStore'
definePageMeta({
  layout: false
})
const orders = useOrderStore()
const router = useRouter()
const { isMobile } = useUseDevices()
const openOrder = (id) => {
  navigateTo(`/orders/${id}`)
}
</script>

<template>
  <nuxt-layout
    :name="isMobile ? 'mobile' : 'default'"
  >
    <v-container>
      <h3>My Orders</h3>
      <v-card
        v-for="order in orders.orders"
        :key="order.id"
        class="mt-3 pa-3"
        @click="openOrder(order.id)"
      >

        <div class="font-weight-medium">
          Order #{{ order.id }}
        </div>

        <div class="text-caption">
          Date : {{ order.date }}
        </div>

        <div class="text-caption">
          Status : {{ order.status }}
        </div>

        <div class="text-caption mt-2">
          {{ order.items.length }} Items
        </div>

      </v-card>
    </v-container>
  </nuxt-layout>
</template>
