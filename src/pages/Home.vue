<template>
  <div class="flex w-full flex-col">
    <UserTab />

    <SearchInput v-model="search" />
    <CategoryList
      v-model:selected="selected"
      :categories="categories"
    />

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
      <TrendProduct :product-list="productList" />

      <RecommendProduct />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Category, categoryList, Product } from '@/entities/product/product.entity'
import { products } from '@/entities/product/product.mock'
import CategoryList from '@/features/product/filter/ui/CategoryList.vue'
import FilteringTab from '@/features/product/filter/ui/FilteringTab.vue'
import { getProductList } from '@/features/product/productList/services/productList.service'
import RecommendProduct from '@/features/product/productList/ui/RecommendProduct.vue'
import TrendProduct from '@/features/product/productList/ui/TrendProduct.vue'
import UserTab from '@/features/user/ui/UserTab.vue'
import LargeProductCard from '@/shared/components/molecules/LargeProductCard.vue'

import { SearchInput } from '@/shared/components/ui/input'
import { onMounted, ref } from 'vue'
const categories = categoryList

const selected = ref<Category>(categories[0])
const search = ref<string>('')
const filter1 = ref<string | undefined>(undefined) // 모집 상태
const filter2 = ref<string | undefined>(undefined) // 거래 방식

const productList = ref<Product[]>([])

async function getProducts() {
  const result = await getProductList({ category: '의류', status: 'SUCCESS', isCoupon: true })

  if (!result.data || result.data.length === 0) {
    productList.value = products
  } else {
    productList.value = result.data
  }
}

onMounted(() => {
  getProducts()
})
</script>
