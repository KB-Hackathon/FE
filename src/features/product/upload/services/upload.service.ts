import { AiNarrativeRequest, AiNarrativeResponse } from '@/entities/product/product.api.type'
import { api, ApiData } from '@/shared/plugin/axios'
import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getAiNarrative(
  form: AiNarrativeRequest
): Promise<ApiData<AiNarrativeResponse>> {
  const { url, method } = API_END_POINT.product.getAiNarrative()
  const result = await api<ApiData<AiNarrativeResponse>>({ url, method, data: form })
  return result.data
}
