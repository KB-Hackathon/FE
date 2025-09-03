import { onMounted, watch } from 'vue'

type AnyRef<T> = { value: T }

export function useUploadDraft<T extends Record<string, unknown>>(
  form: AnyRef<T>,
  key = 'uploadDraft'
) {
  onMounted(() => {
    const saved = localStorage.getItem(key)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved) as Partial<T>
      Object.assign(form.value, parsed)
    } catch (e) {
      console.error('[useUploadDraft] parse error:', e)
    }
  })

  watch(
    () => form.value,
    (v) => {
      try {
        localStorage.setItem(key, JSON.stringify(v))
      } catch (e) {
        console.error('[useUploadDraft] save error:', e)
      }
    },
    { deep: true }
  )
}
