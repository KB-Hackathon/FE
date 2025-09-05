import { UploadImageResponse } from '@/entities/user/user.api.type'
import { UserInfo } from '@/entities/user/user.entity'
import { api, ApiData } from '@/shared/plugin/axios'
import { API_END_POINT } from '@/shared/utils/fetcher'

export async function uploadImage(file: FormData): Promise<ApiData<UploadImageResponse>> {
  const { url, method } = API_END_POINT.user.postImage()
  const result = await api<ApiData<UploadImageResponse>>({
    url,
    method,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return result.data
}

export async function getUserInfo(): Promise<ApiData<UserInfo>> {
  const { url, method } = API_END_POINT.user.getUserInfo()
  const result = await api<ApiData<UserInfo>>({ url, method })
  return result.data
}
