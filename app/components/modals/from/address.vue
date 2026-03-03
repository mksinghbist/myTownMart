<script setup lang="ts">
import DialogBox from "@/components/common/dialogBox.vue"
import { useDeliveryStore } from '@/stores/deliveryStore'
import { findStateByPostalCode } from '@/utils/utilites'
interface Address {
  id?: number
  name: string
  phone: string
  addressLine: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

/* ------------------ PROPS ------------------ */
const props = defineProps({
  modelValue: Boolean,
  address: Object as PropType<Address | null>,
})

const emit = defineEmits(["update:modelValue", "save"])
const formRef = ref()
const isEdit = computed(() => !!props.address)

const userDelivery = useDeliveryStore()
/* ------------------ FORM MODEL ------------------ */
const form = ref<Address>({
  name: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
})

/* ------------------ VALIDATION ------------------ */
const rules = {
  required: (v: string) => !!v || "Required",
  phone: (v: string) => /^[6-9]\d{9}$/.test(v) || "Invalid mobile",
  pincode: (v: string) => /^\d{6}$/.test(v) || "Invalid pincode",
}

/* ------------------ DELIVERY CHECK ------------------ */

const isDeliverable = computed(() => {
  const cityMatch = cities.find(c => c.pincode === form.value.pincode)
  return cityMatch?.available
})

/* ------------------ GPS AUTO DETECT ------------------ */
const updateAddressData = (address: { city: string, state: string, pincode: string }) => {
    console.log("address", address)
    form.value.city = address.city
    form.value.state = address?.state || ''
    form.value.pincode = address?.pincode
}
const detectLocation = () => {
  if (!navigator.geolocation) return

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords

    const data = await userDelivery.getLocation({latitude, longitude})
    if(data?.address) {
      const pinCodeState = await findStateByPostalCode(Number(data?.address?.postcode))
      updateAddressData({
        city:data?.address?.city_district || data?.address?.town,
        state:pinCodeState?.stateName || '',
        pincode:data?.address?.postcode || ''
      })
    }
  })
}

/* ------------------ SAVE ------------------ */

const close = () => emit("update:modelValue", false)

const save = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return
  emit("save", { ...form.value })
  close()
}

/* ------------------ EDIT WATCH ------------------ */

watch(
  () => props.address,
  (val) => {
    if (val) form.value = { ...val }
  },
  { immediate: true }
)
</script>

<template>
    <dialog-box 
        v-bind:modelValue="modelValue"
    >
        <v-card>
            <v-card-title class="d-flex justify-space-between text-h5">
                <div class="text-h6 font-weight-bold">{{ isEdit ? 'Edit Address' : 'Add New Address' }}</div>
                <div>
                    <v-icon @click="close">mdi-close</v-icon>
                </div>
            </v-card-title>
            <v-divider elevation-4></v-divider>
            <v-card-text>
              <v-form ref="formRef">
                <div class="d-flex justify-end mb-2">
                  <v-btn
                      class="bg-red"
                      variant="outlined"
                      prepend-icon="mdi-crosshairs-gps"
                      @click="detectLocation"
                    >
                      Use My Current Location
                  </v-btn>
                </div>
                <v-row class="no">
                    <v-col cols="12" md="6">
                      <v-text-field
                          label="Full Name"
                          variant="outlined"
                          v-model="form.name"
                          :rules="[rules.required]"
                          density="comfortable"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                          label="Mobile Number"
                          v-model="form.phone"
                          variant="outlined"
                          :rules="[rules.required, rules.phone]"
                          density="comfortable"
                      />
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-textarea
                          label="Address"
                          v-model="form.addressLine"
                          variant="outlined"
                          :rules="[rules.required]"
                          rows="2"
                          density="comfortable"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                          label="City"
                          variant="outlined"
                          v-model="form.city"
                          :rules="[rules.required]"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                          label="State"
                          variant="outlined"
                          v-model="form.state"
                          :rules="[rules.required]"
                      />
                    </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                        label="Pincode"
                        variant="outlined"
                        v-model="form.pincode"
                        :rules="[rules.required, rules.pincode]"
                    />
                  </v-col>
                  <v-checkbox
                      v-model="form.isDefault"
                      label="Make this my default address"
                  />
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
                  <v-btn variant="text" @click="close">Cancel</v-btn>
                  <v-btn color="primary" @click="save">
                  {{ isEdit ? 'Update' : 'Save' }}
                  </v-btn>
            </v-card-actions>
        </v-card>
    </dialog-box>
</template>