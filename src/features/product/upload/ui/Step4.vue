<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[110px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <TypographyHead1 class="text-gray-700">
        모집 시작일을 선택해주세요
      </TypographyHead1>

      <TypographyP1 class="text-gray-700 mt-6 mb-4">
        모집 시작일
      </TypographyP1>

      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="
              cn(
                'w-full ps-3 text-start font-normal h-[50px] mb-3',
                !startVal && 'text-muted-foreground'
              )
            "
          >
            <TypographyP1>
              {{ startVal ? df.format(toDate(startVal)) : '모집 시작일' }}
            </TypographyP1>
            <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="center"
          :collision-padding="12"
          class="p-0 w-[calc(100vw-32px)] max-w-[390px] flex flex-col justify-center items-center"
        >
          <Calendar
            :model-value="startVal"
            calendar-label="모집 시작일"
            initial-focus
            @update:model-value="onPick"
          />
          <div class="w-full flex justify-center">
            <Button
              class="w-[90%] h-[50px] my-3 bg-ccmkt-main text-black"
              @click="closePopover"
            >
              <TypographySubTitle1>선택</TypographySubTitle1>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div class="flex flex-col gap-3 mb-3">
        <Button
          :class="
            cn(
              'w-full h-[50px] active:bg-ccmkt-main focus:bg-ccmkt-main',
              quick === 'today' ? '!bg-ccmkt-main !text-black !border-ccmkt-main' : 'bg-white'
            )
          "
          variant="outline"
          @click="setToday"
        >
          <TypographySubTitle1>오늘부터</TypographySubTitle1>
        </Button>

        <Button
          :class="
            cn(
              'w-full h-[50px] active:bg-ccmkt-main focus:bg-ccmkt-main',
              quick === 'tomorrow' ? '!bg-ccmkt-main !text-black !border-ccmkt-main' : 'bg-white'
            )
          "
          variant="outline"
          @click="setTomorrow"
        >
          <TypographySubTitle1>내일부터</TypographySubTitle1>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import {
  TypographyHead1,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import type { UploadForm } from '@/shared/composables/useUploadFlow'
import { DateFormatter, parseDate } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'

import type { DateValue } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { computed, ref } from 'vue'

const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

const df = new DateFormatter('ko-KR', { dateStyle: 'long' })
const open = ref(false)
const quick = ref<'today' | 'tomorrow' | null>(null)

function patch(p: Partial<UploadForm>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}

const startVal = computed<DateValue | undefined>({
  get: () =>
    props.modelValue.startDate
      ? (parseDate(props.modelValue.startDate) as unknown as DateValue)
      : undefined,
  set: () => {},
})

function onPick(v?: DateValue) {
  patch({ startDate: v ? v.toString() : '' })
  quick.value = null
}

function closePopover() {
  open.value = false
}

function setToday() {
  patch({ startDate: toLocalISO(new Date()) })
  quick.value = 'today'
  open.value = false
}

function setTomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  patch({ startDate: toLocalISO(d) })
  quick.value = 'tomorrow'
  open.value = false
}

function toLocalISO(d: Date) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
</script>
