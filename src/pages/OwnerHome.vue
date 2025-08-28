<template>
  <div class="flex w-full flex-col gap-3">
    <UserTab />
    <TypographyHead3>인스타그램 정보</TypographyHead3>
    <Card>
      <CardContent class="pt-2">
        <TypographyHead1 class="mb-4">
          gxggrcji
        </TypographyHead1>
        <div class="flex w-full gap-4">
          <div class="min-w-[70px] h-[70px] bg-ccmkt-gray rounded-full m-auto" />

          <div class="flex flex-col w-full gap-2">
            <TypographySubTitle1>강민재</TypographySubTitle1>
            <div class="flex items-start w-full justify-between">
              <div class="flex flex-col justify-center gap-2 items-start">
                <TypographySubTitle1 class="text-[20px]">
                  15
                </TypographySubTitle1>
                <TypographyCaption class="text-[14px]">
                  착착마켓<br>게시글 수
                </TypographyCaption>
              </div>
              <div class="flex flex-col justify-center gap-2 items-start">
                <TypographySubTitle1 class="text-[20px]">
                  35
                </TypographySubTitle1>
                <TypographyCaption class="text-[14px]">
                  인스타그램<br>게시글 수
                </TypographyCaption>
              </div>
              <div class="flex flex-col justify-center gap-2 items-start">
                <TypographySubTitle1 class="text-[20px]">
                  253
                </TypographySubTitle1>
                <TypographyCaption class="text-[14px]">
                  팔로워
                </TypographyCaption>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <TypographyHead3>바로가기</TypographyHead3>
    <div class="flex flex-col gap-3">
      <div class="rounded-lg p-[15px] bg-gradient-to-r from-ccmkt-main/60 to-ccmkt-main/70">
        <TypographyHead2 class="text-[20px]">
          상품 올리기
        </TypographyHead2>
        <div class="flex w-full justify-between mt-1">
          <TypographyP1 class="text-gray-600 font-bold">
            새 상품을 등록해요
          </TypographyP1>

          <i class="bi bi-chevron-right text-xl" />
        </div>
      </div>
      <div class="rounded-lg p-[15px] bg-gradient-to-r from-ccmkt-main/70 to-ccmkt-main/90">
        <TypographyHead2 class="text-[20px]">
          내 홍보글 확인하기
        </TypographyHead2>
        <div class="flex w-full justify-between mt-1">
          <TypographyP1 class="text-gray-600 font-bold">
            올린 글을 한눈에 봐요
          </TypographyP1>
          <i class="bi bi-chevron-right text-xl" />
        </div>
      </div>

      <div class="rounded-lg p-[15px] bg-gradient-to-r from-ccmkt-main/40 to-ccmkt-main/50">
        <TypographyHead2 class="text-[20px]">
          마케팅 성과 분석하기
        </TypographyHead2>
        <div class="flex w-full justify-between mt-1">
          <TypographyP1 class="text-gray-600 font-bold">
            판매 성과를 확인해요
          </TypographyP1>
          <i class="bi bi-chevron-right text-xl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserTab from '@/features/user/ui/UserTab.vue'
import { Card, CardContent } from '@/shared/components/ui/card'

import {
  TypographyCaption,
  TypographyHead1,
  TypographyHead2,
  TypographyHead3,
  TypographyP1,
} from '@/shared/components/ui/typography'
import TypographySubTitle1 from '@/shared/components/ui/typography/TypographySubTitle1.vue'
</script>
