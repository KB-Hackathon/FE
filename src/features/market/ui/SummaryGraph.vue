<template>
  <!-- 라디얼 3개 (디자인 그대로) -->
  <TypographyP1 class="-mb-[20px]">
    공동구매 진행 결과
  </TypographyP1>
  <div class="flex w-full justify-around">
    <apexchart
      :key="`succ-${successCount}`"
      type="radialBar"
      height="100"
      width="100"
      :options="radialOptions2"
      :series="[100]"
    />

    <apexchart
      :key="`fail-${failCount}`"
      type="radialBar"
      height="100"
      width="100"
      :options="radialOptions3"
      :series="[100]"
    />
    <apexchart
      type="radialBar"
      height="100"
      width="100"
      :options="radialOptions"
      :series="[successRate]"
    />
  </div>
</template>
<script setup lang="ts">
import { MarketReport } from '@/entities/market/market.entity'
import { computed } from 'vue'

const props = defineProps<{
  report: MarketReport | null
}>()

const successCount = computed(() => props.report?.successCnt ?? 0)
const failCount = computed(() => props.report?.failedCnt ?? 0)
const successRate = computed(() => props.report?.successRate ?? 0)

// =======================
// Radial (좌:성공건수, 중:실패건수, 우:성공률)
// =======================
const radialOptions = {
  chart: { type: 'radialBar' },
  colors: ['#ffbb00'],
  plotOptions: {
    radialBar: {
      hollow: { size: '60%' },
      dataLabels: {
        name: { show: true, fontSize: '13px', fontWeight: 'bold', offsetY: -3 },
        value: {
          show: true,
          fontSize: '13px',
          fontWeight: 'bold',
          offsetY: -1,
          formatter: (val: number) => `${val}%`,
        },
      },
    },
  },
  labels: ['성공률'],
}

const radialOptions2 = {
  chart: { type: 'radialBar' },
  colors: ['#ffcc00'],
  plotOptions: {
    radialBar: {
      hollow: { size: '60%' },
      dataLabels: {
        name: { show: true, fontSize: '13px', fontWeight: 'bold', offsetY: -3 },
        value: {
          show: true,
          fontSize: '14px',
          fontWeight: 'bold',
          offsetY: -1,
          formatter: () => `${successCount.value}건`,
        },
      },
    },
  },
  labels: ['성공'],
}

const radialOptions3 = {
  chart: { type: 'radialBar' },
  colors: ['#60584c'],
  plotOptions: {
    radialBar: {
      hollow: { size: '60%' },
      dataLabels: {
        name: { show: true, fontSize: '13px', fontWeight: 'bold', offsetY: -3 },
        value: {
          show: true,
          fontSize: '14px',
          fontWeight: 'bold',
          offsetY: -1,
          formatter: () => `${failCount.value}건`,
        },
      },
    },
  },
  labels: ['실패'],
}
</script>
