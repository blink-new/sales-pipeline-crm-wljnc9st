
import { format } from 'date-fns'
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Edit3, 
  MoreVertical, 
  Trash2 
} from 'lucide-react'
import { Deal } from '../types'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip'
import { calculateProgress, formatCurrency, getDealAge, getDealHealth } from '../lib/utils'
import useDealStore from '../store/dealStore'

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  const stages = useDealStore(state => state.stages)
  const removeDeal = useDealStore(state => state.removeDeal)
  const progress = calculateProgress(deal.stage, stages)
  const health = getDealHealth(deal)
  
  const healthColors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  return (
    <Card className="w-full mb-3 cursor-move hover:shadow-md transition-shadow group">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${healthColors[health]}`} />
            <h3 className="font-semibold text-sm line-clamp-2">{deal.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="ml-2">
              {formatCurrency(deal.value)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Deal
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => removeDeal(deal.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Deal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <BarChart3 className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Probability</TooltipContent>
            </Tooltip>
            <span>{deal.probability}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Calendar className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Expected Close</TooltipContent>
            </Tooltip>
            <span>{format(deal.expectedCloseDate, 'MMM d')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Clock className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Deal Age</TooltipContent>
            </Tooltip>
            <span>{getDealAge(deal.createdAt)}</span>
          </div>
        </div>
        <Progress value={progress} className="h-1" />
      </CardContent>
    </Card>
  )
}