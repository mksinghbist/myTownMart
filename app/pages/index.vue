<script setup lang="ts">
import products from '~/data/product.json'
const { isMobile } = useUseDevices()
definePageMeta({
  layout: false
})
</script>

<template>
  <nuxt-layout :name="isMobile ? 'mobile' : 'default'">
    <v-container fluid class="pa-2">
      <v-row dense>
        <v-col
          v-for="item in products"
          :key="item.id"
          :cols="isMobile ? '6': '3'"
        >
          <ProductCard :product="item" />
        </v-col>
      </v-row>
    </v-container>
  </nuxt-layout>
</template>