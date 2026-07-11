import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import '../components/MeetingPoint.css'

const hospitals = [
  {
    id: 1,
    name: 'Ekiti State University Teaching Hospital',
    shortName: 'EKSUTH',
    location: 'Ado-Ekiti',
    phone: '08012345678',
    hours: '24/7',
    bloodBank: true,
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
    bloodBank: true,
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
    bloodBank: true,
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
    bloodBank: true,
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
    bloodBank: true,
    lat: 7.8167,
    lng: 5.3167,
  },
  {
    id: 6,
    name: 'Ijero General Hospital',
    shortName: 'IGH Ijero',
    location: 'Ijero-Ekiti',
    phone: '08078901234',
    hours: '8AM - 6PM',
    bloodBank: false,
    lat: 7.8167,
    lng: 5.0667,
  },
]

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

function FindMeetingPoint() {

  const navigate    = useNavigate()
  const receiptRef  = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    donorName:         '',
    donorPhone:        '',
    donorLocation:     '',
    recipientName:     '',
    recipientLocation: '',
    bloodType:         '',
  })

  const [selectedHospital, setSelectedHospital] = useState<any>(null)

  const [confirmation, setConfirmation] = useState({
    units:   '',
    notes:   '',
    date:    new Date().toLocaleDateString('en-GB'),
    time:    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  })

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  // Calculate sorted hospitals
  const donorCoords     = getCoords(formData.donorLocation)
  const recipientCoords = getCoords(formData.recipientLocation)
  const midLat = (donorCoords[0] + recipientCoords[0]) / 2
  const midLng = (donorCoords[1] + recipientCoords[1]) / 2

  const sortedHospitals = [...hospitals]
    .map((h) => ({
      ...h,
      distance: getDistance(midLat, midLng, h.lat, h.lng),
      distanceDonor:     getDistance(donorCoords[0], donorCoords[1], h.lat, h.lng),
      distanceRecipient: getDistance(recipientCoords[0], recipientCoords[1], h.lat, h.lng),
    }))
    .sort((a, b) => a.distance - b.distance)

  function handleSearchHospitals() {
    if (!formData.donorName || !formData.donorPhone || !formData.donorLocation) {
      alert('Please fill in all donor details!')
      return
    }
    if (!formData.recipientName || !formData.recipientLocation || !formData.bloodType) {
      alert('Please fill in your details and blood type!')
      return
    }
    setStep(2)
  }

  function handleSelectHospital(hospital: any) {
    setSelectedHospital(hospital)
    setStep(3)
  }

function handleShareWhatsApp() {
  const formatted = formData.donorPhone.startsWith('0')
    ? '234' + formData.donorPhone.slice(1)
    : formData.donorPhone

  const message = encodeURIComponent(
    `🩸 *BloodLink Meeting Point*\n\n` +
    `Hi ${formData.donorName}! Thank you for agreeing to donate *${formData.bloodType}* blood for ${formData.recipientName}.\n\n` +
    `📍 *Please meet at:*\n` +
    `🏥 ${selectedHospital.name}\n` +
    `📍 Location: ${selectedHospital.location}\n` +
    `📞 Hospital: ${selectedHospital.phone}\n` +
    `⏰ Hours: ${selectedHospital.hours}\n\n` +
    `🗺️ Directions: https://www.google.com/maps/search/${encodeURIComponent(selectedHospital.name)}\n\n` +
    `Please confirm you can make it! 🙏\n\n` +
    `— Sent via BloodLink 🩸`
  )
  window.open(`https://wa.me/${formatted}?text=${message}`, '_blank')
}
  function handleConfirmDonation() {
    if (!confirmation.units) {
      alert('Please enter the number of units donated!')
      return
    }
    setStep(5)
  }

  async function handleDownloadReceipt() {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#1a1010',
        scale: 2,
      })
      const link = document.createElement('a')
      link.download = `BloodLink-Receipt-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="mp-page">

      {/* Back button */}
      <button
        className="mp-back-btn"
        onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}
      >
        ← Back
      </button>

      {/* Progress bar */}
      <div className="mp-progress">
        {['Search', 'Hospitals', 'Confirm', 'Done', 'Receipt'].map((label, i) => (
          <div key={i} className={`mp-progress-step ${step > i ? 'mp-step-done' : ''} ${step === i + 1 ? 'mp-step-active' : ''}`}>
            <div className="mp-progress-dot">{step > i + 1 ? '✓' : i + 1}</div>
            <span className="mp-progress-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ─── STEP 1 — Search Form ─── */}
      {step === 1 && (
        <div className="mp-section">
          <div className="mp-header">
            <span className="mp-tag">🏥 Meeting Point</span>
            <h2 className="mp-title">
              Find The Best <br />
              <span className="mp-title-red">Hospital To Meet</span>
            </h2>
            <p className="mp-subtitle">
              Enter your details and your donor's details.
              We will find the closest hospital between both of you!
            </p>
          </div>

          <div className="mp-form-card">

            <div className="mp-form-section-title">👤 Your Details</div>

            <div className="mp-field">
              <label className="mp-label">Your Name</label>
              <input
                className="mp-input"
                type="text"
                placeholder="e.g. John Adeyemi"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              />
            </div>

            <div className="mp-field">
              <label className="mp-label">📍 Your Location</label>
              <input
                className="mp-input"
                type="text"
                placeholder="e.g. Ado-Ekiti"
                value={formData.recipientLocation}
                onChange={(e) => setFormData({ ...formData, recipientLocation: e.target.value })}
              />
            </div>

            <div className="mp-field">
              <label className="mp-label">🩸 Blood Type Needed</label>
              <div className="mp-blood-grid">
                {bloodTypes.map((type) => (
                  <button
                    key={type}
                    className={`mp-blood-btn ${formData.bloodType === type ? 'mp-blood-active' : ''}`}
                    onClick={() => setFormData({ ...formData, bloodType: type })}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mp-divider" />

            <div className="mp-form-section-title">💉 Donor Details</div>

            <div className="mp-field">
              <label className="mp-label">Donor's Name</label>
              <input
                className="mp-input"
                type="text"
                placeholder="e.g. Amara Okafor"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
              />
            </div>

            <div className="mp-field">
              <label className="mp-label">📞 Donor's Phone</label>
              <input
                className="mp-input"
                type="tel"
                placeholder="e.g. 08012345678"
                value={formData.donorPhone}
                onChange={(e) => setFormData({ ...formData, donorPhone: e.target.value })}
              />
            </div>

            <div className="mp-field">
              <label className="mp-label">📍 Donor's Location</label>
              <input
                className="mp-input"
                type="text"
                placeholder="e.g. Ikere-Ekiti"
                value={formData.donorLocation}
                onChange={(e) => setFormData({ ...formData, donorLocation: e.target.value })}
              />
            </div>

            <button className="mp-find-btn" onClick={handleSearchHospitals}>
              🏥 Find Nearest Hospitals →
            </button>

          </div>
        </div>
      )}

      {/* ─── STEP 2 — Hospital Results ─── */}
      {step === 2 && (
        <div className="mp-section">
          <div className="mp-header">
            <span className="mp-tag">📍 Nearby Hospitals</span>
            <h2 className="mp-title">
              Best Hospitals <br />
              <span className="mp-title-red">Between You Both</span>
            </h2>
            <p className="mp-subtitle">
              Sorted by distance from the midpoint between
              you and your donor. Select one to proceed!
            </p>
          </div>

          <div className="mp-hospitals-list">
            {sortedHospitals.map((hospital, index) => (
              <div
                key={hospital.id}
                className={`mp-hospital-card ${index === 0 ? 'mp-hospital-top' : ''}`}
              >
                {index === 0 && (
                  <div className="mp-best-badge">⭐ Best Match</div>
                )}

                <div className="mp-hospital-top-row">
                  <div>
                    <h3 className="mp-hospital-name">{hospital.name}</h3>
                    <p className="mp-hospital-location">📍 {hospital.location}</p>
                  </div>
                  <div className="mp-hospital-distance">
                    {hospital.distance.toFixed(1)}km
                  </div>
                </div>

                <div className="mp-hospital-details">
                  <span className="mp-hospital-detail">⏰ {hospital.hours}</span>
                  <span className="mp-hospital-detail">📞 {hospital.phone}</span>
                  <span className={`mp-hospital-detail ${hospital.bloodBank ? 'mp-detail-green' : 'mp-detail-red'}`}>
                    🩸 {hospital.bloodBank ? 'Blood Bank Available' : 'No Blood Bank'}
                  </span>
                </div>

                <div className="mp-hospital-distances">
                  <span>From donor: {hospital.distanceDonor.toFixed(1)}km</span>
                  <span>From you: {hospital.distanceRecipient.toFixed(1)}km</span>
                </div>

                <div className="mp-hospital-actions">
                  <button
                    className="mp-select-btn"
                    onClick={() => handleSelectHospital(hospital)}
                  >
                    Select This Hospital ✓
                  </button>
                  <button
                    className="mp-directions-btn"
                    onClick={() => window.open(
                      `https://www.google.com/maps/search/${encodeURIComponent(hospital.name + ' ' + hospital.location)}`,
                      '_blank'
                    )}
                  >
                    🗺️ Directions
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── STEP 3 — Share & Confirm ─── */}
      {step === 3 && selectedHospital && (
        <div className="mp-section">
          <div className="mp-header">
            <span className="mp-tag">✅ Meeting Point Set</span>
            <h2 className="mp-title">
              Share With <br />
              <span className="mp-title-red">Your Donor</span>
            </h2>
          </div>

          <div className="mp-confirmed-card">

            <div className="mp-confirmed-icon">🏥</div>

            <h3 className="mp-confirmed-hospital">
              {selectedHospital.name}
            </h3>

            <div className="mp-confirmed-details">
              <p>📍 {selectedHospital.location}</p>
              <p>📞 {selectedHospital.phone}</p>
              <p>⏰ {selectedHospital.hours}</p>
              <p>🩸 {selectedHospital.bloodBank ? 'Blood Bank Available ✅' : 'No Blood Bank ❌'}</p>
            </div>

            <button className="mp-whatsapp-btn" onClick={handleShareWhatsApp}>
              💬 Send to {formData.donorName} on WhatsApp
            </button>

            <button
              className="mp-directions-btn-full"
              onClick={() => window.open(
                `https://www.google.com/maps/search/${encodeURIComponent(selectedHospital.name)}`,
                '_blank'
              )}
            >
              🗺️ Get Directions
            </button>

            <div className="mp-divider" />

            <p className="mp-confirm-prompt">
              Once the donation is complete come back here
              and confirm it to generate your receipt!
            </p>

            <button
              className="mp-done-btn"
              onClick={() => setStep(4)}
            >
              ✅ Donation Complete — Confirm Now
            </button>

          </div>
        </div>
      )}

      {/* ─── STEP 4 — Confirmation Form ─── */}
      {step === 4 && (
        <div className="mp-section">
          <div className="mp-header">
            <span className="mp-tag">✅ Confirm Donation</span>
            <h2 className="mp-title">
              Confirm The <br />
              <span className="mp-title-red">Donation Happened</span>
            </h2>
            <p className="mp-subtitle">
              Fill this in after the donation is complete
              to generate your official BloodLink receipt!
            </p>
          </div>

          <div className="mp-form-card">

            <div className="mp-field">
              <label className="mp-label">💉 Units of Blood Donated</label>
              <input
                className="mp-input"
                type="number"
                placeholder="e.g. 1"
                min="1"
                max="5"
                value={confirmation.units}
                onChange={(e) => setConfirmation({ ...confirmation, units: e.target.value })}
              />
            </div>

            <div className="mp-field">
              <label className="mp-label">📅 Date of Donation</label>
              <input
                className="mp-input"
                type="text"
                value={confirmation.date}
                onChange={(e) => setConfirmation({ ...confirmation, date: e.target.value })}
              />
            </div>

            <div className="mp-field">
              <label className="mp-label">⏰ Time of Donation</label>
              <input
                className="mp-input"
                type="text"
                value={confirmation.time}
                onChange={(e) => setConfirmation({ ...confirmation, time: e.target.value })}
              />
            </div>

            <div className="mp-field">
              <label className="mp-label">📝 Additional Notes (optional)</label>
              <input
                className="mp-input"
                type="text"
                placeholder="e.g. Donation went smoothly"
                value={confirmation.notes}
                onChange={(e) => setConfirmation({ ...confirmation, notes: e.target.value })}
              />
            </div>

            <button className="mp-confirm-btn" onClick={handleConfirmDonation}>
              🩸 Generate Receipt →
            </button>

          </div>
        </div>
      )}

      {/* ─── STEP 5 — Receipt ─── */}
      {step === 5 && (
        <div className="mp-section">

          <div className="mp-header">
            <span className="mp-tag">🎉 Donation Complete!</span>
            <h2 className="mp-title">
              Your Official <br />
              <span className="mp-title-red">BloodLink Receipt</span>
            </h2>
          </div>

          {/* The actual receipt */}
          <div className="mp-receipt" ref={receiptRef}>

            {/* Receipt header */}
            <div className="mp-receipt-header">
              <span className="mp-receipt-logo">🩸</span>
              <h3 className="mp-receipt-brand">BloodLink</h3>
              <p className="mp-receipt-tagline">Official Donation Receipt</p>
            </div>

            <div className="mp-receipt-divider" />

            {/* Receipt body */}
            <div className="mp-receipt-body">

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Receipt ID</span>
                <span className="mp-receipt-value">BL-{Date.now().toString().slice(-8)}</span>
              </div>

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Date</span>
                <span className="mp-receipt-value">{confirmation.date}</span>
              </div>

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Time</span>
                <span className="mp-receipt-value">{confirmation.time}</span>
              </div>

              <div className="mp-receipt-divider" />

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Donor</span>
                <span className="mp-receipt-value">{formData.donorName}</span>
              </div>

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Recipient</span>
                <span className="mp-receipt-value">{formData.recipientName}</span>
              </div>

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Blood Type</span>
                <span className="mp-receipt-value mp-receipt-blood">{formData.bloodType}</span>
              </div>

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Units Donated</span>
                <span className="mp-receipt-value">{confirmation.units} unit(s)</span>
              </div>

              <div className="mp-receipt-divider" />

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Hospital</span>
                <span className="mp-receipt-value">{selectedHospital?.name}</span>
              </div>

              <div className="mp-receipt-row">
                <span className="mp-receipt-label">Location</span>
                <span className="mp-receipt-value">{selectedHospital?.location}</span>
              </div>

              {confirmation.notes && (
                <div className="mp-receipt-row">
                  <span className="mp-receipt-label">Notes</span>
                  <span className="mp-receipt-value">{confirmation.notes}</span>
                </div>
              )}

            </div>

            <div className="mp-receipt-divider" />

            {/* Receipt footer */}
            <div className="mp-receipt-footer">
              <div className="mp-receipt-stamp">✅ VERIFIED</div>
              <p className="mp-receipt-thanks">
                Thank you for saving a life today! ❤️
              </p>
              <p className="mp-receipt-powered">
                Powered by BloodLink — bloodlink.ng
              </p>
            </div>

          </div>

          {/* Action buttons */}
          <div className="mp-receipt-actions">

            <button className="mp-download-btn" onClick={handleDownloadReceipt}>
              📥 Download Receipt
            </button>

            <button
              className="mp-share-receipt-btn"
              onClick={() => {
                const message = encodeURIComponent(
                  `🩸 *BloodLink Donation Receipt*\n\n` +
                  `✅ Donation successfully completed!\n\n` +
                  `👤 Donor: ${formData.donorName}\n` +
                  `👤 Recipient: ${formData.recipientName}\n` +
                  `🩸 Blood Type: ${formData.bloodType}\n` +
                  `💉 Units: ${confirmation.units}\n` +
                  `🏥 Hospital: ${selectedHospital?.name}\n` +
                  `📅 Date: ${confirmation.date}\n` +
                  `⏰ Time: ${confirmation.time}\n\n` +
                  `Thank you for saving a life! ❤️\n` +
                  `— BloodLink 🩸`
                )
                window.open(`https://wa.me/?text=${message}`, '_blank')
              }}
            >
              💬 Share Receipt on WhatsApp
            </button>

            <button
              className="mp-home-btn"
              onClick={() => navigate('/')}
            >
              🏠 Back to Home
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default FindMeetingPoint