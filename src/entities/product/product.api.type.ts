export interface AiNarrativeRequest {
  title: string
  category: string
  summary: string
  images: string[]
}

export interface AiNarrativeResponse {
  productId: number
  caption: string
  hashtags: string[]
}

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
