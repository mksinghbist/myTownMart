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
      state.items.reduce((t, i) => t + i.qty * i.price, 0)
  },

  actions: {
    addToCart(product: { id: any; title: any; price: any; images: any[] }, size: any) {
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

    increaseQty(item: CartItem) {
      item.qty++
    },

    decreaseQty(item: CartItem) {
      if (item.qty > 1) item.qty--
    },

    removeItem(index: number) {
      this.items.splice(index, 1)
    },

    clearCart() {
      this.items = []
    }
  },

  persist: true
})
