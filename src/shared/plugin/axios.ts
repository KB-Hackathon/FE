import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useLoadingStore } from '../stores/loading'

export interface Paged<T> {
  content: T[]
  totalPages: number
  totalElements: number
}

export interface ApiData<T> {
  code: string
  data: T
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

// 피니아 스토어 안전 접근 (인터셉터에서 직접 호출)
let _store: ReturnType<typeof useLoadingStore> | null = null
const store = () => (_store ??= useLoadingStore())

// 요청 인터셉터
api.interceptors.request.use((config) => {
  if (config.showGlobalLoader) {
    const msgs = Array.isArray(config.loaderMessage)
      ? config.loaderMessage
      : config.loaderMessage
        ? [config.loaderMessage]
        : null

    const s = store()
    s.message = msgs

    s.start({
      delayMs: config.loaderDelayMs,
      minVisibleMs: config.loaderMinVisibleMs,
    })
  }
  return config
})

// 응답 인터셉터
api.interceptors.response.use(
  (res) => {
    if (res.config.showGlobalLoader) {
      const s = store()
      s.done()
      s.message = null
    }
    return res
  },
  (err) => {
    if (err.config?.showGlobalLoader) {
      const s = store()
      s.done()
      s.message = null
    }
    return Promise.reject(err)
  }
)

export async function requestApi<T>(config: AxiosRequestConfig): Promise<ApiData<T>> {
  const res: AxiosResponse<ApiData<T>> = await api.request<ApiData<T>>(config)
  return res.data
}

export async function requestData<T>(config: AxiosRequestConfig): Promise<T> {
  const res: AxiosResponse<ApiData<T>> = await api.request<ApiData<T>>(config)
  return res.data.data
}

export const http = {
  getData<T>(url: string, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'GET', ...(config || {}) })
  },
  postData<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'POST', data, ...(config || {}) })
  },
  putData<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'PUT', data, ...(config || {}) })
  },
  patchData<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'PATCH', data, ...(config || {}) })
  },
  deleteData<T>(url: string, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'DELETE', ...(config || {}) })
  },
}
