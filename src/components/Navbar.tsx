import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  const [lastScroll, setLastScroll] = useState(0)
  const [hidden, setHidden]         = useState(false)

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
      {/* TOP — Logo */}
      <header className={`top-bar ${hidden ? 'top-bar-hidden' : ''}`}>
        <Link to="/" className="navbar-logo-link">
          <span className="navbar-icon">🩸</span>
          <span className="navbar-brand">BloodLink</span>
        </Link>
      </header>

      {/* BOTTOM — Navigation */}
      <nav className={`bottom-nav ${hidden ? 'bottom-nav-hidden' : ''}`}>

        <Link to="/find" className="bottom-nav-link">
          <span className="bottom-nav-icon">🔍</span>
          <span className="bottom-nav-label">Find Donor</span>
        </Link>

        {/* Emergency button in the middle */}
        <Link to="/sos" className="bottom-nav-emergency">
          <span className="bottom-nav-icon">🚨</span>
          <span className="bottom-nav-label">Emergency</span>
        </Link>

        <Link to="/request" className="bottom-nav-link">
          <span className="bottom-nav-icon">🩸</span>
          <span className="bottom-nav-label">Request</span>
        </Link>

        <Link to="/profile" className="bottom-nav-link">
          <span className="bottom-nav-icon">👤</span>
          <span className="bottom-nav-label">Profile</span>
        </Link>

      </nav>
    </>
  )
}

export default Navbar