
import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'

export function SaasLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}