<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px]">
      <TypographyHead1 class="text-gray-700">
        상품 제목을 입력해주세요
      </TypographyHead1>
      <TypographyP1 class="text-gray-700 mt-6">
        상품 제목
      </TypographyP1>
      <div class="fixed inset-x-0 top-[170px] mx-auto max-w-[390px] px-5 box-border">
        <Input
          ref="titleEl"
          class="text-[23px] font-semibold border-t-0 border-r-0 border-l-0 border-b-2 border-ccmkt-main focus-visible:ring-0 rounded-none h-[50px] shadow-none pl-0"
          placeholder="상품 제목"
          inputmode="text"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          enterkeyhint="next"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Input } from '@/shared/components/ui/input'
import { TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import { ref, type ComponentPublicInstance, type Ref } from 'vue'

defineEmits<{ (e: 'next'): void; (e: 'prev'): void }>()

type InputExpose = {
  focus: () => void
  el: Ref<HTMLInputElement | null>
}

const titleEl = ref<ComponentPublicInstance<InputExpose> | null>(null)

defineExpose({
  focusFirstFieldImmediate() {
    const comp = titleEl.value
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
  },
})
</script>
