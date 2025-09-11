<script setup lang="ts">
import GlobalLoader from '@/shared/components/molecules/GlobalLoader.vue'
import { Toaster } from '@/shared/components/ui/sonner'
import { RouterView } from 'vue-router'
import 'vue-sonner/style.css'
import Layout from './layout.vue'

// const showSplash = ref(true)
// const timerStarted = ref(false)
// const SPLASH_MIN_MS = 2000
// const SAFETY_START_MS = 1500 // 이미지 로드 이벤트가 안오면 이 시점에 강제 시작
// const HARD_TIMEOUT_MS = 6000 // 최악의 경우 이 시간 지나면 무조건 종료

// function startSplashCountdown() {
//   if (timerStarted.value) return
//   timerStarted.value = true
//   setTimeout(() => {
//     showSplash.value = false
//   }, SPLASH_MIN_MS)
// }

// onMounted(() => {
//   // 안전장치: 이미지 load가 너무 늦거나 안 오면 일정 시간 뒤 자동으로 카운트다운 시작
//   setTimeout(startSplashCountdown, SAFETY_START_MS)
//   // 더 큰 안전장치: 어떤 경우든 하드 타임아웃 후엔 스플래시 닫기
//   setTimeout(() => {
//     showSplash.value = false
//   }, HARD_TIMEOUT_MS)
// })
</script>

<template>
  <!-- 로고가 그려진 순간부터 2초 카운트 -->
  <!-- <Splash
    :visible="showSplash"
    @loaded="startSplashCountdown"
  /> -->

  <Layout>
    <Toaster />
    <RouterView />
    <GlobalLoader />
  </Layout>
</template>
