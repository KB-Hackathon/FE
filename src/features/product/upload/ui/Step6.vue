<template>
  <div class="relative h-[100svh] overflow-hidden">
    <div class="fixed top-[80px] inset-x-0 mx-auto max-w-[390px] px-5 box-border">
      <TypographyHead1 class="text-gray-700">
        모집 종료일을 선택해주세요
      </TypographyHead1>

      <div class="flex gap-4 mt-6 mb-2 items-center">
        <TypographyP1 class="text-gray-700">
          모집 시작일
        </TypographyP1>
        <TypographyHead3>{{ formattedStartDate }}</TypographyHead3>
      </div>

      <TypographyP1 class="text-gray-700 mb-4">
        모집 종료일
      </TypographyP1>
      <div class="flex flex-col gap-3 mb-3">
        <Button
          :class="
            cn(
              'w-full h-[50px]  active:bg-ccmkt-main focus:bg-ccmkt-main',
              quick === 'oneWeek' ? 'bg-ccmkt-main' : 'bg-white'
            )
          "
          variant="outline"
          :disabled="!props.modelValue.startDate"
          @click="setOneWeekLater"
        >
          <TypographySubTitle1>일주일 동안</TypographySubTitle1>
        </Button>
        <Button
          :class="
            cn(
              'w-full h-[50px]  active:bg-ccmkt-main focus:bg-ccmkt-main',
              quick === 'twoWeek' ? 'bg-ccmkt-main' : 'bg-white'
            )
          "
          variant="outline"
          :disabled="!props.modelValue.startDate"
          @click="setTwoWeeksLater"
        >
          <TypographySubTitle1>이주일 동안</TypographySubTitle1>
        </Button>
      </div>

      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="w-full ps-3 text-start font-normal h-[50px]"
          >
            <TypographyP1>
              {{
                endValue ? df.format(toDate(endValue)) : '모집 마감일 선택'
              }}
            </TypographyP1>
            <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0">
          <Calendar
            :model-value="endValue"
            calendar-label="모집 마감일"
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
import type { UploadForm } from '@/pages/UploadProduct.vue'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import {
  TypographyHead1,
  TypographyHead3,
  TypographyP1,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'

import { DateFormatter, parseDate } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import type { DateValue } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { computed, ref } from 'vue'

const props = defineProps<{ modelValue: UploadForm }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: UploadForm): void }>()

const df = new DateFormatter('ko-KR', { dateStyle: 'long' })
const open = ref(false)
const quick = ref<'oneWeek' | 'twoWeek' | null>(null)

const formattedStartDate = computed(() =>
  props.modelValue.startDate ? df.format(toDate(parseDate(props.modelValue.startDate))) : '-'
)

const endValue = computed<DateValue | undefined>({
  get: () =>
    props.modelValue.endDate ? (parseDate(props.modelValue.endDate) as DateValue) : undefined,
  set: () => {},
})

function updateForm(patch: Partial<UploadForm>) {
  emit('update:modelValue', { ...props.modelValue, ...patch })
}

function onPick(v?: DateValue) {
  updateForm({ endDate: v ? v.toString() : '' })
  quick.value = null
}

function closePopover() {
  open.value = false
}

function setOneWeekLater() {
  if (!props.modelValue.startDate) return
  updateForm({ endDate: addDaysISO(props.modelValue.startDate, 7) })
  quick.value = 'oneWeek'
  open.value = false
}
function setTwoWeeksLater() {
  if (!props.modelValue.startDate) return
  updateForm({ endDate: addDaysISO(props.modelValue.startDate, 14) })
  quick.value = 'twoWeek'
  open.value = false
}

function addDaysISO(iso: string, days: number) {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
</script>
