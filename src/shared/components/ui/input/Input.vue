<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import { ref, type HTMLAttributes } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()
const el = ref<HTMLInputElement | null>(null)
defineExpose({ focus: () => el.value?.focus(), el })
const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    ref="el"
    v-model="modelValue"
    v-bind="$attrs"
    :class="
      cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ccmkt-main disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  >
</template>
