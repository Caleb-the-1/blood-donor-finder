import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './components/StatsSection.css'
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
import EditProfile from './pages/EditProfile'
import './pages/EditProfile.css'
import Welcome from './pages/Welcome'
import './pages/Welcome.css'


function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Sidebar />
      <Notifications />
      <Navbar />

      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/find"          element={<FindDonor />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/request"       element={<RequestBlood />} />
        <Route path="/profile"       element={<Profile />} />
        <Route path="/sos"           element={<SOS />} />
        <Route path="/compatibility" element={<Compatibility />} />
        <Route path="/reviews"       element={<ReviewsPage />} />
        <Route path="/map"           element={<MapPage />} />
        <Route path="/hospitals"     element={<Hospitals />} />
        <Route path="/auth"          element={<Auth />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App