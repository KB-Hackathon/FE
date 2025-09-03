import 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    /** 이 요청에서 전역 로딩을 표시할지 여부 (기본: false) */
    showGlobalLoader?: boolean
    /** 로딩 표시 지연(ms) – 너무 짧은 요청은 안 보이게 (선택) */
    loaderDelayMs?: number
    /** 최소 노출 시간(ms) – 깜빡임 방지 (선택) */
    loaderMinVisibleMs?: number
    loaderMessage?: string[]
  }
}
