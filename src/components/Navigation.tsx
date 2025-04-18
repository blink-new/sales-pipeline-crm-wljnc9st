
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { 
  GitBranch, 
  Settings, 
  Menu,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useState } from 'react'
import { Separator } from './ui/separator'
import { useIsMobile } from '../hooks/use-mobile'
import { useSidebar } from '../hooks/use-sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const { isCollapsed, toggle } = useSidebar()
  
  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to || (to === '/pipeline' && location.pathname === '/')
    const content = (
      <Link
        to={to}
        className={cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent',
          isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-accent-foreground',
          isCollapsed && 'justify-center px-2'
        )}
      >
        <Icon className="h-4 w-4" />
        {!isCollapsed && <span>{label}</span>}
      </Link>
    )

    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return content
  }
  
  const NavContent = () => (
    <div className="flex h-full flex-col justify-between pb-4">
      <div className="space-y-4">
        <div className={cn(
          "flex h-16 items-center justify-between",
          isCollapsed ? "px-2" : "px-6"
        )}>
          {!isCollapsed && (
            <Link to="/" className="text-xl font-bold">
              DealFlow
            </Link>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        
        <nav className={cn(
          "space-y-1",
          isCollapsed ? "px-2" : "px-4"
        )}>
          <NavLink
            to="/pipeline"
            icon={GitBranch}
            label="Pipeline"
          />
          <NavLink
            to="/settings"
            icon={Settings}
            label="Settings"
          />
        </nav>

        <div className={cn(
          "px-4",
          isCollapsed && "px-2"
        )}>
          <Separator className="my-4" />
          {!isCollapsed && (
            <div className="px-3">
              <Button 
                className="relative w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all hover:from-violet-500 hover:to-indigo-500"
                size="lg"
                onClick={() => navigate('/pricing')}
              >
                <div className="absolute -inset-1 -z-10 animate-pulse rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 opacity-20 blur" />
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </div>
          )}
          {isCollapsed && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="relative w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all hover:from-violet-500 hover:to-indigo-500"
                    size="icon"
                    onClick={() => navigate('/pricing')}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Upgrade to Pro</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className={cn(
        "border-t bg-background",
        isCollapsed ? "px-2" : "px-4",
        "pt-4"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn(
              "w-full",
              isCollapsed ? "justify-center px-0" : "justify-start"
            )}>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="ml-3 flex flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">john@example.com</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4">
          <Link to="/" className="text-xl font-bold">
            DealFlow
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </>
    )
  }

  return (
    <div className={cn(
      "fixed inset-y-0 z-50 border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-72"
    )}>
      <NavContent />
    </div>
  )
}