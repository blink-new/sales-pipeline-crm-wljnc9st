
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Stage } from '../types'
import useDealStore from '../store/dealStore'
import { ChromePicker } from 'react-color'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { cn } from '../lib/utils'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useToast } from '../hooks/use-toast'

function StageItem({ stage }: { stage: Stage }) {
  const { removeStage, updateStage } = useDealStore()
  const { toast } = useToast()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-4 rounded-lg border bg-card p-4',
        isDragging && 'opacity-50'
      )}
    >
      <div {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        value={stage.name}
        onChange={(e) => updateStage(stage.id, { ...stage, name: e.target.value })}
        className="max-w-[200px]"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[4rem] p-0"
            style={{ backgroundColor: stage.color }}
          >
            <span className="sr-only">Pick a color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <ChromePicker
            color={stage.color}
            onChange={(color) => {
              updateStage(stage.id, { ...stage, color: color.hex })
            }}
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          removeStage(stage.id)
          toast({
            title: "Stage deleted",
            description: `${stage.name} has been removed.`
          })
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function Settings() {
  const { stages, addStage, reorderStages } = useDealStore()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const [newStageName, setNewStageName] = useState('')

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = stages.findIndex((s) => s.id === active.id)
      const newIndex = stages.findIndex((s) => s.id === over.id)
      reorderStages(oldIndex, newIndex)
    }
  }

  const handleAddStage = () => {
    if (newStageName.trim()) {
      addStage({
        id: crypto.randomUUID(),
        name: newStageName,
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
      })
      setNewStageName('')
      setIsAdding(false)
      toast({
        title: "Stage added",
        description: `${newStageName} has been added to your pipeline.`
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your pipeline stages and preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Pipeline Stages</h2>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Stage
            </Button>
          )}
        </div>

        {isAdding && (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Stage name"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddStage()
                }
              }}
            />
            <Button onClick={handleAddStage}>Save</Button>
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        )}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={stages}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {stages.map((stage) => (
                <StageItem key={stage.id} stage={stage} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}