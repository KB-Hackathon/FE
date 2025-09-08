import { nextTick, ref, type Component, type ComponentPublicInstance } from 'vue'

export type UploadForm = {
  productId: number
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
  hashtags: string[]
}

type StepExpose = { focusFirstFieldImmediate?: () => void }

export function useUploadFlow<S extends ReadonlyArray<Component>>(steps: S) {
  const currentStep = ref(0)
  const stepRef = ref<ComponentPublicInstance<StepExpose> | null>(null)

  const PREVIEW_STEP_INDEX = steps.length - 1

  const LAST_FORM_STEP = steps.length - 2

  function goNext() {
    if (currentStep.value < LAST_FORM_STEP) {
      currentStep.value++
      nextTick(() => stepRef.value?.focusFirstFieldImmediate?.())
    }
  }

  function goPrev() {
    if (currentStep.value > 0) currentStep.value--
  }

  function goPreview() {
    currentStep.value = PREVIEW_STEP_INDEX
  }

  function backToLastForm() {
    currentStep.value = LAST_FORM_STEP
  }

  return {
    currentStep,
    stepRef,
    PREVIEW_STEP_INDEX,
    LAST_FORM_STEP,
    goNext,
    goPrev,
    goPreview,
    backToLastForm,
  }
}
