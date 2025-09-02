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
      v-if="currentStep > 0"
      class="fixed left-0 right-0 z-[60] flex flex-col"
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
          class="bg-ccmkt-main rounded-lg w-full h-[60px] z-20"
          @click="goNext"
        >
          <TypographyHead3>다음으로</TypographyHead3>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Step1 from '@/features/product/upload/ui/Step1.vue'
import Step2 from '@/features/product/upload/ui/Step2.vue'
import Step3 from '@/features/product/upload/ui/Step3.vue'
import Step4 from '@/features/product/upload/ui/Step4.vue'
import Step5 from '@/features/product/upload/ui/Step5.vue'
import Step6 from '@/features/product/upload/ui/Step6.vue'
import Step7 from '@/features/product/upload/ui/Step7.vue'
import Step8 from '@/features/product/upload/ui/Step8.vue'
import Step9 from '@/features/product/upload/ui/Step9.vue'
import { TypographyHead3 } from '@/shared/components/ui/typography'
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
  couponExpiryDate: string | null
  expirationPeriod: string | number | null
  recruitmentNum: number | null
  imageList: string[]
}

type StepExpose = {
  focusFirstFieldImmediate?: () => void
}

const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9]
const currentStep = ref(0)
const stepRef = ref<ComponentPublicInstance<StepExpose> | null>(null)

const form = ref<UploadForm>({
  title: '',
  category: '기타',
  price: null,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  option: 'delivery',
  couponName: null,
  couponExpiryDate: null,
  expirationPeriod: null,
  recruitmentNum: null,
  imageList: [],
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
  if (currentStep.value < steps.length - 1) {
    currentStep.value++

    nextTick(() => stepRef.value?.focusFirstFieldImmediate?.())
  } else {
    // 완료 처리
  }
}

function goPrev() {
  if (currentStep.value > 0) currentStep.value--
}
</script>
