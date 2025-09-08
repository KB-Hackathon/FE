<template>
  <div
    class="mb-1"
    @click="() => router.push({ name: 'product', params: { productId: '1' } })"
  >
    <div class="bg-ccmkt-gray w-full h-[90px] rounded-t-md overflow-hidden">
      <!-- <img
  
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      /> -->
    </div>

    <div class="pt-3 px-1">
      <TypographySubTitle2 class="">
        {{ product.product.title.slice(0, 12) }}
        {{ product.product.title.length > 12 ? '...' : '' }}
      </TypographySubTitle2>
    </div>
    <div class="flex gap-2 mt-2 px-1">
      <Badge
        :class="deadline.urgent ? 'bg-red-100 text-red-600' : ''"
        :variant="deadline.urgent ? undefined : 'secondary'"
      >
        {{ deadline.text }}
      </Badge>
      <Badge variant="secondary">
        {{ product.product.isCoupon ? '쿠폰' : '배송' }}
      </Badge>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Product } from '@/entities/product/product.entity'
import { Badge } from '@/shared/components/ui/badge'
import { TypographySubTitle2 } from '@/shared/components/ui/typography'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ product: Product }>()
const router = useRouter()

const deadline = computed(() => {
  const endAt = props.product.product.recruitmentEndPeriod
  if (!endAt) return { text: '', urgent: false }

  const end = new Date(endAt).setHours(0, 0, 0, 0)
  const now = new Date().setHours(0, 0, 0, 0)
  const days = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)))

  return {
    text: days <= 3 ? '마감임박' : `${days}일 남음`,
    urgent: days <= 3,
  }
})
</script>
