<template>
  <div class="border border-gray-200 w-full rounded-md py-3 px-5 gap-4 my-5 flex justify-between">
    <div class="flex w-full justify-between">
      <TypographyP1 class="text-gray-500">
        나의 배송
      </TypographyP1>
      <TypographyP1> 2건 </TypographyP1>
    </div>
    <Separator orientation="vertical" />
    <div
      class="flex w-full justify-between"
      @click="router.push({ name: 'coupon' })"
    >
      <TypographyP1 class="text-gray-500">
        나의 쿠폰
      </TypographyP1>
      <TypographyP1> 5장 </TypographyP1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Separator } from '@/shared/components/ui/separator'
import { TypographyP1 } from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
