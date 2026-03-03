import { useState } from '#app'

export const useGlobalLoader = () => {
  const pending = useState<number>('global-loader', () => 0)

  const isLoading = computed(() => pending.value > 0)

  const start = () => pending.value++
  const finish = () => {
    if (pending.value > 0) pending.value--
  }

  return { isLoading, start, finish }
}