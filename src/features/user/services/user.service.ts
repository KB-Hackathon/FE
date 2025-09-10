import {
  AdditionalInfoRequest,
  RegisterSellerResponse,
  UploadImageResponse,
} from '@/entities/user/user.api.type'
import { AccessToken, UserInfo } from '@/entities/user/user.entity'
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

export async function postAdditionalInfo(
  form: AdditionalInfoRequest
): Promise<ApiData<AccessToken>> {
  const { url, method } = API_END_POINT.user.postAdditional()
  const result = await api<ApiData<AccessToken>>({ url, method, data: form })
  return result.data
}

export async function registerSeller(bizNo: string): Promise<ApiData<RegisterSellerResponse>> {
  const { url, method } = API_END_POINT.user.postRegisterSeller()
  const result = await api<ApiData<RegisterSellerResponse>>({ url, method, data: { bizNo } })
  return result.data
}
