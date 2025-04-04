
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { PlusCircle } from "lucide-react"
import useDealStore from "../store/dealStore"
import { nanoid } from "nanoid"
import { cn, formatCurrency } from "../lib/utils"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Slider } from "./ui/slider"

export function NewDealDialog() {
  const { addDeal } = useDealStore()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [value, setValue] = useState("10000")
  const [probability, setProbability] = useState(50)
  const [date, setDate] = useState<Date>(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newDeal = {
      id: nanoid(),
      name,
      value: parseFloat(value),
      stage: "lead", // Start in lead stage
      probability,
      expectedCloseDate: date,
      companyId: "1", // Default values for now
      contactId: "1",
      description: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    addDeal(newDeal)
    setOpen(false)
    
    // Reset form
    setName("")
    setValue("10000")
    setProbability(50)
    setDate(new Date())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deal Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter deal name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="value">Deal Value</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
              <div className="text-sm text-muted-foreground w-24">
                {formatCurrency(parseFloat(value))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Probability ({probability}%)</Label>
            <Slider
              value={[probability]}
              onValueChange={(values) => setProbability(values[0])}
              max={100}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <Label>Expected Close Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full">Add Deal</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}