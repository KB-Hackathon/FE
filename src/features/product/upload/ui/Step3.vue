<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[110px]">
      <TypographyHead1 class="text-gray-700">
        가격 및 판매 유형을 입력해주세요
      </TypographyHead1>

      <div class="fixed inset-x-0 top-[170px] mx-auto max-w-[390px] px-5 box-border">
        <TypographyP1 class="text-gray-700">
          상품 가격
        </TypographyP1>
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
        <div class="grid grid-cols-2 gap-3 mt-7">
          <Button
            class="h-[56px] text-lg"
            :class="
              model.option === 'delivery'
                ? '!bg-ccmkt-main !text-black !border-ccmkt-main'
                : 'bg-white border text-black hover:bg-white'
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
                : 'bg-white border text-black hover:bg-white'
            "
            @click="selectQuick('coupon')"
          >
            쿠폰
          </Button>
        </div>
        <div
          v-if="model.option === 'coupon'"
          class="space-y-4 mt-5"
        >
          <div class="flex gap-1">
            <TypographyP1 class="-mb-4">
              쿠폰명
            </TypographyP1>
            <TypographyCaption>
              <i class="bi bi-exclamation-circle mr-1" /> 미기입시 상품명으로 자동
              입력됩니다.
            </TypographyCaption>
          </div>
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
              inputmode="numeric"
            />
            <TypographyHead1 class="absolute right-2 bottom-2 text-gray-700 pointer-events-none">
              일
            </TypographyHead1>
          </div>
        </div>
        <div
          v-else
          class="space-y-4 mt-5"
        >
          <TypographyP2 class="text-gray-600">
            <i class="bi bi-exclamation-circle mr-1" />
            배송 유의사항
            <br>
            식품류는 안전상의 이유로 교환/반품이 제한될 수 있습니다.
            <br>
            상품 접수 및 발송은 점주님께서 직접 진행해주셔야 합니다.
          </TypographyP2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  TypographyCaption,
  TypographyHead1,
  TypographyHead3,
  TypographyP1,
  TypographyP2,
} from '@/shared/components/ui/typography'
import { useFocusFirstFieldImmediate } from '@/shared/composables/useFocusFirstFieldImmediate'
import type { UploadForm } from '@/shared/composables/useUploadFlow'
import { computed, ref, type ComponentPublicInstance, type Ref } from 'vue'

type InputExpose = {
  focus: () => void
  el: Ref<HTMLInputElement | null>
}
const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()
const model = computed(() => props.modelValue)
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
