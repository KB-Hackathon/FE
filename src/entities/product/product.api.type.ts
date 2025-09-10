import { ProductInfo, Seller } from './product.entity'

export interface UploadProductRequest {
  productId: number
  title: string
  category: string
  images: string[]
  description: string
  tags: string[]
  price: number
  isCoupon: boolean
  couponName: string
  couponExpiration: number
  targetAmount: number
  recruitmentStartPeriod: string
  recruitmentEndPeriod: string
}

export interface UploadProductResponse {
  productId: number
}

export interface GetProductListRequest {
  category: string | undefined
  status: string | undefined
  isCoupon: boolean | undefined
}

export interface GetProductResponse {
  seller: Seller
  product: ProductInfo
}

export interface ProductNarrativeRequest {
  title: string
  category: string
  summary: string
  images: string[]
  price: number
  recruitmentEndPeriod: string
}

export interface ProductNarrativeResponse {
  productId: number
  caption: string
  hashtags: string[]
}
