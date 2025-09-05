import { Category } from './product.entity'

import babyImg from '@/assets/images/category/baby.png'
import beautyImg from '@/assets/images/category/beauty.png'
import digitalImg from '@/assets/images/category/digital.png'
import fashionImg from '@/assets/images/category/fashion.png'
import foodImg from '@/assets/images/category/food.png'
import hobbyImg from '@/assets/images/category/hobby.png'
import livingImg from '@/assets/images/category/living.png'
import sportsImg from '@/assets/images/category/sports.png'

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
