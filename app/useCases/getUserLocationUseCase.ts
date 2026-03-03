import { useCustomFetch } from '~/composables/useRestAPI'
export const getUserLocationUseCase = async (payload: {latitude: string|number , longitude: string|number}) => {
    const config = useRuntimeConfig()
    const { request } = useCustomFetch()
    try {
        const url = config.public.locationUrl+`${payload.latitude}&lon=${payload.longitude}&format=json`
        const reposne = await request(url)
        return reposne
    }
    catch(e) {
        return e
    }
}