import { onMounted, watch, type Ref } from 'vue'

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export function useUploadDraft<T extends object>(
  form: Ref<T>,
  key = 'uploadDraft',
  options?: {
    // 필요하면 JSON 대신 커스텀 직렬화/역직렬화 사용
    serialize?: (v: T) => string
    deserialize?: (s: string) => DeepPartial<T> | null
    enabled?: boolean
  }
) {
  const serialize = options?.serialize ?? ((v: T) => JSON.stringify(v))
  const deserialize =
    options?.deserialize ??
    ((s: string): DeepPartial<T> | null => {
      try {
        const parsed = JSON.parse(s) as unknown
        // 최소한 객체인지 확인
        return parsed && typeof parsed === 'object' ? (parsed as DeepPartial<T>) : null
      } catch {
        return null
      }
    })

  const enabled = options?.enabled ?? true

  onMounted(() => {
    if (!enabled || typeof window === 'undefined') return
    const saved = localStorage.getItem(key)
    if (!saved) return

    const patch = deserialize(saved)
    if (patch) Object.assign(form.value, patch)
  })

  watch(
    form,
    (v) => {
      if (!enabled || typeof window === 'undefined') return
      try {
        localStorage.setItem(key, serialize(v))
      } catch (e) {
        // 저장 실패(용량 초과 등) 무시
        console.error(e)
      }
    },
    { deep: true }
  )
}
