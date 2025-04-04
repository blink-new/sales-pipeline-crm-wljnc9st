
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { Stage } from '../types'
import useDealStore from '../store/dealStore'
import { PipelineColumn } from './PipelineColumn'
import { useState } from 'react'
import { DealCard } from './DealCard'

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

export function PipelineBoard() {
  const { deals, stages, moveDeal } = useDealStore()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [currentStage, setCurrentStage] = useState<string | null>(null)

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
    const deal = deals.find(d => d.id === active.id)
    if (deal) {
      setCurrentStage(deal.stage)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeDeal = deals.find(deal => deal.id === activeId)
    if (!activeDeal) return

    const overStage = stages.find(stage => stage.id === overId)
    if (overStage && activeDeal.stage !== overId) {
      setCurrentStage(overId)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) {
      setActiveId(null)
      setCurrentStage(null)
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    const activeDeal = deals.find(deal => deal.id === activeId)
    if (!activeDeal) return

    const overStage = stages.find(stage => stage.id === overId)
    if (overStage) {
      moveDeal(activeId, overId)
    } else {
      if (currentStage && currentStage !== activeDeal.stage) {
        moveDeal(activeId, currentStage)
      }
    }

    setActiveId(null)
    setCurrentStage(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setCurrentStage(null)
  }

  const activeDeal = activeId ? deals.find(deal => deal.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 h-[calc(100vh-8rem)] overflow-x-auto p-4">
        {stages.map((stage: Stage) => (
          <PipelineColumn
            key={stage.id}
            stage={stage}
            deals={deals.filter((deal) => deal.stage === stage.id)}
            isDropping={currentStage === stage.id}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeId && activeDeal ? (
          <div className="w-80">
            <DealCard deal={activeDeal} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}