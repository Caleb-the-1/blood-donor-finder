import { useState } from 'react'

function SOSButton() {

  const [activated, setActivated] = useState(false)
  const [countdown, setCountdown] = useState(5)

  function handleSOS() {

    // Start the countdown from 5
    setActivated(true)
    let count = 5

    const timer = setInterval(() => {
      count -= 1
      setCountdown(count)

      // When countdown hits 0 — alert is sent!
      if (count === 0) {
        clearInterval(timer)
        setActivated(false)
        setCountdown(5)
        alert('🚨 SOS SENT! All available donors within 10km have been notified immediately!')
      }
    }, 1000)
  }

  function handleCancel() {
    setActivated(false)
    setCountdown(5)
  }

  return (
    <div className="sos-wrapper">

      {/* Normal state — big SOS button */}
      {!activated && (
        <button className="sos-btn" onClick={handleSOS}>
          <span className="sos-icon">🆘</span>
          <span className="sos-text">SOS</span>
          <span className="sos-subtext">Press for emergency blood alert</span>
        </button>
      )}

      {/* Activated state — countdown showing */}
      {activated && (
        <div className="sos-countdown-wrapper">

          <div className="sos-countdown-circle">
            <span className="sos-countdown-number">{countdown}</span>
            <span className="sos-countdown-label">Sending alert...</span>
          </div>

          <p className="sos-countdown-message">
            🚨 Alerting all donors within 10km in {countdown} seconds
          </p>

          <button className="sos-cancel-btn" onClick={handleCancel}>
            ✋ Cancel
          </button>

        </div>
      )}

    </div>
  )
}

export default SOSButton