<script setup lang="ts">
import { Toaster } from '@/shared/components/ui/sonner'
import { RouterView } from 'vue-router'
import 'vue-sonner/style.css'

import GlobalLoader from '@/shared/components/molecules/GlobalLoader.vue'
import Layout from './layout.vue'
</script>

<template>
  <Layout>
    <Toaster />
    <RouterView />
    <GlobalLoader />
  </Layout>
</template>
