<template>
  <div class="w-full flex flex-col gap-3">
    <TypographySubTitle1 class="mb-2">
      나의 쿠폰
    </TypographySubTitle1>

    <div
      v-for="coupon in coupons"
      :key="coupon.couponId"
      class="border rounded-md p-3 flex items-center justify-between gap-3"
    >
      <div class="min-w-0 flex-1">
        <TypographyHead3 class="truncate">
          {{ coupon.couponName !== null ? coupon.couponName : coupon.productTitle }}
        </TypographyHead3>

        <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-gray-600">
          <TypographyP2 class="shrink-0">
            유효기간
          </TypographyP2>
          <TypographyP2 class="shrink-0">
            {{ coupon.expiration }} 까지
          </TypographyP2>
        </div>

        <TypographySubTitle2 class="mt-1 text-gray-700">
          {{ coupon.storeName }}
        </TypographySubTitle2>
      </div>

      <button
        type="button"
        :class="coupon.isUsed ? 'bg-ccmkt-gray ' : 'bg-ccmkt-main'"
        class="shrink-0 w-16 aspect-square rounded-md flex items-center justify-center"
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
                v-if="selectedCoupon?.couponUUID"
                :value="selectedCoupon.couponUUID"
                :size="150"
                level="M"
                :margin="1"
              />
            </div>
            <TypographyP2>
              {{
                selectedCoupon?.couponName !== null
                  ? selectedCoupon?.couponName
                  : selectedCoupon?.productTitle
              }}
              <br>
              유효기간:{{ selectedCoupon?.expiration }}까지 <br>
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

import { Coupon } from '@/entities/user/user.entity'
import { getCouponList } from '@/features/user/services/user.service'
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
import { onMounted, ref } from 'vue'

const coupons = ref<Coupon[]>([])
const dialogOpen = ref(false)
const selectedCoupon = ref<Coupon | null>(null)

function openDialog(coupon: Coupon) {
  selectedCoupon.value = coupon
  dialogOpen.value = true
}

async function getCouponListFunction() {
  const result = await getCouponList()
  coupons.value = result.data.coupons
}

onMounted(() => {
  getCouponListFunction()
})
</script>
