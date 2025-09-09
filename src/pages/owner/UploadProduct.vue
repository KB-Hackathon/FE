<template>
  <div class="flex flex-col w-full">
    <main class="relative">
      <KeepAlive>
        <component
          :is="steps[currentStep]"
          ref="stepRef"
          v-model="form"
          @next="goNext"
          @prev="goPrev"
        />
      </KeepAlive>
      <div
        v-if="currentStep !== 6"
        class="pointer-events-none fixed inset-x-0 top-[60px] z-[30]"
      >
        <div class="mx-auto max-w-[390px] px-5 pt-3">
          <button
            class="pointer-events-auto flex items-center gap-2 text-gray-700"
            @click="cancelOpen = true"
          >
            <i class="bi bi-arrow-left text-md" />
            <TypographySubTitle2 class="text-md">
              뒤로가기
            </TypographySubTitle2>
          </button>
        </div>
      </div>
    </main>

    <div
      v-if="currentStep == 0"
      class="fixed left-0 right-0 z-[40] flex flex-col max-w-[390px] mx-auto"
      :style="{ bottom: `calc(env(safe-area-inset-bottom) + ${kbOffset + 20}px)` }"
    >
      <div class="flex w-[95%] m-auto relative gap-2">
        <!-- <button @click="cancelOpen = true" class="bg-gray-400 rounded-lg w-full h-[60px] z-20">
          <TypographyHead3 class="text-white"> 취소하기 </TypographyHead3>
        </button> -->

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
      v-model="cancelOpen"
      title="상품 업로드를 취소하시겠어요?"
      confirm-text="취소하기"
      :description="`상품 업로드를 정말 취소하시겠어요?\n지금까지 입력한 내용은 저장되니 안심하세요.`"
      @confirm="cancel"
      @cancel="cancelOpen = false"
    />

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
    <ConfirmDialog
      v-model="successOpen"
      title="상품이 성공적으로 업로드되었습니다."
      confirm-text="확인"
      :description="`업로드가 완료되었어요.\n상품 상세 페이지로 이동합니다.`"
      @confirm="handleSuccessConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { getAiNarrative, uploadProduct } from '@/features/product/upload/services/upload.service'
import Preview from '@/features/product/upload/ui/Preview.vue'
import Step2 from '@/features/product/upload/ui/Step2.vue'
import Step3 from '@/features/product/upload/ui/Step3.vue'
import Step4 from '@/features/product/upload/ui/Step4.vue'
import Step5 from '@/features/product/upload/ui/Step5.vue'
import Step6 from '@/features/product/upload/ui/Step6.vue'
import Step7 from '@/features/product/upload/ui/Step7.vue'

import ConfirmDialog from '@/shared/components/organisms/ConfirmDialog.vue'
import { TypographyHead3, TypographySubTitle2 } from '@/shared/components/ui/typography'
import { useKeyboardSafeBottom } from '@/shared/composables/useKeyboardSafeBottom'
import { useUploadDraft } from '@/shared/composables/useUploadDraft'
import { useUploadFlow, type UploadForm } from '@/shared/composables/useUploadFlow'
import { formatDateTime2, formatDateTime3 } from '@/shared/utils/format'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { kbOffset } = useKeyboardSafeBottom()
const router = useRouter()
const steps = [Step2, Step3, Step4, Step5, Step6, Step7, Preview]
const {
  currentStep,
  stepRef,
  PREVIEW_STEP_INDEX,
  LAST_FORM_STEP,
  goNext,
  goPrev,
  goPreview,
  backToLastForm,
} = useUploadFlow(steps)

const form = ref<UploadForm>({
  productId: 0,
  title: '',
  category: '기타',
  price: null,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  option: 'delivery',
  couponName: null,
  expirationPeriod: null,
  recruitmentNum: null,
  images: [],
  description: '',
  aiGeneratingDescription: '',
  tags: [],
})
useUploadDraft(form, 'uploadDraft')

const previewOpen = ref(false)
const backOpen = ref(false)
const uploadOpen = ref(false)
const cancelOpen = ref(false)
const successOpen = ref(false)

function handleBackToForm() {
  backOpen.value = false
  backToLastForm()
}

function cancel() {
  cancelOpen.value = false
  router.replace({ name: 'owner_main' })
}

async function handleUpload() {
  uploadOpen.value = false

  try {
    await uploadProduct({
      productId: Number(form.value.productId),
      title: form.value.title,
      category: form.value.category,
      images: form.value.images,
      description: form.value.aiGeneratingDescription!,
      tags: form.value.tags,
      price: Number(form.value.price),
      isCoupon: form.value.option == 'coupon' ? true : false,
      couponName: form.value.couponName!,
      couponExpiration: Number(form.value.expirationPeriod),
      targetAmount: Number(form.value.recruitmentNum),
      recruitmentStartPeriod: formatDateTime3(form.value.startDate),
      recruitmentEndPeriod: formatDateTime3(form.value.endDate),
    })

    successOpen.value = true
  } catch (e) {
    console.error('[handleUpload] 업로드 실패:', e)
  }
}

function handleSuccessConfirm() {
  successOpen.value = false
  localStorage.removeItem('uploadDraft')
  const id = form.value.productId
  router.replace({ name: 'product', params: { productId: id } })
}

async function handleConfirmPreview() {
  previewOpen.value = false
  try {
    const result = await getAiNarrative({
      title: form.value.title,
      category: form.value.category,
      summary: form.value.description,
      images: form.value.images,
      price: Number(form.value.price),
      recruitmentEndPeriod: formatDateTime2(form.value.endDate),
    })

    form.value.aiGeneratingDescription = result.data.caption
    form.value.productId = result.data.productId
    form.value.tags = result.data.hashtags

    goPreview()
  } catch (e) {
    console.error('[handleConfirmPreview] 실패:', e)
  }
}
</script>
