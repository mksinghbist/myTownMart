<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'success' | 'error' | 'warning'

const props = defineProps<{
  modelValue: boolean
  type?: AlertType
  title?: string
  message?: string
}>()

const emit = defineEmits(['update:modelValue', 'ok'])

const colorMap: Record<AlertType, string> = {
  success: 'green',
  error: 'red',
  warning: 'orange',
}

const iconMap: Record<AlertType, string> = {
  success: 'mdi-check-circle',
  error: 'mdi-close-circle',
  warning: 'mdi-alert-circle',
}

const color = computed(() => colorMap[props.type ?? 'success'])
const icon = computed(() => iconMap[props.type ?? 'success'])

const close = () => emit('update:modelValue', false)
const onOk = () => {
  emit('ok')
  close()
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="420"
    persistent
  >
    <v-card rounded="lg">
      <v-card-text class="text-center py-6">
        <v-icon
          :color="color"
          size="56"
          class="mb-3"
        >
          {{ icon }}
        </v-icon>

        <h3 class="text-h6 font-weight-bold mb-2">
          {{ title }}
        </h3>

        <p class="text-body-2 text-grey-darken-1">
          {{ message }}
        </p>
      </v-card-text>

      <v-card-actions class="justify-center pb-4">
        <v-btn
          :color="color"
          variant="flat"
          min-width="120"
          @click="onOk"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>