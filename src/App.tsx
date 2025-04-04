
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Pipeline } from './pages/Pipeline'
import { Settings } from './pages/Settings'
import { ProfilePage } from './pages/ProfilePage'
import { SaasLayout } from './components/SaasLayout'

function App() {
  return (
    <Router>
      <SaasLayout>
        <Routes>
          <Route path="/" element={<Pipeline />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </SaasLayout>
    </Router>
  )
}

export default App