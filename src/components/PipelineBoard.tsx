
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners 
} from '@dnd-kit/core'
import { 
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Stage } from '../types'
import useDealStore from '../store/dealStore'
import { PipelineColumn } from './PipelineColumn'
import { useState } from 'react'

export function PipelineBoard() {
  const { deals, stages, moveDeal } = useDealStore()
  const [activeId, setActiveId] = useState<string | null>(null)

  // Configure sensors for both mouse and touch
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the stages
    const activeDeal = deals.find(deal => deal.id === activeId)
    if (!activeDeal) return

    // If over a stage container
    if (stages.find(stage => stage.id === overId)) {
      if (activeDeal.stage !== overId) {
        moveDeal(activeId, overId)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // If dropped over a stage
    if (stages.find(stage => stage.id === overId)) {
      moveDeal(activeId, overId)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-[calc(100vh-12rem)] overflow-x-auto p-4">
        <SortableContext items={stages} strategy={horizontalListSortingStrategy}>
          {stages.map((stage: Stage) => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              deals={deals.filter((deal) => deal.stage === stage.id)}
              isDropping={activeId ? deals.find(d => d.id === activeId)?.stage === stage.id : false}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}