
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Deal } from '../types'
import useDealStore from '../store/dealStore'
import { useToast } from '../hooks/use-toast'

interface EditDealDialogProps {
  deal: Deal
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditDealDialog({ deal, open, onOpenChange }: EditDealDialogProps) {
  const { updateDeal } = useDealStore()
  const { toast } = useToast()
  const [formData, setFormData] = useState(deal)

  useEffect(() => {
    setFormData(deal)
  }, [deal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate probability
    const probability = Number(formData.probability)
    if (isNaN(probability) || probability < 0 || probability > 100) {
      toast({
        title: "Invalid probability",
        description: "Probability must be between 0 and 100",
        variant: "destructive"
      })
      return
    }

    // Validate value
    const value = Number(formData.value)
    if (isNaN(value) || value < 0) {
      toast({
        title: "Invalid value",
        description: "Value must be a positive number",
        variant: "destructive"
      })
      return
    }

    updateDeal(deal.id, {
      ...formData,
      value: value,
      probability: probability
    })
    
    toast({
      title: "Deal updated",
      description: "The deal has been successfully updated."
    })
    
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deal Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value ($)</Label>
            <Input
              id="value"
              type="number"
              min="0"
              step="0.01"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="probability">
              Probability (%)
            </Label>
            <Input
              id="probability"
              type="number"
              min="0"
              max="100"
              value={formData.probability}
              onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}