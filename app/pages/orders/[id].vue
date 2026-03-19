<script setup>
definePageMeta({
  middleware: "auth",
  layout: false
})
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const route = useRoute()
const orderStore = useOrderStore()
const { isMobile } = useUseDevices()
const order = orderStore.orders.find(
  o => o.id == route.params.id
)

const currentStep = computed(() =>
  order.timeline.filter(t => t.done).length
)
</script>
<template>
  <nuxt-layout
    :name="isMobile ? 'mobile' : 'default'"
  >
    <v-container>

      <h3>Order Tracking</h3>

      <v-card class="pa-3 mt-3">

        <v-stepper
          :model-value="currentStep"
          direction="vertical"
        >
          <v-stepper-item
            v-for="(step, index) in order.timeline"
            :key="index"
            :value="index + 1"
            :complete="step.done"
          >
            {{ step.step }}
          </v-stepper-item>
        </v-stepper>

      </v-card>

      <!-- ITEMS -->
      <v-card class="pa-3 mt-3">
        <div
          v-for="item in order.items"
          :key="item.id"
          class="d-flex justify-space-between"
        >
          <span>{{ item.title }} x {{ item.qty }}</span>
          <span>₹{{ item.price * item.qty }}</span>
        </div>
      </v-card>

    </v-container>
  </nuxt-layout>  
</template>
