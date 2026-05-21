import { useState } from 'react'

function AvailabilityToggle() {

  const [available, setAvailable] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')

  function handleToggle() {
    const newStatus = !available
    setAvailable(newStatus)
    setLastUpdated(
      new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )
  }

  return (
    <div className="toggle-wrapper">

      {/* Status indicator */}
      <div className={`toggle-status-ring ${available ? 'ring-available' : 'ring-unavailable'}`}>
        <div className="toggle-avatar">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Donor"
            className="toggle-avatar-img"
          />
          {/* Live dot */}
          <span className={`toggle-dot ${available ? 'dot-available' : 'dot-unavailable'}`} />
        </div>
      </div>

      {/* Status text */}
      <div className="toggle-info">
        <h3 className="toggle-name">Chidi Nwosu</h3>
        <p className="toggle-blood">🩸 Blood Type: A+</p>
        <p className={`toggle-status-text ${available ? 'text-available' : 'text-unavailable'}`}>
          {available ? '✅ You are Available to Donate' : '❌ You are Currently Unavailable'}
        </p>
        {lastUpdated && (
          <p className="toggle-updated">Last updated at {lastUpdated}</p>
        )}
      </div>

      {/* The toggle switch */}
      <div className="toggle-switch-wrapper">
        <span className="toggle-switch-label">
          {available ? 'Available' : 'Unavailable'}
        </span>
        <div
          className={`toggle-switch ${available ? 'switch-on' : 'switch-off'}`}
          onClick={handleToggle}
        >
          <div className="toggle-thumb" />
        </div>
      </div>

      {/* Message based on status */}
      <div className={`toggle-message ${available ? 'message-available' : 'message-unavailable'}`}>
        {available
          ? '🩸 Donors near you can now see you are ready to donate. Thank you for saving lives!'
          : '😴 You are currently hidden from donor searches. Switch on when you are ready!'}
      </div>

    </div>
  )
}

export default AvailabilityToggle