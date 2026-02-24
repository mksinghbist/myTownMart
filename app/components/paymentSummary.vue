<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  items: {
    id: number
    title: string
    qty: number
    price: number // total price for quantity
  }[]
  isCOD?: boolean
}>()

const showCharges = ref(true)
const alert = ref({
  show: false,
  type: 'success' as 'success' | 'error' | 'warning',
  title: '',
  message: '',
})
const emit = defineEmits(['placeOrder'])
/* --- Charges (can come from backend) --- */
const DELIVERY_FEE = 199
const PACKAGING_FEE = 49
const PLATFORM_FEE = 29
const GST_PERCENT = 18
const COD_FEE = props.isCOD ? 49 : 0

/* --- Calculations --- */
const subTotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.price, 0)
)

const gstAmount = computed(() => {
  const taxable = PLATFORM_FEE + PACKAGING_FEE
  return Math.round((taxable * GST_PERCENT) / 100)
})

const totalPayable = computed(() =>
  subTotal.value +
  DELIVERY_FEE +
  PACKAGING_FEE +
  PLATFORM_FEE +
  gstAmount.value +
  COD_FEE
)
</script>

<template>
  <v-card elevation="2" rounded="lg">
    <v-card-title class="text-h6 font-weight-bold">
      Order Summary
    </v-card-title>

    <v-divider />

    <!-- Items -->
    <v-card-text>
      <v-row
        v-for="item in items"
        :key="item.id"
        class="mb-2"
        align="center"
      >
        <v-col cols="8">
          {{ item.title }} * {{ item.qty }}
        </v-col>
        <v-col cols="4" class="text-right font-weight-medium">
          ₹{{ item.price }}
        </v-col>
      </v-row>

      <v-divider class="my-2" />

      <!-- Subtotal -->
      <v-row class="mb-1">
        <v-col cols="8">Subtotal</v-col>
        <v-col cols="4" class="text-right font-weight-bold">
          ₹{{ subTotal }}
        </v-col>
      </v-row>

      <!-- Charges Toggle -->
      <v-btn
        variant="text"
        size="small"
        class="px-0 text-primary"
        @click="showCharges = !showCharges"
      >
        Other Charges
        <v-icon end>
          {{ showCharges ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>

      <!-- Charges -->
      <v-expand-transition>
        <div v-show="showCharges">
          <v-row class="text-caption mt-2">
            <v-col cols="8">Delivery Fee</v-col>
            <v-col cols="4" class="text-right">₹{{ DELIVERY_FEE }}</v-col>
          </v-row>
          <v-row class="text-caption">
            <v-col cols="8">Packaging Fee</v-col>
            <v-col cols="4" class="text-right">₹{{ PACKAGING_FEE }}</v-col>
          </v-row>
          <v-row class="text-caption">
            <v-col cols="8">Platform Fee</v-col>
            <v-col cols="4" class="text-right">₹{{ PLATFORM_FEE }}</v-col>
          </v-row>
          <v-row class="text-caption">
            <v-col cols="8">GST ({{ GST_PERCENT }}%)</v-col>
            <v-col cols="4" class="text-right">₹{{ gstAmount }}</v-col>
          </v-row>
          <v-row v-if="COD_FEE" class="text-caption">
            <v-col cols="8">COD Charges</v-col>
            <v-col cols="4" class="text-right">₹{{ COD_FEE }}</v-col>
          </v-row>
        </div>
      </v-expand-transition>

      <v-divider class="my-3" />

      <!-- Total -->
      <v-row class="text-subtitle-1 font-weight-bold">
        <v-col cols="8">Total Payable</v-col>
        <v-col cols="4" class="text-right">
          ₹{{ totalPayable }}
        </v-col>
      </v-row>
    </v-card-text>

    <!-- CTA -->
    <v-card-actions>
        <v-btn
            block
            size="large"
            color="green"
            variant="outlined"
            class="mt-4 text-white"
            @click="$emit('placeOrder')"
        >
            Place Order
        </v-btn>
    </v-card-actions>
  </v-card>

</template>