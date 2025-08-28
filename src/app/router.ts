import { Archive, Home, My, Product, Seller, Test } from '@/pages'
import OwnerHome from '@/pages/OwnerHome.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'test',
      path: '/test',
      component: Test,
      meta: { footer: true },
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      meta: { footer: true },
    },
    {
      name: 'archive',
      path: '/archive',
      component: Archive,
      meta: { footer: true },
    },

    {
      name: 'my',
      path: '/my',
      component: My,
      meta: { footer: true },
    },
    {
      name: 'product',
      path: '/product/:productId',
      component: Product,
    },
    {
      name: 'seller',
      path: '/seller/:sellerId',
      component: Seller,
    },
    {
      name: 'owner_main',
      path: '/owner_main',
      component: OwnerHome,
    },
  ],
})

export default router
