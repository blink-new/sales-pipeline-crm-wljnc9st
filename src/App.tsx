
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProfilePage } from './pages/ProfilePage'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App