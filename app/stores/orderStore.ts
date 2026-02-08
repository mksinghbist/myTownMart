import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: []
  }),

  actions: {

    placeOrder(cartItems) {

      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        status: 'Placed',
        items: cartItems,
        timeline: [
          { step: 'Placed', done: true },
          { step: 'Shipped', done: false },
          { step: 'Out for Delivery', done: false },
          { step: 'Delivered', done: false }
        ]
      }

      this.orders.unshift(newOrder)
    },

    updateStatus(orderId, stepIndex) {
      const order = this.orders.find(o => o.id === orderId)

      order.timeline[stepIndex].done = true
      order.status = order.timeline[stepIndex].step
    }
  },

  persist: true
})
