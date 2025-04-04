
import { PipelineBoard } from '../components/PipelineBoard'
import { Button } from '../components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { NewDealDialog } from '../components/NewDealDialog'

export function Pipeline() {
  const [showNewDeal, setShowNewDeal] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
        <Button 
          onClick={() => setShowNewDeal(true)}
          className="bg-violet-600 text-white hover:bg-violet-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>
      <PipelineBoard />
      <NewDealDialog 
        open={showNewDeal} 
        onOpenChange={setShowNewDeal}
      />
    </div>
  )
}