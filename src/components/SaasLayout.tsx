
import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { useIsMobile } from '../hooks/use-mobile'
import { cn } from '../lib/utils'
import { useSidebar } from '../hooks/use-sidebar'

export function SaasLayout() {
  const isMobile = useIsMobile()
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className={cn(
        "min-h-screen bg-background transition-all duration-300",
        isMobile 
          ? "px-4 py-6 pt-20" 
          : isCollapsed 
            ? "ml-16 p-8"
            : "ml-72 p-8"
      )}>
        <Outlet />
      </main>
    </div>
  )
}