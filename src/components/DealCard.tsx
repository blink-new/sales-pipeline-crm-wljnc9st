
import { Deal } from '../types'
import { Card } from './ui/card'
import { formatCurrency } from '../lib/utils'

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="p-4 mb-3 cursor-move hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <h3 className="font-medium truncate">{deal.name}</h3>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{formatCurrency(deal.value)}</span>
          <span>{Math.round(deal.probability * 100)}%</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>
        <div className="text-xs text-muted-foreground">
          Close: {deal.expectedCloseDate.toLocaleDateString()}
        </div>
      </div>
    </Card>
  )
}