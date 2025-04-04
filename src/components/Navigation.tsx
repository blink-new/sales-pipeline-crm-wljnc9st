
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { NewDealDialog } from './NewDealDialog'

export function Navigation() {
  const [showNewDeal, setShowNewDeal] = useState(false)
  
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1" />
          <Button onClick={() => setShowNewDeal(true)} size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Deal
          </Button>
        </div>
      </div>
      <NewDealDialog 
        open={showNewDeal} 
        onOpenChange={setShowNewDeal} 
      />
    </nav>
  )
}