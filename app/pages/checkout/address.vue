<script setup>
const { isMobile } = useUseDevices()
const router = useRouter()

const selected = ref(null)
const showModal = ref(false)

const addresses = ref([
  {
    id: 1,
    name: "Manoj Singh",
    street: "Noida Sector 62",
    city: "Noida",
    phone: "9999999999"
  }
])

const addAddress = (data) => {
  addresses.value.push({
    id: Date.now(),
    ...data
  })
}

const goPayment = () => {
  if (!selected.value) return alert("Select address")
  router.push('/checkout/payment')
}
</script>

<template>
  <nuxt-layout :name="isMobile ? 'mobile' : 'default'">
    <v-container>

      <div class="d-flex justify-space-between mb-4">
        <h3>Select Address</h3>

        <v-btn
          color="pink"
          class="text-white"
          size="small"
          @click="showModal = true"
        >
          + Add Address
        </v-btn>
      </div>

      <v-radio-group v-model="selected">

        <v-card
          v-for="address in addresses"
          :key="address.id"
          class="pa-3 mb-3"
          @click="selected = address.id"
        >
          <div class="d-flex">

            <div width="10%">
              <v-radio :value="address.id"/>
            </div>

            <div>
              <strong>{{ address.name }}</strong>
              <div>{{ address.street }}, {{ address.city }}</div>
              <div>+91{{ address.phone }}</div>
            </div>

          </div>
        </v-card>

      </v-radio-group>

      <v-btn
        block
        color="pink"
        class="text-white mt-4"
        @click="goPayment"
      >
        Continue
      </v-btn>
    </v-container>
  </nuxt-layout>
</template>
