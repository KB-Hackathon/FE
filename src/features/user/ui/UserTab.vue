<template>
  <Tabs
    v-model="tab"
    class="mb-4"
  >
    <TabsList>
      <TabsTrigger value="buy">
        구매하기
      </TabsTrigger>
      <TabsTrigger value="sell">
        판매하기
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/user/user.store'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const tab = ref(route.name === 'owner_main' ? 'sell' : 'buy')
watch(
  () => route.name,
  (name) => {
    tab.value = name === 'owner_main' ? 'sell' : 'buy'
  }
)

watch(tab, async (v) => {
  if (v === 'buy') {
    if (route.name !== 'home') await router.push({ name: 'home' })
    return
  }

  if (!auth.isLoggedIn) {
    await router.push({ name: 'login' })
    return
  }

  if (auth.userInfo?.role === 'BUYER') {
    await router.push({ name: 'business_lookup' })
    return
  }

  if (route.name !== 'owner_main') {
    await router.push({ name: 'owner_main' })
  }
})
</script>
