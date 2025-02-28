import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes,Route } from 'react-router-dom'
// import ProtectedRoute from './pages/ProtectedRoute'
import FitnessDashboard from './pages/FitnessDashboard'
import LandingPage from './components/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<FitnessDashboard/>}/>
      </Routes>

    </>
  )
}

export default App
