export const ROLES = {
  USER: 'user',
  VENDOR: 'vendor',
  ADMIN: 'admin',
} as const

export type Role = typeof ROLES[keyof typeof ROLES]
