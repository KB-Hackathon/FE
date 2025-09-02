<template>
  <div class="w-full flex flex-col gap-5 mt-[100px]">
    <div class="flex flex-col items-center text-center gap-3">
      <div
        class="relative h-20 w-20"
        role="status"
        aria-live="polite"
        aria-label="AI가 자동 홍보글을 작성중이에요"
      >
        <span class="sr-only">로딩 중</span>
        <div class="h-20 w-20 rounded-full border-4 border-gray-200" />
        <div
          class="absolute inset-0 rounded-full border-4 border-ccmkt-main border-t-transparent animate-spin"
        />
      </div>

      <TypographyHead2 class="mt-9">
        AI가 자동 홍보글을 작성중이에요
      </TypographyHead2>
      <TypographyP1 class="text-gray-600">
        잠시만 기다려 주세요…
      </TypographyP1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TypographyHead2, TypographyP1 } from '@/shared/components/ui/typography'
</script>
