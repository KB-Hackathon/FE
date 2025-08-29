<template>
  <div class="flex w-full flex-col">
    <UserTab />

    <SearchInput v-model="search" />
    <CategoryList
      v-model:selected="selected"
      :categories="categories"
    />

    <!-- <Separator class="my-4" /> -->
    <div class="flex gap-2 sticky top-0 py-3 bg-[#F9FAFB]">
      <FilteringTab
        v-model:filter1="filter1"
        v-model:filter2="filter2"
      />
    </div>
    <div class="flex flex-col gap-4 mt-3">
      <LargeProductCard />
      <LargeProductCard />
      <LargeProductCard />

      <TrendProduct />
    </div>
  </div>
</template>
<script setup lang="ts">
import CategoryList from '@/features/product/filter/ui/CategoryList.vue'
import FilteringTab from '@/features/product/filter/ui/FilteringTab.vue'
import TrendProduct from '@/features/product/productList/ui/TrendProduct.vue'
import UserTab from '@/features/user/ui/UserTab.vue'
import LargeProductCard from '@/shared/components/molecules/LargeProductCard.vue'

import { SearchInput } from '@/shared/components/ui/input'
import { ref } from 'vue'
const categories = [
  '패션',
  '뷰티 / 헬스',
  '디지털/가전',
  '생활 / 주방',
  '식품',
  '취미 / 문구',
  '스포츠',
  '유아',
]

const selected = ref<string>(categories[0])
const search = ref<string>('')
const filter1 = ref<string | undefined>(undefined) // 모집 상태
const filter2 = ref<string | undefined>(undefined) // 거래 방식
</script>
