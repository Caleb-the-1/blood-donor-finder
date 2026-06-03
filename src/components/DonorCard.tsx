interface DonorProps {
  name: string
  bloodType: string
  location: string
  distance: string
  available: boolean
  image: string
}

function DonorCard({ name, bloodType, location, distance, available }: DonorProps) {

  // Get first two letters of name for avatar
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="donor-card">

      {/* TOP */}
      <div className="donor-card-top">
        <div className="donor-avatar-initials">
          {initials}
        </div>
        <span className={`donor-badge ${available ? 'badge-available' : 'badge-unavailable'}`}>
          {available ? '✅ Available' : '❌ Unavailable'}
        </span>
      </div>

      {/* MIDDLE */}
      <div className="donor-card-info">
        <h3 className="donor-name">{name}</h3>
        <span className="donor-blood-type">{bloodType}</span>
        <p className="donor-location">📍 {location}</p>
        <p className="donor-distance">🚗 {distance}</p>
      </div>

      {/* BOTTOM */}
      <div className="donor-card-actions">
        <button className="donor-btn-call">📞 Call</button>
        <button className="donor-btn-message">💬 Message</button>
      </div>

    </div>
  )
}

export default DonorCard