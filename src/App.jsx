import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Engineers from './pages/Employees'
import Profile from './pages/Profile'
import Legal from './pages/Legal'
import Talent from './pages/Talent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/engineers" element={<Layout><Engineers /></Layout>} />
        <Route path="/engineers/:id" element={<Profile />} />
        <Route path="/legal" element={<Layout><Legal /></Layout>} />
        <Route path="/talent" element={<Layout><Talent /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
