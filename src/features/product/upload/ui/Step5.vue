<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <TypographyHead1 class="text-gray-700">
        모집 시작일을 선택해주세요
      </TypographyHead1>

      <TypographyP1 class="text-gray-700 mt-6 mb-4">
        모집 시작일
      </TypographyP1>

      <div class="flex flex-col gap-3 mb-3">
        <Button
          :class="
            cn(
              'w-full h-[50px] active:bg-ccmkt-main focus:bg-ccmkt-main',
              quick === 'today' ? 'bg-ccmkt-main' : 'bg-white'
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
              quick === 'tomorrow' ? 'bg-ccmkt-main' : 'bg-white'
            )
          "
          variant="outline"
          @click="setTomorrow"
        >
          <TypographySubTitle1>내일부터</TypographySubTitle1>
        </Button>
      </div>

      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="
              cn('w-full ps-3 text-start font-normal h-[50px]', !value && 'text-muted-foreground')
            "
          >
            <TypographyP1>{{ value ? df.format(toDate(value)) : '모집 시작일' }}</TypographyP1>
            <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0">
          <Calendar
            :model-value="value"
            calendar-label="모집 시작일"
            initial-focus
            @update:model-value="onPick"
          />
          <div class="w-full flex justify-center">
            <Button
              class="w-[90%] my-3 bg-ccmkt-main text-black"
              @click="closePopover"
            >
              선택
            </Button>
          </div>
        </PopoverContent>
      </Popover>
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

import { DateFormatter, parseDate } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { CalendarIcon } from 'lucide-vue-next'
import type { DateValue } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { z } from 'zod'

const open = ref(false)
const df = new DateFormatter('ko-KR', { dateStyle: 'long' })
const quick = ref<'today' | 'tomorrow' | null>(null)

const formSchema = toTypedSchema(
  z.object({
    startDate: z.string().optional(),
  })
)

const { setFieldValue, values } = useForm({
  validationSchema: formSchema,
})

const value = computed<DateValue | undefined>({
  get: () => (values.startDate ? (parseDate(values.startDate) as DateValue) : undefined),
  set: () => {},
})

function onPick(v?: DateValue) {
  if (v) setFieldValue('startDate', v.toString())
  else setFieldValue('startDate', undefined)
  quick.value = null
}

function closePopover() {
  open.value = false
}

function setToday() {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  setFieldValue('startDate', `${yyyy}-${mm}-${dd}`)
  open.value = false
  quick.value = 'today'
}

function setTomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  setFieldValue('startDate', `${yyyy}-${mm}-${dd}`)
  open.value = false
  quick.value = 'tomorrow'
}
</script>
