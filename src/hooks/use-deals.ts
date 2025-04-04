
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Deal, Stage } from '@/lib/types'

interface DealsState {
  deals: Deal[]
  stages: Stage[]
  addDeal: (deal: Deal) => void
  updateDealStage: (id: string, stageId: string) => void
  getDeal: (id: string) => Deal | undefined
}

export const useDeals = create<DealsState>()(
  persist(
    (set, get) => ({
      deals: [],
      stages: [
        { id: 'lead', name: 'Lead', color: '#6B7280' },
        { id: 'contact', name: 'Contact Made', color: '#3B82F6' },
        { id: 'proposal', name: 'Proposal', color: '#EAB308' },
        { id: 'negotiation', name: 'Negotiation', color: '#F97316' },
        { id: 'closed', name: 'Closed Won', color: '#22C55E' },
        { id: 'lost', name: 'Closed Lost', color: '#EF4444' }
      ],
      
      addDeal: (deal) => set((state) => ({
        deals: [...state.deals, deal],
      })),
      
      updateDealStage: (id, stageId) => set((state) => ({
        deals: state.deals.map((deal) =>
          deal.id === id ? { ...deal, stage: stageId } : deal
        ),
      })),

      getDeal: (id) => get().deals.find((deal) => deal.id === id),
    }),
    {
      name: 'deals-storage',
    }
  )
)