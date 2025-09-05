<template>
  <div class="w-full flex flex-col gap-3">
    <Button class="w-[300px]">
      hello world
    </Button>
    <Input placeholder="Email" />
    <DropdownComponent />
    <CardComponent />
    <PaginationComponent />
    <TabComponent />
    <AlertComponent />
    <AccordionComponent />
    <AlertDialogComponent />
    <AvatarComponent />
    <BadgeComponent />
    <CheckboxComponent />
    <CalendarComponent />
    <ToastComponent />
    <SelectComponent />
    <TagInputComponent />

    <Button
      class="w-[300px]"
      @click="triggerFileInput"
    >
      이미지 업로드
    </Button>

    <!-- 실제 input은 숨기고 버튼으로 트리거 -->
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/*"
      @change="onFileChange"
    >

    <div
      v-if="uploadedUrl"
      class="mt-4"
    >
      <TypographyP1>업로드 성공 ✅</TypographyP1>
      <img
        :src="uploadedUrl"
        alt="업로드 이미지"
        class="w-40 h-40 object-cover mt-2 rounded"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

import AccordionComponent from '@/features/test/AccordionComponent.vue'
import AlertComponent from '@/features/test/AlertComponent.vue'
import AlertDialogComponent from '@/features/test/AlertDialogComponent.vue'
import AvatarComponent from '@/features/test/AvatarComponent.vue'
import BadgeComponent from '@/features/test/BadgeComponent.vue'
import CalendarComponent from '@/features/test/CalendarComponent.vue'
import CardComponent from '@/features/test/CardComponent.vue'
import CheckboxComponent from '@/features/test/CheckboxComponent.vue'
import DropdownComponent from '@/features/test/DropdownComponent.vue'
import PaginationComponent from '@/features/test/PaginationComponent.vue'
import SelectComponent from '@/features/test/SelectComponent.vue'
import TabComponent from '@/features/test/TabComponent.vue'
import TagInputComponent from '@/features/test/TagInputComponent.vue'
import ToastComponent from '@/features/test/ToastComponent.vue'
import { uploadImage } from '@/features/user/services/user.service'
import { api } from '@/shared/plugin/axios'
import { onMounted, ref } from 'vue'

async function testExample() {
  const res = await api.get<{ url: string }>(`https://httpbin.org/delay/2`, {
    showGlobalLoader: true,
  })
  console.log('example api result:', res)
}

onMounted(() => {
  testExample()
})

const fileInput = ref<HTMLInputElement | null>(null)
const uploadedUrl = ref<string | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

async function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  const req: FormData = formData
  try {
    const res = await uploadImage(req)
    uploadedUrl.value = res.url
  } catch (err) {
    console.error('이미지 업로드 실패:', err)
  } finally {
    target.value = '' // 같은 파일 다시 선택 가능하게 리셋
  }
}
</script>
