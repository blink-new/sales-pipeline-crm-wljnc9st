
import { PipelineBoard } from './components/PipelineBoard'
import useDealStore from './store/dealStore'
import { useEffect } from 'react'

// Sample data for testing
const sampleDeal = {
  id: '1',
  name: 'Enterprise Software Deal',
  value: 50000,
  stage: 'lead',
  probability: 20,
  expectedCloseDate: new Date('2024-03-30'),
  companyId: '1',
  contactId: '1',
  description: 'Large enterprise software license deal',
  createdAt: new Date(),
  updatedAt: new Date(),
}

function App() {
  const { addDeal } = useDealStore()

  useEffect(() => {
    // Add sample deal for testing
    addDeal(sampleDeal)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4">
          <h1 className="text-xl font-bold">Sales Pipeline CRM</h1>
        </div>
      </header>
      <main className="container mx-auto">
        <PipelineBoard />
      </main>
    </div>
  )
}

export default App