<script setup lang="ts">
import DialogBox from "@/components/common/dialogBox.vue"
defineProps({
    closedDialog: Function as PropType<() => void>
})
</script>

<template>
    <dialog-box 
        scrim="true" 
        :absolute="true"
    >
        <template #dialogComponent>
            <v-card>
                <v-card-title class="d-flex justify-space-between text-h5">
                    <div>Add / Edit Product</div>
                    <div>
                        <v-icon @click="closedDialog">mdi-close</v-icon>
                    </div>
                </v-card-title>
                 <vendor-product-form :closedDialog="closedDialog" />
            </v-card>
        </template>
    </dialog-box>
</template>