
import { LayoutDashboard, Settings, PieChart, CreditCard } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Pipeline', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Upgrade', href: '/pricing', icon: CreditCard },
]

export function Navigation() {
  return (
    <nav className="flex flex-col gap-1">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-violet-600 ${
                isActive 
                  ? 'bg-violet-100 text-violet-600' 
                  : 'text-muted-foreground'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </NavLink>
        )
      })}
    </nav>
  )
}