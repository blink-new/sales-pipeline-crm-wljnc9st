
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Deal } from '../types'
import { DealCard } from './DealCard'
import { cn } from '../lib/utils'

interface SortableDealCardProps {
  deal: Deal
}

export function SortableDealCard({ deal }: SortableDealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={cn(
        'touch-none',
        isDragging && 'opacity-50'
      )}
    >
      <DealCard deal={deal} />
    </div>
  )
}