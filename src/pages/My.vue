<template>
  <div class="flex w-full flex-col">
    <Profile />
    <Summary />
    <Join />
    <Review />
  </div>
</template>
<script setup lang="ts">
import Join from '@/features/user/info/ui/Join.vue'
import Profile from '@/features/user/info/ui/Profile.vue'
import Review from '@/features/user/info/ui/Review.vue'
import Summary from '@/features/user/info/ui/Summary.vue'
</script>
