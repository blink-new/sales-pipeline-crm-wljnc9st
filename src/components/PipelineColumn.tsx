
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Deal, Stage } from '../types'
import { SortableDealCard } from './SortableDealCard'
import { cn } from '../lib/utils'

interface PipelineColumnProps {
  stage: Stage
  deals: Deal[]
  isDropping?: boolean
}

export function PipelineColumn({ stage, deals, isDropping }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-80 shrink-0 bg-white rounded-lg border shadow-sm",
        isOver && "ring-2 ring-primary/20",
        isDropping && "ring-2 ring-primary"
      )}
    >
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">{stage.name}</span>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {deals.length}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            ${totalValue.toLocaleString()}
          </div>
        </div>
      </div>

      <SortableContext 
        id={stage.id} 
        items={deals.map(d => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-3 space-y-3 min-h-[200px]">
          {deals.map((deal) => (
            <SortableDealCard key={deal.id} deal={deal} />
          ))}
          {deals.length === 0 && (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              Drop deals here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}