import { useDisplay } from "vuetify"

export const useUseDevices = () => {
  const { mobile } = useDisplay()

  return {
    isMobile: mobile,
  }
}
