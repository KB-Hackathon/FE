import axios from 'axios'
import { useLoadingStore } from '../stores/loading'

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
