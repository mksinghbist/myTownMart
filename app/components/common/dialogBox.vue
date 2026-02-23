<script lang="ts" setup>
import { VDialog } from 'vuetify/components';
import type { VDialog as TDialog } from 'vuetify/components';

type TLocation = TDialog['$props']['location'] 
export interface Props {
  absolute?: boolean
  height?: string | number
  modelValue?: boolean
  location?: TLocation
  openOnClick?: boolean
  persistent?: boolean
  scrim?: boolean | string
  width?: string | number
  maxWidth?: string | number
  border?: string
  onClickAnimation?: boolean
  attach?: boolean | string | Element
}

withDefaults(defineProps<Props>(), {
  location: 'bottom',
  absolute: true,
  persistent: true,
  onClickAnimation: true
})  

</script>
<template>
  <v-dialog
    v-bind="{ ...$attrs, ...$props, style: {} }"
    class="position-fixed"
  >
    <slot name="dialogComponent" />
  </v-dialog>
</template>

<style lang="scss" scoped>
  .v-dialog--fullscreen:deep(>.v-dialog__content) {
    left: 0 !important;
    right: 0 !important;
    margin: 0 auto !important;
  }
  .dialogbox .v-overlay__content {
    bottom: 0 !important;
    align-items: center !important;
  }
</style>