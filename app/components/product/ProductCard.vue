<template>
  <v-card
    class="mx-auto"
    rounded="lg"
    elevation="1"
    @click="openProduct"
  >
    <!-- IMAGE AREA -->
    <div class="position-relative">

      <v-img
        :src="product.images[activeImage]"
        height="180"
        cover
      />

      <!-- Wishlist -->
      <v-btn
        icon
        size="small"
        class="wishlist-btn"
        @click.stop="toggleWishlist"
      >
        <v-icon color="pink">
          {{ wishlisted ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>

    </div>

    <!-- IMAGE STRIP -->
    <v-slide-group
      v-if="product.images.length > 0"
      show-arrows
      class="px-2 pt-1"
    >
      <v-slide-group-item
        v-for="(img, i) in product.images"
        :key="i"
      >
        <v-img
          :src="img"
          width="40"
          height="40"
          cover
          class="mx-1 rounded"
          @click.stop="activeImage = i"
        />
      </v-slide-group-item>
    </v-slide-group>

    <!-- PRODUCT DETAILS -->
    <v-card-text class="pa-2">

      <!-- Title -->
      <div class="text-body-2 font-weight-medium text-grey-darken-3">
        {{ product.title }}
      </div>

      <!-- PRICE -->
      <div class="d-flex align-center flex-wrap">

        <span class="text-subtitle-1 font-weight-bold mr-2">
          ₹{{ product.price }}
        </span>

        <span class="text-caption text-grey text-decoration-line-through mr-2">
          ₹{{ product.originalPrice }}
        </span>

        <span class="text-caption text-green-darken-2 font-weight-bold">
          {{ discount }}% off
        </span>

        <v-chip
          size="x-small"
          class="ml-2"
          color="teal-lighten-4"
        >
          UPI
        </v-chip>

      </div>

      <!-- COD -->
      <div class="text-caption text-grey">
        ₹{{ product.originalPrice }} with COD
      </div>

      <!-- Delivery -->
      <div class="text-caption">
        Free Delivery
      </div>

      <!-- Rating -->
      <v-chip
        size="small"
        color="green"
        class="mt-1"
        text-color="white"
      >
        {{ product.rating }}
        <v-icon size="14" class="ml-1">
          mdi-star
        </v-icon>
      </v-chip>

      <span class="text-caption text-grey ml-1">
        ({{ product.ratingCount }})
      </span>

    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: Object
})

const activeImage = ref(0)
const wishlisted = ref(false)

const toggleWishlist = () => {
  wishlisted.value = !wishlisted.value
}

const discount = computed(() => {
  return Math.round(
    ((props.product.originalPrice - props.product.price) /
      props.product.originalPrice) * 100
  )
})

const router = useRouter()

const openProduct = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<style scoped>
.position-relative {
  position: relative;
}

.wishlist-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
}
</style>
