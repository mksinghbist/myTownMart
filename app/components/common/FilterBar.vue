<script setup lang="ts">
import { ref } from 'vue'

type FilterKey = 'sort' | 'category' | 'gender' | 'filter'

const active = ref<FilterKey | null>(null)

const emit = defineEmits<{
  (e: FilterKey): void
}>()

const setActive = (key: FilterKey) => {
  active.value = key
  emit(key)
}
</script>

<template>
  <v-row no-gutters class="text-center">
    <!-- SORT -->
    <v-col>
      <v-btn
        variant="text"
        block
        :active="active === 'sort'"
        color="primary"
        @click="setActive('sort')"
      >
        <div class="d-flexalign-center">
          <span>↑↓</span>
          <span class="text-caption">Sort</span>
        </div>
      </v-btn>
    </v-col>

    <v-divider vertical />

    <!-- CATEGORY -->
    <v-col>
      <v-btn
        variant="text"
        block
        :active="active === 'category'"
        color="primary"
        @click="setActive('category')"
      >
        Category
        <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
      </v-btn>
    </v-col>

    <v-divider vertical />

    <!-- GENDER -->
    <v-col>
      <v-btn
        variant="text"
        block
        :active="active === 'gender'"
        color="primary"
        @click="setActive('gender')"
      >
        Gender
        <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
      </v-btn>
    </v-col>

    <v-divider vertical />

    <!-- FILTER -->
    <v-col>
      <v-btn
        variant="text"
        block
        :active="active === 'filter'"
        color="primary"
        @click="setActive('filter')"
      >
        Filters
      </v-btn>
    </v-col>
  </v-row>
</template>