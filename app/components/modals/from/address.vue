<script setup lang="ts">
import DialogBox from "@/components/common/dialogBox.vue"
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

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  address: {
    type: Object as PropType<Address | null>,
    default: null
  },
})
const emit = defineEmits(['update:modelValue', 'save'])
const formRef = ref()
const isEdit = computed(() => !!props.address)

const form = ref<Address>({
  name: '',
  phone: '',
  addressLine: '',
  city: '',
  state: '',
  pincode: '',
  isDefault: false,
})
const rules = {
  required: (v: string) => !!v || 'Required',
  phone: (v: string) => /^[6-9]\d{9}$/.test(v) || 'Invalid mobile number',
  pincode: (v: string) => /^\d{6}$/.test(v) || 'Invalid pincode',
}

const close = () => emit('update:modelValue', false)

const save = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return

  emit('save', { ...form.value })
  close()
}
const resetForm = () => {
  form.value = {
    name: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  }
}
watch(
  () => props.address,
  (val) => {
    if (val) form.value = { ...val }
    else resetForm()
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
                <v-card-text>
                <v-form ref="formRef">
                    <v-text-field
                        label="Full Name"
                        v-model="form.name"
                        :rules="[rules.required]"
                        density="comfortable"
                    />

                    <v-text-field
                        label="Mobile Number"
                        v-model="form.phone"
                        :rules="[rules.required, rules.phone]"
                        density="comfortable"
                    />

                    <v-textarea
                        label="Address"
                        v-model="form.addressLine"
                        :rules="[rules.required]"
                        rows="2"
                        density="comfortable"
                    />

                    <v-row>
                        <v-col cols="6">
                        <v-text-field
                            label="City"
                            v-model="form.city"
                            :rules="[rules.required]"
                        />
                        </v-col>
                        <v-col cols="6">
                        <v-text-field
                            label="State"
                            v-model="form.state"
                            :rules="[rules.required]"
                        />
                        </v-col>
                    </v-row>

                    <v-text-field
                        label="Pincode"
                        v-model="form.pincode"
                        :rules="[rules.required, rules.pincode]"
                    />

                    <v-checkbox
                        v-model="form.isDefault"
                        label="Make this my default address"
                    />
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