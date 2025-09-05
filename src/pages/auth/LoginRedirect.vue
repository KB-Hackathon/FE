<template>
  <div />
</template>
<script setup lang="ts">
import { useAuthStore } from '@/entities/user/user.store'
import { getUserInfo } from '@/features/user/services/user.service'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const accessToken = route.query.access_token as string
const auth = useAuthStore()
async function handleLoginState() {
  if (accessToken) {
    auth.setAccessToken(accessToken)
    auth.setLoggedIn(true)
    const result = await getUserInfo()
    auth.setUserInfo(result.data)

    router.replace({ name: 'home' })
  }
}

onMounted(() => {
  handleLoginState()
})
</script>
