<template>
  <div class="w-full flex flex-col">
    <TypographyHead1 class="text-center mt-[120px]">
      착착마켓
    </TypographyHead1>
    <TypographyP1 class="text-center">
      AI로 누구나 쉽게, 함께 성장하는 공동구매 플랫폼
    </TypographyP1>
    <Separator class="my-11" />
    <TypographyP1 class="text-center text-gray-600">
      공동구매 참여 방식을 선택하세요
    </TypographyP1>
    <TypographyCaption class="text-center mb-7 text-gray-400">
      메인 화면에서도 언제든 구매/판매를 변경할 수 있어요
    </TypographyCaption>
    <div class="flex flex-col gap-3">
      <Button
        class="w-full h-[50px] bg-ccmkt-gray shadow-none hover:bg-ccmkt-gray"
        @click="router.replace({ name: 'additional_info' })"
      >
        <TypographyHead2 class="text-black">
          사고싶어요
        </TypographyHead2>
      </Button>
      <Button
        class="w-full h-[50px] bg-ccmkt-main shadow-none hover:bg-ccmkt-main"
        @click="router.replace({ name: 'additional_info' })"
      >
        <TypographyHead2 class="text-black">
          팔고싶어요
        </TypographyHead2>
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import {
  TypographyCaption,
  TypographyHead1,
  TypographyHead2,
  TypographyP1,
} from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
