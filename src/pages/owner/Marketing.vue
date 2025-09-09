<script setup lang="ts">
import { getMarketReport } from '@/features/market/services/market.service'
import {
  TypographyHead2,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { formatNumber } from '@/shared/utils/format'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sellerId = route.query.sellerId as string
async function getReportFunction() {
  const result = await getMarketReport(sellerId)
}

onMounted(() => {
  getReportFunction()
})
// --- 임의 데이터 ---
const successCount = 5
const failCount = 10
const total = successCount + failCount
const successRate = total ? Math.round((successCount / total) * 100) : 0
const salesPerProduct = [
  { name: '쫀득쿠키 30개입 쿠폰', sales: 400000 },
  { name: '쫀득쿠키 30개입 쿠폰', sales: 400000 },
]
// 브랜드 기반 베이스 컬러
const baseColors = ['#ffbb00', '#b3a99e', '#ffcc00', '#8c7b70', '#ffd966', '#60584c']
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// 동적 투명도(0.7~1.0)
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
const radialSeries = [successRate]

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
          formatter: () => `5건`,
        },
      },
    },
  },
  labels: ['성공'],
}
const radialSeries2 = [100]

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
          formatter: () => `10건`,
        },
      },
    },
  },
  labels: ['실패'],
}
const radialSeries3 = [100]

// =======================
// Pie 1: 성별
// =======================
const genderLabels = ['여성', '남성']
const genderSeries = [56, 44]
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
    formatter: (val: number) => {
      return val >= 10 ? `${val.toFixed(0)}%` : ''
    },
  },
}

// =======================
// Pie 2: 연령대
// =======================
const ageLabels = ['10대', '20대', '30대', '40대', '50대+']
const ageSeries = [5, 36, 30, 20, 10]
const ageColors = ageLabels.map((_, i) => toAlpha(baseColors[i % baseColors.length]))

const agePieOptions = {
  labels: ageLabels,
  colors: ageColors,
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
    formatter: (val: number) => {
      return val > 10 ? `${val.toFixed(0)}%` : ''
    },
  },
}
</script>

<template>
  <div class="w-full max-w-[390px] flex flex-col gap-5">
    <TypographyP1>내 마케팅 성과 확인하기</TypographyP1>

    <div class="flex justify-between">
      <TypographyHead2>총 수익금</TypographyHead2>
      <TypographySubTitle1>1,000,000,000 원</TypographySubTitle1>
    </div>

    <!-- 라디얼 3개 -->
    <TypographyP1 class="-mb-[20px]">
      공동구매 진행 결과
    </TypographyP1>
    <div class="flex w-full justify-around">
      <apexchart
        type="radialBar"
        height="100"
        width="100"
        :options="radialOptions2"
        :series="radialSeries2"
      />
      <apexchart
        type="radialBar"
        height="100"
        width="100"
        :options="radialOptions3"
        :series="radialSeries3"
      />
      <apexchart
        type="radialBar"
        height="100"
        width="100"
        :options="radialOptions"
        :series="radialSeries"
      />
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- 성별 -->
      <div>
        <TypographyP1>성별 분포</TypographyP1>
        <apexchart
          type="pie"
          height="140"
          :options="genderPieOptions"
          :series="genderSeries"
        />

        <!-- 범례 -->
        <div class="mt-2 grid grid-cols-2 gap-y-2 pl-[20px]">
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
        <TypographyP1>연령대 분포</TypographyP1>
        <apexchart
          type="pie"
          height="140"
          :options="agePieOptions"
          :series="ageSeries"
        />

        <!-- 범례 -->
        <div class="mt-2 grid grid-cols-2 gap-y-2 pl-[20px]">
          <div
            v-for="(label, i) in ageLabels"
            :key="label"
            class="flex items-center gap-2"
          >
            <span
              class="inline-block w-3 h-3 rounded-full"
              :style="{ background: ageColors[i] }"
            />
            <span class="text-sm text-black truncate">{{ label }}</span>
          </div>
        </div>
      </div>
    </div>
    <TypographyP1 class="-mb-[30px]">
      상품별 매출액
    </TypographyP1>
    <div class="mt-4 w-full max-w-[390px]">
      <div
        v-for="(item, index) in salesPerProduct"
        :key="index"
        class="flex w-full py-3 border-b-[1px]"
      >
        <TypographyP1 class="text-gray-700 flex-[2]">
          {{ item.name }}
        </TypographyP1>

        <TypographyP1 class="text-right flex-[1]">
          {{ formatNumber(item.sales) }}원
        </TypographyP1>
      </div>
    </div>
  </div>
</template>
