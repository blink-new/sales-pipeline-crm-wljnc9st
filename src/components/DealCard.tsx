
import { format, parseISO } from 'date-fns'
import { Deal } from '../types'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { formatCurrency } from '../lib/utils'
import { useState } from 'react'
import { EditDealDialog } from './EditDealDialog'
import { useDraggable } from '@dnd-kit/core'

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: deal.id,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={() => setEditDialogOpen(true)}
      >
        <Card className="w-full mb-3 cursor-move hover:shadow-md transition-shadow">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-sm line-clamp-2">{deal.name}</h3>
              <Badge variant="secondary" className="ml-2">
                {formatCurrency(deal.value)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>{deal.probability || 0}% probability</span>
                {deal.expectedCloseDate && (
                  <span>{format(parseISO(deal.expectedCloseDate), 'MMM d')}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <EditDealDialog 
        deal={deal}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  )
}