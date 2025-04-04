
import { create } from 'zustand'
import { Deal, Stage } from '@/lib/types'

interface DealsState {
  deals: Deal[]
  stages: Stage[]
  addDeal: (deal: Omit<Deal, 'id'>) => void
  updateDealStage: (id: string, stage: Stage) => void
  getDeal: (id: string) => Deal | undefined
}

export const useDeals = create<DealsState>((set, get) => ({
  deals: [
    {
      id: '1',
      name: 'Enterprise SaaS Deal',
      company: 'Acme Corp',
      value: 50000,
      status: 'active',
      stage: 'Prospect',
    },
    {
      id: '2',
      name: 'SMB Package',
      company: 'Small Biz Inc',
      value: 10000,
      status: 'active',
      stage: 'Lead',
    },
    // Add more sample deals as needed
  ],
  stages: ['Lead', 'Prospect', 'Proposal', 'Negotiation', 'Closed'],
  
  addDeal: (deal) => set((state) => ({
    deals: [...state.deals, { ...deal, id: Math.random().toString() }],
  })),
  
  updateDealStage: (id, stage) => set((state) => ({
    deals: state.deals.map((deal) =>
      deal.id === id ? { ...deal, stage } : deal
    ),
  })),

  getDeal: (id) => get().deals.find((deal) => deal.id === id),
}))