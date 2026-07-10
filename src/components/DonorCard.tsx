import { useNavigate } from 'react-router-dom'

interface DonorProps {
  name: string
  bloodType: string
  location: string
  distance: string
  available: boolean
  image: string
  phone?: string
}

function DonorCard({ name, bloodType, location, distance, available, phone }: DonorProps) {

  const navigate = useNavigate()

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  function handleCall() {
    if (phone) {
      window.location.href = `tel:${phone}`
    } else {
      alert('Phone number not available for this donor.')
    }
  }

  function handleMessage() {
    if (phone) {
      const message = encodeURIComponent(
        `Hello! I found you on BloodLink. I urgently need ${bloodType} blood. Can you help me? 🩸`
      )
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
    } else {
      alert('Phone number not available for this donor.')
    }
  }

  return (
    <div className="donor-card">

      <div className="donor-card-top">
        <div className="donor-avatar-initials">
          {initials}
        </div>
        <span className={`donor-badge ${available ? 'badge-available' : 'badge-unavailable'}`}>
          {available ? '✅ Available' : '❌ Unavailable'}
        </span>
      </div>

      <div className="donor-card-info">
        <h3 className="donor-name">{name}</h3>
        <span className="donor-blood-type">{bloodType}</span>
        <p className="donor-location">📍 {location}</p>
        <p className="donor-distance">🚗 {distance}</p>
        {phone && (
          <p className="donor-phone">📞 {phone}</p>
        )}
      </div>

      <div className="donor-card-actions">
        <button className="donor-btn-call" onClick={handleCall}>
          📞 Call
        </button>
        <button className="donor-btn-message" onClick={handleMessage}>
          💬 WhatsApp
        </button>
      </div>

      <button
        className="donor-btn-meeting"
        onClick={() => navigate('/meeting-point')}
      >
        🏥 Find Meeting Point
      </button>

    </div>
  )
}

export default DonorCard