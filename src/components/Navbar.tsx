import React, { useState, useEffect } from 'react'



function Navbar() {

  // This remembers the LAST scroll position
  const [lastScroll, setLastScroll] = useState(0)

  // This remembers if navbar should be hidden or visible
  const [hidden, setHidden] = useState(false)

  // This runs every time the user scrolls
  useEffect(() => {

    function handleScroll() {
      const currentScroll = window.scrollY
      if (currentScroll > lastScroll && currentScroll > 80) {
        setHidden(true)
      }
      if (currentScroll < lastScroll) {
        setHidden(false)
      }
      setLastScroll(currentScroll)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)

  }, [lastScroll])

  return (
    <>
      {/* TOP — Logo bar */}
      <header className={`top-bar ${hidden ? 'top-bar-hidden' : ''}`}>
        <span className="navbar-icon">🩸</span>
        <span className="navbar-brand">BloodLink</span>
      </header>

      {/* BOTTOM — Navigation links */}
      <nav className={`bottom-nav ${hidden ? 'bottom-nav-hidden' : ''}`}>

        <a href="#home" className="bottom-nav-link">
          <span className="bottom-nav-icon">🏠</span>
          <span className="bottom-nav-label">Home</span>
        </a>

        <a href="#find" className="bottom-nav-link">
          <span className="bottom-nav-icon">🔍</span>
          <span className="bottom-nav-label">Find Donor</span>
        </a>

        
        <a href="#request" className="bottom-nav-emergency">
          <span className="bottom-nav-icon">🚨</span>
          <span className="bottom-nav-label">Request</span>
        </a>

        <a href="#register" className="bottom-nav-link">
          <span className="bottom-nav-icon">💉</span>
          <span className="bottom-nav-label">Be a Donor</span>
        </a>

        <a href="#profile" className="bottom-nav-link">
          <span className="bottom-nav-icon">👤</span>
          <span className="bottom-nav-label">Profile</span>
        </a>

      </nav>
    </>
  )
}

export default Navbar