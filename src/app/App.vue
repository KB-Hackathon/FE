<script setup lang="ts">
import { Toaster } from '@/shared/components/ui/sonner'
import { RouterView } from 'vue-router'
import 'vue-sonner/style.css'

import GlobalLoader from '@/shared/components/molecules/GlobalLoader.vue'
import Layout from './layout.vue'

import Splash from '@/shared/components/molecules/Splash.vue'
import { onMounted, ref } from 'vue'

const showSplash = ref(true)
onMounted(() => {
  setTimeout(() => (showSplash.value = false), 2000)
})
</script>

<template>
  <Splash :visible="showSplash" />

  <Layout v-show="!showSplash">
    <Toaster />
    <RouterView />
    <GlobalLoader />
  </Layout>
</template>
