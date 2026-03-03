import { ofetch } from 'ofetch'
import type { ApiResponse } from '~/domain/interface/common/ApiResponse'
const { start, finish } = useGlobalLoader()
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface CustomFetchOptions {
  method?: HttpMethod
  payload?: Record<string, any>
  headers?: Record<string, string>
}

let isRefreshing = false
let refreshQueue: Array<() => void> = []
export const useCustomFetch = () => {
  const config = useRuntimeConfig()
  const router = useRouter()

  /* ---------------- TOKEN HELPERS ---------------- */

  const getAccessToken = () => {
    const cookieToken = useCookie<string | null>('outh_token').value
    if (cookieToken) return cookieToken

    if (import.meta.client) {
      return localStorage.getItem('auth_token')
    }

    return null
  }

  const setAccessToken = (token: string) => {
    useCookie('auth_token').value = token
    if (import.meta.client) {
      localStorage.setItem('auth_token', token)
    }
  }

  const clearSession = async () => {
    useCookie('auth_token').value = null
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
    await router.push('/auth/login')
  }

  /* ---------------- REFRESH TOKEN ---------------- */

  const refreshToken = async () => {
    if (isRefreshing) {
      return new Promise<void>((resolve) => refreshQueue.push(resolve))
    }

    isRefreshing = true

    try {
      const res = await ofetch<ApiResponse<{ accessToken: string }>>(
        `${config.public.apiBaseUrl}/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include', // httpOnly refresh token
        }
      )

      if (!res.success || !res.data?.accessToken) {
        throw new Error('Refresh failed')
      }

      setAccessToken(res.data.accessToken)

      refreshQueue.forEach((cb) => cb())
      refreshQueue = []
    } catch {
      refreshQueue = []
      await clearSession()
      throw new Error('Refresh token expired')
    } finally {
      isRefreshing = false
    }
  }

  /* ---------------- FETCH CLIENT ---------------- */

  const api = ofetch.create({
    baseURL: config.public.apiBaseUrl,

    onRequest({ options }) {
      if (!request.toString().includes('/auth/refresh')) {
        start()
      }
      const token = getAccessToken()
      if (token) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token}`)
        options.headers = headers
      }
    },
    onResponse({ request }) {
      if (!request.toString().includes('/auth/refresh')) {
        finish()
      }
    },

    async onResponseError({ request, options, response }) {
      if (!request.toString().includes('/auth/refresh')) {
        finish()
      }
      if (response.status !== 401) return

      try {
        await refreshToken()
        await api(request, options) // 🔁 retry original request
      } catch {
        // logout already handled
      }
    },
  })

  /* ---------------- MAIN METHOD ---------------- */

  const request = async <T = any>(
    url: string,
    options: CustomFetchOptions = {}
  ): Promise<ApiResponse<T>> => {
    const { method, payload, headers } = options

    // 🔍 Auto decide HTTP method
    const httpMethod: HttpMethod =
      method || (payload ? 'POST' : 'GET')

    try {
      return await api<ApiResponse<T>>(url, {
        method: httpMethod,
        headers,

        ...(httpMethod === 'GET'
          ? { params: payload }
          : { body: payload }),
      })
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.message ||
          error?.data?.message ||
          'Something went wrong',
        data: undefined,
      }
    }
  }

  return {
    request,
  }
}
