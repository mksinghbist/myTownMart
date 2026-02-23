<script setup lang="ts">
definePageMeta({
  middleware: 'role-client',
})
</script>
<template>
    <nuxt-layout name="vendor">
        <v-main>
            <NuxtPage />
        </v-main>
    </nuxt-layout>
</template>