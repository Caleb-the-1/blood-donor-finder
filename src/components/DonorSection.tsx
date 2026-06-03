import { useState, useEffect } from 'react'
import DonorCard from './DonorCard'
import { getDonors } from '../appwrite'

function DonorSection() {

  const [donors, setDonors]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    async function fetchDonors() {
      try {
        const result = await getDonors()
        setDonors(result.documents)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchDonors()
  }, [])

  if (loading) {
    return (
      <section className="donor-section">
        <div className="donor-loading">
          <span className="donor-loading-drop">🩸</span>
          <p>Finding donors near you...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="donor-section">
        <div className="donor-loading">
          <span>⚠️</span>
          <p>Could not load donors. Please try again.</p>
        </div>
      </section>
    )
  }

  if (donors.length === 0) {
    return (
      <section className="donor-section">
        <div className="donor-header">
          <span className="donor-tag">💉 Nearby Donors</span>
          <h2 className="donor-heading">
            Donors Ready To <br />
            <span className="donor-heading-red">Save Your Life</span>
          </h2>
        </div>
        <div className="donor-empty">
          <span>🩸</span>
          <p>No donors registered yet in your area.</p>
          <p>Be the first to register and save lives!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="donor-section" id="donors">

      <div className="donor-header">
        <span className="donor-tag">💉 Nearby Donors</span>
        <h2 className="donor-heading">
          Donors Ready To <br />
          <span className="donor-heading-red">Save Your Life</span>
        </h2>
        <p className="donor-subtext">
          These are real people in your area who have
          signed up to donate blood at a moment's notice.
        </p>
      </div>

      <div className="donor-grid">
        {donors.map((donor) => (
          <DonorCard
            key={donor.$id}
            name={donor.name}
            bloodType={donor.bloodType}
            location={donor.location}
            distance="Nearby"
            available={donor.available}
            image=""
          />
        ))}
      </div>

    </section>
  )
}

export default DonorSection