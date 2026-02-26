<script setup lang="ts">
import { ref } from 'vue'

interface Address {
  id: number
  name: string
  phone: string
  addressLine: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

const props = defineProps<{
  addresses: Address[]
}>()

const emit = defineEmits(['select', 'add', 'edit'])

const selectedAddressId = ref<number | null>(
  props.addresses.find(a => a.isDefault)?.id ?? null
)

const selectAddress = (id: number) => {
  selectedAddressId.value = id
  emit('select', id)
}
</script>

<template>
<div>
    <v-card elevation="2" rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-bold">Delivery Address</span>
        <v-btn
            size="small"
            color="primary"
            variant="text"
            @click="$emit('add')"
        >
            + Add New
        </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text>
        <v-radio-group v-model="selectedAddressId">
            <v-card
            v-for="address in addresses"
            :key="address.id"
            class="mb-3"
            variant="outlined"
            :class="{ 'border-primary': selectedAddressId === address.id }"
            @click="selectAddress(address.id)"
            >
            <v-card-text>
                <div class="d-flex justify-space-between">
                <div>
                    <strong>{{ address.name }}</strong>
                    <span v-if="address.isDefault" class="text-primary text-caption">
                    (Default)
                    </span>
                </div>

                <v-btn
                    size="x-small"
                    variant="text"
                    color="primary"
                    @click.stop="$emit('edit', address)"
                >
                    Edit
                </v-btn>
                </div>

                <div class="text-body-2 mt-1">
                {{ address.addressLine }},
                {{ address.city }},
                {{ address.state }} - {{ address.pincode }}
                </div>

                <div class="text-body-2 mt-1">
                Phone: {{ address.phone }}
                </div>

                <v-radio :value="address.id" />
            </v-card-text>
            </v-card>
        </v-radio-group>
        </v-card-text>
    </v-card>
  </div>
</template>