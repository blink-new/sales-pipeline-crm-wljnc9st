
import { Deal, Stage } from '../types'
import { DealCard } from './DealCard'
import { useDroppable } from '@dnd-kit/core'

interface PipelineColumnProps {
  stage: Stage
  deals: Deal[]
}

export function PipelineColumn({ stage, deals }: PipelineColumnProps) {
  const { setNodeRef } = useDroppable({
    id: stage.id,
  })

  return (
    <div className="w-80 flex-shrink-0">
      <div className="mb-3">
        <h2 className="font-semibold text-sm flex items-center">
          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: stage.color }} />
          {stage.name}
          <span className="ml-2 text-muted-foreground">({deals.length})</span>
        </h2>
      </div>

      <div
        ref={setNodeRef}
        className="min-h-[500px] p-2 rounded-lg bg-muted/50"
      >
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  )
}