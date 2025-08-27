<template>
  <div class="flex w-full flex-col">
    <div class="h-[70px] rounded-md bg-slate-300 mb-5 flex justify-center items-center">
      캐로셀 광고같은거..
    </div>
    <WishProduct />
    <div class="h-[130px] rounded-md bg-slate-300 my-5 flex justify-center items-center">
      광고..
    </div>
    <RecentProduct />
  </div>
</template>
<script setup lang="ts">
import RecentProduct from '@/features/product/productList/ui/RecentProduct.vue'
import WishProduct from '@/features/product/productList/ui/WishProduct.vue'
</script>
