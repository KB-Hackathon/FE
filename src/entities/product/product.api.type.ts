import { ProductInfo, Seller } from './product.entity'

export interface UploadProductRequest {
  title: string
  category: string
  images: string[]
  description: string
  tags: string[]
  price: number
  isCoupon: boolean
  couponName: string
  couponExpiration: string
  targetAmount: number
  recruitmentStartPeriod: string
  recruitmentEndPeriod: string
}

export interface UploadProductResponse {
  productId: number
}

export interface GetProductListRequest {
  category: string
  status: string
  isCoupon: boolean
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
