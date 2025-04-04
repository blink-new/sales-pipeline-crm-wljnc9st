
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Deal, Stage } from '../types'
import { SortableDealCard } from './SortableDealCard'
import { cn } from '../lib/utils'
import { Badge } from './ui/badge'
import { Card } from './ui/card'

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
    <Card
      ref={setNodeRef}
      className={cn(
        "w-80 shrink-0",
        isOver && "ring-2 ring-primary/20 bg-muted/50",
        isDropping && "ring-2 ring-primary"
      )}
    >
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{stage.name}</h3>
            <Badge variant="secondary" className="rounded-full">
              {deals.length}
            </Badge>
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
    </Card>
  )
}