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
