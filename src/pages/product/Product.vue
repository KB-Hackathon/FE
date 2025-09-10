<template>
  <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
  <div
    v-if="product"
    class="flex w-full flex-col gap-4 pb-[70px]"
  >
    <div class="w-full h-[250px] bg-ccmkt-gray rounded-md overflow-hidden">
      <!-- <img :src="product.product.images[1].url" /> -->
    </div>
    <div
      class="flex w-full justify-between text-gray-600 items-center"
      @click="() => router.push({ name: 'seller', params: { sellerId: product?.seller.memberId } })"
    >
      <div class="flex gap-3">
        <TypographySubTitle1>{{ product.seller.companyName }}</TypographySubTitle1>
        <i class="bi bi-chevron-right" />
      </div>
      <TypographyP2><span class="text-ccmkt-main">★</span> 4.5 (135명)</TypographyP2>
    </div>
    <Separator />
    <TypographyHead3>
      {{ product.product.title }}
    </TypographyHead3>
    <TypographyP2 v-html="product.product.description.replace(/\n/g, '<br/>')" />
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <Badge
          v-if="deadline.text"
          :class="deadline.urgent ? 'bg-red-100 text-red-600' : ''"
          :variant="deadline.urgent ? undefined : 'secondary'"
        >
          {{ deadline.text }}
        </Badge>
        <Badge variant="secondary">
          {{ product.product.isCoupon ? '쿠폰' : '배송' }}
        </Badge>
      </div>
      <TypographyHead1 class="text-right">
        {{ formatNumber(product.product.price) }}원
      </TypographyHead1>
    </div>
    <Separator />
    <TypographySubTitle1 class="text-gray-600">
      공동구매 현황
    </TypographySubTitle1>
    <div class="flex gap-1 items-center -mt-3">
      <TypographyHead2>{{ product.product.presentPersonCount }}</TypographyHead2>
      <TypographyP1> 명 참여중 </TypographyP1>
      <TypographyCaption class="text-gray-600 ml-1">
        {{ formatDateTime(product.product.recruitmentEndPeriod) }} 마감
      </TypographyCaption>
    </div>
    <div class="flex items-center gap-1 -mt-4 text-ccmkt-main">
      <TypographyHead1>
        {{ formatNumber(product.product.presentPersonCount * product.product.price) }}
      </TypographyHead1>
      <TypographyP1>원 달성</TypographyP1>
      <Badge
        variant="secondary"
        class="ml-2"
      >
        {{ Math.floor((product.product.presentPersonCount / product.product.targetAmount) * 100) }}%
        달성
      </Badge>
    </div>
    <Separator />
    <div class="flex flex-wrap gap-1">
      <Badge
        v-for="(tag, index) in productTags"
        :key="index"
        variant="outline"
      >
        {{ tag }}
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
        class="w-[150px] h-[45px] hover:bg-ccmkt-main"
        :disabled="isParticipated"
        :class="isParticipated ? 'bg-ccmkt-gray' : 'bg-ccmkt-main'"
        @click="() => (requestDialogOpen = true)"
      >
        <TypographySubTitle1 class="text-black font-bold">
          {{ isParticipated ? '참여중' : '참여하기' }}
        </TypographySubTitle1>
      </Button>
    </div>
  </div>
  <AlertDialog v-model:open="requestDialogOpen">
    <AlertDialogContent class="rounded-lg w-[95%]">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-[24px]">
          공동구매 참여하기
        </AlertDialogTitle>

        <AlertDialogDescription class="text-[16px]">
          공동구매에 참여하시겠어요? <br>목표 달성 전까지는 언제든 취소할 수 있습니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="h-[50px] bg-gray-200">
          <TypographyP1>취소</TypographyP1>
        </AlertDialogCancel>

        <AlertDialogAction
          class="bg-ccmkt-main text-black h-[50px] hover:bg-ccmkt-main"
          @click="handleClickParticipateButton"
        >
          <TypographyP1>참여하기</TypographyP1>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <AlertDialog v-model:open="responseDialogOpen">
    <AlertDialogContent class="rounded-lg w-[95%]">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-[24px]">
          공동구매 참여 완료
        </AlertDialogTitle>

        <AlertDialogDescription class="text-[16px]">
          공동구매에 참여가 완료되었습니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          class="bg-ccmkt-main text-black h-[50px] hover:bg-ccmkt-main"
          @click="() => (responseDialogOpen = false)"
        >
          <TypographyP1>확인</TypographyP1>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<script setup lang="ts">
import { Product } from '@/entities/product/product.entity'
import { getDeadlineInfo } from '@/entities/product/product.util'
import { getProduct } from '@/features/product/productList/services/productList.service'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
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
import { api } from '@/shared/plugin/axios'
import { formatDateTime, formatNumber } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const productId = route.params.productId as string
const product = ref<Product>()

const isParticipated = ref<boolean>(false) // 현재 공동구매 참여 여부

const requestDialogOpen = ref<boolean>(false) // 진행 확인 다이어로그
const responseDialogOpen = ref<boolean>(false) // 진행 확정 다이어로그

async function getProductFunction() {
  const result = await getProduct(productId)
  product.value = result.data
}

const deadline = computed(() => getDeadlineInfo(product.value?.product.recruitmentEndPeriod))

async function handleClickParticipateButton() {
  requestDialogOpen.value = false
  const res = await api.get<{ url: string }>(`https://httpbin.org/delay/1`, {
    showGlobalLoader: true,
    loaderMessage: ['공동 구매 참여중이에요', '잠시만 기다려주세요'],
  })
  if (res) {
    responseDialogOpen.value = true
    isParticipated.value = true
  }
}

const productTags = computed(() =>
  (product.value?.product.tags ?? []).map((t: string | { tagId: number; name: string }) =>
    typeof t === 'string' ? t : t.name
  )
)

onMounted(() => {
  getProductFunction()
})
</script>
