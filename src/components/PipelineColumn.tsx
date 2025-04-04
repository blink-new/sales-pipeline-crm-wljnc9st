
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

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-80 shrink-0 p-2 rounded-lg",
        isOver && "bg-muted/50",
        isDropping && "ring-2 ring-primary"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{stage.name}</h3>
        <span className="text-muted-foreground text-sm">
          {deals.length} {deals.length === 1 ? 'deal' : 'deals'}
        </span>
      </div>

      <SortableContext 
        id={stage.id} 
        items={deals.map(d => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {deals.map((deal) => (
            <SortableDealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}