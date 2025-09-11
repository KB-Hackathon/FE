<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[110px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <TypographyHead1 class="text-gray-700">
        사진과 설명을 입력해주세요
      </TypographyHead1>
      <div class="fixed inset-x-0 top-[170px] mx-auto max-w-[390px] px-5 box-border">
        <div class="flex gap-1 items-center">
          <TypographyP1 class="text-gray-700">
            사진
          </TypographyP1>
          <TypographyCaption>
            <i class="bi bi-exclamation-circle ml-1" /> 최소 3장의 사진을
            추가해주세요
          </TypographyCaption>
        </div>
        <div class="flex justify-start my-1 mb-8 mt-4">
          <button
            type="button"
            class="flex items-center justify-center w-[70px] h-[70px] rounded-[16px] bg-ccmkt-main text-whites transition-all"
            @click="triggerFileInput"
          >
            <i class="bi bi-plus-circle text-[24px] font-bold" />
          </button>

          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept="image/*"
            @change="onFileChange"
          >
        </div>
        <div
          v-if="props.modelValue.images.length > 0"
          class="grid grid-cols-2 gap-4 my-4 h-[130px] overflow-scroll pt-3"
        >
          <div
            v-for="(preview, index) in props.modelValue.images"
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
              class="absolute -top-2 right-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm hover:scale-105 transition"
              @click="removeImage(index)"
            >
              <i class="bi bi-x-circle" />
            </button>
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
import { uploadImage } from '@/features/user/services/user.service'
import { Textarea } from '@/shared/components/ui/textarea'
import { TypographyCaption, TypographyHead1, TypographyP1 } from '@/shared/components/ui/typography'
import type { UploadForm } from '@/shared/composables/useUploadFlow'
import { computed, ref } from 'vue'

const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

// 이미지/설명 프록시
const imagesProxy = computed<string[]>({
  get: () => props.modelValue.images ?? [],
  set: (val) => emit('update:modelValue', { ...props.modelValue, images: val }),
})

const description = computed({
  get: () => props.modelValue.description,
  set: (val: string) => emit('update:modelValue', { ...props.modelValue, description: val }),
})

const fileInput = ref<HTMLInputElement | null>(null)
function triggerFileInput() {
  fileInput.value?.click()
}

async function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await uploadImage(formData)
    // 여기서 '한 번만' 추가
    imagesProxy.value = [...imagesProxy.value, res.data.url]
  } catch (err) {
    console.error('이미지 업로드 실패:', err)
  } finally {
    target.value = ''
  }
}

function removeImage(index: number) {
  imagesProxy.value = imagesProxy.value.filter((_, i) => i !== index)
}
</script>
