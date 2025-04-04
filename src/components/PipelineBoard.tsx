
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
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
    if (!over) return

    const dealId = active.id as string
    const toStage = over.id as string

    if (stages.find(stage => stage.id === toStage)) {
      moveDeal(dealId, toStage)
    }
    setActiveDeal(null)
  }

  return (
    <DndContext 
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
      <DragOverlay>
        {activeDeal ? (
          <div className="w-80">
            <DealCard deal={deals.find(d => d.id === activeDeal)!} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}