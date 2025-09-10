<template>
  <div class="w-[150px]">
    <TypographyP1 class="text-center mb-7">
      성별 분포
    </TypographyP1>
    <apexchart
      type="pie"
      height="200"
      :options="genderPieOptions"
      :series="genderSeries"
    />
    <div class="mt-6 grid grid-cols-2 gap-y-2 pl-[20px]">
      <div
        v-for="(label, i) in genderLabels"
        :key="label"
        class="flex items-center gap-2"
      >
        <span
          class="inline-block w-3 h-3 rounded-full"
          :style="{ background: genderColors[i] }"
        />
        <span class="text-sm text-black truncate">{{ label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MarketReport } from '@/entities/market/market.entity'
import { baseColors, toAlpha } from '@/entities/market/market.util'
import { TypographyP1 } from '@/shared/components/ui/typography'
import { computed } from 'vue'

const props = defineProps<{
  report: MarketReport | null
}>()

const genderLabels = ['여성', '남성']
const genderSeries = computed(() => {
  const female = props.report?.genderDistribution.femaleCnt ?? 0
  const male = props.report?.genderDistribution.maleCnt ?? 0
  return [female, male]
})
const genderColors = [toAlpha(baseColors[0]), toAlpha(baseColors[1])]

const genderPieOptions = {
  labels: genderLabels,
  colors: genderColors,
  legend: {
    show: false,
    horizontalAlign: 'center',
    labels: { colors: '#000' },
    fontSize: '12px',
    fontWeight: 500,
    markers: { width: 12, height: 12, radius: 12, offsetX: -6 },
    itemMargin: { horizontal: 16, vertical: 4 },
  },
  plotOptions: { pie: { dataLabels: { offset: -16 } } },
  dataLabels: {
    style: { fontSize: '14px', fontWeight: 'bold', colors: ['#000'] },
    dropShadow: { enabled: false },
    formatter: (val: number) => (val >= 10 ? `${val.toFixed(0)}%` : ''),
  },
}
</script>
