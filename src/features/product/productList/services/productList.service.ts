import { GetProductListRequest, GetProductListResponse } from '@/entities/product/product.api.type'
import { api, ApiData } from '@/shared/plugin/axios'
import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getProductList({
  category,
  status,
  isCoupon,
}: GetProductListRequest): Promise<ApiData<GetProductListResponse[]>> {
  const { url, method } = API_END_POINT.product.getProducts(category, status, isCoupon)
  const result = await api<ApiData<GetProductListResponse[]>>({ url, method })
  return result.data
}
