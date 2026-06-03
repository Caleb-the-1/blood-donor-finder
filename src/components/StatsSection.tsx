import { useState, useEffect } from 'react'
import { getDonors, getReviews } from '../appwrite'
import { databases } from '../appwrite'

const DATABASE_ID    = '6a18b7cb002c5942fb51'
const REQUESTS_TABLE = 'requests'

function StatsSection() {

  const [stats, setStats] = useState({
    donors:   0,
    requests: 0,
    reviews:  0,
    lives:    0,
  })
  const [loading, setLoading] = useState(true)
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [donorsRes, reviewsRes, requestsRes] = await Promise.all([
          getDonors(),
          getReviews(),
          databases.listDocuments(DATABASE_ID, REQUESTS_TABLE),
        ])

        const finalStats = {
          donors:   donorsRes.documents.length,
          requests: requestsRes.documents.length,
          reviews:  reviewsRes.documents.length,
          lives:    donorsRes.documents.length,
        }

        setStats(finalStats)
        setLoading(false)

        // Trigger count up animation
        setTimeout(() => setCounted(true), 100)

      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statItems = [
    {
      number: stats.donors,
      label:  'Donors Registered',
      icon:   '💉',
      suffix: '+',
    },
    {
      number: stats.requests,
      label:  'Blood Requests Sent',
      icon:   '🚨',
      suffix: '+',
    },
    {
      number: stats.lives,
      label:  'Lives Impacted',
      icon:   '❤️',
      suffix: '+',
    },
    {
      number: stats.reviews,
      label:  'Community Reviews',
      icon:   '⭐',
      suffix: '+',
    },
  ]

  return (
    <section className="stats-section">

      <div className="stats-header">
        <span className="stats-tag">📊 Real Numbers</span>
        <h2 className="stats-heading">
          BloodLink By <br />
          <span className="stats-heading-red">The Numbers</span>
        </h2>
        <p className="stats-subtext">
          live updates as more people join BloodLink.
        </p>
      </div>

      <div className="stats-grid">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className={`stat-card ${counted ? 'stat-card-visible' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-number-wrapper">
              {loading ? (
                <span className="stat-loading">...</span>
              ) : (
                <span className="stat-number">
                  {stat.number}{stat.suffix}
                </span>
              )}
            </div>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default StatsSection