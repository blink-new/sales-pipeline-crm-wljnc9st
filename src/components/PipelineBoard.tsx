
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { Stage } from '../types'
import useDealStore from '../store/dealStore'
import { PipelineColumn } from './PipelineColumn'
import { useState } from 'react'
import { DealCard } from './DealCard'

export function PipelineBoard() {
  const { deals, stages, moveDeal } = useDealStore()
  const [activeDeal, setActiveDeal] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveDeal(active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    // Reset active deal
    setActiveDeal(null)
    
    // If no valid drop target, return early
    if (!over) return

    const dealId = active.id as string
    const toStage = over.id as string

    // Only move if dropping on a valid stage
    const isValidStage = stages.some(stage => stage.id === toStage)
    if (isValidStage) {
      moveDeal(dealId, toStage)
    }
  }

  const handleDragCancel = () => {
    setActiveDeal(null)
  }

  const activeDealData = activeDeal ? deals.find(d => d.id === activeDeal) : null

  return (
    <DndContext 
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 h-[calc(100vh-12rem)] overflow-x-auto p-4">
        {stages.map((stage: Stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage.id)
          return (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              deals={stageDeals}
            />
          )
        })}
      </div>
      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
      }}>
        {activeDealData ? (
          <div className="w-80 opacity-80">
            <DealCard deal={activeDealData} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}