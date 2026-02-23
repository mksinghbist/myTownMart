<script setup lang="ts">
definePageMeta({
  layout: 'vendor',
})
const stats = [
  { title: 'Total Orders', value: 124 },
  { title: 'Products', value: 38 },
  { title: 'Pending Orders', value: 9 },
  { title: 'Total Earnings', value: '₹ 1.2L' },
]

const headers = [
  { title: 'Order ID', key: 'id' },
  { title: 'Customer', key: 'customer' },
  { title: 'Status', key: 'status' },
  { title: 'Amount', key: 'amount' },
]

const orders = [
  { id: '#1021', customer: 'Ravi', status: 'Delivered', amount: '₹499' },
  { id: '#1022', customer: 'Anita', status: 'Pending', amount: '₹899' },
]
</script>
<template>
  <v-container fluid class="pa-6">
    <!-- Stats -->
    <v-row>
      <v-col cols="12" md="3" v-for="card in stats" :key="card.title">
        <v-card rounded="xl" elevation="2">
          <v-card-text>
            <div class="text-grey">{{ card.title }}</div>
            <div class="text-h5 font-weight-bold">{{ card.value }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Orders + Earnings -->
    <v-row class="mt-6">
      <v-col cols="12" md="8">
        <v-card rounded="xl">
          <v-card-title>Recent Orders</v-card-title>
          <v-data-table
            :headers="headers"
            :items="orders"
            density="comfortable"
          />
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="xl">
          <v-card-title>Earnings</v-card-title>
          <v-card-text>
            <div class="text-h4 font-weight-bold">₹ 18,450</div>
            <div class="text-grey">This Month</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
