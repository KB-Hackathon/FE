<template>
  <div>
    <TypographyP1 class="text-center">
      연령대 분포
    </TypographyP1>
    <apexchart
      type="bar"
      height="230"
      width="200"
      :options="ageBarOptions"
      :series="ageBarSeries"
    />
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

const ageLabels = ['10대', '20대', '30대', '40대', '50+']
const ageColors = ageLabels.map((_, i) => toAlpha(baseColors[i % baseColors.length]))

const ageSeries = computed(() => {
  const a = props.report?.ageDistribution
  if (!a) return [0, 0, 0, 0, 0]

  const arr = [a.over10, a.over20, a.over30, a.over40, a.over50 + a.over60]
  const total = arr.reduce((s, v) => s + v, 0) || 1
  return arr.map((v) => Math.round((v / total) * 100))
})
const ageBarSeries = computed(() => [{ name: '비율', data: ageSeries.value }])

const ageBarOptions = {
  chart: { type: 'bar', toolbar: { show: false } },
  colors: ageColors,

  plotOptions: {
    bar: {
      distributed: true,
      columnWidth: '60%',
      borderRadius: 6,
      dataLabels: { position: 'top' },
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val}%`,
    offsetY: -15,
    style: { fontSize: '12px', fontWeight: 'bold', colors: ['#000'] },
  },
  xaxis: {
    categories: ageLabels,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { fontSize: '12px', colors: '#000' } },
  },
  yaxis: {
    labels: { show: false },
  },
  grid: { show: false },
  tooltip: { y: { formatter: (val: number) => `${val}%` } },
  legend: { show: false },
}
</script>
