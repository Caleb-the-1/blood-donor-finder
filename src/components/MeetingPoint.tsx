import { useState } from 'react'

// Ekiti hospitals with coordinates
const hospitals = [
  {
    id: 1,
    name: 'Ekiti State University Teaching Hospital',
    shortName: 'EKSUTH',
    location: 'Ado-Ekiti',
    phone: '08012345678',
    hours: '24/7',
    lat: 7.6263,
    lng: 5.2213,
  },
  {
    id: 2,
    name: 'Federal Teaching Hospital',
    shortName: 'FTH Ido-Ekiti',
    location: 'Ido-Ekiti',
    phone: '08023456789',
    hours: '24/7',
    lat: 7.6500,
    lng: 5.0833,
  },
  {
    id: 3,
    name: 'Ikere General Hospital',
    shortName: 'IGH Ikere',
    location: 'Ikere-Ekiti',
    phone: '08034567890',
    hours: '8AM - 8PM',
    lat: 7.4897,
    lng: 5.2432,
  },
  {
    id: 4,
    name: 'Aramoko District Hospital',
    shortName: 'ADH Aramoko',
    location: 'Aramoko-Ekiti',
    phone: '08056789012',
    hours: '24/7',
    lat: 7.6667,
    lng: 5.0833,
  },
  {
    id: 5,
    name: 'Oye General Hospital',
    shortName: 'OGH Oye',
    location: 'Oye-Ekiti',
    phone: '08067890123',
    hours: '8AM - 8PM',
    lat: 7.8167,
    lng: 5.3167,
  },
]

// Location coordinates map
const locationCoords: Record<string, [number, number]> = {
  'ado-ekiti':     [7.6263, 5.2213],
  'ikere-ekiti':   [7.4897, 5.2432],
  'ikole-ekiti':   [7.7944, 5.5041],
  'aramoko-ekiti': [7.6667, 5.0833],
  'oye-ekiti':     [7.8167, 5.3167],
  'ijero-ekiti':   [7.8167, 5.0667],
  'ido-ekiti':     [7.6500, 5.0833],
}

function getCoords(location: string): [number, number] {
  const lower = location.toLowerCase()
  for (const [key, coords] of Object.entries(locationCoords)) {
    if (lower.includes(key)) return coords
  }
  return [7.6263, 5.2213]
}

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

interface MeetingPointProps {
  donorLocation: string
  recipientLocation: string
  bloodType: string
  donorName: string
  donorPhone: string
}

function MeetingPoint({
  donorLocation,
  recipientLocation,
  bloodType,
  donorName,
  donorPhone,
}: MeetingPointProps) {

  const [confirmed, setConfirmed] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<any>(null)

  // Find midpoint between donor and recipient
  const donorCoords     = getCoords(donorLocation)
  const recipientCoords = getCoords(recipientLocation)

  const midLat = (donorCoords[0] + recipientCoords[0]) / 2
  const midLng = (donorCoords[1] + recipientCoords[1]) / 2

  // Sort hospitals by distance from midpoint
  const sortedHospitals = [...hospitals]
    .map((h) => ({
      ...h,
      distance: getDistance(midLat, midLng, h.lat, h.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)

  function handleConfirm(hospital: any) {
    setSelectedHospital(hospital)
    setConfirmed(true)
  }

  function handleShareWhatsApp(hospital: any) {
    const message = encodeURIComponent(
      `🩸 BloodLink Meeting Point\n\n` +
      `Hi ${donorName}! Thank you for agreeing to donate ${bloodType} blood.\n\n` +
      `📍 Please meet me at:\n` +
      `🏥 ${hospital.name}\n` +
      `📍 ${hospital.location}\n` +
      `📞 Hospital: ${hospital.phone}\n` +
      `⏰ Hours: ${hospital.hours}\n\n` +
      `Please confirm you can make it! 🙏`
    )
    window.open(`https://wa.me/${donorPhone}?text=${message}`, '_blank')
  }

  if (confirmed && selectedHospital) {
    return (
      <div className="meeting-confirmed">

        <div className="meeting-confirmed-icon">🏥</div>

        <h3 className="meeting-confirmed-title">
          Meeting Point Confirmed!
        </h3>

        <div className="meeting-confirmed-card">
          <h4 className="meeting-hospital-name">
            {selectedHospital.name}
          </h4>
          <p className="meeting-hospital-detail">
            📍 {selectedHospital.location}
          </p>
          <p className="meeting-hospital-detail">
            📞 {selectedHospital.phone}
          </p>
          <p className="meeting-hospital-detail">
            ⏰ {selectedHospital.hours}
          </p>
        </div>

        <p className="meeting-confirmed-text">
          Share this meeting point with your donor via WhatsApp!
        </p>

        <button
          className="meeting-whatsapp-btn"
          onClick={() => handleShareWhatsApp(selectedHospital)}
        >
          💬 Send Meeting Point on WhatsApp
        </button>

        <button
          className="meeting-directions-btn"
          onClick={() => window.open(
            `https://www.google.com/maps/search/${encodeURIComponent(selectedHospital.name + ' ' + selectedHospital.location)}`,
            '_blank'
          )}
        >
          🗺️ Get Directions
        </button>

      </div>
    )
  }

  return (
    <div className="meeting-wrapper">

      <div className="meeting-header">
        <span className="meeting-tag">🏥 Meeting Point</span>
        <h3 className="meeting-title">
          Suggested Hospitals <br />
          <span className="meeting-title-red">Near Both of You</span>
        </h3>
        <p className="meeting-subtitle">
          Select a hospital where the donation will take place.
          We picked the closest ones between you and your donor.
        </p>
      </div>

      <div className="meeting-hospitals">
        {sortedHospitals.map((hospital, index) => (
          <div
            key={hospital.id}
            className={`meeting-hospital-card ${index === 0 ? 'meeting-hospital-recommended' : ''}`}
          >
            {index === 0 && (
              <span className="meeting-recommended-badge">
                ⭐ Recommended
              </span>
            )}

            <div className="meeting-hospital-info">
              <h4 className="meeting-hospital-name">
                {hospital.name}
              </h4>
              <p className="meeting-hospital-detail">
                📍 {hospital.location}
              </p>
              <p className="meeting-hospital-detail">
                🚗 {hospital.distance.toFixed(1)}km from midpoint
              </p>
              <p className="meeting-hospital-detail">
                ⏰ {hospital.hours}
              </p>
              <p className="meeting-hospital-detail">
                📞 {hospital.phone}
              </p>
            </div>

            <button
              className="meeting-select-btn"
              onClick={() => handleConfirm(hospital)}
            >
              Select This Hospital
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MeetingPoint