
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
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

    // Only move between columns if the over target is a stage
    if (stages.find(stage => stage.id === toStage)) {
      moveDeal(dealId, toStage)
    }
  }

  // Get all deal IDs for sortable context
  const dealIds = deals.map(deal => deal.id)

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={dealIds} strategy={verticalListSortingStrategy}>
        <div className="flex gap-4 h-[calc(100vh-12rem)] overflow-x-auto p-4">
          {stages.map((stage: Stage) => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              deals={deals.filter((deal) => deal.stage === stage.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}