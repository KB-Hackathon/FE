import {
  AdditionalInfo,
  Archive,
  BusinessLookup,
  Home,
  Login,
  My,
  Product,
  SelectRole,
  Seller,
  Test,
} from '@/pages'
import OwnerHome from '@/pages/OwnerHome.vue'
import UploadProduct from '@/pages/UploadProduct.vue'
import { useLoadingStore } from '@/shared/stores/loading'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
    name: 'login',
    path: '/login',
    component: Login,
    meta: { header: false },
  },
  {
    name: 'select_role',
    path: '/select_role',
    component: SelectRole,
    meta: { header: false },
  },
  {
    name: 'additional_info',
    path: '/additional_info',
    component: AdditionalInfo,
    meta: { header: false },
  },
  {
    name: 'business_lookup',
    path: '/business_lookup',
    component: BusinessLookup,
    meta: { header: false },
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
  {
    name: 'upload_product',
    path: '/upload',
    component: UploadProduct,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((_to, _from, next) => {
  useLoadingStore().start()
  next()
})
router.afterEach(() => {
  useLoadingStore().done()
})
router.onError(() => {
  useLoadingStore().done()
})

export default router
