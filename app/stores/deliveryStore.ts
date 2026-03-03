import { defineStore } from 'pinia'
import { getUserLocationUseCase } from '~/useCases/getUserLocationUseCase'

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    pincode: '',
    available: null,
    message: ''
  }),

  actions: {
    async checkPincode(pin: number) {

      this.pincode = pin

      // MOCK API (Replace with backend later)
      const serviceable = ['110001', '201301', '560001']

      if (serviceable.includes(pin)) {
        this.available = true
        this.message = 'Delivery available in 3-5 days'
      } else {
        this.available = false
        this.message = 'Delivery not available'
      }
    },
    async getLocation(payload: { latitude: string | number; longitude: string | number; }) {
      return getUserLocationUseCase(payload)
    }
  }
})
