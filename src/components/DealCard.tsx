
import { Deal } from '../types'
import { cn } from '../lib/utils'

interface DealCardProps {
  deal: Deal
  className?: string
}

export function DealCard({ deal, className }: DealCardProps) {
  const probabilityColor = deal.probability >= 70 
    ? 'bg-green-500/10 text-green-700' 
    : deal.probability >= 40 
    ? 'bg-yellow-500/10 text-yellow-700'
    : 'bg-red-500/10 text-red-700'

  return (
    <div className={cn(
      "p-3 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      <div className="space-y-2">
        <div className="font-medium">{deal.name}</div>
        <div className="flex items-center justify-between text-sm">
          <div className="font-medium text-primary">
            ${deal.value?.toLocaleString() || '0'}
          </div>
          <div className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            probabilityColor
          )}>
            {deal.probability}%
          </div>
        </div>
      </div>
    </div>
  )
}