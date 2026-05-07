import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SearchSection from './components/SearchSection'
import DonorSection from './components/DonorSection'
import RegisterForm from './components/RegisterForm'
import RequestForm from './components/RequestForm'
import Footer from './components/Footer'

import './components/Navbar.css'
import './components/HeroSection.css'
import './components/SearchSection.css'
import './components/DonorSection.css'
import './components/DonorCard.css'
import './components/RegisterForm.css'
import './components/RequestForm.css'
import './components/Footer.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <SearchSection />
      <DonorSection />
      <RegisterForm />
      <RequestForm />
      <Footer />
    </div>
  )
}

export default App
