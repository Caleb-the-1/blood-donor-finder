import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../appwrite'

function Welcome() {

  const navigate  = useNavigate()
  const [user, setUser]       = useState<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        navigate('/auth')
        return
      }
      setUser(currentUser)
      setTimeout(() => setVisible(true), 100)
    }
    fetchUser()
  }, [])

  return (
    <div className="welcome-page">

      {/* Floating background drops */}
      <div className="welcome-bg">
        <span className="bg-drop drop-a">🩸</span>
        <span className="bg-drop drop-b">🩸</span>
        <span className="bg-drop drop-c">🩸</span>
        <span className="bg-drop drop-d">🩸</span>
        <span className="bg-drop drop-e">🩸</span>
      </div>

      {/* Header */}
      <div className={`welcome-header ${visible ? 'welcome-visible' : ''}`}>
        <span className="welcome-logo">🩸</span>
        <h1 className="welcome-title">
          Welcome, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="welcome-subtitle">
          What would you like to do today?
        </p>
      </div>

      {/* Cards */}
      <div className={`welcome-cards ${visible ? 'welcome-visible' : ''}`}>

        {/* Find a Donor */}
        <div
          className="welcome-card"
          onClick={() => navigate('/find')}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="welcome-card-image-wrapper">
            <img
              src="/find.jpg"
              alt="Find a Donor"
              className="welcome-card-image"
            />
            <div className="welcome-card-overlay" />
            <div className="welcome-card-content">
              <span className="welcome-card-icon">🔍</span>
              <h2 className="welcome-card-title">Find a Donor</h2>
              <p className="welcome-card-text">
                Search for available blood donors near you right now
              </p>
              <button className="welcome-card-btn">
                Search Now →
              </button>
            </div>
          </div>
        </div>

        {/* Register as Individual */}
        <div
          className="welcome-card"
          onClick={() => navigate('/register?type=individual')}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="welcome-card-image-wrapper">
            <img
              src="/donor.jpg"
              alt="Register as Individual"
              className="welcome-card-image"
            />
            <div className="welcome-card-overlay" />
            <div className="welcome-card-content">
              <span className="welcome-card-icon">👤</span>
              <h2 className="welcome-card-title">Be a Donor</h2>
              <p className="welcome-card-text">
                Register as an individual donor and save lives nearby
              </p>
              <button className="welcome-card-btn">
                Register Now →
              </button>
            </div>
          </div>
        </div>

        {/* Register as Hospital */}
        <div
          className="welcome-card"
          onClick={() => navigate('/register?type=hospital')}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="welcome-card-image-wrapper">
            <img
              src="/hospital.jpg"
              alt="Register as Hospital"
              className="welcome-card-image"
            />
            <div className="welcome-card-overlay" />
            <div className="welcome-card-content">
              <span className="welcome-card-icon">🏥</span>
              <h2 className="welcome-card-title">Register Hospital</h2>
              <p className="welcome-card-text">
                Register your hospital and connect with donors in Ekiti State
              </p>
              <button className="welcome-card-btn">
                Register Now →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom actions */}
      <div className={`welcome-actions ${visible ? 'welcome-visible' : ''}`}>
        <button
          className="welcome-action-btn"
          onClick={() => navigate('/sos')}
        >
          🚨 Emergency SOS
        </button>
        <button
          className="welcome-action-btn welcome-action-secondary"
          onClick={() => navigate('/')}
        >
          🏠 Go to Home
        </button>
      </div>

    </div>
  )
}

export default Welcome