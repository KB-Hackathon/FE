<template>
  <div
    class="flex gap-1"
    @click="() => router.push({ name: 'product', params: { productId: '1' } })"
  >
    <div class="min-w-[140px] h-[80px] mr-2 bg-slate-300 rounded-md" />
    <div class="py-2 w-full">
      <TypographySubTitle1 class="font-normal">
        꿀복숭아 공구 모집해용
      </TypographySubTitle1>
      <TypographyP2 class="text-gray-400">
        1135명 참여중
      </TypographyP2>
      <div class="flex justify-between w-full pr-3">
        <TypographyP1>35% 달성</TypographyP1>
        <TypographySubTitle1>배송 중</TypographySubTitle1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TypographyP1, TypographyP2, TypographySubTitle1 } from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
