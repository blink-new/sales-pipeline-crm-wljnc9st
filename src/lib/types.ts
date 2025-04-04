
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

export interface Deal {
  id: string
  name: string
  value: number
  stage: string
  probability: number
  expectedCloseDate: Date
  companyId: string
  contactId: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Stage {
  id: string
  name: string
  color: string
}