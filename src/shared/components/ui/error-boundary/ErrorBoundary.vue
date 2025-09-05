<template>
  <div
    v-if="hasError"
    class="p-4 rounded-md border border-red-200 bg-red-50"
  >
    <p class="font-semibold text-red-700">
      문제가 발생했어요 😢
    </p>
    <p class="text-sm text-red-600 mt-1">
      {{ message }}
    </p>
    <div class="mt-3 flex gap-2">
      <button
        class="px-3 py-1 rounded bg-red-600 text-white"
        @click="retry"
      >
        다시 시도
      </button>
      <button
        v-if="showDetails"
        class="px-3 py-1 rounded border"
        @click="toggle"
      >
        {{ showStack ? '에러 숨기기' : '에러 자세히' }}
      </button>
    </div>
    <pre
      v-if="showStack"
      class="mt-2 text-xs overflow-auto"
    >{{ stack }}</pre>
  </div>
  <slot v-else />
</template>
<script setup lang="ts">
import { onErrorCaptured, ref, watch } from 'vue'

const props = defineProps<{
  resetKey?: string | number // 외부에서 key만 바꿔도 영역이 리셋
  onRetry?: () => void // retry 버튼 클릭 시 부모에서 다시 로드
  showDetails?: boolean // 디버깅용 상세보기 버튼 노출
}>()

const hasError = ref<boolean>(false)
const message = ref<string>('')
const stack = ref<string>('')
const showStack = ref<boolean>(false)

function toggle() {
  showStack.value = !showStack.value
}
function reset() {
  hasError.value = false
  message.value = ''
  stack.value = ''
  showStack.value = false
}
function retry() {
  reset()
  props.onRetry?.()
}

onErrorCaptured((err) => {
  hasError.value = true
  message.value = (err as Error)?.message ?? String(err)
  stack.value = (err as Error)?.stack ?? ''
  return false // false를 반환해 에러를 상위로 전파하지 않음
})

watch(
  () => props.resetKey,
  () => reset()
)
</script>
