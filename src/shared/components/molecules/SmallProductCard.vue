<template>
  <div
    class="mb-1"
    @click="() => router.push({ name: 'product', params: { productId: '1' } })"
  >
    <div class="bg-ccmkt-gray w-full h-[90px] rounded-t-md" />

    <div class="pt-3 px-1">
      <TypographySubTitle1 class="text-ccmkt-main">
        35% 달성
      </TypographySubTitle1>
      <TypographyP1>맛있는 찰옥수수 냉동 ...</TypographyP1>
    </div>
    <div class="flex gap-2 mt-2 px-1">
      <Badge class="bg-red-100 text-red-600">
        마감임박
      </Badge>
      <Badge variant="secondary">
        배송
      </Badge>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Badge } from '@/shared/components/ui/badge'
import { TypographyP1, TypographySubTitle1 } from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
