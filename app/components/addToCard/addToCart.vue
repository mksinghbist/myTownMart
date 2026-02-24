
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import type { CartItem } from '~/domain/interface/common/common'

const props = defineProps<{
  product: CartItem
}>()

const cart = useCartStore()

/* derive qty from store */
const qty = computed(() => {
  const item = cart.items.find(i => i.id === props.product.id)
  return item?.qty ?? 0
})

const showAddButton = computed(() => qty.value === 0)

const add = () => {
  cart.addToCart(props.product, 1)
}

const increment = () => {
  cart.increaseQty(props.product?.id)
}

const decrement = () => {
  cart.decreaseQty(props.product?.id)
}
</script>
<template>
  <div class="d-flex align-center">
    <!-- ADD BUTTON -->
    <v-btn
      v-if="showAddButton"
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