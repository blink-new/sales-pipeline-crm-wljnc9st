
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { PipelineIcon, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Navigation() {
  const location = useLocation()
  
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            DealFlow
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/pipeline"
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                location.pathname === '/pipeline' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <PipelineIcon className="h-4 w-4" />
              Pipeline
            </Link>
            <Link
              to="/settings"
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                location.pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline">Upgrade to Pro</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
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
    </header>
  )
}