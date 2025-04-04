
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Pipeline } from './pages/Pipeline'
import { Settings } from './pages/Settings'
import { ProfilePage } from './pages/ProfilePage'
import { SaasLayout } from './components/SaasLayout'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SaasLayout />}>
          <Route path="/" element={<Pipeline />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App