import { Method } from '@/shared/utils/fetcher'

export const market = {
  getReport: (sellerId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/report/${sellerId}`,
    method: Method.GET,
  }),
}
