import { Archive, Home, My, Test } from '@/pages'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'test',
      path: '/test',
      component: Test,
    },
    {
      name: 'home',
      path: '/main',
      component: Home,
    },
    {
      name: 'archive',
      path: '/archive',
      component: Archive,
    },
    {
      name: 'my',
      path: '/my',
      component: My,
    },
  ],
})

export default router
