<script setup lang="ts">
import { MarketReport } from '@/entities/market/market.entity'
import { mockMarketReport } from '@/entities/user/user.mock'
import AgeGraph from '@/features/market/ui/AgeGraph.vue'
import GenderGraph from '@/features/market/ui/GenderGraph.vue'
import Review from '@/features/market/ui/Review.vue'
import ReviewDetail from '@/features/market/ui/ReviewDetail.vue'
import SalesPerProduct from '@/features/market/ui/SalesPerProduct.vue'
import SummaryGraph from '@/features/market/ui/SummaryGraph.vue'
import TotalSales from '@/features/market/ui/TotalSales.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { TypographyP1 } from '@/shared/components/ui/typography'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sellerId = route.query.sellerId as string

const report = ref<MarketReport | null>(mockMarketReport)

// async function getReportFunction() {
//   const result = await getMarketReport(sellerId)
//   report.value = result.data
// }

// onMounted(() => {
//   getReportFunction()
// })
</script>

<template>
  <div
    v-if="report"
    class="w-full max-w-[390px] flex flex-col gap-5"
  >
    <TypographyP1>내 마케팅 성과 확인하기</TypographyP1>

    <Tabs
      default-value="product"
      class="w-full"
    >
      <TabsList class="grid grid-cols-2 w-full">
        <TabsTrigger value="product">
          상품
        </TabsTrigger>
        <TabsTrigger value="review">
          리뷰
        </TabsTrigger>
      </TabsList>

      <!-- 상품 탭 -->
      <TabsContent
        value="product"
        class="flex flex-col mt-4 gap-5"
      >
        <TotalSales :report="report" />
        <SummaryGraph :report="report" />

        <div class="flex items-start justify-start gap-5">
          <GenderGraph :report="report" />
          <AgeGraph :report="report" />
        </div>

        <SalesPerProduct />
      </TabsContent>

      <!-- 리뷰 탭 -->
      <TabsContent
        value="review"
        class="mt-4"
      >
        <Review />
        <ReviewDetail />
      </TabsContent>
    </Tabs>
  </div>
</template>
