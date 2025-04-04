
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'
import { Stage } from '../types'
import useDealStore from '../store/dealStore'
import { PipelineColumn } from './PipelineColumn'

export function PipelineBoard() {
  const { deals, stages, moveDeal } = useDealStore()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const dealId = active.id as string
    const toStage = over.id as string

    if (dealId && toStage) {
      moveDeal(dealId, toStage)
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-[calc(100vh-12rem)] overflow-x-auto p-4">
        {stages.map((stage: Stage) => (
          <PipelineColumn
            key={stage.id}
            stage={stage}
            deals={deals.filter((deal) => deal.stage === stage.id)}
          />
        ))}
      </div>
    </DndContext>
  )
}