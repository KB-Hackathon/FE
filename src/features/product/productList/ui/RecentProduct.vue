<template>
  <div class="w-full flex justify-between items-center mb-3">
    <TypographyHead3>최근 본 상품 리스트</TypographyHead3>
    <TypographyP2 class="text-gray-500">
      더보기
    </TypographyP2>
  </div>
  <div class="w-full grid grid-cols-2 gap-2">
    <!-- <SmallProductCard />
    <SmallProductCard />
    <SmallProductCard />
    <SmallProductCard /> -->
  </div>
</template>
<script setup lang="ts">
import { TypographyHead3, TypographyP2 } from '@/shared/components/ui/typography'
</script>
