<script setup lang="ts">
import { computed } from 'vue'
import { VDialog } from 'vuetify/components'
import type { VDialog as TDialog } from 'vuetify/components'

type TLocation = TDialog['$props']['location']

export interface Props {
  modelValue: boolean
  absolute?: boolean
  height?: string | number
  width?: string | number
  maxWidth?: string | number
  location?: TLocation
  persistent?: boolean
  scrim?: boolean | string
  attach?: boolean | string | Element
}

const props = withDefaults(defineProps<Props>(), {
  location: 'center',
  persistent: true,
  absolute: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const dialogModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

defineExpose({
  close: () => emit('update:modelValue', false),
})
</script>

<template>
  <v-dialog
    v-model="dialogModel"
    :location="location"
    :persistent="persistent"
    :scrim="scrim"
    :height="height"
    :width="width"
    :max-width="maxWidth"
    :attach="attach"
    class="dialogbox"
  >
    <slot />
  </v-dialog>
</template>

<style scoped lang="scss">
</style>