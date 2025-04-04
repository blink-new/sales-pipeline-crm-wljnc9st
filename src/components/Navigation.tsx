
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { 
  GitBranch, 
  Settings, 
  Menu,
  X,
  Sparkles
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

export function Navigation() {
  const location = useLocation()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  
  const NavContent = () => (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        <div className="flex h-16 items-center px-6">
          <Link to="/" className="text-xl font-bold">
            DealFlow
          </Link>
        </div>
        
        <nav className="space-y-2 px-4">
          <Link
            to="/pipeline"
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent',
              location.pathname === '/pipeline' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-accent-foreground'
            )}
          >
            <GitBranch className="h-4 w-4" />
            Pipeline
          </Link>
          <Link
            to="/settings"
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent',
              location.pathname === '/settings' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-accent-foreground'
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>

        <div className="px-4">
          <Separator />
          <div className="my-4 px-3">
            <Button 
              className="relative w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all hover:from-violet-500 hover:to-indigo-500"
              size="lg"
            >
              <div className="absolute -inset-1 -z-10 animate-pulse rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 opacity-20 blur" />
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t bg-background p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">john@example.com</span>
                </div>
              </div>
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
    <div className="fixed inset-y-0 z-50 w-72 border-r bg-background">
      <NavContent />
    </div>
  )
}