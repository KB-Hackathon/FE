<script setup lang="ts">
import { useLoadingStore } from '@/shared/stores/loading'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { TypographyP1 } from '../ui/typography'

const { isLoading, message } = storeToRefs(useLoadingStore())

const lines = computed(() =>
  message.value && message.value.length > 0 ? message.value : ['잠시만 기다려주세요...']
)
</script>

<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-[1px] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div class="flex flex-col items-center gap-3">
        <div
          class="h-10 w-10 animate-spin rounded-full border-4 border-ccmkt-main border-t-white"
        />
        <TypographyP1
          v-for="(m, index) in lines"
          :key="index"
          class="text-white text-center"
        >
          {{ m }}
        </TypographyP1>
      </div>
    </div>
  </transition>
</template>
