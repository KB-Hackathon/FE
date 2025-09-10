<template>
  <div>
    <TypographyP1 class="text-center">
      연령대 분포
    </TypographyP1>

    <div class="-mt-2 w-full flex justify-center">
      <div
        class="flex items-end justify-between"
        style="width: 200px; height: 230px"
      >
        <div
          v-for="(pct, idx) in scaledSeries"
          :key="idx"
          class="flex flex-col items-center"
          style="width: 36px"
        >
          <div
            class="relative flex items-end justify-center"
            style="height: 150px; width: 24px"
          >
            <div
              class="absolute bottom-0 -translate-x-1/2 w-3 rounded-t-full transition-all"
              :style="{
                height: `${(pct / maxPct) * 100}%`,
                background: ageColors[idx],
                transform: 'translateZ(0)', //
              }"
            />

            <span
              v-if="pct > 0"
              class="absolute left-1/2 -translate-x-1/2 -translate-y-[2px] text-xs font-bold text-gray-600 whitespace-nowrap"
              :style="{ bottom: `calc(${(pct / maxPct) * 100}% + 6px)` }"
            >
              {{ pct }}%
            </span>
          </div>

          <!-- 라벨 -->
          <span class="mt-1 text-xs text-gray-700 whitespace-nowrap">{{ ageLabels[idx] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MarketReport } from '@/entities/market/market.entity'
import { baseColors, toAlpha } from '@/entities/market/market.util'
import { TypographyP1 } from '@/shared/components/ui/typography'
import { computed } from 'vue'

const props = defineProps<{ report: MarketReport | null }>()

const ageLabels = ['10대', '20대', '30대', '40대', '50+']
const ageColors = ageLabels.map((_, i) => toAlpha(baseColors[i % baseColors.length]))

const ageSeries = computed<number[]>(() => {
  const a = props.report?.ageDistribution
  if (!a) return [0, 0, 0, 0, 0]
  const arr = [a.over10, a.over20, a.over30, a.over40, a.over50 + a.over60]
  const total = arr.reduce((s, v) => s + v, 0) || 1
  return arr.map((v) => Math.round((v / total) * 100))
})

const maxPct = computed(() => Math.max(...ageSeries.value, 1))

const scaledSeries = computed(() => ageSeries.value)
</script>
