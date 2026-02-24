<script setup>
import products from '~/data/product.json'
import { useCartStore } from '@/stores/cartStore'

const cart = useCartStore()
const { isMobile } = useUseDevices()
const  { items } = storeToRefs(cart)
</script>

<template>
  <NuxtLayout
    :name="isMobile ? 'mobile' : 'default'"
  > {{ item }}
    <div >
    <v-container fluid class="pa-2">

      <v-row dense>
        <v-col
          v-for="item in products"
          :key="item.id"
          cols="6"
        >
          <ProductCard :product="item" />
        </v-col>
      </v-row>

    </v-container>
    </div>
  </NuxtLayout>
</template>
