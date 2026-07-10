import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, signOut } from '../appwrite'

function Sidebar() {
  const [isOpen, setIsOpen]   = useState(false)
  const [user, setUser]       = useState<any>(null)
  const navigate              = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    fetchUser()
  }, [])

  async function handleSignOut() {
    await signOut()
    setUser(null)
    navigate('/auth')
    closeSidebar()
  }

  function toggleSidebar() {
    setIsOpen(!isOpen)
  }

  function closeSidebar() {
    setIsOpen(false)
  }

  return (
    <>
      {/* Fingerprint trigger button */}
      <button className="sidebar-trigger" onClick={toggleSidebar}>
       <svg
  className="fingerprint-icon"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Vertical bar of the cross */}
  <rect x="42" y="10" width="16" height="80"
    rx="4" fill="currentColor" opacity="0.9"
  />

  {/* Horizontal bar of the cross */}
  <rect x="10" y="42" width="80" height="16"
    rx="4" fill="currentColor" opacity="0.9"
  />

  {/* Heartbeat line running through the middle */}
  <polyline
    points="10,50 25,50 32,30 40,68 48,38 56,62 64,50 90,50"
    fill="none"
    stroke="var(--heartbeat-color)"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
      </button>

      {/* Dark overlay behind sidebar */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* The actual sidebar panel */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>

        {/* Sidebar header */}
        <div className="sidebar-header">
          <span className="sidebar-logo">🩸 BloodLink</span>
          <button className="sidebar-close" onClick={closeSidebar}>✕</button>
        </div>

        {/* Navigation links */}
        <nav className="sidebar-nav">

          <p className="sidebar-nav-label">Main</p>

          <Link to="/" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">🏠</span>
            Home
          </Link>

          <Link to="/find" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">🔍</span>
            Find a Donor
          </Link>

          <Link to="/sos" className="sidebar-link sidebar-link-emergency" onClick={closeSidebar}>
            <span className="sidebar-link-icon">🆘</span>
            SOS Emergency
          </Link>

          <p className="sidebar-nav-label">Features</p>

          <Link to="/compatibility" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">🩸</span>
            Compatibility Checker
          </Link>

          <Link to="/reviews" className="sidebar-link" onClick={closeSidebar}>
  <span className="sidebar-link-icon">⭐</span>
  Reviews
</Link>

<Link to="/map" className="sidebar-link" onClick={closeSidebar}>
  <span className="sidebar-link-icon">🗺️</span>
  Live Donor Map
</Link>

          <Link to="/leaderboard" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">📊</span>
            Donor Leaderboard
          </Link>

          <Link to="/hospitals" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">🏥</span>
            Nearest Hospitals
          </Link>

          <p className="sidebar-nav-label">Account</p>

{user ? (
  <>
    <Link to="/welcome" className="sidebar-link" onClick={closeSidebar}>
      <span className="sidebar-link-icon">👋</span>
      Welcome, {user.name?.split(' ')[0]}
    </Link>
    <Link to="/profile" className="sidebar-link" onClick={closeSidebar}>
      <span className="sidebar-link-icon">👤</span>
      My Profile
    </Link>
    <button className="sidebar-link sidebar-signout" onClick={handleSignOut}>
      <span className="sidebar-link-icon">🚪</span>
      Sign Out
    </button>
  </>
) : (
  <Link to="/auth" className="sidebar-link" onClick={closeSidebar}>
    <span className="sidebar-link-icon">🔐</span>
    Sign In / Sign Up
  </Link>
)}

          <Link to="/register" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">💉</span>
            Become a Donor
          </Link>

          <Link to="/request" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">🚨</span>
            Request Blood
          </Link>

          <Link to="/profile" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-link-icon">👤</span>
            My Profile
          </Link>
          <Link to="/meeting-point" className="sidebar-link" onClick={closeSidebar}>
  <span className="sidebar-link-icon">🏥</span>
  Find Meeting Point
</Link>

        </nav>

        {/* Bottom of sidebar */}
        <div className="sidebar-footer">
          <p className="sidebar-footer-text">
            🩸 BloodLink — Saving lives in Ekiti State
          </p>
        </div>

      </div>
    </>
  )
}

export default Sidebar