import axios from 'axios'
import { useLoadingStore } from '../stores/loading'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

// 핀리아 스토어 안전 접근 (인터셉터에서 직접 호출)
let _store: ReturnType<typeof useLoadingStore> | null = null
const store = () => (_store ??= useLoadingStore())

// 요청 인터셉터
api.interceptors.request.use((config) => {
  if (config.showGlobalLoader) {
    store().start({
      delayMs: config.loaderDelayMs,
      minVisibleMs: config.loaderMinVisibleMs,
    })
  }
  return config
})

// 응답 인터셉터
api.interceptors.response.use(
  (res) => {
    if (res.config.showGlobalLoader) store().done()
    return res
  },
  (err) => {
    if (err.config?.showGlobalLoader) store().done()
    return Promise.reject(err)
  }
)
