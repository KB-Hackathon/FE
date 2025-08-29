<template>
  <div class="flex overflow-scroll scrollbar-hide gap-3 mt-4">
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="flex flex-col justify-center items-center gap-2"
      @click="mSelected = category"
    >
      <div class="rounded-full h-14 w-14 bg-slate-200" />
      <TypographyP2 class="w-[70px] text-center text-gray-500 font-semibold">
        {{ category }}
      </TypographyP2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TypographyP2 } from '@/shared/components/ui/typography'
defineProps<{
  categories: string[]
}>()

const mSelected = defineModel<string | undefined>('selected')
</script>
