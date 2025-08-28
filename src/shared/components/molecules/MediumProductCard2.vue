<template>
  <div
    class="flex gap-1"
    @click="() => router.push({ name: 'product', params: { productId: '1' } })"
  >
    <div class="min-w-[140px] h-[80px] mr-2 bg-ccmkt-gray rounded-md" />
    <div class="py-2 w-full">
      <TypographySubTitle1 class="font-normal">
        꿀복숭아 공구 모집해용
      </TypographySubTitle1>
      <TypographyP2 class="text-gray-400">
        1135명 참여중
      </TypographyP2>
      <TypographyP1 class="text-ccmkt-main">
        35% 달성
      </TypographyP1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TypographyP1, TypographyP2, TypographySubTitle1 } from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
