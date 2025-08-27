<template>
  <div
    class="m-auto max-w-[390px] bg-white w-full flex items-center justify-around px-4 py-3 shadow-top"
  >
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      class="flex flex-col gap-1"
      @click="selectTab(tab.value)"
    >
      <i :class="cn('bi text-xl', isActive(tab.value) ? tab.active_icon : tab.icon)" />
      <TypographyCaption>{{ tab.label }}</TypographyCaption>
    </button>
  </div>
</template>
<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useRoute, useRouter } from 'vue-router'
import { TypographyCaption } from './ui/typography'

const route = useRoute()
const router = useRouter()

const tabs = [
  {
    icon: 'bi-archive',
    active_icon: 'bi-archive-fill',
    value: 'archive',
    label: '보관함',
    location: '/archive',
  },
  {
    icon: 'bi-house',
    active_icon: 'bi-house-fill',
    value: 'home',
    label: '홈',
    location: '/main',
  },
  { icon: 'bi-person', active_icon: 'bi-person-fill', value: 'my', label: '마이', location: '/my' },
]

const isActive = (tabValue: string): boolean => {
  const path = route.path

  if (tabValue === 'archive') return path.startsWith('/archive')
  if (tabValue === 'home') return path.startsWith('/main')
  if (tabValue === 'my') return path.startsWith('/my')
  return false
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectTab = (tab: string) => {
  const selected = tabs.find((t) => t.value === tab)
  if (!selected) return

  emit('update:modelValue', tab)
  router.push(selected.location)
}
</script>
<style>
.shadow-top {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
