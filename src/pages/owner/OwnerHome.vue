<template>
  <div class="flex w-full flex-col gap-3">
    <UserTab />

    <Card>
      <CardContent class="pt-2">
        <div class="flex justify-between items-center">
          <TypographyHead1 class="mb-4">
            gxggrcji
          </TypographyHead1>
          <TypographyHead3
            class="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent"
          >
            <i class="bi bi-instagram text-xl" />
          </TypographyHead3>
        </div>
        <div class="flex w-full gap-6">
          <div
            class="w-[70px] max-h-[70px] overflow-hidden flex justify-center items-center rounded-full m-auto"
          >
            <img
              :src="profile"
              alt="프로필 이미지"
              class="w-full h-full object-cover"
            >
          </div>

          <div class="flex flex-col w-full gap-2">
            <TypographySubTitle1>강민재</TypographySubTitle1>
            <div class="flex items-start w-full justify-between">
              <div class="flex flex-col justify-center gap-2 items-start">
                <TypographySubTitle1 class="text-[20px]">
                  15
                </TypographySubTitle1>
                <TypographyCaption class="text-[14px]">
                  게시물
                </TypographyCaption>
              </div>
              <div class="flex flex-col justify-center gap-2 items-start">
                <TypographySubTitle1 class="text-[20px]">
                  356
                </TypographySubTitle1>
                <TypographyCaption class="text-[14px]">
                  팔로워
                </TypographyCaption>
              </div>
              <div class="flex flex-col justify-center gap-2 items-start">
                <TypographySubTitle1 class="text-[20px]">
                  253
                </TypographySubTitle1>
                <TypographyCaption class="text-[14px]">
                  팔로잉
                </TypographyCaption>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <div class="flex flex-col gap-3">
      <div
        class="p-[15px] bg-ccmkt-main/50 rounded-lg"
        @click="onClickUploadButton"
      >
        <TypographyHead2 class="text-[20px]">
          상품 올리기
        </TypographyHead2>
        <div class="flex w-full justify-between mt-1">
          <TypographyP1 class="text-gray-600 font-bold">
            새 상품을 등록해요
          </TypographyP1>

          <i class="bi bi-chevron-right text-xl" />
        </div>
      </div>
      <div class="p-[15px] bg-[#e5e5e5] rounded-lg">
        <TypographyHead2 class="text-[20px]">
          내 홍보글 확인하기
        </TypographyHead2>
        <div class="flex w-full justify-between mt-1">
          <TypographyP1 class="text-gray-600 font-bold">
            올린 글을 한눈에 봐요
          </TypographyP1>
          <i class="bi bi-chevron-right text-xl" />
        </div>
      </div>

      <div
        class="p-[15px] bg-[#ffeeaa] rounded-lg"
        @click="router.push({ name: 'marketing' })"
      >
        <TypographyHead2 class="text-[20px]">
          마케팅 성과 분석하기
        </TypographyHead2>
        <div class="flex w-full justify-between mt-1">
          <TypographyP1 class="text-gray-600 font-bold">
            판매 성과를 확인해요
          </TypographyP1>
          <i class="bi bi-chevron-right text-xl" />
        </div>
      </div>

      <div class="p-[15px] bg-[#d9d9d9] rounded-lg">
        <TypographyHead2 class="text-[20px]">
          QR 코드 조회하기
        </TypographyHead2>
        <div class="flex w-full justify-between mt-1">
          <TypographyP1 class="text-gray-600 font-bold">
            내가 판매한 쿠폰의 QR 코드를 조회해요
          </TypographyP1>
          <i class="bi bi-chevron-right text-xl" />
        </div>
      </div>
    </div>
  </div>
  <AlertDialog v-model:open="draftDialogOpen">
    <AlertDialogContent class="rounded-lg w-[95%]">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-[24px]">
          임시 저장된 업로드가 있어요
        </AlertDialogTitle>

        <AlertDialogDescription class="text-[16px]">
          이전에 작성하던 내용을 불러올까요? <br>새로 시작하면 임시 저장본이 삭제돼요.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="h-[50px] bg-gray-200">
          <TypographyP1>취소</TypographyP1>
        </AlertDialogCancel>
        <AlertDialogCancel
          class="h-[50px] border bg-white text-black hover:bg-white"
          @click="continueDraft"
        >
          <TypographyP1>이어서 작성</TypographyP1>
        </AlertDialogCancel>
        <AlertDialogAction
          class="bg-ccmkt-main text-black h-[50px] hover:bg-ccmkt-main"
          @click="startNew"
        >
          <TypographyP1>새로 시작</TypographyP1>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<script setup lang="ts">
import profile from '@/assets/images/insta_profile.png'
import UserTab from '@/features/user/ui/UserTab.vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
  TypographyCaption,
  TypographyHead1,
  TypographyHead2,
  TypographyHead3,
  TypographyP1,
} from '@/shared/components/ui/typography'
import TypographySubTitle1 from '@/shared/components/ui/typography/TypographySubTitle1.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const draftDialogOpen = ref(false)

function onClickUploadButton() {
  const uploadDraft = localStorage.getItem('uploadDraft')
  if (uploadDraft) {
    draftDialogOpen.value = true
  } else {
    router.push({ name: 'upload_product' })
  }
}

function continueDraft() {
  draftDialogOpen.value = false
  router.push({ name: 'upload_product' })
}

function startNew() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('uploadDraft')
  }
  draftDialogOpen.value = false
  router.push({ name: 'upload_product' })
}
</script>
