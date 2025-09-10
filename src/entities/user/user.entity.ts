export interface UserInfo {
  id: number
  name: string
  age: number
  gender: 'MALE' | 'FEMALE'
  address: string
  phoneNumber?: string
  role: 'BUYER' | 'SELLER'
  image?: string
}

export interface AccessToken {
  accessToken: string
}

export interface Coupon {
  couponId: number
  couponUUID: string
  couponName: string
  expiration: string
  isUsed: boolean
  orderId: number
  memberId: number
  productId: number
  productTitle: string
  sellerId: number
  storeName: string
}
