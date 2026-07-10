import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerDonor } from '../appwrite'
import SuccessOverlay from './SuccessOverlay'
import './SuccessOverlay.css'

function RegisterForm() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    location: '',
    registerType: '',
  })

const navigate = useNavigate()

const [loading, setLoading] = useState(false)
const [showOverlay, setShowOverlay] = useState(false)

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!formData.name || !formData.email || !formData.phone || !formData.bloodType || !formData.location || !formData.registerType) {
      alert('Please fill in all fields!')
      return
    }

    try {
      setLoading(true)

      await registerDonor({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bloodType: formData.bloodType,
        location: formData.location,
        available: true,
        registerType: formData.registerType,
      })

     setShowOverlay(true)
setFormData({ name: '', email: '', phone: '', bloodType: '', location: '', registerType: '' })
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
    <section className="register-section" id="register">

      <div className="register-header">
        <span className="register-tag">💉 Join BloodLink</span>
        <h2 className="register-heading">
          Become a Donor. <br />
          <span className="register-heading-red">Save a Life Today.</span>
        </h2>
        <p className="register-subtext">
          Sign up as an individual or a hospital and
          be ready when someone needs you most.
        </p>
      </div>

      <div className="register-card">

        {/* Success message */}
    {showOverlay && (
  <SuccessOverlay onClose={() => setShowOverlay(false)} />
)}

        <div className="register-field">
          <label className="register-label">I am registering as:</label>
          <div className="register-type-choices">
            <button
              className={`register-type-btn ${formData.registerType === 'Individual' ? 'register-type-active' : ''}`}
              onClick={() => setFormData({ ...formData, registerType: 'Individual' })}
            >
              👤 Individual
            </button>
            <button
              className={`register-type-btn ${formData.registerType === 'Hospital' ? 'register-type-active' : ''}`}
              onClick={() => setFormData({ ...formData, registerType: 'Hospital' })}
            >
              🏥 Hospital
            </button>
          </div>
        </div>

        <div className="register-field">
          <label className="register-label">Full Name</label>
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="e.g. Amara Okafor"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="register-field">
          <label className="register-label">Email Address</label>
          <input
            className="register-input"
            type="email"
            name="email"
            placeholder="e.g. amara@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="register-field">
          <label className="register-label">Phone Number</label>
          <input
            className="register-input"
            type="tel"
            name="phone"
            placeholder="e.g. 08012345678"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="register-field">
          <label className="register-label">🩸 Your Blood Type</label>
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

        <div className="register-field">
          <label className="register-label">📍 Your Location</label>
          <input
            className="register-input"
            type="text"
            name="location"
            placeholder="e.g. Ado-Ekiti, Ekiti"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <button
          className="register-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '⏳ Registering...' : '🩸 Register Now'}
        </button>

      </div>

    </section>
  )
}

export default RegisterForm