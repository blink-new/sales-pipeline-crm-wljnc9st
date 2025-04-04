
import { DealCard } from "./DealCard"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"
import { useDeals } from "@/hooks/use-deals"

export function Pipeline() {
  const { deals, stages, updateDealStage } = useDeals()

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    
    const { draggableId, destination } = result
    const deal = deals.find(d => d.id === draggableId)
    if (!deal) return

    updateDealStage(deal.id, destination.droppableId)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex w-80 flex-none flex-col">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: stage.color }}
                />
                <h2 className="font-semibold">{stage.name}</h2>
              </div>
              <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                {deals.filter((d) => d.stage === stage.id).length}
              </span>
            </div>
            <Droppable droppableId={stage.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "flex flex-1 flex-col gap-2 rounded-lg bg-muted/50 p-2 min-h-[200px]",
                    snapshot.isDraggingOver && "bg-muted"
                  )}
                >
                  {deals
                    .filter((deal) => deal.stage === stage.id)
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
                                snapshot.isDraggingOver && "shadow-lg",
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