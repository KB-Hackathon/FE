<template>
  <div class="w-full h-full mt-[40px]">
    <div
      v-if="coupon"
      class="flex flex-col gap-5"
    >
      <!-- 헤더: 매장명 + 상태 -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="bi bi-shop text-[18px] text-gray-700" />
          <TypographySubTitle1 class="tracking-tight">
            {{ coupon.storeName || '내 매장' }}
          </TypographySubTitle1>
        </div>
        <Badge
          :class="[
            coupon.isUsed
              ? 'bg-gray-300 text-gray-700'
              : isExpired
                ? 'bg-red-100 text-red-700'
                : 'bg-ccmkt-main text-black',
          ]"
        >
          {{ coupon.isUsed ? '사용됨' : isExpired ? '만료됨' : '미사용' }}
        </Badge>
      </div>

      <!-- 상품명 -->
      <TypographyHead3 class="leading-snug">
        {{ coupon.productTitle || '상품명 미확인' }}
      </TypographyHead3>

      <!-- 요약(점주가 바로 보는 필드만) -->
      <div class="space-y-3">
        <div class="flex items-center">
          <span class="shrink-0 text-sm text-gray-600">주문번호</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3" />
          <span class="shrink-0 text-sm text-gray-800">#{{ coupon.orderId }}</span>
        </div>
        <div class="flex items-center">
          <span class="shrink-0 text-sm text-gray-600">만료일</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3" />
          <span :class="['shrink-0 text-sm', isExpired ? 'text-red-600' : 'text-gray-800']">
            {{ formatDate(coupon.expiration) }}
          </span>
        </div>
        <div
          v-if="coupon.isUsed"
          class="flex items-center"
        >
          <span class="shrink-0 text-sm text-gray-600">처리상태</span>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3" />
          <span class="shrink-0 text-sm text-gray-800">사용 완료</span>
        </div>
      </div>

      <!-- 매장 안내(점주용 체크리스트) -->
      <div class="mt-1">
        <TypographyP1 class="mb-2 text-gray-700">
          사용 안내
        </TypographyP1>
        <ul class="list-disc pl-4 space-y-1 text-[13px] text-gray-600">
          <li>손님 앞에서 확인 후 “사용하기”를 눌러주세요.</li>
          <li>사용 처리 후에는 취소나 되돌리기가 불가능합니다.</li>
          <li>쿠폰 사용 내역은 매장 관리자 페이지에서 확인할 수 있습니다.</li>
        </ul>
      </div>

      <!-- 하단 여백(고정바 공간) -->
      <div class="pb-[90px]" />
    </div>

    <!-- 하단 고정 액션 바 -->
    <div class="fixed bottom-0 left-0 right-0">
      <div class="mx-auto max-w-[390px] px-5 py-3 bg-white/95 backdrop-blur border-t">
        <div class="flex gap-2">
          <Button
            class="h-[48px] w-full"
            :disabled="!coupon || coupon.isUsed || isExpired || using"
            :class="
              coupon && (coupon.isUsed || isExpired)
                ? 'bg-gray-300 hover:bg-gray-300 active:bg-gray-300'
                : 'bg-ccmkt-main hover:bg-ccmkt-main active:bg-ccmkt-main'
            "
            @click="openConfirm = true"
          >
            <TypographyP1
              v-if="using"
              class="text-black"
            >
              처리 중...
            </TypographyP1>
            <TypographyP1
              v-else
              class="text-black"
            >
              사용하기
            </TypographyP1>
          </Button>
          <button
            type="button"
            class="h-[48px] px-4 rounded-md border text-[13px] text-gray-700 bg-white text-nowrap"
            @click="goHome"
          >
            닫기
          </button>
        </div>
      </div>
    </div>

    <!-- 사용 확인 -->
    <AlertDialog v-model:open="openConfirm">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[20px]">
            쿠폰 사용 처리
          </AlertDialogTitle>
          <AlertDialogDescription class="text-[15px]">
            손님 확인 후 <b>사용 처리</b> 할까요? 처리 후에는 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="h-[46px] bg-gray-200">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            class="h-[46px] bg-ccmkt-main text-black active:bg-ccmkt-main hover:bg-ccmkt-main"
            :disabled="using"
            @click="handleUseCoupon"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- 완료 토스트성 모달 -->
    <AlertDialog v-model:open="openDone">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[20px]">
            처리 완료
          </AlertDialogTitle>
          <AlertDialogDescription class="text-[15px]">
            쿠폰 사용 처리가 완료되었습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            class="h-[46px] bg-ccmkt-main text-black"
            @click="openDone = false"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- 닫기 확인 -->
    <AlertDialog v-model:open="openExit">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[20px]">
            쿠폰 확인 종료
          </AlertDialogTitle>
          <AlertDialogDescription class="text-[15px]">
            쿠폰 확인을 종료하고 홈으로 이동할까요?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="h-[46px] bg-gray-200">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            class="h-[46px] bg-ccmkt-main text-black active:bg-ccmkt-main hover:bg-ccmkt-main"
            @click="confirmExit"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import router from '@/app/router'
import type { Coupon } from '@/entities/user/user.entity'
import { getCouponInfo } from '@/features/user/services/user.service'
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
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  TypographyHead3,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const qrRaw = route.query.result as string

const coupon = ref<Coupon | null>(null)
const using = ref(false)
const openConfirm = ref(false)
const openDone = ref(false)
const openExit = ref(false)

function goHome() {
  openExit.value = true
}

function confirmExit() {
  openExit.value = false
  router.replace({ name: 'owner_main' })
}
function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const isExpired = computed(() => {
  if (!coupon.value?.expiration) return false
  const today = new Date()
  const exp = new Date(coupon.value.expiration)
  return exp < new Date(today.getFullYear(), today.getMonth(), today.getDate())
})

async function load() {
  const res = await getCouponInfo(qrRaw)
  coupon.value = res.data
}

async function handleUseCoupon() {
  if (!coupon.value) return
  openConfirm.value = false
  using.value = true
  try {
    // TODO: 실제 사용 처리 API 연동
    coupon.value.isUsed = true
    openDone.value = true
  } finally {
    using.value = false
  }
}

onMounted(() => {
  load()
})
</script>
