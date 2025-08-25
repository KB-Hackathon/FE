<template>
  <div>
    <!-- 헤더 -->
    <header />
    <!-- 메인 콘텐츠 -->
    <main
      ref="mainRef"
      :style="mainStyle"
    >
      <slot />
    </main>

    <!-- 푸터 -->
    <footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const mainStyle = computed(() => {
  return {
    height: '100dvh',
    overflow: 'auto',
  }
})
</script>
