import { defineStore } from 'pinia'
import type { UserInfo } from './user.entity'

type AuthState = {
  hasHydrated: boolean
  userInfo: UserInfo | null
  isLoggedIn: boolean
  accessToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    hasHydrated: false,
    userInfo: null,
    isLoggedIn: false,
    accessToken: null,
  }),
  actions: {
    setHydrated(v: boolean) {
      this.hasHydrated = v
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    },
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken
    },
    clearUserInfo() {
      this.hasHydrated = true
      this.userInfo = null
      this.isLoggedIn = false
      this.accessToken = null
    },
    setLoggedIn(v: boolean) {
      this.isLoggedIn = v
    },
    validateSession() {
      if (!this.userInfo || this.isLoggedIn === false) {
        this.clearUserInfo()
      }
      this.hasHydrated = true
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
