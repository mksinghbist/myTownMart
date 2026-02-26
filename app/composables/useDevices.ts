import { getCurrentInstance, ref } from 'vue'
import { useDisplay } from 'vuetify'

export const useUseDevices = () => {
  // calling Vuetify composables requires an active component instance
  if (!getCurrentInstance()) {
    // fallback for cases where the hook is run too early (e.g. in definePageMeta)
    const isMobile = ref(false)
    return { isMobile }
  }

  const { mobile } = useDisplay()
  return {
    isMobile: mobile,
  }
}
