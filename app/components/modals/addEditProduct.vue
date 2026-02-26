<script setup lang="ts">
import DialogBox from "@/components/common/dialogBox.vue"
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    closedDialog: Function as PropType<() => void>
})

const showDialog = ref(props.modelValue)

</script>

<template>
    <dialog-box 
        v-bind:modelValue="showDialog"
    >
        <v-card>
            <v-card-title class="d-flex justify-space-between text-h5">
                <div>Add / Edit Product</div>
                <div>
                    <v-icon @click="closedDialog">mdi-close</v-icon>
                </div>
            </v-card-title>
            <v-divider
                thickness="8"
                color="black"
            />
                <vendor-product-form :closedDialog="closedDialog" />
        </v-card>
    </dialog-box>   
</template>