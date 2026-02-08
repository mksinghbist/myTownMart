<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
defineProps({
  hideFooter: {
    type: Boolean,
    default: false
  }
})


</script>
<template>
  <v-app>

    <!-- HEADER -->
    <MobileHeader/>
    <!-- PAGE CONTENT -->
    <v-main class="mobile-main">
      <slot />
    </v-main>

    <!-- FOOTER -->
    <MobileFooter v-if="!hideFooter"/>

  </v-app>
</template>

<style scoped>
.mobile-main {
  padding-top: 175px;   /* Header height */
  padding-bottom: 65px; /* Footer height */
  background: #f5f5f5;
  min-height: 100vh;
}
</style>
