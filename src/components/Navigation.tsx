
import { Link, useLocation } from 'react-router-dom'
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
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const { isCollapsed, toggle } = useSidebar()
  
  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to
    const content = (
      <Link
        to={to}
        className={cn(
          'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300',
          isCollapsed && 'justify-center px-2',
          isActive 
            ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-primary shadow-sm' 
            : 'text-muted-foreground hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:text-primary'
        )}
      >
        <Icon className={cn(
          "h-5 w-5 transition-all duration-300",
          isActive && "text-indigo-600"
        )} />
        {!isCollapsed && (
          <span className={cn(
            "ml-3 transition-all duration-300",
            isActive && "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          )}>
            {label}
          </span>
        )}
      </Link>
    )

    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return content
  }
  
  const NavContent = () => (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        <div className={cn(
          "flex h-16 items-center border-b bg-gradient-to-b from-background to-background/80 backdrop-blur-sm",
          isCollapsed ? "justify-center px-2" : "px-6"
        )}>
          {!isCollapsed && (
            <Link to="/" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
              DealFlow
            </Link>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "ml-auto hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10",
                isCollapsed && "mx-auto"
              )}
              onClick={toggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-indigo-600" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-indigo-600" />
              )}
            </Button>
          )}
        </div>
        
        <nav className={cn(
          "space-y-1.5",
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

        {!isCollapsed && (
          <div className="px-4">
            <Separator className="my-4 bg-gradient-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40" />
            <div className="px-3">
              <Button 
                className="group relative w-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                size="lg"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[500%] w-[100%] animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Upgrade to Pro
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t bg-gradient-to-t from-background to-background/80 p-4 backdrop-blur-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10",
                isCollapsed ? "px-2" : "justify-start"
              )}
            >
              <Avatar className="h-8 w-8 ring-2 ring-indigo-500/20">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">JD</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="ml-3 flex flex-col items-start text-sm">
                  <span className="font-medium text-primary">John Doe</span>
                  <span className="text-xs text-muted-foreground">john@example.com</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
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
        <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-gradient-to-b from-background to-background/80 px-4 backdrop-blur-sm">
          <Link to="/" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
            DealFlow
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-pink-500/10"
              >
                {isOpen ? (
                  <X className="h-5 w-5 text-indigo-600" />
                ) : (
                  <Menu className="h-5 w-5 text-indigo-600" />
                )}
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
      "fixed inset-y-0 z-50 flex flex-col border-r bg-gradient-to-b from-background to-background/80 backdrop-blur-sm transition-all duration-300",
      isCollapsed ? "w-16" : "w-72"
    )}>
      <NavContent />
    </div>
  )
}