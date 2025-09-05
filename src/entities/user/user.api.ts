import { Method } from '@/shared/utils/fetcher'

export const user = {
  postImage: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/s3/image`,
    method: Method.POST,
  }),
  getUserInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/me`,
    method: Method.GET,
  }),
}
