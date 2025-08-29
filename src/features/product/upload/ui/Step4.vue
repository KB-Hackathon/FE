<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px]">
      <TypographyHead1 class="text-gray-700">
        상품 가격을 입력해주세요
      </TypographyHead1>
      <TypographyP1 class="text-gray-700 mt-6">
        상품 가격
      </TypographyP1>
      <div class="fixed inset-x-0 top-[170px] mx-auto max-w-[390px] px-5 box-border">
        <div class="relative">
          <Input
            ref="titleEl"
            v-model="price"
            class="w-full text-[23px] font-semibold border-t-0 border-r-0 border-l-0 border-b-2 border-ccmkt-main focus-visible:ring-0 rounded-none h-[50px] shadow-none pl-0 pr-8"
            placeholder="상품 가격"
            inputmode="numeric"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            enterkeyhint="next"
          />

          <TypographyHead1 class="absolute right-2 bottom-2 text-gray-700 pointer-events-none">
            원
          </TypographyHead1>
        </div>
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

const price = computed({
  get: () => props.modelValue.price ?? '',
  set: (val: string | number) => {
    emit('update:modelValue', {
      ...props.modelValue,
      price: val === '' ? null : Number(val),
    })
  },
})

const titleEl = ref<ComponentPublicInstance<InputExpose> | null>(null)
const focusFirstFieldImmediate = useFocusFirstFieldImmediate(titleEl)

defineExpose({ focusFirstFieldImmediate })
</script>
