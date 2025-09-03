<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <TypographyHead1 class="text-gray-700">
        사진과 설명을 입력해주세요
      </TypographyHead1>
      <div class="fixed inset-x-0 top-[140px] mx-auto max-w-[390px] px-5 box-border">
        <TypographyP1 class="text-gray-700">
          사진
        </TypographyP1>
        <div class="flex justify-start my-1 mb-8 mt-4">
          <button
            type="button"
            class="flex items-center justify-center w-[70px] h-[70px] rounded-[16px] bg-ccmkt-main text-whites transition-all"
            @click="triggerFileInput"
          >
            <i class="bi bi-plus-circle text-[24px] font-bold" />
          </button>

          <!-- 숨겨진 파일 input -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            @change="handleImageUpload"
          >
          <div
            v-if="imagePreviews.length > 0"
            class="grid grid-cols-2 gap-4 mt-4 mb-8"
          >
            <div
              v-for="(preview, index) in imagePreviews"
              :key="'new-' + index"
              class="relative inline-block"
            >
              <img
                :src="preview"
                class="w-[150px] h-[100px] object-cover rounded-[12px] shadow"
                :alt="`업로드된 이미지 ${index + 1}`"
              >
              <button
                type="button"
                class="absolute top-2 right-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm hover:scale-105 transition"
                @click="removeImage(index)"
              >
                <i class="bi bi-x-circle" />
              </button>
            </div>
          </div>
        </div>
        <TypographyP1 class="text-gray-700">
          설명
        </TypographyP1>

        <Textarea
          ref="titleEl"
          v-model="description"
          class="mt-3 resize-none h-[250px] text-[17px]"
          placeholder="상품에 대해 간단한 설명을 입력하면
자동 홍보 게시글이 더 자연스러워집니다 (최대 400자)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/shared/components/ui/textarea'
import { TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import type { UploadForm } from '@/shared/composables/useUploadFlow'
import { computed, ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const imagePreviews = ref<string[]>([])
const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

// const model = computed(() => props.modelValue)

function triggerFileInput() {
  fileInput.value?.click()
}

// function patch(p: Partial<UploadForm>) {
//   emit('update:modelValue', { ...props.modelValue, ...p })
// }

const handleImageUpload = async (_event: Event) => {}

const description = computed({
  get: () => props.modelValue.description,
  set: (val: string) => {
    emit('update:modelValue', { ...props.modelValue, description: val })
  },
})
const removeImage = (_index: number) => {}
</script>
