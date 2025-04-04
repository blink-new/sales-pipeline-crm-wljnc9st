
import { format, parseISO } from 'date-fns'
import { Deal } from '../types'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { formatCurrency } from '../lib/utils'

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  return (
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
  )
}