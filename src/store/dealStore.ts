
import { create } from 'zustand'
import { Deal, Stage, defaultStages } from '../types'

interface DealStore {
  deals: Deal[]
  stages: Stage[]
  addDeal: (deal: Deal) => void
  updateDeal: (deal: Deal) => void
  deleteDeal: (id: string) => void
  moveDeal: (dealId: string, toStage: string) => void
}

// Sample deals with different data
const initialDeals: Deal[] = [
  {
    id: 'deal1',
    name: 'Enterprise Software License',
    value: 50000,
    stage: 'lead',
    probability: 0.3,
    expectedCloseDate: new Date('2024-04-15'),
    companyId: 'comp1',
    contactId: 'contact1',
    description: 'Annual enterprise license for 500 users',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'deal2',
    name: 'Cloud Migration Project',
    value: 75000,
    stage: 'contact',
    probability: 0.5,
    expectedCloseDate: new Date('2024-05-01'),
    companyId: 'comp2',
    contactId: 'contact2',
    description: 'Full cloud infrastructure migration',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'deal3',
    name: 'Security Audit Package',
    value: 25000,
    stage: 'proposal',
    probability: 0.7,
    expectedCloseDate: new Date('2024-03-30'),
    companyId: 'comp3',
    contactId: 'contact3',
    description: 'Comprehensive security audit and recommendations',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'deal4',
    name: 'Custom Development',
    value: 120000,
    stage: 'negotiation',
    probability: 0.8,
    expectedCloseDate: new Date('2024-06-15'),
    companyId: 'comp4',
    contactId: 'contact4',
    description: 'Custom ERP module development',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'deal5',
    name: 'Training Program',
    value: 30000,
    stage: 'lead',
    probability: 0.4,
    expectedCloseDate: new Date('2024-04-30'),
    companyId: 'comp5',
    contactId: 'contact5',
    description: 'Technical training program for 100 employees',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
]

const useDealStore = create<DealStore>((set) => ({
  deals: initialDeals,
  stages: defaultStages,
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  updateDeal: (deal) =>
    set((state) => ({
      deals: state.deals.map((d) => (d.id === deal.id ? deal : d)),
    })),
  deleteDeal: (id) =>
    set((state) => ({
      deals: state.deals.filter((d) => d.id !== id),
    })),
  moveDeal: (dealId, toStage) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: toStage } : deal
      ),
    })),
}))

export default useDealStore