
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Deal, Stage } from '../types'

interface DealStore {
  deals: Deal[]
  stages: Stage[]
  addDeal: (deal: Deal) => void
  removeDeal: (id: string) => void
  moveDeal: (id: string, toStage: string) => void
  addStage: (stage: Stage) => void
  removeStage: (id: string) => void
  updateStage: (id: string, stage: Stage) => void
  reorderStages: (oldIndex: number, newIndex: number) => void
}

const defaultDeal: Deal = {
  id: '1',
  name: 'Example Deal',
  value: 50000,
  stage: 'lead',
  probability: 50,
  expectedCloseDate: new Date(),
  companyId: '1',
  contactId: '1',
  description: 'Example deal for demonstration',
  createdAt: new Date(),
  updatedAt: new Date()
}

const useDealStore = create<DealStore>()(
  persist(
    (set) => ({
      deals: [defaultDeal],
      stages: [
        { id: 'lead', name: 'Lead', color: '#6B7280' },
        { id: 'contact', name: 'Contact Made', color: '#3B82F6' },
        { id: 'proposal', name: 'Proposal', color: '#EAB308' },
        { id: 'negotiation', name: 'Negotiation', color: '#F97316' },
        { id: 'closed', name: 'Closed Won', color: '#22C55E' },
        { id: 'lost', name: 'Closed Lost', color: '#EF4444' }
      ],
      addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
      removeDeal: (id) => set((state) => ({
        deals: state.deals.filter((d) => d.id !== id),
      })),
      moveDeal: (id, toStage) => set((state) => ({
        deals: state.deals.map((d) =>
          d.id === id ? { ...d, stage: toStage } : d
        ),
      })),
      addStage: (stage) => set((state) => ({
        stages: [...state.stages, stage],
      })),
      removeStage: (id) => set((state) => ({
        stages: state.stages.filter((s) => s.id !== id),
        deals: state.deals.filter((d) => d.stage !== id),
      })),
      updateStage: (id, stage) => set((state) => ({
        stages: state.stages.map((s) =>
          s.id === id ? stage : s
        ),
      })),
      reorderStages: (oldIndex, newIndex) => set((state) => {
        const stages = [...state.stages]
        const [removed] = stages.splice(oldIndex, 1)
        stages.splice(newIndex, 0, removed)
        return { stages }
      }),
    }),
    {
      name: 'deal-store',
    }
  )
)

export default useDealStore