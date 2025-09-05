<template>
  <div class="w-full flex flex-col gap-3">
    <TypographySubTitle1 class="mb-2">
      나의 쿠폰
    </TypographySubTitle1>

    <div
      v-for="coupon in coupons"
      :key="coupon.id"
      class="border rounded-md p-3 flex items-center justify-between gap-3"
    >
      <div class="min-w-0 flex-1">
        <TypographyHead3 class="truncate">
          {{ coupon.name }}
        </TypographyHead3>

        <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-gray-600">
          <TypographyP2 class="shrink-0">
            유효기간
          </TypographyP2>
          <TypographyP2 class="shrink-0">
            {{ coupon.startDate }} ~ {{ coupon.endDate }}
          </TypographyP2>
        </div>

        <TypographySubTitle2 class="mt-1 text-gray-700">
          {{ coupon.storeName }}
        </TypographySubTitle2>
      </div>

      <button
        type="button"
        class="shrink-0 w-16 aspect-square rounded-md bg-ccmkt-main flex items-center justify-center"
        aria-label="쿠폰 스캔"
        @click="openDialog(coupon)"
      >
        <i class="bi bi-upc-scan text-2xl font-extrabold text-black" />
      </button>
    </div>

    <AlertDialog v-model:open="dialogOpen">
      <AlertDialogContent class="rounded-lg w-[95%]">
        <AlertDialogHeader>
          <AlertDialogTitle>쿠폰 정보</AlertDialogTitle>
          <AlertDialogDescription>
            <div class="w-full flex justify-center py-4">
              <QrcodeVue
                v-if="selectedCoupon?.qrUrl"
                :value="selectedCoupon.qrUrl"
                :size="150"
                level="M"
                :margin="1"
              />
            </div>
            <TypographyP2>
              {{ selectedCoupon?.name }} <br>
              유효기간: {{ selectedCoupon?.startDate }} ~ {{ selectedCoupon?.endDate }} <br>
              매장: {{ selectedCoupon?.storeName }}
            </TypographyP2>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="h-[45px]">
            <TypographyP1 class="text-black">
              닫기
            </TypographyP1>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import {
  TypographyHead3,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
  TypographySubTitle2,
} from '@/shared/components/ui/typography'
import { ref } from 'vue'

const coupons = [
  {
    id: 1,
    name: '꿀복숭아 10개입 할인쿠폰',
    startDate: '2025-02-04',
    endDate: '2025-02-28',
    storeName: '복숭아마켓',
    qrUrl: 'https://m.site.naver.com/1QcML',
  },
  {
    id: 2,
    name: '쫀득쿠키 세트 20% 할인쿠폰',
    startDate: '2025-03-01',
    endDate: '2025-03-15',
    storeName: '쿠키하우스',
    qrUrl: 'https://m.site.naver.com/1QcML',
  },
  {
    id: 3,
    name: '싱싱포도 5kg 박스 할인쿠폰',
    startDate: '2025-04-05',
    endDate: '2025-04-20',
    storeName: '포도농장',
    qrUrl: 'https://m.site.naver.com/1QcML',
  },
  {
    id: 4,
    name: '바삭치킨 세트 5,000원 할인쿠폰',
    startDate: '2025-05-10',
    endDate: '2025-05-31',
    storeName: '치킨스토어',
    qrUrl: 'https://m.site.naver.com/1QcML',
  },
]

const dialogOpen = ref(false)
const selectedCoupon = ref<(typeof coupons)[0] | null>(null)

function openDialog(coupon: (typeof coupons)[0]) {
  selectedCoupon.value = coupon
  dialogOpen.value = true
}
</script>
