import { useState } from 'react'
import { createRequest } from '../appwrite'
import SuccessOverlay from './SuccessOverlay'
import './SuccessOverlay.css'
import { useNavigate } from 'react-router-dom'

function RequestForm() {

  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: '',
    hospital: '',
    location: '',
    phone: '',
    urgency: '',
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const urgencyLevels = ['🔴 Critical', '🟡 Urgent', '🟢 Scheduled']

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!formData.patientName || !formData.bloodType || !formData.hospital || !formData.location || !formData.phone || !formData.urgency) {
      alert('Please fill in all fields!')
      return
    }

    try {
      setLoading(true)
      await createRequest({
        patientName: formData.patientName,
        bloodType:   formData.bloodType,
        hospital:    formData.hospital,
        location:    formData.location,
        phone:       formData.phone,
        urgency:     formData.urgency,
        status:      'pending',
      })
    setShowOverlay(true)
setFormData({ patientName: '', bloodType: '', hospital: '', location: '', phone: '', urgency: '' })
setTimeout(() => {
  navigate('/')
}, 3000)
    } catch (error) {
      alert('Something went wrong! Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="request-section" id="request">

      {showOverlay && (
        <SuccessOverlay onClose={() => setShowOverlay(false)} />
      )}

      <div className="request-header">
        <span className="request-tag">🚨 Emergency Request</span>
        <h2 className="request-heading">
          Need Blood <br />
          <span className="request-heading-red">Right Now?</span>
        </h2>
        <p className="request-subtext">
          Fill this form and we will instantly alert
          every available donor near your location.
        </p>
      </div>

      <div className="request-card">

        <div className="request-field">
          <label className="request-label">How Urgent Is This?</label>
          <div className="urgency-choices">
            {urgencyLevels.map((level) => (
              <button
                key={level}
                className={`urgency-btn ${formData.urgency === level ? 'urgency-btn-active' : ''}`}
                onClick={() => setFormData({ ...formData, urgency: level })}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="request-field">
          <label className="request-label">Patient Name</label>
          <input
            className="request-input"
            type="text"
            name="patientName"
            placeholder="e.g. John Adeyemi"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>

        <div className="request-field">
          <label className="request-label">🩸 Blood Type Needed</label>
          <div className="blood-type-grid">
            {bloodTypes.map((type) => (
              <button
                key={type}
                className={`blood-type-btn ${formData.bloodType === type ? 'blood-type-btn-active' : ''}`}
                onClick={() => setFormData({ ...formData, bloodType: type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="request-field">
          <label className="request-label">🏥 Hospital Name</label>
          <input
            className="request-input"
            type="text"
            name="hospital"
            placeholder="e.g. EKSUTH, Ado-Ekiti"
            value={formData.hospital}
            onChange={handleChange}
          />
        </div>

        <div className="request-field">
          <label className="request-label">📍 Location</label>
          <input
            className="request-input"
            type="text"
            name="location"
            placeholder="e.g. Ado-Ekiti, Ekiti"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="request-field">
          <label className="request-label">📞 Contact Phone</label>
          <input
            className="request-input"
            type="tel"
            name="phone"
            placeholder="e.g. 08012345678"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button
          className="request-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '⏳ Sending...' : '🚨 Send Emergency Request'}
        </button>

      </div>

    </section>
  )
}

export default RequestForm