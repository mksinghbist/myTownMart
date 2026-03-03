<script setup lang="ts">
definePageMeta({
  layout: false
})
const { isMobile } = useUseDevices()
const router = useRouter() 

const showDialog = ref(false)
const editAddress = ref(null)
const addresses = ref<any[]>([])
const isSelectedId = ref(false)

const openAdd = () => {
  editAddress.value = null
  showDialog.value = true
}
const selectedAddress = (id: number) => {
    if(!id) {
      isSelectedId.value = false
      return
    }
    isSelectedId.value = true
} 
const openEdit = (address: any) => {
  editAddress.value = address
  showDialog.value = true
}

const saveAddress = (data: any) => {
  if (data.id) {
    // EDIT
    const idx = addresses.value.findIndex(a => a.id === data.id)
    addresses.value[idx] = data
  } else {
    // ADD
    data.id = Date.now()
    addresses.value.push(data)
  }
}

const goPayment = () => {
  if (!isSelectedId) return alert("Select address")
  router.push('/checkout/payment')
}
</script>

<template>
  <nuxt-layout :name="isMobile ? 'mobile' : 'default'">
    <v-container>
      <AddressSection
        :addresses="addresses"
        @add="openAdd"
        @edit="openEdit"
        @select="selectedAddress"
      />
      <div v-if="isSelectedId">
      <v-btn
        block
        size="large"
        color="pink"
        class="mt-4 text-white"
        @click="goPayment"
      >
        Proceed to Checkout
      </v-btn>
      </div>
    </v-container>
    <LazyModalsFromAddress
        v-if="showDialog" 
        v-model="showDialog"
        :address="editAddress"
        @save="saveAddress"
      />
  </nuxt-layout>
</template>
