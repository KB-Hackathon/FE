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
