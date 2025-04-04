
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
  { id: 'lead', name: 'Lead', color: '#6B7280' },
  { id: 'contact', name: 'Contact Made', color: '#3B82F6' },
  { id: 'proposal', name: 'Proposal', color: '#EAB308' },
  { id: 'negotiation', name: 'Negotiation', color: '#F97316' },
  { id: 'closed', name: 'Closed Won', color: '#22C55E' },
  { id: 'lost', name: 'Closed Lost', color: '#EF4444' }
]