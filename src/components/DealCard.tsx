
import { formatCurrency } from '../lib/utils'
import { Deal } from '../types'
import { Card } from './ui/card'

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="p-4 cursor-move hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <div className="font-medium">{deal.name}</div>
        <div className="text-sm text-muted-foreground">
          <div>{formatCurrency(deal.value)}</div>
          <div>{deal.probability}% probability</div>
        </div>
      </div>
    </Card>
  )
}