import { ref } from 'vue'

export function useDialog(initial = false) {
  const open = ref<boolean>(initial)
  const show = () => (open.value = true)
  const hide = () => (open.value = false)
  const toggle = () => (open.value = !open.value)

  return { open, show, hide, toggle }
}
