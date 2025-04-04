
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays } from "date-fns"
import { Deal, Stage } from "../types"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getDealAge(date: Date): string {
  const days = differenceInDays(new Date(), date)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days`
}

export function calculateProgress(currentStage: string, stages: Stage[]): number {
  const stageIndex = stages.findIndex(s => s.id === currentStage)
  if (stageIndex === -1) return 0
  return Math.round(((stageIndex + 1) / stages.length) * 100)
}

export function getDealHealth(deal: Deal): 'good' | 'warning' | 'danger' {
  const age = differenceInDays(new Date(), deal.createdAt)
  const probability = deal.probability

  if (probability >= 70) return 'good'
  if (age > 60 || probability < 30) return 'danger'
  return 'warning'
}