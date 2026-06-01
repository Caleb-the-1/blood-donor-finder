import { useEffect } from 'react'

interface SuccessOverlayProps {
  onClose: () => void
}

function SuccessOverlay({ onClose }: SuccessOverlayProps) {

  // Auto close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="overlay-wrapper">
      <div className="overlay-card">

        {/* Animated blood drop */}
        <div className="overlay-drop-wrapper">
          <div className="overlay-drop">🩸</div>
          <div className="overlay-rings">
            <div className="overlay-ring ring-1" />
            <div className="overlay-ring ring-2" />
            <div className="overlay-ring ring-3" />
          </div>
        </div>

        {/* Success tick */}
        <div className="overlay-tick">✓</div>

        {/* Text */}
        <h2 className="overlay-title">Registration Successful!</h2>
        <p className="overlay-subtitle">
          You are now an official BloodLink donor. 🩸
        </p>
        <p className="overlay-message">
          Your profile is now visible to people who need
          your blood type in Ekiti State.
          Thank you for choosing to save lives!
        </p>

        {/* Auto close bar */}
        <div className="overlay-progress">
          <div className="overlay-progress-bar" />
        </div>

        <p className="overlay-closing">Closing automatically...</p>

        {/* Manual close button */}
        <button className="overlay-close-btn" onClick={onClose}>
          ✕ Close
        </button>

      </div>
    </div>
  )
}

export default SuccessOverlay