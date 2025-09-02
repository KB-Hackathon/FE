<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <TypographyHead1 class="text-gray-700">
        판매 유형을 선택해주세요
      </TypographyHead1>
    </div>

    <div class="fixed inset-x-0 top-[150px] mx-auto max-w-[390px] px-5 box-border space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <Button
          class="h-[56px] text-lg"
          :class="
            model.option === 'delivery'
              ? '!bg-ccmkt-main !text-black !border-ccmkt-main'
              : 'bg-white border text-black'
          "
          @click="selectQuick('delivery')"
        >
          배송
        </Button>
        <Button
          class="h-[56px] text-lg"
          :class="
            model.option === 'coupon'
              ? '!bg-ccmkt-main !text-black !border-ccmkt-main'
              : 'bg-white border text-black'
          "
          @click="selectQuick('coupon')"
        >
          쿠폰
        </Button>
      </div>
      <div
        v-if="model.option === 'coupon'"
        class="space-y-4"
      >
        <TypographyP1 class="-mb-4">
          쿠폰명
        </TypographyP1>
        <Input
          v-model="couponName"
          class="text-[23px] font-semibold border-t-0 border-r-0 border-l-0 border-b-2 border-ccmkt-main focus-visible:ring-0 rounded-none h-[50px] shadow-none pl-0"
          :placeholder="model.title"
        />
        <TypographyP1 class="pt-5">
          유효기간
        </TypographyP1>
        <TypographyHead3>구매일로부터</TypographyHead3>
        <div class="relative">
          <Input
            v-model="expirationPeriod"
            class="text-[23px] font-semibold border-t-0 border-r-0 border-l-0 border-b-2 border-ccmkt-main focus-visible:ring-0 rounded-none h-[50px] shadow-none pl-0"
            placeholder="유효기간"
            type="number"
            inputmode="numeric"
          />
          <TypographyHead1 class="absolute right-2 bottom-2 text-gray-700 pointer-events-none">
            일
          </TypographyHead1>
        </div>
      </div>
      <div
        v-else
        class="space-y-4"
      >
        <TypographyP2 class="text-gray-600">
          <i class="bi bi-exclamation-circle mr-1" />
          배송 유의사항
          <br>
          배송 유의사항 배송 유의사항 배송 유의사항 배송 유의사항 배송 유의사항 배송 유의사항 배송
          유의사항 배송 유의사항
        </TypographyP2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadForm } from '@/pages/UploadProduct.vue'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  TypographyHead1,
  TypographyHead3,
  TypographyP1,
  TypographyP2,
} from '@/shared/components/ui/typography'
import { computed } from 'vue'

const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

const model = computed(() => props.modelValue)

function patch(p: Partial<UploadForm>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}

function selectQuick(v: 'delivery' | 'coupon') {
  patch({ option: v })
}

const expirationPeriod = computed({
  get: () => props.modelValue.expirationPeriod ?? '',
  set: (val: string | number) => {
    patch({
      expirationPeriod: val === '' ? null : Number(val),
    })
  },
})

const couponName = computed({
  get: () => props.modelValue.couponName ?? '',
  set: (val: string) => {
    patch({
      couponName: val === '' ? null : val,
    })
  },
})
</script>
