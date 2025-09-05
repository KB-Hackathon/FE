import babyImg from '@/assets/images/category/baby.png'
import beautyImg from '@/assets/images/category/beauty.png'
import digitalImg from '@/assets/images/category/digital.png'
import fashionImg from '@/assets/images/category/fashion.png'
import foodImg from '@/assets/images/category/food.png'
import hobbyImg from '@/assets/images/category/hobby.png'
import livingImg from '@/assets/images/category/living.png'
import sportsImg from '@/assets/images/category/sports.png'

export interface Category {
  name: string
  image: string
}

export const categoryList: Category[] = [
  { name: '패션', image: fashionImg },
  { name: '뷰티 / 헬스', image: beautyImg },
  { name: '디지털/가전', image: digitalImg },
  { name: '생활 / 주방', image: livingImg },
  { name: '식품', image: foodImg },
  { name: '취미 / 문구', image: hobbyImg },
  { name: '스포츠', image: sportsImg },
  { name: '유아', image: babyImg },
]

export type ProductType = '배송' | '쿠폰'
export interface Seller {
  id: string
  name: string
  rating?: number // 0~5
  ratingCount?: number // 리뷰/평가 수
  verified?: boolean
}

export interface Pricing {
  originalPrice?: number // 정가
  salePrice?: number // 판매가
  unitLabel?: string // '개', '세트' 등
  coupon?: Coupon
}
export interface Coupon {
  couponName: string
  startDate: string
  endDate: string
}
export interface GroupBuying {
  // 공동구매/딜 정보(카드, 상세 공통)
  progressPct?: number // 진행률 0~100
  participants?: number // 참여 인원
  targetAmount?: number // 목표 금액 (선택)
  achievedAmount?: number // 달성 금액 (선택)
  startAt?: string // ISO
  endAt?: string // ISO (남은 일 계산용)
}

export interface Product {
  id: string
  title: string // 상품명(긴 제목)
  description?: string // 상세 설명(HTML/Markdown 가능)

  seller: Seller
  category: Category
  media: string[]

  pricing?: Pricing
  rating?: { score: number; count: number }
  shipping?: { method?: string; fee?: number; isFree?: boolean }

  groupBuying?: GroupBuying
  productType: ProductType
  tags?: string[]
}
