<template>
  <div
    v-if="product"
    class="flex w-full flex-col gap-4 pb-[70px]"
  >
    <div class="w-full h-[250px] bg-ccmkt-gray rounded-md" />
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
    <TypographyP2 class="text-gray-500">
      {{ product.product.description }}
    </TypographyP2>
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
          배달
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
        {{ product.product.recruitmentEndPeriod }} 마감
      </TypographyCaption>
    </div>
    <div class="flex items-center gap-1 -mt-4 text-ccmkt-main">
      <TypographyHead1>
        {{
          formatNumber(product.product.presentPersonCount * product.product.price)
        }}
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
        v-for="(tag, index) in product.product.tags"
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
import { Product } from '@/entities/product/product.entity'
import { getProduct } from '@/features/product/productList/services/productList.service'
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
import { formatNumber } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const productId = route.params.productId as string
const product = ref<Product>()

async function getProductFunction() {
  const result = await getProduct(productId)
  product.value = result.data
}

const deadline = computed(() => {
  const endAt = product.value?.product.recruitmentEndPeriod
  if (!endAt) return { text: '', urgent: false }

  const end = new Date(endAt).setHours(0, 0, 0, 0)
  const now = new Date().setHours(0, 0, 0, 0)
  const days = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)))

  return {
    text: days <= 3 ? '마감임박' : `${days}일 남음`,
    urgent: days <= 3,
  }
})

onMounted(() => {
  getProductFunction()
})
</script>
