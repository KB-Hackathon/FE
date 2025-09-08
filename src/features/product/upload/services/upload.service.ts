import {
  ProductNarrativeRequest,
  ProductNarrativeResponse,
  UploadProductRequest,
} from '@/entities/product/product.api.type'
import { UploadImageResponse } from '@/entities/user/user.api.type'
import { api, ApiData } from '@/shared/plugin/axios'
import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getAiNarrative(
  form: ProductNarrativeRequest
): Promise<ApiData<ProductNarrativeResponse>> {
  const { url, method } = API_END_POINT.product.getAiNarrative()
  const result = await api<ApiData<ProductNarrativeResponse>>({
    url,
    method,
    data: form,
    showGlobalLoader: true,
    loaderMessage: ['AI가 자동 홍보글을 작성중이에요'],
  })
  return result.data
}

export async function uploadProduct(
  form: UploadProductRequest
): Promise<ApiData<UploadImageResponse>> {
  const { url, method } = API_END_POINT.product.postProduct()
  const result = await api<ApiData<UploadImageResponse>>({ url, method, data: form })
  return result.data
}
