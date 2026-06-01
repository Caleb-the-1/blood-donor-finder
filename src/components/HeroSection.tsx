function HeroSection() {
  return (
    <section className="hero">

    
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

          <a href="#hospital" className="hero-choice-btn">
            🏥 Hospital
          </a>

          <a href="#individual" className="hero-choice-btn">
            👤 Individual
          </a>

        </div>

        
        <div className="hero-buttons">
          <a href="#find" className="hero-btn-primary">
            🔍 Find a Donor
          </a>
          <a href="#register" className="hero-btn-secondary">
            💉 Become a Donor
          </a>
        </div>

      </div>

      
      <div className="hero-image-wrapper">
        <img
          src="/hero.jpg"
          alt="Blood donation"
          className="hero-image"
        />

        <div className="hero-image-fade" />
      </div>

    </section>
  )
}

export default HeroSection