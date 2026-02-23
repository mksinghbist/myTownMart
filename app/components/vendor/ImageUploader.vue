<template>
  <div>

    <v-file-input
      multiple
      label="Upload Images"
      accept="image/*"
      @change="handleImages"
    />

    <v-row>
      <v-col
        v-for="(img, index) in previewImages"
        :key="index"
        cols="3"
      >
        <v-img :src="img" height="120" />

        <v-btn
          icon="mdi-delete"
          color="red"
          @click="removeImage(index)"
        />
      </v-col>
    </v-row>

  </div>
</template>

<script setup>
const model = defineModel()

const previewImages = ref([])

function handleImages(files) {
  model.value = files

  previewImages.value = []

  files.forEach(file => {
    previewImages.value.push(URL.createObjectURL(file))
  })
}

function removeImage(index) {
  model.value.splice(index, 1)
  previewImages.value.splice(index, 1)
}
</script>
