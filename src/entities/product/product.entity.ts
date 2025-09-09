import babyImg from '@/assets/images/category/baby.png'
import beautyImg from '@/assets/images/category/beauty.png'
import fashionImg from '@/assets/images/category/fashion.png'
import foodImg from '@/assets/images/category/food.png'
import hobbyImg from '@/assets/images/category/hobby.png'
import sportsImg from '@/assets/images/category/sports.png'

export interface Category {
  name: string
  image: string
}

export const categoryList: Category[] = [
  { name: '의류', image: fashionImg },
  { name: '미용', image: beautyImg },
  { name: '식재료', image: foodImg },
  { name: '취미', image: hobbyImg },
  { name: '운동', image: sportsImg },
  { name: '유아', image: babyImg },
  { name: '외식', image: fashionImg },
  { name: '카페', image: beautyImg },
  { name: '반려동물', image: foodImg },
  { name: '숙박', image: hobbyImg },
  { name: '문구', image: sportsImg },
  { name: '교육', image: babyImg },
]

export interface Seller {
  memberId: string
  companyName: string
  repName: string
  companyPhoneNumber: string
  sellerAddress: string
}

export interface ProductInfo {
  productId: string
  title: string
  description: string
  images: { imageId: number; url: string }[]
  category: string
  price: number
  isCoupon: boolean
  targetAmount: number
  presentPersonCount: number
  totalPrice: number
  recruitmentStartPeriod: string
  recruitmentEndPeriod: string
  tags: string[] | { tagId: number; name: string }[]
}

export interface Product {
  seller: Seller
  product: ProductInfo
}
