
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

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  companyId: string
  title: string
  lastContactedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  name: string
  industry: string
  size: string
  website: string
  createdAt: Date
  updatedAt: Date
}

export type Stage = {
  id: string
  name: string
  color: string
}

export const defaultStages: Stage[] = [
  { id: 'lead', name: 'Lead', color: 'bg-gray-500' },
  { id: 'contact', name: 'Contact Made', color: 'bg-blue-500' },
  { id: 'proposal', name: 'Proposal', color: 'bg-yellow-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500' },
  { id: 'closed', name: 'Closed Won', color: 'bg-green-500' },
  { id: 'lost', name: 'Closed Lost', color: 'bg-red-500' },
]