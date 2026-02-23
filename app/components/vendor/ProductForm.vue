<script setup lang="ts">
import ImageUploader from "./ImageUploader.vue"
defineProps({
    closedDialog: Function as PropType<() => void>
})
const categories = ref([
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" }
])

interface subCategory {
  id: number
  name: string
}
const subCategories = ref<subCategory[]>([])

const form = reactive({
  title: "",
  subTitle: "",
  description: "",
  category: null,
  subCategory: null,
  mrp: "",
  price: "",
  stock: "",
  sku: "",
  brand: "",
  images: []
})

function loadSub(categoryId: number) {
  if (categoryId === 1) {
    subCategories.value = [
      { id: 1, name: "Mobiles" },
      { id: 2, name: "Laptops" }
    ]
  }
}

function submitProduct() {
  console.log(form)
}
</script>

<template>
    <div class="pa-4">
        <v-form @submit.prevent="submitProduct">
            <v-row dense>
                <v-col cols="6">
                    <v-text-field v-model="form.title" label="Product Title" variant="outlined" required/>
                    <v-text-field v-model="form.subTitle" label="Product Sub Title" variant="outlined" />
                    <v-textarea v-model="form.description" label="Description" variant="outlined" />
                    <!-- Category -->
                    <div class="d-flex justify-start ga-4">
                        <v-select
                            :items="categories"
                            v-model="form.category"
                            variant="outlined"
                            label="Category"
                            class="flex-2"
                            item-title="name"
                            item-value="id"
                            @update:modelValue="() => loadSub(Number(form.category) || 0)"
                        />

                        <v-select
                        :items="subCategories"
                        v-model="form.subCategory"
                        variant="outlined"
                        label="Sub Category"
                        item-title="name"
                        item-value="id"
                        />
                    </div>

                    <!-- Pricing -->
                    <div class="d-flex justify-start ga-4">
                        <v-text-field v-model="form.mrp" label="MRP" type="number" variant="outlined" />
                        <v-text-field v-model="form.price" label="Selling Price" type="number" variant="outlined" />
                    </div>
                    <!-- Stock -->
                    <div class="d-flex ga-4">
                        <v-text-field v-model="form.stock" label="Stock" class="flex-1" variant="outlined" />
                        <v-text-field v-model="form.sku" label="SKU" class="flex-1" variant="outlined" />
                        <v-text-field v-model="form.brand" label="Brand" class="flex-1" variant="outlined" />
                    </div>
                </v-col>
                <v-col cols="6">
                <!-- Images -->
                    <ImageUploader v-model="form.images" />
                </v-col>
            </v-row>
            <div class="d-flex justify-center ga-4">
                <v-btn color="primary" @click="closedDialog">
                    Close
                </v-btn>
                <v-btn type="submit" color="primary">
                    Save Product
                </v-btn>
            </div>

        </v-form>
    </div>
</template>
