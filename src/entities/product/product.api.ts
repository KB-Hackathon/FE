import { Method } from '@/shared/utils/fetcher'

export const product = {
  getAiNarrative: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/products/narrative`,
    method: Method.POST,
  }),
  postProduct: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/products/save`,
    method: Method.POST,
  }),
  getProducts: (_category: string, _status: string, _isCoupon: boolean) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/products`,
    method: Method.GET,
  }),
  getProduct: (productId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/products/${productId}`,
    method: Method.GET,
  }),
}
