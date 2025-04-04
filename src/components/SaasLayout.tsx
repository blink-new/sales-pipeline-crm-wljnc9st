
import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { useMobile } from '../hooks/use-mobile'

export function SaasLayout() {
  const isMobile = useMobile()
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className={cn(
        "min-h-screen bg-background",
        isMobile ? "px-4 py-6 pt-20" : "ml-72 p-8"
      )}>
        <Outlet />
      </main>
    </div>
  )
}