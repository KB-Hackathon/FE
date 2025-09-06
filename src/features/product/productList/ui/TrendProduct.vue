<template>
  <TypographyHead3>🔥 실시간 트렌드</TypographyHead3>
  <div class="w-full grid grid-cols-2 gap-2">
    <SmallProductCard />
  </div>
</template>
<script setup lang="ts">
// import { trendMocks } from '@/entities/product/product.mock'
import SmallProductCard from '@/shared/components/molecules/SmallProductCard.vue'
import { TypographyHead3 } from '@/shared/components/ui/typography'

// const productList = trendMocks
</script>
