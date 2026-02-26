<template>
  <div class="px-4 py-6">
    <h1 class="text-2xl font-bold mb-4">Search results</h1>

    <p v-if="!query">Enter a search term above and press Enter.</p>

    <div v-else>
      <p class="mb-2">Showing results for <strong>{{ query }}</strong></p>
      <!-- TODO: hook up with store/useCases to render real results -->
      <SearchAutoSuggest v-if="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const query = (route.query.q || '') as string
</script>
