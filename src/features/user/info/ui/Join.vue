<template>
  <TypographyHead3>참여중인 공동구매 현황</TypographyHead3>
  <div class="flex flex-col mt-3 gap-2">
    <MediumProductCard />
    <MediumProductCard />
  </div>
</template>
<script setup lang="ts">
import MediumProductCard from '@/shared/components/molecules/MediumProductCard.vue'
import { TypographyHead3 } from '@/shared/components/ui/typography'
</script>
