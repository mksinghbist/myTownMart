export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  size: string
  qty: number
}
export type UserRole = "ADMIN" | "USER" | "VENDOR";