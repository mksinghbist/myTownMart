<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
const cart = useCartStore()
const order = useOrderStore()
const { isMobile } = useUseDevices()
const alert = ref({
  show: false,
  type: 'success' as 'success' | 'error' | 'warning',
  title: '',
  message: '',
})

const showSuccess = () => {
  alert.value = {
    show: true,
    type: 'success',
    title: 'Order Placed',
    message: 'Your order has been placed successfully!',
  }
}
const placeOrder = () => {
  console.log('clicking order')
  order.placeOrder(cart.items)
  showSuccess()
}
const redirectDashboard = () => {
  cart.clearCart()
  navigateTo('/')
}

const transformedItems = computed(() => 
  cart.items.map(item => ({
    id: Number(item.id),
    title: item.title,
    qty: item.qty,
    price: item.price,
  }))
)
</script>

<template>
  <nuxt-layout
    :name="isMobile ? 'mobile' : 'default'"
  > 
    <div>
      <payment-summary :items="transformedItems" :isCOD="true" @place-order="placeOrder"/>
    </div>
      <LazyModalsAppAlertDialog
        v-model="alert.show"
        :type="alert.type"
        :title="alert.title"
        :message="alert.message"
        @ok="redirectDashboard"
      />
  </nuxt-layout>  
</template>
