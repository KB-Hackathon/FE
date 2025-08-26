<template>
  <form class="space-y-8">
    <FormField name="dob">
      <FormItem class="flex flex-col">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="
                  cn('w-[240px] ps-3 text-start font-normal', !value && 'text-muted-foreground')
                "
              >
                <span>{{ value ? df.format(toDate(value)) : 'Pick a date' }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              :model-value="value"
              calendar-label="Date of birth"
              initial-focus
              @update:model-value="
                (v) => {
                  if (v) {
                    setFieldValue('dob', v.toString())
                  } else {
                    setFieldValue('dob', undefined)
                  }
                }
              "
            />
          </PopoverContent>
        </Popover>
        <FormDescription> Your date of birth is used to calculate your age. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
<script setup lang="ts">
import { DateFormatter, parseDate } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import type { DateValue } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', { dateStyle: 'long' })

const formSchema = toTypedSchema(
  z.object({
    dob: z.string().refine((v) => v, { message: 'A date of birth is required.' }),
  })
)

const placeholder = ref()

const { setFieldValue, values } = useForm({
  validationSchema: formSchema,
})

const value = computed<DateValue | undefined>({
  get: () => (values.dob ? (parseDate(values.dob) as unknown as DateValue) : undefined),
  set: () => {},
})
</script>
