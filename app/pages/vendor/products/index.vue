<script setup>
definePageMeta({
  layout: 'vendor',
})
const isAddProductDialog = ref(false)
const headers = [
  { title: "Image", key: "image" },
  { title: "Name", key: "name" },
  { title: "Category", key: "category" },
  { title: "Price", key: "price" },
  { title: "Stock", key: "stock" }
]

const products = ref([])
const closedDialog = () => {
  isAddProductDialog.value = false
}
</script>
<template>
  <v-container>

    <!-- Header -->
    <v-row class="mb-4">
      <v-col cols="6">
        <h2>Products</h2>
      </v-col>

      <v-col cols="6" class="text-right">
        <v-btn color="primary" @click="isAddProductDialog = true">
          Add Product
        </v-btn>

        <!-- <ExcelUploader /> -->
      </v-col>
    </v-row>

    <!-- Product Table -->
    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1"
    >
      <template v-slot:item.image="{ item }">
        <v-img :src="item.images?.[0]" width="60" />
      </template>
    </v-data-table>
  </v-container>
  <LazyModalsAddEditProduct 
    v-if="isAddProductDialog" 
    v-model="isAddProductDialog"
    :closedDialog="closedDialog"
  />
</template>
