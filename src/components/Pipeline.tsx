
import { DealCard } from "./DealCard"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { useDeals } from "@/hooks/use-deals"
import { Deal, Stage } from "@/lib/types"
import { cn } from "@/lib/utils"

export function Pipeline() {
  const { deals, stages, updateDealStage } = useDeals()

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    
    const { draggableId, destination } = result
    const deal = deals.find(d => d.id === draggableId)
    if (!deal) return

    updateDealStage(deal.id, destination.droppableId as Stage)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {stages.map((stage) => (
          <div key={stage} className="flex w-80 flex-none flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">{stage}</h2>
              <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                {deals.filter((d) => d.stage === stage).length}
              </span>
            </div>
            <Droppable droppableId={stage}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "flex flex-1 flex-col gap-2 rounded-lg bg-muted/50 p-2",
                    snapshot.isDraggingOver && "bg-muted"
                  )}
                >
                  {deals
                    .filter((deal) => deal.stage === stage)
                    .map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <DealCard
                              deal={deal}
                              className={cn(
                                snapshot.isDragging && "shadow-lg",
                                "bg-background"
                              )}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}