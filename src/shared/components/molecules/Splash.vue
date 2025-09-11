<template>
  <Transition name="fade-scale">
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      role="status"
      aria-live="polite"
    >
      <div
        class="overflow-hidden h-[170px] w-[148px]"
        :class="{ 'animate-bounce-in': isLoaded }"
      >
        <img
          :src="logo"
          class="w-full h-full object-cover object-bottom"
          decoding="async"
          @load="onImgReady"
          @error="onImgReady"
        >
      </div>

      <TypographyHead1 class="mt-4">
        착착마켓
      </TypographyHead1>
      <p class="text-gray-500 text-sm">
        AI로 누구나 쉽게, 함께 성장하는 공동구매 플랫폼
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import logo from '@/assets/images/chakchak_logo.png'
import { ref } from 'vue'
import { TypographyHead1 } from '../ui/typography'

defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'loaded'): void }>()

const isLoaded = ref(false)
let fired = false

function onImgReady() {
  if (fired) return
  fired = true
  isLoaded.value = true
  emit('loaded')
}
</script>

<style scoped>
/* 전체 fade in/out */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
.animate-bounce-in {
  animation: bounce-in 1s ease;
}

.animate-fade-up {
  animation: fade-up 0.8s ease forwards;
}
.delay-200 {
  animation-delay: 0.4s;
}
</style>
