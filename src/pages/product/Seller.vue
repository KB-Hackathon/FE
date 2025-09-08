<template>
  <div class="flex w-full flex-col">
    <div>
      <div class="mb-8 pb-2">
        <TypographyHead2>주식회사 복숭아마켓</TypographyHead2>
        <div class="flex gap-2 my-3">
          <Badge variant="secondary">
            식품
          </Badge>
          <Badge variant="secondary">
            과일
          </Badge>
          <Badge variant="secondary">
            치악산
          </Badge>
        </div>
        <TypographyP1><span class="text-ccmkt-main">★</span> 별점 4.5 (135명)</TypographyP1>
      </div>
      <div class="flex justify-between items-center mt-5 mb-2">
        <TypographySubTitle1 class="text-gray-700">
          현재 진행 중인 공동구매
        </TypographySubTitle1>
        <TypographyP2 class="text-gray-500">
          더보기
        </TypographyP2>
      </div>
      <MediumProductCard2 />
      <MediumProductCard2 />
      <div class="flex justify-between items-center mt-5 mb-2">
        <TypographySubTitle1 class="text-gray-700">
          종료된 공동구매
        </TypographySubTitle1>
        <TypographyP2 class="text-gray-500">
          더보기
        </TypographyP2>
      </div>
      <MediumProductCard3 />
      <MediumProductCard3 />
      <div class="flex justify-between items-center mt-5 mb-2">
        <TypographySubTitle1 class="text-gray-700">
          사용자 후기
        </TypographySubTitle1>
        <TypographyP2 class="text-gray-500">
          더보기
        </TypographyP2>
      </div>
      <ReviewCard />
      <ReviewCard />
    </div>
  </div>
</template>
<script setup lang="ts">
import MediumProductCard2 from '@/shared/components/molecules/MediumProductCard2.vue'
import MediumProductCard3 from '@/shared/components/molecules/MediumProductCard3.vue'
import ReviewCard from '@/shared/components/molecules/ReviewCard.vue'
import { Badge } from '@/shared/components/ui/badge'
import {
  TypographyHead2,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
</script>
