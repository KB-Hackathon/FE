import { ReportResponse } from '@/entities/market/market.api.type'
import { api, ApiData } from '@/shared/plugin/axios'
import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getMarketReport(sellerId: string): Promise<ApiData<ReportResponse>> {
  const { url, method } = API_END_POINT.market.getReport()
  const result = await api<ApiData<ReportResponse>>({
    url,
    method,
  })
  return result.data
}
