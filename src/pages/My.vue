<template>
  <div class="flex w-full flex-col">
    <Profile />
    <Join />
    <Review />
  </div>
</template>
<script setup lang="ts">
import Join from '@/features/user/ui/Join.vue'
import Profile from '@/features/user/ui/Profile.vue'
import Review from '@/features/user/ui/Review.vue'
</script>
