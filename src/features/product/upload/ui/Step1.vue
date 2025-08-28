<template>
  <div class="animate-fadeUp">
    <TypographyHead1 class="text-center mb-8 mt-[150px] text-gray-700">
      안녕하세요 🙌 <br>
      지금부터 상품을 업로드해볼게요 <br>
      아래 버튼을 눌러 시작해 주세요
    </TypographyHead1>

    <TypographyHead3 class="text-center font-semibold text-gray-600 delay-300">
      작성한 내용은 자동으로 저장돼요
    </TypographyHead3>

    <button
      class="bg-ccmkt-main h-[60px] rounded-lg fixed w-[90vw] mt-[80px]"
      @click="$emit('next')"
    >
      <TypographyHead3 class="text-black">
        시작하기
      </TypographyHead3>
    </button>
  </div>
</template>
<script setup lang="ts">
import { TypographyHead1, TypographyHead3 } from '@/shared/components/ui/typography'

defineEmits<{ (e: 'next'): void }>()
</script>
<style>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeUp {
  animation: fadeUp 1.2s ease-out forwards;
}
.delay-300 {
  animation-delay: 0.3s;
}
</style>
