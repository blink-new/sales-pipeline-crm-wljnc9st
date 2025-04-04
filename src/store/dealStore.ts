
import { create } from 'zustand'
import { Deal, Stage } from '../types'

interface DealStore {
  deals: Deal[]
  stages: Stage[]
  addDeal: (deal: Deal) => void
  moveDeal: (dealId: string, newStage: string) => void
}

const defaultStages: Stage[] = [
  { id: 'friend', name: 'Friend' },
  { id: 'lead', name: 'Lead' },
  { id: 'contact-made', name: 'Contact Made' },
  { id: 'proposal', name: 'Proposal' },
  { id: 'negotiation', name: 'Negotiation' }
]

const useDealStore = create<DealStore>((set) => ({
  deals: [],
  stages: defaultStages,
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  moveDeal: (dealId, newStage) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      ),
    })),
}))

export default useDealStore