<template>
  <div class="relative w-full max-w-[390px] mx-auto bg-white">
    <!-- 헤더 -->
    <header class="fixed top-0 left-0 w-full z-50 flex justify-center">
      <Header />
    </header>
    <!-- 메인 콘텐츠 -->
    <main
      ref="mainRef"
      :class="
        cn(
          isShowFooter ? 'pb-[100px]' : 'pb-[30px]',
          'h-[100dvh] pt-[55px] overflow-y-auto m-auto flex flex-col gap-3 justify-start items-center px-5'
        )
      "
    >
      <slot />
    </main>

    <!-- 푸터 -->
    <footer
      v-if="isShowFooter"
      class="fixed bottom-0 left-0 w-full z-50 flex justify-center"
    >
      <Navbar />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import Header from '@/shared/components/organisms/Header.vue'
import Navbar from '@/shared/components/organisms/Navbar.vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const isShowFooter = computed(() => route.meta.footer === true)

const router = useRouter()
const mainRef = ref<HTMLElement | null>(null)

onMounted(() => {
  router.afterEach(async () => {
    await nextTick()
    mainRef.value?.scrollTo({ top: 0, behavior: 'auto' })
  })
})
</script>
