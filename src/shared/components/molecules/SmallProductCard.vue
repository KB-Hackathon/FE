<template>
  <div
    class="mb-1"
    @click="() => router.push({ name: 'product', params: { productId: '1' } })"
  >
    <div class="bg-ccmkt-gray w-full h-[90px] rounded-t-md overflow-hidden">
      <img
        v-if="cover"
        :src="cover"
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      >
    </div>

    <div class="pt-3 px-1">
      <TypographySubTitle1 class="text-ccmkt-main">
        {{ progressText }}
      </TypographySubTitle1>
      <TypographyP1>
        {{ product.title.slice(0, 12) }} {{ product.title.length > 12 ? '...' : '' }}
      </TypographyP1>
    </div>
    <div class="flex gap-2 mt-2 px-1">
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { Product } from '@/entities/product/product.entity'
import { getCover, getDeadlineInfo, getProgressText } from '@/entities/product/product.util'
import { Badge } from '@/shared/components/ui/badge'
import { TypographyP1, TypographySubTitle1 } from '@/shared/components/ui/typography'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ product: Product }>()
const router = useRouter()

const cover = computed(() => getCover(props.product))
const progressText = computed(() => getProgressText(props.product))
const deadline = computed(() => getDeadlineInfo(props.product.groupBuying?.endAt))
</script>
