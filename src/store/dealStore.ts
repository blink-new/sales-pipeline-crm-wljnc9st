
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

const useDealStore = create<DealStore>((set) => ({
  deals: [],
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