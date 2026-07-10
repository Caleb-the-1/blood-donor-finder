import { useState } from 'react'
import { getDonors } from '../appwrite'
import DonorCard from './DonorCard'

function SearchSection() {

  const [bloodType, setBloodType]   = useState('')
  const [location, setLocation]     = useState('')
  const [results, setResults]       = useState<any[]>([])
  const [searched, setSearched]     = useState(false)
  const [loading, setLoading]       = useState(false)

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  async function handleSearch() {
    if (!bloodType && !location) {
      alert('Please select a blood type or enter a location!')
      return
    }

    try {
      setLoading(true)
      setSearched(false)

      const response = await getDonors()
      const allDonors = response.documents

      // Filter donors by blood type and location
      const filtered = allDonors.filter((donor) => {
        const matchBlood    = bloodType ? donor.bloodType === bloodType : true
        const matchLocation = location  ? donor.location.toLowerCase().includes(location.toLowerCase()) : true
        return matchBlood && matchLocation && donor.available
      })

      setResults(filtered)
      setSearched(true)

    } catch (error) {
      console.error(error)
      alert('Something went wrong! Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setBloodType('')
    setLocation('')
    setResults([])
    setSearched(false)
  }

  return (
    <section className="search-section" id="find">

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

        {/* Blood type picker */}
        <div className="search-field">
          <label className="search-label">🩸 Blood Type Needed</label>
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

        {/* Location input */}
        <div className="search-field">
          <label className="search-label">📍 Your Location</label>
          <input
            type="text"
            className="search-input"
            placeholder="e.g. Ado-Ekiti, Ikere-Ekiti..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="search-btns">
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '⏳ Searching...' : '🔍 Search for Donors'}
          </button>

          {searched && (
            <button className="search-clear-btn" onClick={handleClear}>
              ✕ Clear
            </button>
          )}
        </div>

      </div>

      {/* Search Results */}
      {searched && (
        <div className="search-results">

          <h3 className="search-results-title">
            {results.length > 0
              ? `✅ Found ${results.length} available donor${results.length > 1 ? 's' : ''}`
              : '😔 No donors found matching your search'}
          </h3>

          {results.length === 0 && (
            <p className="search-results-empty">
              Try a different blood type or location.
              New donors register every day!
            </p>
          )}

          <div className="search-results-grid">
{results.map((donor) => (
  <DonorCard
    key={donor.$id}
    name={donor.name}
    bloodType={donor.bloodType}
    location={donor.location}
    distance="Nearby"
    available={donor.available}
    image=""
    phone={donor.phone}
  />
))}
          </div>

        </div>
      )}

    </section>
  )
}

export default SearchSection