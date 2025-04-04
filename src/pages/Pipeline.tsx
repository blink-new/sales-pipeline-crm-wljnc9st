
import { PipelineBoard } from '../components/PipelineBoard'
import { Button } from '../components/ui/button'
import { PlusCircle } from 'lucide-react'
import { NewDealDialog } from '../components/NewDealDialog'
import { useState } from 'react'

export function Pipeline() {
  const [showNewDealDialog, setShowNewDealDialog] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
        <Button onClick={() => setShowNewDealDialog(true)} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>
      <PipelineBoard />
      <NewDealDialog open={showNewDealDialog} onOpenChange={setShowNewDealDialog} />
    </div>
  )
}