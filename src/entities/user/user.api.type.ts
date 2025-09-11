import { Coupon } from './user.entity'

export interface UploadImageResponse {
  url: string
}

export interface AdditionalInfoRequest {
  signupToken: string
  name: string
  age: number
  gender: string
  address: string
  phoneNumber?: string
  image?: string
}

export interface RegisterSellerResponse {
  id: number
  bizNo: string
  companyName: string
  repName: string
  industryBusinessType: string
  bizDescription: string
  companyPhoneNumber: string
  zipCode: string
  roadNameAddress: string
  companyClassificationCode: string
}

export interface CouponsResponse {
  coupons: Coupon[]
}

export interface BuyCouponResponse {
  couponCode: string
  expireDate: string
}
