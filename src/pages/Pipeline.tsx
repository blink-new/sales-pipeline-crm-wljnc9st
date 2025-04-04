
import { PipelineBoard } from '../components/PipelineBoard'

export function Pipeline() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
      </div>
      <PipelineBoard />
    </div>
  )
}