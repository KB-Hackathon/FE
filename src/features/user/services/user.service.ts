import { UploadImageResponse } from '@/entities/user/user.api.type'
import { api } from '@/shared/plugin/axios'
import { API_END_POINT } from '@/shared/utils/fetcher'

export async function uploadImage(file: FormData): Promise<UploadImageResponse> {
  const { url, method } = API_END_POINT.user.postImage()
  const result = await api<UploadImageResponse>({
    url,
    method,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return result.data
}
