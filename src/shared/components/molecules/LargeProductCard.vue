<template>
  <Card @click="() => router.push({ name: 'product', params: { productId: '1' } })">
    <div class="bg-slate-300 w-full h-[150px] rounded-t-md" />

    <CardContent class="pt-3">
      <TypographyHead3>35% 달성 중이에요</TypographyHead3>
      <TypographySubTitle1>맛있는 찰옥수수 냉동 옥수수 10개, 옥수수중</TypographySubTitle1>
      <TypographyP1 class="text-gray-400">
        주식회사 착착
      </TypographyP1>
    </CardContent>
    <CardFooter class="flex gap-2">
      <Badge variant="secondary">
        25일 남음
      </Badge>
      <Badge variant="secondary">
        쿠폰
      </Badge>
    </CardFooter>
  </Card>
</template>
<script setup lang="ts">
import { Badge } from '@/shared/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'
import {
  TypographyHead3,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
