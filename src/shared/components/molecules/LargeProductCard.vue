<!-- ProductCard.vue -->
<template>
  <Card
    class="cursor-pointer overflow-hidden"
    @click="() => router.push({ name: 'product', params: { productId: info.productId } })"
  >
    <!-- 커버 이미지 -->
    <div class="w-full h-[150px] bg-ccmkt-gray">
      <img
        v-if="cover"
        :src="cover"
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      >
    </div>

    <CardContent class="pt-3">
      <TypographyHead3
        v-if="progressText"
        class="text-ccmkt-main"
      >
        {{ progressText }} <span>중이에요</span>
      </TypographyHead3>

      <TypographySubTitle1 class="mt-1">
        {{ info.title }}
      </TypographySubTitle1>

      <TypographyP1 class="text-gray-400 mt-1">
        {{ seller.companyName }}
      </TypographyP1>
    </CardContent>

    <CardFooter class="flex gap-2">
      <Badge
        v-if="deadline.text"
        :class="deadline.urgent ? 'bg-red-100 text-red-600' : ''"
        :variant="deadline.urgent ? undefined : 'secondary'"
      >
        {{ deadline.text }}
      </Badge>
      <Badge variant="secondary">
        {{ info.isCoupon ? '쿠폰' : '배송' }}
      </Badge>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/product/product.entity'
import { getDeadlineInfo } from '@/entities/product/product.util'
import { Badge } from '@/shared/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'
import {
  TypographyHead3,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ product: Product }>()
const router = useRouter()

const info = computed(() => props.product.product)
const seller = computed(() => props.product.seller)

const cover = computed(() => info.value.images?.[0]?.url ?? '')

// 진행률: totalPrice / targetAmount * 100 (0~100로 보정)
const progressPct = computed(() => {
  const target = info.value.targetAmount
  const count = info.value.presentPersonCount
  if (!target) return undefined
  return Math.max(0, Math.min(100, Math.round((count / target) * 100)))
})
const progressText = computed(() =>
  typeof progressPct.value === 'number' ? `${progressPct.value}% 달성` : ''
)

const deadline = computed(() => getDeadlineInfo(props.product.product.recruitmentEndPeriod))
</script>
