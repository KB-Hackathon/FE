<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import Input from './Input.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative w-full items-center">
    <Input
      id="search"
      :value="props.modelValue"
      type="text"
      placeholder="상품을 검색해보세요"
      class="pl-[50px] text-[16px] py-5 rounded-full"
      @input="onInput"
    />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
      <Search class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>
