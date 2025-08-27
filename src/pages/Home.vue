<template>
  <div class="flex w-full flex-col">
    <Tabs default-value="buy">
      <TabsList>
        <TabsTrigger value="buy">
          구매하기
        </TabsTrigger>
        <TabsTrigger value="sell">
          판매하기
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="buy"
        class="w-full flex flex-col mt-3"
      >
        <SearchInput v-model="search" />
        <CategoryList
          v-model:selected="selected"
          :categories="categories"
        />

        <Separator class="my-4" />
        <div class="flex gap-2 sticky top-0 py-3 bg-white">
          <FilteringTab
            v-model:filter1="filter1"
            v-model:filter2="filter2"
          />
        </div>
        <div class="flex flex-col gap-4 mt-3">
          <LargeProductCard />
          <LargeProductCard />
          <LargeProductCard />

          <TypographyHead3>🔥 실시간 트렌드</TypographyHead3>
          <div class="w-full grid grid-cols-2 gap-2">
            <SmallProductCard />
            <SmallProductCard />
            <SmallProductCard />
            <SmallProductCard />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="sell">
        판매자 페이지 렌더링
      </TabsContent>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import CategoryList from '@/features/product/filter/ui/CategoryList.vue'
import FilteringTab from '@/features/product/filter/ui/FilteringTab.vue'
import LargeProductCard from '@/features/product/productCard/ui/LargeProductCard.vue'
import SmallProductCard from '@/features/product/productCard/ui/SmallProductCard.vue'
import { SearchInput } from '@/shared/components/ui/input'
import { Separator } from '@/shared/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { TypographyHead3 } from '@/shared/components/ui/typography'
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
