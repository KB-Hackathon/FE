<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type { CalendarCellTriggerProps } from 'reka-ui'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    :class="
      cn(
        'h-8 w-8 p-0 grid place-items-center rounded-md text-sm',

        '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
        'data-[selected]:!bg-ccmkt-main data-[selected]:!text-black',
        'data-[selected=true]:!bg-ccmkt-main data-[selected=true]:!text-black',
        'aria-selected:!bg-ccmkt-main aria-selected:!text-black',
        'data-[state=selected]:!bg-ccmkt-main data-[state=selected]:!text-black',
        'data-[selected]:hover:!bg-ccmkt-main data-[selected]:focus:!bg-ccmkt-main',

        'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
        'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
        'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 [&[data-outside-view][data-selected]]:bg-accent/50 [&[data-outside-view][data-selected]]:text-muted-foreground [&[data-outside-view][data-selected]]:opacity-30',
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
