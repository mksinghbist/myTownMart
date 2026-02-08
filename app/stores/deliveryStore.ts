import { defineStore } from 'pinia'

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    pincode: '',
    available: null,
    message: ''
  }),

  actions: {
    async checkPincode(pin) {

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
    }
  }
})
