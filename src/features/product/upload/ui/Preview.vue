<template>
  <div class="w-full flex flex-col gap-3 pb-[60px]">
    <div
      class="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
      style="-webkit-overflow-scrolling: touch"
    >
      <div
        v-for="(imageUrl, imgIndex) in props.modelValue.imageList"
        :key="imgIndex"
        class="flex-none basis-full snap-center"
      >
        <img
          :src="imageUrl"
          class="my-3 w-full h-64 object-cover rounded-md"
          :alt="`기록 이미지 ${imgIndex + 1}`"
          loading="eager"
        >
      </div>
    </div>

    <div>
      <TypographyP1 class="text-gray-700">
        {{ modelValue.category }}
      </TypographyP1>
      <TypographyHead1 class="text-gray-700">
        {{ modelValue.title }}
      </TypographyHead1>
      <TypographyP2 class="text-gray-500">
        {{ modelValue.aiGeneratingDescription }}
      </TypographyP2>
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <Badge variant="secondary">
            {{ modelValue.option === 'delivery' ? '배송' : '쿠폰' }}
          </Badge>
        </div>
        <TypographyHead1 class="text-right">
          {{ formatNumber(Number(modelValue.price)) }} 원
        </TypographyHead1>
      </div>
      <Separator class="my-4" />
      <TypographySubTitle1 class="mb-3">
        공동구매 정보
      </TypographySubTitle1>
      <div class="flex gap-3 items-center">
        <TypographyHead3>모집 기간</TypographyHead3>
        <TypographyP1 class="text-gray-700">
          {{ modelValue.startDate }} ~ {{ modelValue.endDate }}
        </TypographyP1>
      </div>

      <div class="flex gap-3 items-center">
        <TypographyHead3>모집 인원</TypographyHead3>
        <TypographyP1 class="text-gray-700">
          {{ modelValue.recruitmentNum ? modelValue.recruitmentNum + '명' : '제한 없음' }}
        </TypographyP1>
      </div>
      <Separator class="my-4" />
      <TypographySubTitle1 class="mb-3">
        쿠폰 정보
      </TypographySubTitle1>
      <div
        v-if="modelValue.option === 'coupon'"
        class="space-y-2"
      >
        <div class="flex gap-3 items-center">
          <TypographyHead3>쿠폰 명</TypographyHead3>
          <TypographyP1 class="text-gray-700">
            {{ modelValue.couponName ?? modelValue.title }}
          </TypographyP1>
        </div>
        <div class="flex gap-3 items-center">
          <TypographyHead3>유효기간</TypographyHead3>
          <TypographyP1 class="text-gray-700">
            {{ modelValue.expirationPeriod + '일' }}
          </TypographyP1>
        </div>
      </div>
      <Separator class="my-4" />
      <div class="flex gap-3 items-center">
        <TypographyHead3>태그</TypographyHead3>
        <TypographyP2>
          <i class="bi bi-exclamation-circle" />
          AI가 자동 생성한 태그 리스트입니다
        </TypographyP2>
      </div>
      <TagsInput
        v-model="hashtagsProxy"
        class="mt-2"
      >
        <TagsInputItem
          v-for="item in hashtagsProxy"
          :key="item"
          class="p-2 mt-2"
          :value="item"
        >
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput
          class="my-2"
          placeholder="태그를 자유롭게 추가해보세요"
        />
      </TagsInput>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UploadForm } from '@/shared/composables/useUploadFlow'

import { Badge } from '@/shared/components/ui/badge'
import { Separator } from '@/shared/components/ui/separator'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/shared/components/ui/tags-input'
import {
  TypographyHead1,
  TypographyHead3,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { formatNumber } from '@/shared/utils/format'
import { computed } from 'vue'

const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

const hashtagsProxy = computed<string[]>({
  get: () => props.modelValue.hashtags ?? [],
  set: (val) => {
    emit('update:modelValue', { ...props.modelValue, hashtags: val })
  },
})
</script>
