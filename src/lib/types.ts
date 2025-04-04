
export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  timezone?: string
  settings: {
    twoFactorEnabled: boolean
    emailNotifications: boolean
    darkMode: boolean
    language: string
  }
}