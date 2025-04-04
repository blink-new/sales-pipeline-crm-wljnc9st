
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { User } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link to="/" className="text-xl font-bold">
          App
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}