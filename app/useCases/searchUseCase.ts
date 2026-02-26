export interface SearchResult {
  label: string
  value: string | number
  type: 'product' | 'category' | 'brand'
}

export interface SearchParams {
  query: string
  signal?: AbortSignal
}

/**
 * Business logic for search
 * Can call REST / GraphQL / SDK / Firebase / etc.
 */
export const searchUseCase = async ({
  query,
  signal
}: SearchParams): Promise<SearchResult[]> => {
  // 🔁 Replace with real API
  await new Promise(r => setTimeout(r, 300))

  const products = [
    { label: 'Nike Shoes', value: 1, type: 'product' as const },
    { label: 'Adidas Sneakers', value: 2, type: 'product' as const }
  ]

  const categories = [
    { label: 'Men Shoes', value: 'men', type: 'category' as const }
  ]

  const brands = [
    { label: 'Nike', value: 'nike', type: 'brand' as const }
  ]

  return [...products, ...categories, ...brands].filter(i =>
    i.label.toLowerCase().includes(query.toLowerCase())
  )
}