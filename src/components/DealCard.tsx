
import { cn } from "@/lib/utils"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Deal } from "@/lib/types"
import { useNavigate } from "react-router-dom"

interface DealCardProps {
  deal: Deal
  className?: string
}

export function DealCard({ deal, className }: DealCardProps) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/deals/${deal.id}`)
  }

  return (
    <Card 
      className={cn(
        "flex cursor-pointer flex-col gap-3 p-4 transition-all hover:shadow-md",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{deal.name}</h3>
          <p className="text-sm text-muted-foreground">{deal.company}</p>
        </div>
        <Badge variant={deal.status === 'active' ? 'default' : 'secondary'}>
          {deal.status}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm">
          <span className="text-muted-foreground">Value: </span>
          <span className="font-medium">${deal.value.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  )
}