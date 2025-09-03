<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-[1px] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div class="flex flex-col items-center gap-3">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-white/40 border-t-white" />
        <p class="text-white text-sm">
          로딩 중입니다…
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/shared/stores/loading'
import { storeToRefs } from 'pinia'

const { isLoading } = storeToRefs(useLoadingStore())
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
