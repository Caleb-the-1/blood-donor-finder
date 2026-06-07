import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getCurrentUser } from './appwrite'

import Onboarding from './pages/Onboarding'
import './pages/Onboarding.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Sidebar from './components/Sidebar'
import Notifications from './components/Notifications'

import Home from './pages/Home'
import FindDonor from './pages/FindDonor'
import Register from './pages/Register'
import RequestBlood from './pages/RequestBlood'
import Profile from './pages/Profile'
import SOS from './pages/SOS'
import Compatibility from './pages/Compatibility'
import ReviewsPage from './pages/ReviewsPage'
import MapPage from './pages/MapPage'
import Hospitals from './pages/Hospitals'
import Auth from './pages/Auth'
import Welcome from './pages/Welcome'
import EditProfile from './pages/EditProfile'

import './components/Navbar.css'
import './components/HeroSection.css'
import './components/SearchSection.css'
import './components/DonorSection.css'
import './components/DonorCard.css'
import './components/RegisterForm.css'
import './components/RequestForm.css'
import './components/Footer.css'
import './components/ThemeToggle.css'
import './components/Sidebar.css'
import './components/Notifications.css'
import './pages/Profile.css'
import './pages/SOS.css'
import './pages/Auth.css'
import './pages/Welcome.css'
import './pages/EditProfile.css'

function App() {

  const [user, setUser]       = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    checkUser()
  }, [])

  
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d0a0a',
        gap: '1rem',
      }}>
        <span style={{ fontSize: '3rem', animation: 'none' }}>🩸</span>
        <p style={{
          color: '#c0392b',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '1rem',
          letterSpacing: '2px',
        }}>
          Loading BloodLink...
        </p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <ThemeToggle />
      <Sidebar />
      <Notifications />
      <Navbar />

      <Routes>

      <Route
  path="/"
  element={user
    ? <Home />
    : localStorage.getItem('onboardingDone')
    ? <Navigate to="/auth" />
    : <Navigate to="/onboarding" />}
/>

        {/* Auth page  */}
        <Route
          path="/auth"
          element={user ? <Navigate to="/welcome" /> : <Auth />}
        />

        {/* Welcome page  */}
        <Route
          path="/welcome"
          element={user ? <Welcome /> : <Navigate to="/auth" />}
        />

        {/* All other pages */}
        <Route path="/find"          element={<FindDonor />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/request"       element={<RequestBlood />} />
        <Route path="/profile"       element={<Profile />} />
        <Route path="/sos"           element={<SOS />} />
        <Route path="/compatibility" element={<Compatibility />} />
        <Route path="/reviews"       element={<ReviewsPage />} />
        <Route path="/map"           element={<MapPage />} />
        <Route path="/hospitals"     element={<Hospitals />} />
        <Route path="/edit-profile"  element={<EditProfile />} />
        <Route path="/onboarding" element={<Onboarding />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App