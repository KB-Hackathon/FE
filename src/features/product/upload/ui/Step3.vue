<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="my-3">
      <TypographyHead1 class="text-gray-700">
        카테고리를 선택해주세요
      </TypographyHead1>
    </div>
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
          v-for="(category, index) in categories"
          :key="index"
          class="pl-0"
        >
          <SelectItem
            class="text-[15px]"
            :value="category.value"
          >
            {{ category.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
<script setup lang="ts">
import type { UploadForm } from '@/pages/UploadProduct.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import { computed } from 'vue'

const props = defineProps<{ modelValue: UploadForm }>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: UploadForm): void
}>()

const categories = [
  { value: 'fashion', label: '패션' },
  { value: 'beauty', label: '뷰티 / 헬스' },
  { value: 'digital', label: '디지털/가전' },
  { value: 'life', label: '생활 / 주방' },
  { value: 'food', label: '식품' },
  { value: 'hobby', label: '취미 / 문구' },
  { value: 'sports', label: '스포츠' },
  { value: 'baby', label: '유아' },
]

const category = computed({
  get: () => props.modelValue.category,
  set: (val: string) => {
    emit('update:modelValue', { ...props.modelValue, category: val })
  },
})
</script>
