<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <div class="flex justify-start items-center gap-3">
        <TypographyHead1 class="text-gray-700">
          설명을 입력해주세요
        </TypographyHead1>
        <TypographyP1>(최대 400자)</TypographyP1>
      </div>
      <Textarea
        ref="titleEl"
        v-model="description"
        class="mt-7 resize-none h-[250px] text-[17px]"
        placeholder="상품에 대해 간단한 설명을 입력하면
자동 홍보 게시글이 더 자연스러워집니다"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadForm } from '@/pages/UploadProduct.vue'
import { Textarea } from '@/shared/components/ui/textarea'
import { TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import { useFocusFirstFieldImmediate } from '@/shared/composables/useFocusFirstFieldImmediate'
import { computed, ref, type ComponentPublicInstance, type Ref } from 'vue'

type InputExpose = {
  focus: () => void
  el: Ref<HTMLInputElement | null>
}
const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

const description = computed({
  get: () => props.modelValue.description,
  set: (val: string) => {
    emit('update:modelValue', { ...props.modelValue, description: val })
  },
})

const titleEl = ref<ComponentPublicInstance<InputExpose> | null>(null)
const focusFirstFieldImmediate = useFocusFirstFieldImmediate(titleEl)

defineExpose({ focusFirstFieldImmediate })
</script>
