
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
        "w-80 shrink-0 bg-card rounded-xl border shadow-sm",
        isOver && "ring-2 ring-primary/20 bg-muted/50",
        isDropping && "ring-2 ring-primary"
      )}
    >
      <div className="p-3 border-b bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{stage.name}</h3>
            <div className="flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-muted">
              {deals.length}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            ${deals.reduce((sum, deal) => sum + (deal.value || 0), 0).toLocaleString()}
          </div>
        </div>
      </div>

      <SortableContext 
        id={stage.id} 
        items={deals.map(d => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-3 space-y-3">
          {deals.map((deal) => (
            <SortableDealCard key={deal.id} deal={deal} />
          ))}
          {deals.length === 0 && (
            <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg border-muted">
              <p className="text-sm text-muted-foreground">Drop deals here</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}