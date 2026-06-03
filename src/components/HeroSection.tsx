import { useNavigate } from 'react-router-dom'

function HeroSection() {

  const navigate = useNavigate()

  return (
    <section className="hero">

      {/* LEFT — Content */}
      <div className="hero-content">

        <span className="hero-tag">🩸 Urgent. Real. Life-saving.</span>

        <h1 className="hero-heading">
          Someone Near You <br />
          <span className="hero-heading-red">Needs Blood</span> Right Now.
        </h1>

        <p className="hero-subtext">
          BloodLink connects people in urgent need of blood
          to willing donors nearby — in minutes, not hours.
        </p>

        <p className="hero-register-label">Register as:</p>
        <div className="hero-register-choices">
          <button
            className="hero-choice-btn"
            onClick={() => navigate('/auth?type=hospital')}
          >
            🏥 Hospital
          </button>
          <button
            className="hero-choice-btn"
            onClick={() => navigate('/auth?type=individual')}
          >
            👤 Individual
          </button>
        </div>

        <div className="hero-buttons">
          <button
            className="hero-btn-primary"
            onClick={() => navigate('/find')}
          >
            🔍 Find a Donor
          </button>
          <button
            className="hero-btn-secondary"
            onClick={() => navigate('/register')}
          >
            💉 Become a Donor
          </button>
        </div>

      </div>

      {/* RIGHT — Image */}
      <div className="hero-image-wrapper">
        <img
          src="/hero.jpg"
          alt="Blood donation moment"
          className="hero-image"
        />
        <div className="hero-image-fade" />
      </div>

    </section>
  )
}

export default HeroSection