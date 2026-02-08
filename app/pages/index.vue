<script setup>
const { isMobile } = useUseDevices()
const products = [
  {
    id: 1,
    title: "Classic Women Blouse",
    price: 225,
    originalPrice: 246,
    rating: 4.2,
    ratingCount: 2834,
    images: [
      "https://picsum.photos/300/400",
      "https://picsum.photos/301/400"
    ]
  },
  {
    id: 2,
    title: "Fancy Women Blouse",
    price: 130,
    originalPrice: 147,
    rating: 4.1,
    ratingCount: 7504,
    images: [
      "https://picsum.photos/302/400"
    ]
  }
]
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
