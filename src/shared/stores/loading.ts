import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type StartOpts = { delayMs?: number; minVisibleMs?: number }

export const useLoadingStore = defineStore('loading', () => {
  const pending = ref(0)
  const visible = ref(false)
  const message = ref<string[] | null>(null)

  let delayTimer: number | null = null
  let hideTimer: number | null = null
  let shownAt = 0
  // 기본 UX 값
  let lastOpts: Required<StartOpts> = { delayMs: 120, minVisibleMs: 300 }

  function start(opts: StartOpts = {}) {
    pending.value++
    lastOpts = {
      delayMs: opts.delayMs ?? 120,
      minVisibleMs: opts.minVisibleMs ?? 300,
    }

    if (!visible.value && delayTimer == null) {
      delayTimer = window.setTimeout(() => {
        delayTimer = null
        if (pending.value > 0) {
          visible.value = true
          shownAt = Date.now()
        }
      }, lastOpts.delayMs)
    }
  }

  function done() {
    pending.value = Math.max(0, pending.value - 1)
    if (pending.value === 0) {
      if (delayTimer != null) {
        clearTimeout(delayTimer)
        delayTimer = null
      }
      if (visible.value) {
        const remain = Math.max(0, lastOpts.minVisibleMs - (Date.now() - shownAt))
        if (hideTimer != null) clearTimeout(hideTimer)
        hideTimer = window.setTimeout(() => {
          visible.value = false
          hideTimer = null
        }, remain)
      }
    }
  }

  const isLoading = computed(() => visible.value)
  return { isLoading, message, start, done }
})
