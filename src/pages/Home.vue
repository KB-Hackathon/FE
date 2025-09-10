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
import type { GetProductListRequest, GetProductResponse } from '@/entities/product/product.api.type'
import { Category, categoryList } from '@/entities/product/product.entity'
import CategoryList from '@/features/product/filter/ui/CategoryList.vue'
import FilteringTab from '@/features/product/filter/ui/FilteringTab.vue'
import { getProductList } from '@/features/product/productList/services/productList.service'
import RecommendProduct from '@/features/product/productList/ui/RecommendProduct.vue'
import TrendProduct from '@/features/product/productList/ui/TrendProduct.vue'
import UserTab from '@/features/user/ui/UserTab.vue'
import LargeProductCard from '@/shared/components/molecules/LargeProductCard.vue'
import { SearchInput } from '@/shared/components/ui/input'
import { ref, watch } from 'vue'

// 고정 카테고리 목록
const categories = categoryList

// 상태들
const selected = ref<Category | undefined>(undefined)
const search = ref<string>('')
const filter1 = ref<string | undefined>(undefined)
const filter2 = ref<string | undefined>(undefined)

const productList = ref<GetProductResponse[]>([])

function toIsCoupon(v: string | undefined): boolean | undefined {
  if (v === 'coupon') return true
  if (v === 'delivery') return false
  return undefined
}

async function getProducts(): Promise<void> {
  const params: GetProductListRequest = {
    category: selected.value == undefined ? undefined : selected.value?.name,
    status: filter1.value === '--' ? undefined : filter1.value,
    isCoupon: toIsCoupon(filter2.value),
  }

  const res = await getProductList(params)
  const list = res.data ?? []
  productList.value = list
}

watch(
  [selected, filter1, filter2],
  () => {
    void getProducts()
  },
  { immediate: true }
)

let searchTimer: number | undefined
watch(search, (v) => {
  window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => {
    void getProducts()
  }, 300)
})
</script>
