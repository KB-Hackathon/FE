<template>
  <div class="w-full max-w-[390px] bg-white px-4 py-3 justify-center shadow-bottom">
    <div @click="router.push({ name: 'home' })">
      <TypographyHead2 class="font-semibold">
        착착마켓
      </TypographyHead2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TypographyHead2 } from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
