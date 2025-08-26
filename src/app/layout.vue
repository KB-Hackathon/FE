<template>
  <div class="relative w-full max-w-[390px] mx-auto bg-white">
    <!-- 헤더 -->
    <header class="fixed top-0 left-0 w-full z-50 flex justify-center">
      <Header />
    </header>
    <!-- 메인 콘텐츠 -->
    <main
      ref="mainRef"
      class="h-[100dvh] py-[70px] overflow-y-auto m-auto flex flex-col gap-3 justify-start items-center pb-[70px] px-5"
    >
      <slot />
    </main>

    <!-- 푸터 -->
    <footer class="fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <Navbar />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/shared/components/Header.vue'
import Navbar from '@/shared/components/Navbar.vue'
</script>
