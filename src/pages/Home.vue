<template>
  <div class="flex w-full flex-col">
    <UserTab />

    <SearchInput v-model="search" />
    <CategoryList
      v-model:selected="selected"
      :categories="categories"
    />

    <!-- <Separator class="my-4" /> -->
    <div class="flex gap-2 sticky -top-1 py-3 bg-[#F9FAFB]">
      <FilteringTab
        v-model:filter1="filter1"
        v-model:filter2="filter2"
      />
    </div>
    <div class="flex flex-col gap-4 mt-3">
      <LargeProductCard
        v-for="(product, index) in productList"
        :key="index"
        :product="product"
      />

      <TrendProduct />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Category, categoryList } from '@/entities/product/product.entity'
import { productMocks } from '@/entities/product/product.mock'
import CategoryList from '@/features/product/filter/ui/CategoryList.vue'
import FilteringTab from '@/features/product/filter/ui/FilteringTab.vue'
import TrendProduct from '@/features/product/productList/ui/TrendProduct.vue'
import UserTab from '@/features/user/ui/UserTab.vue'
import LargeProductCard from '@/shared/components/molecules/LargeProductCard.vue'

import { SearchInput } from '@/shared/components/ui/input'
import { ref } from 'vue'
const categories = categoryList

const selected = ref<Category>(categories[0])
const search = ref<string>('')
const filter1 = ref<string | undefined>(undefined) // 모집 상태
const filter2 = ref<string | undefined>(undefined) // 거래 방식

const productList = productMocks
</script>
