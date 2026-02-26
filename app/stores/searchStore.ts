import { searchUseCase, type SearchResult } from '@/useCases/searchUseCase'

import { idbGet, idbSet } from '@/utils/indexedDb'

export const useSearchStore = defineStore('mySearchStoreStore', {
  state: () => ({
    search: '',
    selected: null as string | number | null,
    items: [] as SearchResult[],
    loading: false,
    cache: {} as Record<string, SearchResult[]>
  }),

  actions: {
    async fetch(query: string, signal?: AbortSignal) {
      // memory cache
      if (this.cache[query]) {
        this.items = this.cache[query]
        return
      }

      // IndexedDB cache
      if (import.meta.client) {
        const cached = await idbGet(query)
        if (cached) {
          this.cache[query] = cached
          this.items = cached
          return
        }
      }

      try {
        this.loading = true
        const results = await searchUseCase({ query, signal })
        this.items = results
        this.cache[query] = results

        if (process) {
          idbSet(query, results)
        }
      } finally {
        this.loading = false
      }
    }
  }
})