<template>
  <div class="border border-gray-200 w-full rounded-md py-3 px-5 gap-4 my-4 flex justify-between">
    <div class="flex w-full justify-between">
      <TypographyP1 class="text-gray-700">
        나의 배송
      </TypographyP1>
      <div class="flex gap-3">
        <TypographyP1> 2건 </TypographyP1>
        <i class="bi bi-chevron-right" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TypographyP1 } from '@/shared/components/ui/typography'
</script>
