<template>
  <TypographyHead3>🔥 실시간 트렌드</TypographyHead3>
  <div class="w-full grid grid-cols-2 gap-2">
    <SmallProductCard
      v-for="(product, index) in productList.slice(0, 4)"
      :key="index"
      :product="product"
    />
  </div>
</template>
<script setup lang="ts">
import { Product } from '@/entities/product/product.entity'
import SmallProductCard from '@/shared/components/molecules/SmallProductCard.vue'
import { TypographyHead3 } from '@/shared/components/ui/typography'

defineProps<{
  productList: Product[]
}>()
</script>
