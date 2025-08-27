<template>
  <TypographyHead3 class="mt-3">
    내 리뷰
  </TypographyHead3>
  <div class="flex flex-col gap-1">
    <ReviewCard />
    <ReviewCard />
  </div>
</template>
<script setup lang="ts">
import ReviewCard from '@/shared/components/molecules/ReviewCard.vue'
import { TypographyHead3 } from '@/shared/components/ui/typography'
</script>
