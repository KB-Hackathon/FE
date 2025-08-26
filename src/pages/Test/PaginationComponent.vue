<template>
  <Pagination
    v-model:page="page"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="siblingCount"
    show-edges
    class="w-full"
  >
    <PaginationContent class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrevious />

      <PaginationItem :value="1">
        1
      </PaginationItem>

      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </Pagination>
</template>
<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ref } from 'vue'

const page = ref(2)

const total = 123
const itemsPerPage = 10

const siblingCount = 1
</script>
