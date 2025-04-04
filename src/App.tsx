
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SaasLayout } from './components/SaasLayout'
import { Pipeline } from './pages/Pipeline'
import { Settings } from './pages/Settings'
import { Toaster } from './components/ui/toaster'
import { TooltipProvider } from './components/ui/tooltip'

export default function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SaasLayout />}>
            <Route index element={<Navigate to="/pipeline" replace />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </TooltipProvider>
  )
}