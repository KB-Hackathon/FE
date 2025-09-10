<script setup lang="ts">
import { MarketReport } from '@/entities/market/market.entity'
import { getMarketReport } from '@/features/market/services/market.service'
import AgeGraph from '@/features/market/ui/AgeGraph.vue'
import GenderGraph from '@/features/market/ui/GenderGraph.vue'
import SalesPerProduct from '@/features/market/ui/SalesPerProduct.vue'
import SummaryGraph from '@/features/market/ui/SummaryGraph.vue'
import TotalSales from '@/features/market/ui/TotalSales.vue'
import { TypographyP1 } from '@/shared/components/ui/typography'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sellerId = route.query.sellerId as string

const report = ref<MarketReport | null>(null)

async function getReportFunction() {
  const result = await getMarketReport(sellerId)
  report.value = result.data
}

onMounted(() => {
  getReportFunction()
})
</script>

<template>
  <div class="w-full max-w-[390px] flex flex-col gap-5">
    <TypographyP1>내 마케팅 성과 확인하기</TypographyP1>

    <TotalSales :report="report" />
    <SummaryGraph :report="report" />

    <div class="flex items-start justify-start">
      <GenderGraph :report="report" />
      <AgeGraph :report="report" />
    </div>
    <SalesPerProduct />
  </div>
</template>
