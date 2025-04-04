
import { useDraggable } from '@dnd-kit/core'
import { Deal } from '../types'
import { DealCard } from './DealCard'
import { cn } from '../lib/utils'

interface SortableDealCardProps {
  deal: Deal
}

export function SortableDealCard({ deal }: SortableDealCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: deal.id,
    data: deal,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'touch-none',
        isDragging && 'opacity-50'
      )}
    >
      <DealCard deal={deal} />
    </div>
  )
}