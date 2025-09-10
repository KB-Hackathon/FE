<template>
  <div class="gap-2 pb-4">
    <div class="flex justify-between items-center mb-3">
      <TypographyP1> 구매자 리뷰 </TypographyP1>
      <TypographyCaption class="text-gray-600">
        전체보기
      </TypographyCaption>
    </div>

    <div class="flex justify-around gap-10">
      <!-- 왼쪽: 총평 -->
      <div class="flex flex-col items-center gap-1">
        <div class="flex items-center gap-1">
          <template
            v-for="i in 5"
            :key="i"
          >
            <i
              v-if="i <= Math.floor(rating)"
              class="bi bi-star-fill text-ccmkt-main text-xl"
            />
            <i
              v-else-if="i - rating <= 0.5"
              class="bi bi-star-half text-ccmkt-main text-xl"
            />
            <i
              v-else
              class="bi bi-star text-ccmkt-main text-xl"
            />
          </template>
        </div>

        <TypographyP2 class="text-gray-600 mt-4">
          최근 6개월 {{ recentRating.toFixed(1) }}
          <i class="bi bi-question-circle ml-1 text-gray-400" />
        </TypographyP2>

        <div class="flex items-end gap-1">
          <span class="text-[32px] font-bold">{{ rating.toFixed(1) }}</span>
          <TypographySubTitle2>점</TypographySubTitle2>
        </div>
      </div>

      <!-- 오른쪽: 평점 비율 -->
      <div class="flex flex-col items-center gap-1">
        <div class="flex items-end w-[180px] justify-between gap-3">
          <div
            v-for="(_count, idx) in ratingCounts"
            :key="idx"
            class="flex flex-col items-center"
          >
            <!-- 퍼센트 라벨 (전체 대비 %) -->
            <span class="mb-1 text-xs text-gray-500">{{ percents[idx] }}%</span>

            <!-- 회색 트랙 -->
            <div class="h-[90px] w-3 bg-gray-200 rounded-full relative overflow-hidden">
              <!-- 채움: 개수 기준(최대값을 100%) -->
              <div
                class="absolute bottom-0 left-0 w-full rounded-full"
                :style="{
                  height: fillHeightPx(idx),
                  background: 'var(--ccmkt-main, #ff5a5a)',
                  transform: 'translateZ(0)',
                }"
              />
            </div>

            <!-- 점수 라벨 -->
            <TypographyP2 class="mt-1 text-gray-600 whitespace-nowrap">
              {{ 5 - idx }}점
            </TypographyP2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TypographyCaption,
  TypographyP1,
  TypographyP2,
  TypographySubTitle2,
} from '@/shared/components/ui/typography'
import { computed, ref } from 'vue'

const rating = ref(4.2)
const recentRating = ref(4.6)

// 5점→1점 순
const ratingCounts = ref([14, 10, 1, 3, 0])

const total = computed(() => ratingCounts.value.reduce((a, b) => a + b, 0))
const percents = computed(() =>
  ratingCounts.value.map((c) => (total.value ? Math.round((c / total.value) * 100) : 0))
)

const maxCount = computed(() => Math.max(...ratingCounts.value, 1))
const fillHeightPx = (idx: number) => {
  const ratio = ratingCounts.value[idx] / maxCount.value
  const px = Math.round(ratio * 90)
  return `${Math.max(px, ratingCounts.value[idx] > 0 ? 4 : 0)}px` // 최소 4px 보장
}
</script>
