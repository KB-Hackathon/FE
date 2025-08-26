import Test from '@/pages/Test.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'test',
      component: Test,
      path: '/test',
    },
  ],
})

export default router
