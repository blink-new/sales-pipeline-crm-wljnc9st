
export interface Deal {
  id: string
  name: string
  value: number
  stage: string
  probability?: number
  expectedCloseDate?: string
  companyId?: string
  contactId?: string
  description?: string
  createdAt: string
  updatedAt?: string
}

export interface Stage {
  id: string
  name: string
  color: string
}