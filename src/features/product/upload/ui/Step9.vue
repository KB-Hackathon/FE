<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <div class="flex justify-start items-center gap-3">
        <TypographyHead1 class="text-gray-700">
          사진을 선택해주세요
        </TypographyHead1>
        <TypographyP1>(최대 10장)</TypographyP1>
      </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const imagePreviews = ref<string[]>([])

// const model = computed(() => props.modelValue)

function triggerFileInput() {
  fileInput.value?.click()
}

// function patch(p: Partial<UploadForm>) {
//   emit('update:modelValue', { ...props.modelValue, ...p })
// }

const handleImageUpload = async (_event: Event) => {}

const removeImage = (_index: number) => {}
</script>
