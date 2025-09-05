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
