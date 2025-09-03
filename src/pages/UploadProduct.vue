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
          @click="previewOpen = true"
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
          class="bg-gray-400 rounded-lg w-full h-[60px] z-20 text-white"
          @click="backOpen = true"
        >
          <TypographyHead3>이전으로</TypographyHead3>
        </button>
        <button
          class="bg-ccmkt-main rounded-lg w-full h-[60px] z-20"
          @click="uploadOpen = true"
        >
          <TypographyHead3>업로드하기</TypographyHead3>
        </button>
      </div>
    </div>

    <ConfirmDialog
      v-model="previewOpen"
      title="AI로 소개 글을 생성할까요?"
      confirm-text="미리보기"
      :description="`입력한 내용을 바탕으로 AI가 상품 소개를 완성합니다.\n업로드 전에도 수정할 수 있어요.`"
      @confirm="handleConfirmPreview"
      @cancel="previewOpen = false"
    />

    <ConfirmDialog
      v-model="backOpen"
      title="이전 페이지로 돌아가시겠어요?"
      confirm-text="이전으로"
      :description="`돌아가면 AI가 생성한 글이 초기화될 수 있습니다.\n계속하시려면 ‘이전으로’를 눌러주세요.`"
      @confirm="handleBackToForm"
      @cancel="backOpen = false"
    />

    <ConfirmDialog
      v-model="uploadOpen"
      title="상품을 업로드하시겠어요?"
      confirm-text="업로드하기"
      :description="`상품이 업로드되면 다른 사용자들에게 공개돼요.\n작성한 내용을 다시 한번 확인해 주세요.`"
      @confirm="handleUpload"
      @cancel="uploadOpen = false"
    />
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

import { TypographyHead3 } from '@/shared/components/ui/typography'
import { useKeyboardSafeBottom } from '@/shared/composables/useKeyboardSafeBottom'
import { ref } from 'vue'

import ConfirmDialog from '@/shared/components/organisms/ConfirmDialog.vue'
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
useUploadDraft(form, 'uploadDraft')

const previewOpen = ref(false)
const backOpen = ref(false)
const uploadOpen = ref(false)

function handleConfirmPreview() {
  previewOpen.value = false
  goLoading()
  setTimeout(() => {
    form.value.aiGeneratingDescription = '✨ AI가 생성한 멋진 상품 소개 글입니다.'
    goPreview()
  }, 3000)
}

function handleBackToForm() {
  backOpen.value = false
  backToLastForm()
}

function handleUpload() {
  uploadOpen.value = false
  localStorage.removeItem('uploadDraft')
}
</script>
