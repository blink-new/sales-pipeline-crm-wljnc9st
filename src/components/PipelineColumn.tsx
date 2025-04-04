
import { useMemo } from 'react'
import { Deal } from '../types'
import { SortableDealCard } from './SortableDealCard'
import { formatCurrency } from '../lib/utils'

interface PipelineColumnProps {
  title: string
  color: string
  deals: Deal[]
}

export function PipelineColumn({ title, color, deals }: PipelineColumnProps) {
  const totalValue = useMemo(() => {
    return deals.reduce((sum, deal) => sum + deal.value, 0)
  }, [deals])

  const weightedValue = useMemo(() => {
    return deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)
  }, [deals])

  return (
    <div className="w-80 shrink-0 p-2">
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {title}
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
      <div className="space-y-3">
        {deals.map((deal) => (
          <SortableDealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  )
}