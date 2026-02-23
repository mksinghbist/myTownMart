import type { ICreateUserData } from "~/domain/interface";
import { useCustomFetch } from '~/composables/useRestAPI'
export const createUserUseCase = async (payload: ICreateUserData) => {
    const config = useRuntimeConfig()
    const { request } = useCustomFetch()
    try {
        const createPayload = {
            method: "POST" as const,
            payload:payload
        }
        const url = config.public.createUser
        const reposne = await request(url,createPayload)
        return reposne
    }
    catch(e) {
        return e
    }
}