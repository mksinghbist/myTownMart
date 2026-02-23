
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import type { CartItem } from '~/domain/interface/common/common';
const props = defineProps<{
  product: CartItem
  modelValue?: number
  max?: number
}>()

const cart = useCartStore()
const productData = reactive(props.product)
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const qty = ref(props.modelValue ?? 0)
const enableAddToCart = computed(() => qty.value == 0)
watch(qty, (val) => emit('update:modelValue', val))

const add = () => {
  qty.value++
  cart.addToCart(props.product, qty.value)
}
const increment = () => {
  if (!props.max || qty.value < props.max) {
    productData.qty = qty.value
    qty.value++
    cart.increaseQty(props.product)
  }
}
const decrement = () => {
  productData.qty = qty.value
  qty.value = qty.value > 1 ? qty.value - 1 : 0
  cart.decreaseQty(props.product)
}
</script>
<template>
  <div class="d-flex align-center">
    <!-- ADD BUTTON -->
    <v-btn
      v-if="enableAddToCart"
      color="primary"
      size="small"
      variant="flat"
      @click="add"
    >
      Add
    </v-btn>

    <!-- QUANTITY CONTROLS -->
    <v-card
      v-else
      class="d-flex align-center px-2"
      elevation="1"
      rounded="lg"
    >
      <v-btn
        icon="mdi-minus"
        size="x-small"
        variant="text"
        @click="decrement"
      />

      <span class="mx-3 font-weight-medium">
        {{ qty }}
      </span>

      <v-btn
        icon="mdi-plus"
        size="x-small"
        variant="text"
        @click="increment"
      />
    </v-card>
  </div>
</template>