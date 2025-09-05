<template>
  <form
    class="w-full flex flex-col gap-5 -mt-[30px]"
    @submit.prevent="onSubmit"
  >
    <button
      type="button"
      class="flex gap-3 mb-[30px]"
      @click="router.go(-1)"
    >
      <i class="bi bi-arrow-left" />
      <TypographyP1>뒤로가기</TypographyP1>
    </button>

    <TypographyHead2> 계속하시려면 추가정보 입력이 필요합니다. </TypographyHead2>

    <Input
      v-model="form.name"
      class="input-style"
      placeholder="이름 (실명 입력)"
    />

    <Input
      v-model="form.birth"
      class="input-style"
      placeholder="생년월일 (8자리 입력)"
      maxlength="8"
    />

    <Input
      v-model="form.phoneNumber"
      class="input-style"
      placeholder="휴대전화번호 ('-' 제외)"
    />

    <Input
      v-model="form.address"
      class="input-style"
      placeholder="주소"
    />
    <RadioGroup
      v-model="form.gender"
      default-value="MALE"
    >
      <div class="flex items-center justify-start gap-6 mt-3">
        <div class="flex items-center space-x-2">
          <RadioGroupItem
            id="r1"
            value="FEMALE"
          />
          <Label for="r1"><TypographySubTitle1>여성</TypographySubTitle1> </Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem
            id="r2"
            value="MALE"
          />
          <Label for="r2"><TypographySubTitle1>남성</TypographySubTitle1> </Label>
        </div>
      </div>
    </RadioGroup>
    <div class="fixed bottom-[30px] left-10 right-10">
      <div class="mx-auto w-[calc(100vw-20px)] max-w-[370px]">
        <Button
          type="submit"
          class="w-full bg-ccmkt-main hover:bg-ccmkt-main h-[50px]"
        >
          <TypographyHead3 class="text-black">
            회원가입
          </TypographyHead3>
        </Button>
      </div>
    </div>
    <AlertDialog v-model:open="dialog.open">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {{ dialog.mode === 'error' ? '입력이 필요합니다' : '회원가입 하시겠습니까?' }}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <template v-if="dialog.mode === 'error'">
              <TypographyP2>다음 항목을 입력해주세요.</TypographyP2> <br>
              <ul class="list-none pl-5">
                <li
                  v-for="f in dialog.missing"
                  :key="f"
                >
                  {{ f }}
                </li>
              </ul>
            </template>
            <template v-else>
              입력하신 정보로 회원가입을 진행합니다. <br>계속하시겠어요?
            </template>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel class="h-[50px]">
            <TypographyP1 class="text-black">
              {{ dialog.mode === 'error' ? '확인' : '취소' }}
            </TypographyP1>
          </AlertDialogCancel>

          <AlertDialogAction
            v-if="dialog.mode === 'confirm'"
            class="h-[50px] bg-ccmkt-main hover:bg-ccmkt-main"
            @click="submit"
          >
            <TypographyP1 class="text-black">
              진행
            </TypographyP1>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </form>
</template>

<script setup lang="ts">
import { postAdditionalInfo } from '@/features/user/services/user.service'
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
import { Label } from '@/shared/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import {
  TypographyHead2,
  TypographyHead3,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const signupToken = ''

const form = reactive({
  name: '',
  birth: '',
  phoneNumber: '',
  address: '',
  gender: 'MALE',
})

const dialog = reactive<{
  open: boolean
  mode: 'error' | 'confirm'
  missing: string[]
}>({
  open: false,
  mode: 'error',
  missing: [],
})

function onSubmit() {
  const missing: string[] = []

  if (!form.name) missing.push('이름')
  if (!form.birth) missing.push('생년월일 (8자리)')
  if (!form.phoneNumber) missing.push("휴대전화번호 ('-' 제외)")
  if (!form.address) missing.push('주소')
  if (!form.gender) missing.push('성별')

  if (form.birth && form.birth.length !== 8) missing.push('생년월일 형식(8자리)')
  if (form.phoneNumber && !/^\d+$/.test(form.phoneNumber)) missing.push('휴대전화번호는 숫자만')

  if (missing.length) {
    dialog.mode = 'error'
    dialog.missing = missing
    dialog.open = true
    return
  }

  dialog.mode = 'confirm'
  dialog.missing = []
  dialog.open = true
}

async function submit() {
  const date = new Date()
  const now = date.getFullYear()
  const birthYear = Number(form.birth.slice(0, 4))

  dialog.open = false
  try {
    await postAdditionalInfo({
      signupToken: signupToken,
      name: form.name,
      age: now - birthYear,
      gender: form.gender,
      address: form.address,
      phoneNumber: form.phoneNumber,
    })
    router.replace({ name: 'select_role' })
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.input-style {
  @apply w-full text-[20px] font-semibold border-t-0 border-r-0 border-l-0 border-b-2 border-ccmkt-main focus-visible:ring-0 rounded-none h-[50px] shadow-none pl-0 pr-8;
}
</style>
