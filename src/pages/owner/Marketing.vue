<script setup lang="ts">
import { getMarketReport } from '@/features/market/services/market.service'
import {
  TypographyHead2,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { formatNumber } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sellerId = route.query.sellerId as string

type MarketReport = {
  totalSales: number
  successCnt: number
  failedCnt: number
  successRate: number
  ageDistribution: {
    over10: number
    over20: number
    over30: number
    over40: number
    over50: number
    over60: number
  }
  genderDistribution: { maleCnt: number; femaleCnt: number }
}

const report = ref<MarketReport | null>(null)

async function getReportFunction() {
  const result = await getMarketReport(sellerId)
  report.value = result.data
}

const totalSales = computed(() => report.value?.totalSales ?? 0)
const successCount = computed(() => report.value?.successCnt ?? 0)
const failCount = computed(() => report.value?.failedCnt ?? 0)
const successRate = computed(() => report.value?.successRate ?? 0)

onMounted(() => {
  getReportFunction()
})

// ---- 색상 유틸 (그대로) ----
const baseColors = ['#ffbb00', '#b3a99e', '#ffcc00', '#8c7b70', '#ffd966', '#60584c']
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
const toAlpha = (hex: string) => {
  const alpha = 0.7 + Math.random() * 0.3
  return hexToRgba(hex, parseFloat(alpha.toFixed(2)))
}

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
const radialSeries3 = [100]

// =======================
// Pie 1: 성별 (서버 건수 그대로)
// =======================
const genderLabels = ['여성', '남성']
const genderSeries = computed(() => {
  const female = report.value?.genderDistribution.femaleCnt ?? 0
  const male = report.value?.genderDistribution.maleCnt ?? 0
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

// =======================
// Bar: 연령대 (건수 → % 변환만)
// =======================
const ageLabels = ['10대', '20대', '30대', '40대', '50+']
const ageColors = ageLabels.map((_, i) => toAlpha(baseColors[i % baseColors.length]))

const ageSeries = computed(() => {
  const a = report.value?.ageDistribution
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

<template>
  <div class="w-full max-w-[390px] flex flex-col gap-5">
    <TypographyP1>내 마케팅 성과 확인하기</TypographyP1>

    <div class="flex justify-between">
      <TypographyHead2>총 수익금</TypographyHead2>
      <TypographySubTitle1>{{ formatNumber(totalSales) }} 원</TypographySubTitle1>
    </div>

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

    <div class="flex items-start justify-start">
      <!-- 성별 -->
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

      <!-- 연령대 -->
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
    </div>
  </div>
</template>
