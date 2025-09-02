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
          @click="onClickUploadButtonClick"
        >
          <TypographyHead3>미리보기</TypographyHead3>
        </button>
      </div>
    </div>

    <AlertDialog v-model:open="draftDialogOpen">
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
            @click="onConfirmPreview"
          >
            <TypographyP1>미리보기</TypographyP1>
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
import { nextTick, onMounted, ref, watch, type ComponentPublicInstance } from 'vue'

const { kbOffset } = useKeyboardSafeBottom()

export type UploadForm = {
  title: string
  category: string
  price: string | number | null
  startDate: string
  endDate: string
  option: 'delivery' | 'coupon'
  couponName: string | null

  expirationPeriod: string | number | null
  recruitmentNum: number | null
  imageList: string[]
  description: string
  aiGeneratingDescription: string | null
}

type StepExpose = { focusFirstFieldImmediate?: () => void }

const steps = [Step1, Step2, Step4, Step5, Step6, Step7, Step9, AIGeneratingLoading, Preview]

const currentStep = ref(0)
const stepRef = ref<ComponentPublicInstance<StepExpose> | null>(null)
const draftDialogOpen = ref(false)

const PREVIEW_STEP_INDEX = steps.length - 1
const LOADING_STEP_INDEX = steps.length - 2
const LAST_FORM_STEP = steps.length - 3

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

onMounted(() => {
  const saved = localStorage.getItem('uploadDraft')
  if (saved) {
    try {
      Object.assign(form.value, JSON.parse(saved))
    } catch (e) {
      console.error(e)
    }
  }
})

watch(form, (v) => localStorage.setItem('uploadDraft', JSON.stringify(v)), { deep: true })

function goNext() {
  if (currentStep.value < LAST_FORM_STEP) {
    currentStep.value++
    nextTick(() => stepRef.value?.focusFirstFieldImmediate?.())
  }
}

function goPrev() {
  if (currentStep.value > 0) currentStep.value--
}

function onClickUploadButtonClick() {
  draftDialogOpen.value = true
}

function onConfirmPreview() {
  draftDialogOpen.value = false
  currentStep.value = LOADING_STEP_INDEX

  setTimeout(() => {
    form.value.aiGeneratingDescription = '✨ AI가 생성한 멋진 상품 소개 글입니다.'
    currentStep.value = PREVIEW_STEP_INDEX
  }, 3000)
}
</script>
