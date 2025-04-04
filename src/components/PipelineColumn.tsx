
import { useDroppable } from '@dnd-kit/core'
import { Stage, Deal } from '../types'
import { cn } from '../lib/utils'
import { SortableDealCard } from './SortableDealCard'

interface PipelineColumnProps {
  stage: Stage
  deals: Deal[]
}

export function PipelineColumn({ stage, deals }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  return (
    <div
      className={cn(
        'flex-shrink-0 w-80 bg-muted/30 rounded-lg p-4',
        isOver && 'ring-2 ring-primary/20'
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn('w-3 h-3 rounded-full', stage.color)} />
          <h3 className="font-semibold">{stage.name}</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {deals.length} deals
        </span>
      </div>
      <div
        ref={setNodeRef}
        className="h-full overflow-y-auto"
      >
        {deals.map((deal) => (
          <SortableDealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  )
}