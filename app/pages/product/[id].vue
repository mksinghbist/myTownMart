<script setup>
import { useRoute } from 'vue-router'
import products from '~/data/product.json'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
definePageMeta({
  layout: false
})

const imgPath = '/product/'
const selectedSize = ref(null)
const { isMobile } = useUseDevices()
const cart = useCartStore()

const product = computed(() => {
  return products.find(p => {
    return p.id == route.params.id
  })
})

const discount = computed(() => {
  return Math.round(
    ((product.value?.originalPrice - product.value?.price) /
      product.value?.originalPrice) * 100
  )
})
const addToCard = () => {
  cart.addToCart(product.value)
}
</script>
<template>
  <NuxtLayout
    :name="isMobile ? 'mobile' : 'default'"
    :hide-footer="true"
  >
    <v-container fluid class="pa-0 product-page">
      <!-- IMAGE SLIDER -->
      <v-carousel
        height="320"
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(img, i) in product?.images"
          :key="i"
        >
          <v-img :src="imgPath + img" cover />
        </v-carousel-item>
      </v-carousel>

      <!-- IMAGE THUMBNAIL -->
      <v-slide-group
        class="pa-2"
        show-arrows
      >
        <v-slide-group-item
          v-for="(img, i) in product?.images"
          :key="i"
        >
          <v-img
            :src="img"
            width="55"
            height="55"
            class="mx-1 rounded"
          />
        </v-slide-group-item>
      </v-slide-group>

      <!-- PRODUCT DETAILS -->
      <v-card flat class="mt-2 pa-3">

        <!-- TITLE -->
        <div class="text-subtitle-1 font-weight-medium">
          {{ product?.title }}
        </div>

        <!-- RATING -->
        <div class="mt-1">
          <v-chip color="green" size="small">
            {{ product?.rating }}
            <v-icon size="14" class="ml-1">mdi-star</v-icon>
          </v-chip>

          <span class="text-caption ml-2 text-grey">
            ({{ product?.ratingCount }} Ratings)
          </span>
        </div>

        <!-- PRICE -->
        <div class="mt-3 d-flex align-center">

          <span class="text-h6 font-weight-bold mr-2">
            ₹{{ product?.price }}
          </span>

          <span class="text-caption text-grey text-decoration-line-through mr-2">
            ₹{{ product?.originalPrice }}
          </span>

          <span class="text-green-darken-2 font-weight-bold">
            {{ discount }}% off
          </span>

        </div>

        <div class="text-caption text-grey">
          ₹{{ product?.originalPrice }} with COD
        </div>

        <div class="text-caption mt-1">
          Free Delivery
        </div>

      </v-card>

      <!-- SIZE SELECTOR -->
      <v-card flat class="mt-2 pa-3">
        <div class="text-subtitle-2 font-weight-medium mb-2">
          Select Size
        </div>

        <v-chip-group
          v-model="selectedSize"
          selected-class="bg-primary text-white"
        >
          <v-chip
            v-for="size in product?.sizes"
            :key="size"
          >
            {{ size }}
          </v-chip>
        </v-chip-group>
      </v-card>

      <!-- DESCRIPTION -->
      <v-card flat class="mt-2 pa-3">
        <div class="text-subtitle-2 font-weight-medium mb-2">
          Product Details
        </div>

        <div class="text-body-2 text-grey-darken-2">
          {{ product.description }}
        </div>
      </v-card>
      <!-- STICKY BOTTOM ACTION BAR -->
      <v-bottom-navigation
        class="d-flex align-center gap-2"
      >
        <v-btn color="grey-lighten-3" @click="addToCard">
        Add to Cart
        </v-btn>

        <v-btn color="pink" class="pl-4">
        Buy Now
        </v-btn>
      </v-bottom-navigation>

    </v-container>
  </NuxtLayout>
</template>

<style scoped>
  :deep(.v-bottom-navigation__content) {
    justify-content: space-around;
  }
</style>
