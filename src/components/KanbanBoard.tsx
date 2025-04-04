
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { StageColumn } from './StageColumn'
import useDealStore from '../store/dealStore'

export function KanbanBoard() {
  const { stages, deals, moveDeal } = useDealStore()

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    moveDeal(draggableId, destination.droppableId)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {stages.map((stage) => (
          <StageColumn
            key={stage.id}
            stage={stage}
            deals={deals.filter((deal) => deal.stage === stage.id)}
          />
        ))}
      </div>
    </DragDropContext>
  )
}