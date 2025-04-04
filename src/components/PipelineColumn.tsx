
import { useMemo } from 'react'
import { Deal, Stage } from '../types'
import { SortableDealCard } from './SortableDealCard'
import { formatCurrency } from '../lib/utils'

interface PipelineColumnProps {
  stage: Stage
  deals: Deal[]
  isDropping: boolean
}

export function PipelineColumn({ stage, deals, isDropping }: PipelineColumnProps) {
  const totalValue = useMemo(() => {
    return deals.reduce((sum, deal) => sum + deal.value, 0)
  }, [deals])

  const weightedValue = useMemo(() => {
    return deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)
  }, [deals])

  return (
    <div 
      className={`w-80 shrink-0 p-2 rounded-lg transition-colors ${
        isDropping ? 'bg-muted/50' : ''
      }`}
    >
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {stage.name}
            <span className="ml-2 text-muted-foreground text-sm font-normal">
              {deals.length}
            </span>
          </h3>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          <div>{formatCurrency(totalValue)}</div>
          <div className="text-xs">
            Weighted: {formatCurrency(weightedValue)}
          </div>
        </div>
      </div>
      <div className="space-y-3 min-h-[200px]">
        {deals.map((deal) => (
          <SortableDealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  )
}