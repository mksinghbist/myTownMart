import { useSearchStore } from '@/stores/searchStore'
export const useSearch = () => {
  const store = useSearchStore()

  let debounceTimer: ReturnType<typeof setTimeout>
  let controller: AbortController | null = null

  const onSearch = (val: string) => {
    store.search = val

    if (val.length < 3) {
      store.items = []
      return
    }

    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
      controller?.abort()
      controller = new AbortController()
      store.fetch(val, controller.signal)
    }, 400)
  }

  const onEnter = () => {
    if (!store.search) return
    navigateTo({ path: '/search', query: { q: store.search } })
  }

  const highlight = (text: string) =>
    store.search
      ? text.replace(new RegExp(store.search, 'gi'), m => `<strong>${m}</strong>`)
      : text

  return {
    store,
    onSearch,
    onEnter,
    highlight
  }
}