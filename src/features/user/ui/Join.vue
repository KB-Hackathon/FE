<template>
  <TypographyHead3 class="mt-4">
    참여중인 공동구매 현황
  </TypographyHead3>
  <div class="flex flex-col mt-3 gap-2">
    <MediumProductCard />
    <MediumProductCard />
  </div>

  <TypographyHead3 class="mt-4">
    완료된 공동구매
  </TypographyHead3>
  <div class="flex flex-col mt-3 gap-2">
    <MediumProductCard3 />
    <MediumProductCard3 />
  </div>
</template>
<script setup lang="ts">
import MediumProductCard from '@/shared/components/molecules/MediumProductCard.vue'
import MediumProductCard3 from '@/shared/components/molecules/MediumProductCard3.vue'
import { TypographyHead3 } from '@/shared/components/ui/typography'
</script>
