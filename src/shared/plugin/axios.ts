// src/shared/plugin/axios.ts
import { useAuthStore } from '@/entities/user/user.store'
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios'
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
  withCredentials: true, // 기본값
})

// ---- Pinia 안전 접근 ----
let _loading: ReturnType<typeof useLoadingStore> | null = null
const loading = () => (_loading ??= useLoadingStore())

let _auth: ReturnType<typeof useAuthStore> | null = null
const auth = () => (_auth ??= useAuthStore())

// ---- 요청 인터셉터 ----
api.interceptors.request.use((config) => {
  // 항상 쿠키 포함
  config.withCredentials = true

  // headers를 AxiosHeaders로 보장
  const h = AxiosHeaders.from(config.headers)

  // Bearer 주입
  const token = auth().accessToken
  if (token) h.set('Authorization', `Bearer ${token}`)

  config.headers = h

  if (config.showGlobalLoader) {
    const s = loading()
    s.message = Array.isArray(config.loaderMessage)
      ? config.loaderMessage
      : config.loaderMessage
        ? [config.loaderMessage]
        : null

    s.start({
      delayMs: config.loaderDelayMs,
      minVisibleMs: config.loaderMinVisibleMs,
    })
  }

  return config
})

// ---- 응답 인터셉터 ----
api.interceptors.response.use(
  (res) => {
    const c = res.config
    if (c?.showGlobalLoader) {
      const s = loading()
      s.done()
      s.message = null
    }
    return res
  },
  (err) => {
    const c = err.config
    if (c?.showGlobalLoader) {
      const s = loading()
      s.done()
      s.message = null
    }
    return Promise.reject(err)
  }
)

// ---- 공통 요청 헬퍼 ----
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
    return requestData<T>({ url, method: 'GET', ...(config ?? {}) })
  },
  postData<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'POST', data, ...(config ?? {}) })
  },
  putData<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'PUT', data, ...(config ?? {}) })
  },
  patchData<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'PATCH', data, ...(config ?? {}) })
  },
  deleteData<T>(url: string, config?: AxiosRequestConfig) {
    return requestData<T>({ url, method: 'DELETE', ...(config ?? {}) })
  },
}
