// This describes what ONE donor looks like as data
interface DonorProps {
  name: string
  bloodType: string
  location: string
  distance: string
  available: boolean
  image: string
}

function DonorCard({ name, bloodType, location, distance, available, image }: DonorProps) {
  return (
    <div className="donor-card">

      {/* TOP — Avatar and availability badge */}
      <div className="donor-card-top">
        <img src={image} alt={name} className="donor-avatar" />
        <span className={`donor-badge ${available ? 'badge-available' : 'badge-unavailable'}`}>
          {available ? '✅ Available' : '❌ Unavailable'}
        </span>
      </div>

      {/* MIDDLE — Donor details */}
      <div className="donor-card-info">
        <h3 className="donor-name">{name}</h3>
        <span className="donor-blood-type">{bloodType}</span>
        <p className="donor-location">📍 {location}</p>
        <p className="donor-distance">🚗 {distance} away</p>
      </div>

      {/* BOTTOM — Action buttons */}
      <div className="donor-card-actions">
        <button className="donor-btn-call">📞 Call</button>
        <button className="donor-btn-message">💬 Message</button>
      </div>

    </div>
  )
}

export default DonorCard