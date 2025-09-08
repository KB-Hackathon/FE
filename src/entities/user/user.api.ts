import { Method } from '@/shared/utils/fetcher'

export const user = {
  postImage: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/s3/image`,
    method: Method.POST,
  }),
  postAdditional: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/oauth/signup/additional`,
    method: Method.POST,
  }),
  getUserInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/me`,
    method: Method.GET,
  }),
  postRegisterSeller: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/sellers/register`,
    method: Method.POST,
  }),
}
