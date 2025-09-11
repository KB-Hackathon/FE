<template>
  <div class="flex justify-start items-center gap-3">
    <div class="bg-ccmkt-gray h-[50px] w-[50px] rounded-full overflow-hidden">
      <img
        :src="image"
        class="w-full h-full object-cover"
      >
    </div>
    <TypographyHead1 class="text-gray-600">
      {{ authStore.userInfo?.name }} 님
    </TypographyHead1>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/entities/user/user.store'
import { TypographyHead1 } from '@/shared/components/ui/typography'

const authStore = useAuthStore()
const image =
  'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDhfMTYw/MDAxNjE1MTg3MDkzNjk2.iIFjd26yUcvv3YvVbWuVFtG_isF5e0fiwNR96rjPk0cg.zCDWpUAwP-WvSxHYsjOhRZ9OCCZ457t858bAI4hbpBUg.JPEG.aksen244/6756faf2-74ac-4e89-a2da-292f15ec2aff.jpg?type=w800'
</script>
