import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    id: 1,
    image: '/slide1.jpg',
    tag: '🚨 The Reality',
    heading: 'Every 2 Seconds',
    headingRed: 'Someone Needs Blood',
    text: 'Blood shortages claim thousands of lives every year across Nigeria. The need is urgent. The time is now.',
    stats: [
      { number: '4.6M', label: 'Units needed yearly in Nigeria' },
      { number: '25%', label: 'Of needs are actually met' },
    ],
  },
  {
    id: 2,
    image: '/slide2.jpg',
    tag: '💔 The Problem',
    heading: 'Finding a Donor',
    headingRed: 'Takes Too Long',
    text: 'When someone needs blood urgently, every minute counts. Traditional methods are slow, unreliable and cost lives.',
    stats: [
      { number: '72hrs', label: 'Average time to find a donor' },
      { number: '1000s', label: 'Of lives lost due to delays' },
    ],
  },
  {
    id: 3,
    image: '/slide3.jpg',
    tag: '🩸 The Solution',
    heading: 'BloodLink Connects',
    headingRed: 'In Minutes Not Hours',
    text: 'We built BloodLink to bridge that gap. Find willing donors nearby instantly — for free, for everyone, forever.',
    stats: [
      { number: '<10min', label: 'Average donor response time' },
      { number: '100%', label: 'Free — always' },
    ],
  },
  {
    id: 4,
    image: '/slide1.jpg',
    tag: '🌍 Join Us',
    heading: 'Be Part of',
    headingRed: 'Something Life-Saving',
    text: 'Join BloodLink today. Register as a donor. Find blood when you need it. Together we save lives in Ekiti State and beyond.',
    stats: [],
    isFinal: true,
  },
]

function Onboarding() {

  const navigate              = useNavigate()
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [current])

  function goToNext() {
    if (current < slides.length - 1) {
      setAnimating(true)
      setVisible(false)
      setTimeout(() => {
        setCurrent(current + 1)
        setAnimating(false)
      }, 400)
    }
  }

  function goToPrev() {
    if (current > 0) {
      setAnimating(true)
      setVisible(false)
      setTimeout(() => {
        setCurrent(current - 1)
        setAnimating(false)
      }, 400)
    }
  }

  function handleGetStarted() {
    // Mark onboarding as seen
    localStorage.setItem('onboardingDone', 'true')
    navigate('/auth')
  }

  function handleSkip() {
    localStorage.setItem('onboardingDone', 'true')
    navigate('/auth')
  }

  const slide = slides[current]

  return (
    <div className="onboard-page">

      {/* Background image */}
      <div className="onboard-bg">
        <img
          src={slide.image}
          alt="slide"
          className={`onboard-bg-image ${visible ? 'onboard-bg-visible' : ''}`}
        />
        <div className="onboard-bg-overlay" />
      </div>

      {/* Skip button */}
      {current < slides.length - 1 && (
        <button className="onboard-skip" onClick={handleSkip}>
          Skip →
        </button>
      )}

      {/* Content */}
      <div className={`onboard-content ${visible ? 'onboard-content-visible' : ''}`}>

        {/* Tag */}
        <span className="onboard-tag">{slide.tag}</span>

        {/* Heading */}
        <h1 className="onboard-heading">
          {slide.heading} <br />
          <span className="onboard-heading-red">{slide.headingRed}</span>
        </h1>

        {/* Text */}
        <p className="onboard-text">{slide.text}</p>

        {/* Stats */}
        {slide.stats.length > 0 && (
          <div className="onboard-stats">
            {slide.stats.map((stat, i) => (
              <div key={i} className="onboard-stat">
                <span className="onboard-stat-number">{stat.number}</span>
                <span className="onboard-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Final slide CTA */}
        {slide.isFinal && (
          <div className="onboard-features">
            <div className="onboard-feature">
              <span>🔍</span> Find donors near you instantly
            </div>
            <div className="onboard-feature">
              <span>🚨</span> SOS emergency blood alerts
            </div>
            <div className="onboard-feature">
              <span>🗺️</span> Live donor map
            </div>
            <div className="onboard-feature">
              <span>🏥</span> Nearest hospital finder
            </div>
            <div className="onboard-feature">
              <span>🩸</span> Blood compatibility checker
            </div>
          </div>
        )}

      </div>

      {/* Bottom controls */}
      <div className="onboard-bottom">

        {/* Dot indicators */}
        <div className="onboard-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`onboard-dot ${i === current ? 'onboard-dot-active' : ''}`}
              onClick={() => {
                setVisible(false)
                setTimeout(() => setCurrent(i), 400)
              }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="onboard-nav">

          {current > 0 && (
            <button className="onboard-prev" onClick={goToPrev}>
              ← Back
            </button>
          )}

          {slide.isFinal ? (
            <button className="onboard-get-started" onClick={handleGetStarted}>
              🩸 Get Started — It's Free
            </button>
          ) : (
            <button className="onboard-next" onClick={goToNext}>
              Next →
            </button>
          )}

        </div>

      </div>

    </div>
  )
}

export default Onboarding