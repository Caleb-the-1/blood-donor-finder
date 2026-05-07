import React, { useState } from 'react'

function RegisterForm() {

  // Remember everything the user types
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    location: '',
    registerType: '',
  })

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  // Updates the correct field when user types
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!formData.name || !formData.email || !formData.phone || !formData.bloodType || !formData.location || !formData.registerType) {
      alert('Please fill in all fields!')
      return
    }
    alert(`Thank you ${formData.name}! You are now registered as a donor on BloodLink 🩸`)
  }

  return (
    <section className="register-section" id="register">

      {/* Section heading */}
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

      {/* The form card */}
      <div className="register-card">

        {/* Register type picker */}
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

        {/* Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Blood type */}
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

        {/* Location */}
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

        {/* Submit button */}
        <button className="register-btn" onClick={handleSubmit}>
          🩸 Register Now
        </button>

      </div>

    </section>
  )
}

export default RegisterForm