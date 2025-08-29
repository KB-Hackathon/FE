import type { ComponentPublicInstance, Ref } from 'vue'

type InputExpose = {
  focus: () => void
  el: Ref<HTMLInputElement | null>
}

export function useFocusFirstFieldImmediate(
  inputRef: Ref<ComponentPublicInstance<InputExpose> | null>
) {
  return () => {
    const comp = inputRef.value
    const native: HTMLInputElement | null = comp?.el?.value ?? null

    if (native) {
      native.focus()
      const len = native.value?.length ?? 0
      try {
        native.setSelectionRange(len, len)
      } catch (e) {
        console.error(e)
      }
    } else {
      comp?.focus?.()
    }
  }
}
