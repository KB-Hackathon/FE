<template>
  <Tabs
    v-model="tab"
    class="mb-4"
    @update:model-value="onTabChange"
  >
    <TabsList>
      <TabsTrigger value="buy">
        <TypographySubTitle1 class="p-1">
          구매하기
        </TypographySubTitle1>
      </TabsTrigger>
      <TabsTrigger value="sell">
        <TypographySubTitle1 class="p-1">
          판매하기
        </TypographySubTitle1>
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { TypographySubTitle1 } from '@/shared/components/ui/typography'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const tab = computed<string>({
  get: () => (route.name === 'owner_main' ? 'sell' : 'buy'),
  set: (val: string) => onTabChange(val),
})

function onTabChange(payload: string | number) {
  const v = String(payload)
  if (v === 'buy') router.push({ name: 'home' })
  else if (v === 'sell') router.push({ name: 'owner_main' })
}
</script>
