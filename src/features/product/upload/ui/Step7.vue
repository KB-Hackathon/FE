<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <TypographyHead1 class="text-gray-700">
        모집 인원을 선택해주세요
      </TypographyHead1>
    </div>

    <div class="fixed inset-x-0 top-[150px] mx-auto max-w-[390px] px-5 box-border space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <Button
          v-for="n in [50, 100]"
          :key="n"
          class="h-[56px] text-lg"
          :class="
            model.recruitmentNum === n
              ? '!bg-ccmkt-main !text-black !border-ccmkt-main'
              : 'bg-white border text-black'
          "
          @click="selectQuick(n)"
        >
          {{ n }}명
        </Button>

        <Button
          class="h-[56px] text-lg col-span-2"
          :class="
            model.recruitmentNum === null
              ? '!bg-ccmkt-main !text-black !border-ccmkt-main'
              : 'bg-white border text-black'
          "
          @click="selectQuick(null)"
        >
          제한 없음
        </Button>
      </div>

      <div class="space-y-2">
        <Button
          class="w-full h-[56px] text-lg"
          :class="
            isCustom ||
              (model.recruitmentNum !== null && ![50, 100].includes(model.recruitmentNum || 0))
              ? '!bg-ccmkt-main !text-black !border-ccmkt-main'
              : 'bg-white border text-black'
          "
          @click="toggleCustom"
        >
          직접 입력
        </Button>

        <div
          v-if="isCustom"
          class="relative flex items-center gap-2"
        >
          <Input
            v-model="customRecruitment"
            type="number"
            inputmode="numeric"
            placeholder="인원 수 입력"
            class="w-full text-[23px] font-semibold border-t-0 border-r-0 border-l-0 border-b-2 border-ccmkt-main focus-visible:ring-0 rounded-none h-[50px] shadow-none pl-0 pr-10 mt-4"
          />
          <span class="absolute right-0 bottom-2 text-xl select-none">명</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadForm } from '@/pages/UploadProduct.vue'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { TypographyHead1 } from '@/shared/components/ui/typography'
import { computed, ref } from 'vue'

const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

const isCustom = ref(false)

const model = computed(() => props.modelValue)

function patch(p: Partial<UploadForm>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}

function selectQuick(v: number | null) {
  patch({ recruitmentNum: v })
  isCustom.value = false
}

function toggleCustom() {
  isCustom.value = !isCustom.value
  if (isCustom.value) {
    patch({ recruitmentNum: props.modelValue.recruitmentNum ?? null })
  }
}

const customRecruitment = computed({
  get: () => props.modelValue.recruitmentNum ?? '',
  set: (val: string | number) => {
    patch({
      recruitmentNum: val === '' ? null : Number(val),
    })
  },
})
</script>
