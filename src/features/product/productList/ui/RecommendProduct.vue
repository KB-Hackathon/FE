<template>
  <TypographyHead3>이런 상품은 어떠세요?</TypographyHead3>
  <div class="w-full gap-2">
    <MediumProductCard2 />
    <MediumProductCard2 />
    <MediumProductCard2 />
  </div>
</template>
<script setup lang="ts">
import MediumProductCard2 from '@/shared/components/molecules/MediumProductCard2.vue'
import { TypographyHead3 } from '@/shared/components/ui/typography'
</script>
