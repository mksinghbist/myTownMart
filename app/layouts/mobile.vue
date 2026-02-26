<script setup lang="ts">
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
  background: rgb(var(--v-theme-primary), 0.25);
  min-height: 100vh;
}
</style>
