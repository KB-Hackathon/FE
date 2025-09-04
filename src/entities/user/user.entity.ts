export interface UserInfo {
  id: number
  name: string
  age: number
  address: string
  phoneNumber?: string
  role: 'BUYER' | 'SELLER'
  image?: string
}
