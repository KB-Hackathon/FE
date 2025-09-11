<template>
  <div class="flex justify-start items-center gap-3">
    <div class="bg-ccmkt-gray h-[50px] w-[50px] rounded-full" />
    <TypographyHead1 class="text-gray-600">
      {{ authStore.userInfo?.name }} 님
    </TypographyHead1>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/entities/user/user.store'
import { TypographyHead1 } from '@/shared/components/ui/typography'

const authStore = useAuthStore()
</script>
