
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
import { useDeals } from '@/hooks/use-deals'

interface NewDealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewDealDialog({ open, onOpenChange }: NewDealDialogProps) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [value, setValue] = useState('')
  const { addDeal } = useDeals()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addDeal({
      name: name.trim(),
      company: company.trim(),
      value: parseFloat(value) || 0,
      status: 'active',
      stage: 'Lead'
    })

    setName('')
    setCompany('')
    setValue('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
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
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Deal Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter deal value"
            />
          </div>
          <div className="flex justify-end space-x-2">
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