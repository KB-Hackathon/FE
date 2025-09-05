<template>
  <Card
    class="cursor-pointer overflow-hidden"
    @click="() => router.push({ name: 'product', params: { productId: product.id } })"
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
        {{ progressText }} <span v-if="progressText">중이에요</span>
      </TypographyHead3>

      <TypographySubTitle1 class="mt-1">
        {{ product.title }}
      </TypographySubTitle1>

      <TypographyP1 class="text-gray-400 mt-1">
        {{ product.seller.name }}
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
        {{ product.productType }}
      </Badge>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/product/product.entity'
import { Badge } from '@/shared/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'
import {
  TypographyHead3,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { getCover, getDeadlineInfo, getProgressText } from '@/entities/product/product.util'

const props = defineProps<{ product: Product }>()
const router = useRouter()

const cover = computed(() => getCover(props.product))
const progressText = computed(() => getProgressText(props.product))
const deadline = computed(() => getDeadlineInfo(props.product.groupBuying?.endAt))
</script>
