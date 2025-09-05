<template>
  <form
    class="w-full flex flex-col gap-5"
    @submit.prevent="onSubmit"
  >
    <TypographyHead2>
      상품 판매를 위해 <br>
      사업자 조회가 필요합니다.
    </TypographyHead2>

    <Input
      v-model="form.ownerName"
      class="input-style"
      placeholder="대표자 성명 (실명 입력)"
      autocomplete="name"
    />

    <Input
      v-model="form.openingDate"
      class="input-style"
      placeholder="개업 일자 (8자리 입력)"
      maxlength="8"
      inputmode="numeric"
      autocomplete="off"
    />

    <Input
      v-model="form.businessNumber"
      class="input-style"
      placeholder="사업자 등록번호 (숫자 10자리, '-' 제외)"
      maxlength="10"
      inputmode="numeric"
      autocomplete="off"
    />

    <div class="fixed bottom-[30px] inset-x-0 mx-[10px] flex gap-2">
      <Button
        type="button"
        class="w-1/2 bg-ccmkt-gray hover:bg-ccmkt-gray h-[50px]"
        @click="onBuyOnlyClick"
      >
        <TypographySubTitle1 class="text-black">
          그냥 구매만 할래요
        </TypographySubTitle1>
      </Button>

      <Button
        type="button"
        class="w-1/2 bg-ccmkt-main hover:bg-ccmkt-main h-[50px]"
      >
        <TypographySubTitle1 class="text-black">
          사업자 조회하기
        </TypographySubTitle1>
      </Button>
    </div>
    <!-- AlertDialog -->
    <AlertDialog v-model:open="dialog.open">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {{
              dialog.mode === 'error'
                ? '입력이 필요합니다'
                : dialog.mode === 'confirm'
                  ? '이 정보로 조회하시겠습니까?'
                  : '작성한 내용이 저장되지 않습니다'
            }}
          </AlertDialogTitle>

          <AlertDialogDescription>
            <template v-if="dialog.mode === 'error'">
              <TypographyP2>다음 항목을 확인해주세요.</TypographyP2><br>
              <ul class="list-disc pl-5">
                <li
                  v-for="m in dialog.messages"
                  :key="m"
                >
                  {{ m }}
                </li>
              </ul>
            </template>

            <template v-else-if="dialog.mode === 'confirm'">
              입력하신 정보로 사업자 등록 상태를 조회합니다. <br>계속하시겠어요?
            </template>

            <template v-else>
              작성한 내용은 저장되지 않습니다. 홈으로 이동하시겠습니까?
            </template>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel class="h-[50px]">
            <TypographyP1 class="text-black">
              {{ dialog.mode === 'error' ? '확인' : '취소' }}
            </TypographyP1>
          </AlertDialogCancel>

          <!-- 확인/진행 버튼 -->
          <AlertDialogAction
            v-if="dialog.mode === 'confirm'"
            class="h-[50px] bg-ccmkt-main hover:bg-ccmkt-main"
            @click="doLookup"
          >
            <TypographyP1 class="text-black">
              조회
            </TypographyP1>
          </AlertDialogAction>

          <AlertDialogAction
            v-else-if="dialog.mode === 'leave'"
            class="h-[50px] bg-ccmkt-main hover:bg-ccmkt-main"
            @click="goHome"
          >
            <TypographyP1 class="text-black">
              이동
            </TypographyP1>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </form>
</template>

<script setup lang="ts">
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
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  TypographyHead2,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 폼 상태
const form = reactive({
  ownerName: '',
  openingDate: '', // YYYYMMDD
  businessNumber: '', // 10자리 숫자
})

type DialogMode = 'error' | 'confirm' | 'leave'
const dialog = reactive<{ open: boolean; mode: DialogMode; messages: string[] }>({
  open: false,
  mode: 'error',
  messages: [],
})

function onSubmit() {
  const msgs: string[] = []

  if (!form.ownerName) msgs.push('대표자 성명을 입력해주세요.')
  if (!form.openingDate) msgs.push('개업 일자를 입력해주세요. (YYYYMMDD)')
  if (!form.businessNumber) msgs.push("사업자 등록번호를 입력해주세요. ('-' 제외)")

  if (form.openingDate && !/^\d{8}$/.test(form.openingDate)) {
    msgs.push('개업 일자는 숫자 8자리(YYYYMMDD)여야 합니다.')
  }
  if (form.businessNumber && !/^\d{10}$/.test(form.businessNumber)) {
    msgs.push('사업자 등록번호는 숫자 10자리여야 합니다.')
  }

  if (msgs.length) {
    dialog.mode = 'error'
    dialog.messages = msgs
    dialog.open = true
    return
  }

  dialog.mode = 'confirm'
  dialog.messages = []
  dialog.open = true
}

// 실제 조회 (API 연동 자리)
function doLookup() {
  dialog.open = false
  // TODO: 실제 조회 API 호출로 교체
  console.log('사업자 조회 요청:', { ...form })

  // 예시: 결과 페이지 혹은 다음 단계로
  router.replace({ name: 'select_role' })
}

function onBuyOnlyClick() {
  dialog.mode = 'leave'
  dialog.messages = []
  dialog.open = true
}

function goHome() {
  dialog.open = false
  router.replace({ name: 'home' })
}
</script>

<style scoped>
.input-style {
  @apply w-full text-[20px] font-semibold border-t-0 border-r-0 border-l-0 border-b-2 border-ccmkt-main focus-visible:ring-0 rounded-none h-[50px] shadow-none pl-0 pr-8;
}
</style>
