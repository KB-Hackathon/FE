<template>
  <TypographyP1 class="-mb-[20px]">
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
</template>
<script setup lang="ts">
import { TypographyP1 } from '@/shared/components/ui/typography'
import { formatNumber } from '@/shared/utils/format'

const salesPerProduct = [
  { name: '쫀득쿠키 30개입 쿠폰', sales: 400000 },
  { name: '아메리카노 50개 40,000원 쿠폰', sales: 504000 },
  { name: 'ABC 주스 10% 할인 쿠폰 10개', sales: 235000 },
]
</script>
