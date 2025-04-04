
import { Deal, Stage } from '../types'
import { DealCard } from './DealCard'
import { Droppable } from '@hello-pangea/dnd'

interface StageColumnProps {
  stage: Stage
  deals: Deal[]
}

export function StageColumn({ stage, deals }: StageColumnProps) {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="mb-3">
        <h2 className="font-semibold text-sm flex items-center">
          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: stage.color }} />
          {stage.name}
          <span className="ml-2 text-muted-foreground">({deals.length})</span>
        </h2>
      </div>

      <Droppable droppableId={stage.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[500px]"
          >
            {deals.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}