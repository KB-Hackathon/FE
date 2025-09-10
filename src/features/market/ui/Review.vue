<template>
  <div class="gap-2 py-4">
    <TypographyP1 class="mb-3">
      구매자 리뷰
    </TypographyP1>

    <div class="flex justify-around gap-10">
      <div class="flex flex-col items-center gap-1">
        <TypographyP2 class="mb-3">
          사용자 총 평점
        </TypographyP2>

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
              v-else
              class="bi bi-star-half text-ccmkt-main text-xl"
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

      <!-- 평점 비율 -->
      <div class="flex flex-col items-center gap-1">
        <TypographyP2 class="mb-3">
          평점 비율
        </TypographyP2>
        <div class="flex items-center w-[180px] justify-between gap-3">
          <div
            v-for="(_count, idx) in ratingCounts"
            :key="idx"
            class="flex flex-col items-center"
          >
            <!-- 퍼센트 라벨 -->
            <span class="mb-1 text-xs text-gray-500">{{ percents[idx] }}%</span>

            <!-- 회색 트랙 -->
            <div class="h-[90px] w-3 bg-gray-200 rounded-full relative overflow-hidden">
              <!-- 채움(비율) -->
              <div
                class="absolute bottom-0 left-0 w-full bg-ccmkt-main rounded-full"
                :style="{ height: `calc(${percents[idx]}% * 1.0)` }"
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
import { TypographyP1, TypographyP2, TypographySubTitle2 } from '@/shared/components/ui/typography'
import { computed, ref } from 'vue'

const rating = ref(4.2) // 전체 평점
const recentRating = ref(4.6) // 최근 6개월 평점

// 예시 평점 개수 데이터 (5점부터 1점 순)
const ratingCounts = ref([14, 2, 1, 10, 10])
const total = computed(() => ratingCounts.value.reduce((a, b) => a + b, 0))
const maxCount = computed(() => Math.max(...ratingCounts.value, 1))

// 퍼센트(정수)로 라벨 표시
const percents = computed(() =>
  ratingCounts.value.map((c) => (total.value ? Math.round((c / total.value) * 100) : 0))
)
</script>
