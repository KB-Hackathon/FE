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
  getProducts: (category?: string, status?: string, isCoupon?: boolean) => {
    const params = new URLSearchParams()

    if (category) params.append('category', category)
    if (status) params.append('status', status)
    if (isCoupon !== undefined) params.append('isCoupon', String(isCoupon))

    return {
      url: `${import.meta.env.VITE_APP_API_URL}/api/products?${params.toString()}`,
      method: Method.GET,
    }
  },
  getProduct: (productId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/products/${productId}`,
    method: Method.GET,
  }),
  getProductNarrative: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/products/narrative`,
    method: Method.GET,
  }),
}
