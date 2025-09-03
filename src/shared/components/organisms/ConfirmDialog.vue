<template>
  <AlertDialog v-model:open="innerOpen">
    <AlertDialogContent class="rounded-lg w-[95%]">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-[24px]">
          {{ title }}
        </AlertDialogTitle>
        <AlertDialogDescription class="text-[14px]">
          <slot name="description">
            {{ description }}
          </slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          class="h-[50px]"
          @click="$emit('cancel')"
        >
          <slot name="cancel">
            <TypographyP1>{{ cancelText }}</TypographyP1>
          </slot>
        </AlertDialogCancel>
        <AlertDialogAction
          class="bg-ccmkt-main text-black h-[50px] hover:bg-ccmkt-main"
          @click="$emit('confirm')"
        >
          <slot name="confirm">
            <TypographyP1>{{ confirmText }}</TypographyP1>
          </slot>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
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
import { TypographyP1 } from '@/shared/components/ui/typography'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
  }>(),
  {
    description: '',
    confirmText: '확인',
    cancelText: '취소',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
const innerOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
