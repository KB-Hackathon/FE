import { Method } from '@/shared/utils/fetcher'

export const market = {
  getReport: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/report/me`,
    method: Method.GET,
  }),
}
