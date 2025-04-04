
import { PipelineBoard } from '../components/PipelineBoard'
import { Button } from '../components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { NewDealDialog } from '../components/NewDealDialog'

export function Pipeline() {
  const [showNewDeal, setShowNewDeal] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-semibold">Pipeline</h1>
        <Button onClick={() => setShowNewDeal(true)} variant="default">
          <Plus className="w-4 h-4 mr-2" />
          New Deal
        </Button>
      </div>
      <PipelineBoard />
      <NewDealDialog open={showNewDeal} onOpenChange={setShowNewDeal} />
    </div>
  )
}