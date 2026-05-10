import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'

import Home from './pages/Home'
import FindDonor from './pages/FindDonor'
import Register from './pages/Register'
import RequestBlood from './pages/RequestBlood'
import Profile from './pages/Profile'

import './components/Navbar.css'
import './components/HeroSection.css'
import './components/SearchSection.css'
import './components/DonorSection.css'
import './components/DonorCard.css'
import './components/RegisterForm.css'
import './components/RequestForm.css'
import './components/Footer.css'
import './components/ThemeToggle.css'
import './pages/Profile.css'

function App() {
  return (
    <BrowserRouter>

      {/* Theme toggle button — always visible */}
      <ThemeToggle />

      <Navbar />

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/find"     element={<FindDonor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request"  element={<RequestBlood />} />
        <Route path="/profile"  element={<Profile />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App
