<script setup>
import products from '~/data/product.json'
const { isMobile } = useUseDevices()
</script>

<template>
  <NuxtLayout
    :name="isMobile ? 'mobile' : 'default'"
  >
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
