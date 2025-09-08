<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[110px]">
      <TypographyHead1 class="text-gray-700">
        상품 기본 정보를 입력해주세요
      </TypographyHead1>
      <div class="fixed inset-x-0 top-[170px] mx-auto max-w-[390px] px-5 box-border">
        <TypographyP1 class="text-gray-700">
          상품 제목
        </TypographyP1>
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
        <TypographyP1 class="text-gray-700 mt-6 mb-3">
          카테고리
        </TypographyP1>

        <Select v-model="category">
          <SelectTrigger
            class="w-full h-[45px] text-[23px] font-semibold border-t-0 border-l-0 border-r-0 rounded-none shadow-none pl-0 pr-0 pb-4 focus:ring-0 border-b-2 border-ccmkt-main"
          >
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent class="w-full">
            <SelectGroup
              v-for="(c, index) in categories"
              :key="index"
              class="pl-0"
            >
              <SelectItem
                class="text-[15px]"
                :value="c.value"
              >
                {{ c.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import { useFocusFirstFieldImmediate } from '@/shared/composables/useFocusFirstFieldImmediate'
import type { UploadForm } from '@/shared/composables/useUploadFlow'
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

const categories = [
  { value: '의류', label: '의류' },
  { value: '교육', label: '교육' },
  { value: '문구', label: '문구' },
  { value: '운동', label: '운동' },
  { value: '숙박', label: '숙박' },
  { value: '식재료', label: '식재료' },
  { value: '반려동물', label: '반려동물' },
  { value: '미용', label: '미용' },
  { value: '유아', label: '유아' },
  { value: '취미', label: '취미' },
  { value: '외식', label: '외식' },
  { value: '카페', label: '카페' },
]

const category = computed({
  get: () => props.modelValue.category,
  set: (val: string) => {
    emit('update:modelValue', { ...props.modelValue, category: val })
  },
})
defineExpose({ focusFirstFieldImmediate })
</script>
