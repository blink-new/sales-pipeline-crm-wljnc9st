
import { create } from 'zustand'
import { Deal, Stage } from '../types'

interface DealStore {
  deals: Deal[]
  stages: Stage[]
  addDeal: (deal: Deal) => void
  moveDeal: (dealId: string, newStage: string) => void
  addStage: (stage: Stage) => void
  updateStage: (stageId: string, updatedStage: Stage) => void
  removeStage: (stageId: string) => void
  reorderStages: (oldIndex: number, newIndex: number) => void
}

const defaultStages: Stage[] = [
  { id: 'friend', name: 'Friend', color: '#E9D8FD' },
  { id: 'lead', name: 'Lead', color: '#BEE3F8' },
  { id: 'contact-made', name: 'Contact Made', color: '#9AE6B4' },
  { id: 'proposal', name: 'Proposal', color: '#FBD38D' },
  { id: 'negotiation', name: 'Negotiation', color: '#FEB2B2' }
]

const useDealStore = create<DealStore>((set) => ({
  deals: [],
  stages: defaultStages,
  
  addDeal: (deal) => set((state) => ({ 
    deals: [...state.deals, deal] 
  })),
  
  moveDeal: (dealId, newStage) => set((state) => ({
    deals: state.deals.map((deal) =>
      deal.id === dealId ? { ...deal, stage: newStage } : deal
    ),
  })),

  addStage: (stage) => set((state) => ({
    stages: [...state.stages, stage]
  })),

  updateStage: (stageId, updatedStage) => set((state) => ({
    stages: state.stages.map((stage) =>
      stage.id === stageId ? updatedStage : stage
    ),
  })),

  removeStage: (stageId) => set((state) => ({
    stages: state.stages.filter((stage) => stage.id !== stageId),
    // Also remove deals in this stage or move them to first available stage
    deals: state.stages.length > 1 
      ? state.deals.map(deal => 
          deal.stage === stageId 
            ? { ...deal, stage: state.stages.find(s => s.id !== stageId)?.id || '' }
            : deal
        )
      : state.deals.filter(deal => deal.stage !== stageId)
  })),

  reorderStages: (oldIndex, newIndex) => set((state) => {
    const newStages = [...state.stages]
    const [removed] = newStages.splice(oldIndex, 1)
    newStages.splice(newIndex, 0, removed)
    return { stages: newStages }
  }),
}))

export default useDealStore