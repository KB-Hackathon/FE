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
          v-model="title"
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
import type { UploadForm } from '@/pages/UploadProduct.vue'
import { Input } from '@/shared/components/ui/input'
import { TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import { useFocusFirstFieldImmediate } from '@/shared/composables/useFocusFirstFieldImmediate'
import { computed, ref, type ComponentPublicInstance, type Ref } from 'vue'

type InputExpose = {
  focus: () => void
  el: Ref<HTMLInputElement | null>
}
const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

const title = computed({
  get: () => props.modelValue.title,
  set: (val: string) => {
    emit('update:modelValue', { ...props.modelValue, title: val })
  },
})

const titleEl = ref<ComponentPublicInstance<InputExpose> | null>(null)
const focusFirstFieldImmediate = useFocusFirstFieldImmediate(titleEl)

defineExpose({ focusFirstFieldImmediate })
</script>
