<template>
  <div class="flex w-full flex-col gap-4 pb-[70px]">
    <div class="w-full h-[250px] bg-ccmkt-gray rounded-md" />
    <div
      class="flex w-full justify-between text-gray-600 items-center"
      @click="() => router.push({ name: 'seller', params: { sellerId: '1' } })"
    >
      <div class="flex gap-3">
        <TypographySubTitle1>주식회사 복숭아마켓</TypographySubTitle1>
        <i class="bi bi-chevron-right" />
      </div>
      <TypographyP2><span class="text-ccmkt-main">★</span> 4.5 (135명)</TypographyP2>
    </div>
    <Separator />
    <TypographyHead3>
      꿀맛 당도 보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입
    </TypographyHead3>
    <TypographyP2 class="text-gray-500">
      꿀맛 당도 보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입 꿀맛
      당도 보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입 꿀맛 당도
      보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입 꿀맛 당도 보장 복숭아 10개입
    </TypographyP2>
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <Badge class="bg-red-100 text-red-600">
          마감 임박
        </Badge>
        <Badge variant="secondary">
          배달
        </Badge>
      </div>
      <TypographyHead1 class="text-right">
        34,200원
      </TypographyHead1>
    </div>
    <Separator />
    <TypographySubTitle1 class="text-gray-600">
      공동구매 현황
    </TypographySubTitle1>
    <div class="flex gap-1 items-center -mt-3">
      <TypographyHead2>138</TypographyHead2>
      <TypographyP1> 명 참여중 </TypographyP1>
      <TypographyCaption class="text-gray-600 ml-1">
        2025년 3월 24일 마감
      </TypographyCaption>
    </div>
    <div class="flex items-center gap-1 -mt-4 text-ccmkt-main">
      <TypographyHead1>34,200,000</TypographyHead1>
      <TypographyP1>원 달성</TypographyP1>
      <Badge
        variant="secondary"
        class="ml-2"
      >
        138% 달성
      </Badge>
    </div>
    <Separator />
    <div class="flex flex-wrap gap-1">
      <Badge variant="outline">
        치악산
      </Badge>
      <Badge variant="outline">
        복숭아
      </Badge>
      <Badge variant="outline">
        당도 최고
      </Badge>
    </div>
  </div>
  <div class="w-full fixed bottom-0 left-0">
    <div
      class="m-auto max-w-[390px] h-[74px] bg-white w-full flex items-center justify-between px-5 py-3 shadow-top"
    >
      <i class="bi bi-heart-fill text-2xl text-red-600" />
      <Button
        variant="default"
        class="w-[150px] h-[45px] bg-ccmkt-main"
      >
        <TypographySubTitle1 class="text-black font-bold">
          참여하기
        </TypographySubTitle1>
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import {
  TypographyCaption,
  TypographyHead1,
  TypographyHead2,
  TypographyHead3,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
