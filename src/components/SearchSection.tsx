import { useState } from 'react'


function SearchSection() {
  const [bloodType, setBloodType] = useState('')
  const [location, setLocation] = useState('')
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  function handleSearch() {
    if (!bloodType || !location) {
      alert('Please fill in both fields!')
      return
    }    
    alert(`Searching for ${bloodType} donors near ${location}...`)
  }

  return (
    <section className="search-section" id="find">

      {/* Section heading */}
      <div className="search-header">
        <span className="search-tag">🔍 Find a Donor</span>
        <h2 className="search-heading">
          Find Blood Donors <br />
          <span className="search-heading-red">Near You</span>
        </h2>
        <p className="search-subtext">
          Enter your location and the blood type needed.
          We will show you willing donors nearby instantly.
        </p>
      </div>

      <div className="search-card">

        {/* BLOOD TYPE PICKER */}
        <div className="search-field">
          <label className="search-label">
            🩸 Blood Type Needed
          </label>

       
          <div className="blood-type-grid">
            {bloodTypes.map((type) => (
              <button
                key={type}
                className={`blood-type-btn ${bloodType === type ? 'blood-type-btn-active' : ''}`}
                onClick={() => setBloodType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* LOCATION INPUT */}
        <div className="search-field">
          <label className="search-label">
            📍 Your Location
          </label>
          <input
            type="text"
            className="search-input"
            placeholder="e.g. Ekiti, Oye..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* SEARCH BUTTON */}
        <button
          className="search-btn"
          onClick={handleSearch}
        >
          🔍 Search for Donors
        </button>

      </div>

    </section>
  )
}

export default SearchSection