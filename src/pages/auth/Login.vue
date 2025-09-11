<template>
  <div class="w-full flex flex-col">
    <button
      class="text-right pr-[10px] -mt-[40px]"
      @click="router.go(-1)"
    >
      <i class="bi bi-x text-3xl" />
    </button>
    <TypographyHead1 class="text-center mt-[120px]">
      착착마켓
    </TypographyHead1>
    <TypographyP1 class="text-center">
      AI로 누구나 쉽게, 함께 성장하는 공동구매 플랫폼
    </TypographyP1>
    <div class="relative my-[50px]">
      <Separator />
      <TypographyCaption
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ccmkt-bg-white px-3"
      >
        소셜 로그인
      </TypographyCaption>
    </div>
  </div>

  <div
    class="bg-kakao w-full h-[53px] text-white relative items-center justify-center rounded-md"
    @click="onClickKakaoLoginButton"
  >
    <img
      :src="kakao_icon"
      class="absolute left-2 top-1/2 -translate-y-1/2 w-[40px]"
    >
    <p
      class="absolute left-1/2 top-1/2 ml-[13px] -translate-x-1/2 -translate-y-1/2 text-[17px] text-black"
    >
      카카오 로그인
    </p>
  </div>
  <div class="bg-naver w-full h-[53px] text-white relative items-center justify-center rounded-md">
    <img
      :src="naver_icon"
      class="absolute left-2 top-1/2 -translate-y-1/2 w-[40px]"
    >
    <p class="absolute left-1/2 top-1/2 ml-[13px] -translate-x-1/2 -translate-y-1/2 text-[17px]">
      네이버 로그인
    </p>
  </div>
  <div class="bg-google border w-full h-[53px] relative items-center justify-center rounded-md">
    <img
      :src="google_icon"
      class="absolute left-2 top-1/2 -translate-y-1/2 w-[40px]"
    >
    <p class="absolute left-1/2 top-1/2 ml-[10px] -translate-x-1/2 -translate-y-1/2 text-[17px]">
      구글 로그인
    </p>
  </div>
</template>
<script setup lang="ts">
import google_icon from '@/assets/images/google_icon.png'
import kakao_icon from '@/assets/images/kakao_icon.png'
import naver_icon from '@/assets/images/naver_icon.png'
import { Separator } from '@/shared/components/ui/separator'
import { TypographyCaption, TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import { useRouter } from 'vue-router'

const router = useRouter()
function onClickKakaoLoginButton() {
  const currentDomain = window.location.origin
  console.log(currentDomain)
  window.location.href = `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(currentDomain)}`
}
</script>
