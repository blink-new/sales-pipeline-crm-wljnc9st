
import { useState } from 'react'
import { Deal } from '../types'
import { cn } from '../lib/utils'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { EditDealDialog } from './EditDealDialog'

interface DealCardProps {
  deal: Deal
  className?: string
}

export function DealCard({ deal, className }: DealCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const getProbabilityVariant = (probability: number) => {
    if (probability >= 70) return 'success'
    if (probability >= 40) return 'warning'
    return 'destructive'
  }

  return (
    <>
      <Card 
        className={cn(
          "p-3 hover:shadow-md transition-shadow cursor-pointer",
          className
        )}
        onClick={() => setEditDialogOpen(true)}
      >
        <div className="space-y-2">
          <div className="font-medium">{deal.name}</div>
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium text-primary">
              ${deal.value?.toLocaleString() || '0'}
            </div>
            <Badge variant={getProbabilityVariant(deal.probability)}>
              {deal.probability}%
            </Badge>
          </div>
        </div>
      </Card>

      <EditDealDialog 
        deal={deal}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  )
}