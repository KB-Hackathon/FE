<template>
  <div class="flex justify-between">
    <TypographyHead2>총 수익금</TypographyHead2>
    <TypographySubTitle1>{{ formatNumber(totalSales) }} 원</TypographySubTitle1>
  </div>
</template>
<script setup lang="ts">
import { MarketReport } from '@/entities/market/market.entity'
import { TypographyHead2, TypographySubTitle1 } from '@/shared/components/ui/typography'
import { formatNumber } from '@/shared/utils/format'
import { computed } from 'vue'

const props = defineProps<{
  report: MarketReport | null
}>()

const totalSales = computed(() => props.report?.totalSales ?? 0)
</script>
