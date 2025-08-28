import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useKeyboardSafeBottom() {
  const kbOffset = ref(0) // 키보드 높이(px)

  const update = () => {
    const vv = window.visualViewport
    if (!vv) return
    // 키보드가 열리면 innerHeight - visualViewport.height 가 키보드 높이로 근사됨
    const keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
    kbOffset.value = keyboard
  }

  onMounted(() => {
    const vv = window.visualViewport
    if (!vv) return
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    update()
  })

  onBeforeUnmount(() => {
    const vv = window.visualViewport
    if (!vv) return
    vv.removeEventListener('resize', update)
    vv.removeEventListener('scroll', update)
  })

  return { kbOffset }
}
