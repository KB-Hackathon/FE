<template>
  <div class="flex flex-col w-full">
    <main>
      <KeepAlive>
        <component
          :is="steps[currentStep]"
          ref="stepRef"
          v-model="form"
          @next="goNext"
          @prev="goPrev"
        />
      </KeepAlive>
    </main>

    <div
      v-if="currentStep > 0 && currentStep <= LAST_FORM_STEP"
      class="fixed left-0 right-0 z-[40] flex flex-col max-w-[390px] mx-auto"
      :style="{ bottom: `calc(env(safe-area-inset-bottom) + ${kbOffset + 20}px)` }"
    >
      <div class="flex w-[95%] m-auto relative gap-2">
        <button
          class="bg-gray-400 rounded-lg w-full h-[60px] z-20"
          @click="goPrev"
        >
          <TypographyHead3 class="text-white">
            이전으로
          </TypographyHead3>
        </button>

        <button
          v-if="currentStep < LAST_FORM_STEP"
          class="bg-ccmkt-main rounded-lg w-full h-[60px] z-20"
          @click="goNext"
        >
          <TypographyHead3>다음으로</TypographyHead3>
        </button>
        <button
          v-else
          class="bg-ccmkt-main rounded-lg w-full h-[60px] z-20"
          @click="dialogPreview.show()"
        >
          <TypographyHead3>미리보기</TypographyHead3>
        </button>
      </div>
    </div>

    <div
      v-if="currentStep === PREVIEW_STEP_INDEX"
      class="fixed left-0 right-0 bottom-0 py-[10px] bg-white z-[40] flex flex-col max-w-[390px] mx-auto"
    >
      <div class="flex w-[95%] m-auto relative gap-2">
        <button
          class="bg-gray-400 rounded-lg w-full h-[60px] z-20"
          @click="dialogBack.show()"
        >
          <TypographyHead3>이전으로</TypographyHead3>
        </button>
        <button
          class="bg-ccmkt-main rounded-lg w-full h-[60px] z-20"
          @click="dialogUpload.show()"
        >
          <TypographyHead3>업로드하기</TypographyHead3>
        </button>
      </div>
    </div>

    <AlertDialog v-model:open="dialogPreview.open.value">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[24px]">
            AI로 소개 글을 생성할까요?
          </AlertDialogTitle>
          <AlertDialogDescription class="text-[14px]">
            입력한 내용을 바탕으로 AI가 상품 소개를 완성합니다.<br>
            업로드 전에도 수정할 수 있어요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="h-[50px]">
            <TypographyP1>취소</TypographyP1>
          </AlertDialogCancel>
          <AlertDialogAction
            class="bg-ccmkt-main text-black h-[50px] hover:bg-ccmkt-main"
            @click="handleConfirmPreview"
          >
            <TypographyP1>미리보기</TypographyP1>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog v-model:open="dialogBack.open.value">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[24px]">
            이전 페이지로 돌아가시겠어요?
          </AlertDialogTitle>
          <AlertDialogDescription class="text-[14px]">
            돌아가면 AI가 생성한 글이 초기화될 수 있습니다.<br>
            계속하시려면 ‘이전으로’를 눌러주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="h-[50px]">
            <TypographyP1>취소</TypographyP1>
          </AlertDialogCancel>
          <AlertDialogAction
            class="bg-ccmkt-main text-black h-[50px] hover:bg-ccmkt-main"
            @click="handleBackToForm"
          >
            <TypographyP1>이전으로</TypographyP1>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog v-model:open="dialogUpload.open.value">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[24px]">
            상품을 업로드하시겠어요?
          </AlertDialogTitle>
          <AlertDialogDescription class="text-[14px]">
            상품이 업로드되면 다른 사용자들에게 공개돼요.<br>
            작성한 내용을 다시 한번 확인해 주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="h-[50px]">
            <TypographyP1>취소</TypographyP1>
          </AlertDialogCancel>
          <AlertDialogAction
            class="bg-ccmkt-main text-black h-[50px] hover:bg-ccmkt-main"
            @click="handleUpload"
          >
            <TypographyP1>업로드하기</TypographyP1>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import AIGeneratingLoading from '@/features/product/upload/ui/AIGeneratingLoading.vue'
import Preview from '@/features/product/upload/ui/Preview.vue'
import Step1 from '@/features/product/upload/ui/Step1.vue'
import Step2 from '@/features/product/upload/ui/Step2.vue'
import Step4 from '@/features/product/upload/ui/Step4.vue'
import Step5 from '@/features/product/upload/ui/Step5.vue'
import Step6 from '@/features/product/upload/ui/Step6.vue'
import Step7 from '@/features/product/upload/ui/Step7.vue'
import Step9 from '@/features/product/upload/ui/Step9.vue'

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
import { TypographyHead3, TypographyP1 } from '@/shared/components/ui/typography'
import { useKeyboardSafeBottom } from '@/shared/composables/useKeyboardSafeBottom'
import { ref } from 'vue'

import { useDialog } from '@/shared/composables/useDialog'
import { useUploadDraft } from '@/shared/composables/useUploadDraft'
import { useUploadFlow, type UploadForm } from '@/shared/composables/useUploadFlow'

const { kbOffset } = useKeyboardSafeBottom()

const steps = [Step1, Step2, Step4, Step5, Step6, Step7, Step9, AIGeneratingLoading, Preview]
const {
  currentStep,
  stepRef,
  PREVIEW_STEP_INDEX,
  LAST_FORM_STEP,
  goNext,
  goPrev,
  goLoading,
  goPreview,
  backToLastForm,
} = useUploadFlow(steps)

const form = ref<UploadForm>({
  title: '',
  category: '기타',
  price: null,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  option: 'delivery',
  couponName: null,
  expirationPeriod: null,
  recruitmentNum: null,
  imageList: [],
  description: '',
  aiGeneratingDescription: '',
})
useUploadDraft(form)

const dialogPreview = useDialog(false)
const dialogBack = useDialog(false)
const dialogUpload = useDialog(false)

function handleConfirmPreview() {
  dialogPreview.hide()
  goLoading()
  setTimeout(() => {
    form.value.aiGeneratingDescription = '✨ AI가 생성한 멋진 상품 소개 글입니다.'
    goPreview()
  }, 3000)
}

function handleBackToForm() {
  dialogBack.hide()
  backToLastForm()
}

function handleUpload() {
  dialogUpload.hide()

  localStorage.removeItem('uploadDraft')
}
</script>
