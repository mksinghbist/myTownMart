<script setup lang="ts">
import { useSearch } from '@/composables/useSearch'

const { store, onSearch, onEnter, highlight } = useSearch()
</script>

<template>
  <div class="px-3 pb-2 pt-2">
    <v-autocomplete
      v-model="store.selected"
      v-model:search="store.search"
      :items="store.items"
      :loading="store.loading"
      item-title="label"
      item-value="value"
      density="comfortable"
      variant="outlined"
      rounded="xl"
      clearable
      hide-details
      no-filter
      prepend-inner-icon="mdi-magnify"
      append-inner-icon="mdi-microphone-outline"
      placeholder="Search by Keyword or Product ID"
      @update:search="onSearch"
      @keydown.enter.prevent="onEnter"
    >
      <!-- 🔎 Highlight match -->
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <v-list-item-title
            v-html="highlight(item.raw.label)"
          />
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>