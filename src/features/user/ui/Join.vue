<template>
  <TypographyHead3 class="mt-4">
    참여중인 공동구매 현황
  </TypographyHead3>
  <div class="flex flex-col mt-3 gap-2">
    <div
      v-for="item in ongoingProducts"
      :key="item.id"
      class="flex gap-1 cursor-pointer"
      @click="() => router.push({ name: 'product', params: { productId: item.id } })"
    >
      <!-- 썸네일 -->
      <div class="w-[140px] h-[80px] overflow-hidden mr-2 bg-ccmkt-gray rounded-md">
        <img
          v-if="item.image"
          :src="item.image"
          alt="thumbnail"
          class="w-full h-full object-cover"
        >
      </div>

      <!-- 텍스트 -->
      <div class="py-2 w-full">
        <TypographySubTitle1 class="font-normal">
          {{ item.title }}
        </TypographySubTitle1>
        <TypographyP2 class="text-gray-400">
          {{ item.participants }}명 참여중
        </TypographyP2>

        <div class="flex justify-between w-full pr-3">
          <TypographyP1 class="text-ccmkt-main">
            {{ item.progress }}% 달성
          </TypographyP1>
          <TypographySubTitle1>{{ item.status }}</TypographySubTitle1>
        </div>
      </div>
    </div>
  </div>

  <TypographyHead3 class="mt-4">
    완료된 공동구매
  </TypographyHead3>
  <div class="flex flex-col mt-3 gap-2">
    <div
      v-for="item in completedProducts"
      :key="item.id"
      class="flex gap-1 cursor-pointer"
      @click="() => router.push({ name: 'product', params: { productId: item.id } })"
    >
      <!-- 썸네일 -->
      <div class="min-w-[140px] h-[80px] mr-2 bg-ccmkt-gray rounded-md">
        <img
          v-if="item.image"
          :src="item.image"
          alt="thumbnail"
          class="w-full h-full object-cover rounded-md"
        >
      </div>

      <!-- 텍스트 -->
      <div class="py-2 w-full">
        <TypographySubTitle1 class="font-normal">
          {{ item.title }}
        </TypographySubTitle1>
        <TypographyP2 class="text-gray-400">
          {{ item.participants }}명 참여
        </TypographyP2>

        <div class="flex justify-between w-full pr-3">
          <TypographyP1 class="text-ccmkt-main">
            {{ item.progress }}% 달성
          </TypographyP1>
          <TypographySubTitle1>{{ item.status }}</TypographySubTitle1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TypographyHead3,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()

// 진행 중인 공구 (목데이터)
const ongoingProducts = [
  {
    id: '1',
    title: '꿀복숭아 공구 모집해용',
    participants: 1135,
    progress: 35,
    status: '배송 중',
    image: 'https://vrthumb.imagetoday.co.kr/2016/11/28/tip250t001819.jpg',
  },
  {
    id: '2',
    title: '샤인머스켓 할인 공구',
    participants: 542,
    progress: 70,
    status: '모집 중',
    image: 'https://image.edaily.co.kr/images/Photo/files/NP/S/2024/08/PS24083000943.jpg',
  },
]

// 완료된 공구 (목데이터)
const completedProducts = [
  {
    id: '3',
    title: '한우 선물세트 공구',
    participants: 200,
    progress: 100,
    status: '완료됨',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCVepXiFi2RCGBkR9fB7kpGFgKTU7BLi2mA&s',
  },
  {
    id: '4',
    title: '수제 쿠키 세트 공구',
    participants: 85,
    progress: 100,
    status: '완료됨',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrSDgWUU79WpGxEhBlSLNnPtxtVBpn9JSTw&s',
  },
]
</script>
