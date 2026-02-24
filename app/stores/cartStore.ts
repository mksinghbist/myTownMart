import { defineStore } from 'pinia'
import type { CartItem } from '~/domain/interface/common/common';
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((t, i) => t + i.qty, 0),
    cartCount: (state) =>
      state.items.length,
    totalAmount: (state) =>
      state.items.reduce((t, i) => t + i.qty * i.price, 0),
    cartItems: (state) => state.items
  },

  actions: {
    addToCart(product: { id: any; title: any; price: any; images: any[] }, size: any) {
      console.log('product afding')
      const existing = this.items.find(
        (i) => i.id === product.id && i.size === size
      )

      if (existing) existing.qty++
      else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          size,
          qty: 1
        })
      }
    },

    increaseQty(id: string | number) {
      const item = this.items?.find(i => i.id === id)
      if (item) item.qty++
    },

    decreaseQty(id: string | number) {
      const index = this.items.findIndex(i => i.id === id)
      if (index !== -1) {
        this.items[index].qty--
        if (this.items[index].qty === 0) {
          this.items.splice(index, 1)
        }
      }
    },
    removeItem(index: number) {
        console.log('removing')
        this.items.splice(index, 1)
    },
    clearCart() {
      this.items = []
    }
  },

  persist: true
})
