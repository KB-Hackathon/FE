<template>
  <div class="flex overflow-scroll scrollbar-hide gap-3 mt-4">
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="flex flex-col justify-center items-center gap-2"
      @click="mSelected = category"
    >
      <div class="rounded-full overflow-hidden h-14 w-14 bg-slate-200">
        <img
          :src="category.image"
          :alt="category.name"
          class="w-full h-full object-cover rounded-full"
          loading="lazy"
          decoding="async"
        >
      </div>
      <TypographyP2 class="w-[70px] text-center text-gray-500 font-semibold">
        {{ category.name }}
      </TypographyP2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Category } from '@/entities/product/product.entity'
import { TypographyP2 } from '@/shared/components/ui/typography'
defineProps<{
  categories: Category[]
}>()

const mSelected = defineModel<Category | undefined>('selected')
</script>
