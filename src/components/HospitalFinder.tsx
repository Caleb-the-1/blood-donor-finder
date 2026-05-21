import { useState } from 'react'

const hospitals = [
  {
    id: 1,
    name: 'Ekiti State University Teaching Hospital',
    shortName: 'EKSUTH',
    location: 'Ado-Ekiti',
    distance: '1.2km',
    phone: '08012345678',
    bloodBank: true,
    available: ['A+', 'O+', 'B+', 'AB+'],
    hours: '24/7',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Federal Teaching Hospital',
    shortName: 'FTH Ido-Ekiti',
    location: 'Ido-Ekiti',
    distance: '8.4km',
    phone: '08023456789',
    bloodBank: true,
    available: ['A+', 'A-', 'O+', 'O-'],
    hours: '24/7',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Ikere General Hospital',
    shortName: 'IGH Ikere',
    location: 'Ikere-Ekiti',
    distance: '15.2km',
    phone: '08034567890',
    bloodBank: true,
    available: ['B+', 'O+'],
    hours: '8AM - 8PM',
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Ikole General Hospital',
    shortName: 'IGH Ikole',
    location: 'Ikole-Ekiti',
    distance: '22.7km',
    phone: '08045678901',
    bloodBank: false,
    available: [],
    hours: '8AM - 6PM',
    rating: 3.9,
  },
  {
    id: 5,
    name: 'Aramoko District Hospital',
    shortName: 'ADH Aramoko',
    location: 'Aramoko-Ekiti',
    distance: '18.5km',
    phone: '08056789012',
    bloodBank: true,
    available: ['O+', 'O-', 'A+'],
    hours: '24/7',
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Oye General Hospital',
    shortName: 'OGH Oye',
    location: 'Oye-Ekiti',
    distance: '31.3km',
    phone: '08067890123',
    bloodBank: true,
    available: ['A+', 'B+', 'AB-'],
    hours: '8AM - 8PM',
    rating: 4.1,
  },
]

function HospitalFinder() {

  const [filter, setFilter] = useState('all')

  const filtered = hospitals.filter((h) => {
    if (filter === 'bloodbank') return h.bloodBank
    if (filter === '24/7') return h.hours === '24/7'
    return true
  })

  return (
    <section className="hospital-section" id="hospitals">

      {/* Header */}
      <div className="hospital-header">
        <span className="hospital-tag">🏥 Hospital Finder</span>
        <h2 className="hospital-heading">
          Nearest Hospitals <br />
          <span className="hospital-heading-red">With Blood Banks</span>
        </h2>
        <p className="hospital-subtext">
          Find the closest hospitals in Ekiti State
          that have blood available right now.
        </p>
      </div>

      {/* Filter buttons */}
      <div className="hospital-filters">
        <button
          className={`hospital-filter-btn ${filter === 'all' ? 'filter-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          🏥 All Hospitals
        </button>
        <button
          className={`hospital-filter-btn ${filter === 'bloodbank' ? 'filter-active' : ''}`}
          onClick={() => setFilter('bloodbank')}
        >
          🩸 Has Blood Bank
        </button>
        <button
          className={`hospital-filter-btn ${filter === '24/7' ? 'filter-active' : ''}`}
          onClick={() => setFilter('24/7')}
        >
          ⏰ Open 24/7
        </button>
      </div>

      {/* Hospital cards */}
      <div className="hospital-grid">
        {filtered.map((hospital) => (
          <div key={hospital.id} className="hospital-card">

            {/* Top */}
            <div className="hospital-card-top">
              <div>
                <h3 className="hospital-name">{hospital.shortName}</h3>
                <p className="hospital-full-name">{hospital.name}</p>
              </div>
              <span className="hospital-rating">⭐ {hospital.rating}</span>
            </div>

            {/* Details */}
            <div className="hospital-details">
              <p className="hospital-detail">📍 {hospital.location}</p>
              <p className="hospital-detail">🚗 {hospital.distance} away</p>
              <p className="hospital-detail">⏰ {hospital.hours}</p>
              <p className="hospital-detail">
                🩸 Blood Bank:
                <span className={hospital.bloodBank ? 'detail-yes' : 'detail-no'}>
                  {hospital.bloodBank ? ' ✅ Available' : ' ❌ Not Available'}
                </span>
              </p>
            </div>

            {/* Available blood types */}
            {hospital.available.length > 0 && (
              <div className="hospital-blood-types">
                <p className="hospital-blood-label">Available Blood Types:</p>
                <div className="hospital-blood-tags">
                  {hospital.available.map((type) => (
                    <span key={type} className="hospital-blood-tag">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call button */}
            <a href={`tel:${hospital.phone}`} className="hospital-call-btn">
              📞 Call Hospital
            </a>

          </div>
        ))}
      </div>

    </section>
  )
}

export default HospitalFinder