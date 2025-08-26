<template>
  <div class="flex w-full flex-col">
    <div class="flex justify-start items-center gap-3">
      <div class="bg-slate-300 h-[50px] w-[50px] rounded-full" />
      <TypographyHead1 class="text-gray-600">
        강민재 님
      </TypographyHead1>
    </div>

    <div class="border border-gray-200 w-full rounded-md py-3 px-5 gap-4 my-4 flex justify-between">
      <div class="flex w-full justify-between">
        <TypographyP1 class="text-gray-500">
          나의 배송
        </TypographyP1>
        <TypographyP1> 2건 </TypographyP1>
      </div>
      <Separator orientation="vertical" />
      <div class="flex w-full justify-between">
        <TypographyP1 class="text-gray-500">
          나의 쿠폰
        </TypographyP1>
        <TypographyP1> 5장 </TypographyP1>
      </div>
    </div>
    <TypographyHead3>참여중인 공동구매 현황</TypographyHead3>
    <div class="flex flex-col mt-3 gap-2">
      <div class="flex gap-1">
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
      <div class="flex gap-1">
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
    </div>
    <TypographyHead3 class="mt-3">
      내 리뷰
    </TypographyHead3>
    <div class="flex flex-col gap-1">
      <div class="py-2 w-full">
        <TypographySubTitle1 class="font-normal">
          꿀복숭아 공구 모집해용
        </TypographySubTitle1>
        <TypographyP2 class="text-yellow-400">
          ★★★★☆
        </TypographyP2>

        <TypographyP1>
          상대적으로 무른 복숭아가 많아서 실망이었습니다. 이거를 3000원이나 주고 사먹었다니
          대가리를 빡빡 ...
        </TypographyP1>
        <TypographyP2 class="text-gray-500">
          2025년 3월 24일
        </TypographyP2>
      </div>
      <div class="py-2 w-full">
        <TypographySubTitle1 class="font-normal">
          꿀복숭아 공구 모집해용
        </TypographySubTitle1>
        <TypographyP2 class="text-yellow-400">
          ★★★★☆
        </TypographyP2>

        <TypographyP1>
          상대적으로 무른 복숭아가 많아서 실망이었습니다. 이거를 3000원이나 주고 사먹었다니
          대가리를 빡빡 ...
        </TypographyP1>
        <TypographyP2 class="text-gray-500">
          2025년 3월 24일
        </TypographyP2>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Separator } from '@/shared/components/ui/separator'
import {
  TypographyHead1,
  TypographyHead3,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
</script>
