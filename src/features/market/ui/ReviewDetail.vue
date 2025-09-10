<template>
  <div class="border p-3 rounded-md">
    <div class="flex justify-between">
      <TypographyP1 class="mb-2">
        <i class="bi bi-emoji-smile-fill mr-1 text-yellow-400" />좋았던 점
      </TypographyP1>
    </div>
    <div
      v-for="(review, index) in goodReview"
      :key="`good-${index}`"
      class="flex items-center text-gray-700 py-1.5"
    >
      <TypographyP2 class="shrink-0">
        {{ review.review }}
      </TypographyP2>
      <div class="flex-1 border-b border-dotted border-gray-300 mx-4" />
      <TypographyP2 class="shrink-0 text-gray-500">
        {{ review.count }}명
      </TypographyP2>
    </div>
  </div>
  <div class="border p-3 rounded-md mt-3">
    <div class="flex justify-between">
      <TypographyP1 class="mb-2">
        <i class="bi bi-emoji-frown-fill mr-1 text-red-400" />아쉬운 점
      </TypographyP1>
    </div>
    <div
      v-for="(review, index) in badReview"
      :key="`bad-${index}`"
      class="py-1.5"
    >
      <div class="flex items-center text-gray-700">
        <TypographyP2 class="shrink-0">
          {{ review.review }}
        </TypographyP2>
        <div class="flex-1 border-b border-dotted border-gray-300 mx-4" />
        <TypographyP2 class="shrink-0 text-gray-500">
          {{ review.count }}명
        </TypographyP2>
      </div>
      <typography-caption class="mt-1 text-gray-500">
        <i class="bi bi-info-circle mr-1" />{{ review.suggestion }}
      </typography-caption>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TypographyCaption, TypographyP1, TypographyP2 } from '@/shared/components/ui/typography'
interface ReviewInterface {
  review: string
  count: number
}
const goodReview: ReviewInterface[] = [
  { review: '커피 맛이 진하고 깊어요', count: 3 },
  { review: '디저트가 맛있어요', count: 10 },
  { review: '값이 싸요', count: 7 },
]

const badReview: { review: string; count: number; suggestion: string }[] = [
  {
    review: '너무 달아요',
    count: 4,
    suggestion: '단맛을 줄인 버전이나 당도 선택 옵션을 제공해보세요.',
  },
  {
    review: '쿠폰 유효기간이 짧아요',
    count: 5,
    suggestion: '쿠폰 유효기간을 최소 1개월 이상으로 늘려보세요',
  },
  {
    review: '가격에 비해 양이 적어요',
    count: 2,
    suggestion: '소용량·대용량 옵션을 구분해서 제공해 체감 가치를 높여보세요.',
  },
]
</script>
