
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import useDealStore from "../store/dealStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface NewDealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewDealDialog({ open, onOpenChange }: NewDealDialogProps) {
  const { stages, addDeal } = useDealStore()
  const [name, setName] = useState("")
  const [value, setValue] = useState("")
  const [stage, setStage] = useState(stages[0]?.id || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !stage) return

    addDeal({
      id: crypto.randomUUID(),
      name,
      value: parseFloat(value) || 0,
      stage,
      createdAt: new Date().toISOString()
    })

    // Reset form
    setName("")
    setValue("")
    setStage(stages[0]?.id || "")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deal Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter deal name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter deal value"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stage">Stage</Label>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Deal</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}