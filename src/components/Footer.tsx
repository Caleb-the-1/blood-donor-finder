function Footer() {
  return (
    <footer className="footer">

      {/* TOP — Logo and description */}
      <div className="footer-top">

        <div className="footer-brand">
          <span className="footer-logo">🩸 BloodLink</span>
          <p className="footer-description">
            Connecting people in urgent need of blood
            to willing donors nearby. Fast. Free. Life saving.
          </p>
        </div>

        {/* Quick links */}
        <div className="footer-links-group">
          <h4 className="footer-links-title">Quick Links</h4>
          <a href="#home" className="footer-link">Home</a>
          <a href="#find" className="footer-link">Find a Donor</a>
          <a href="#register" className="footer-link">Become a Donor</a>
          <a href="#request" className="footer-link">Request Blood</a>
        </div>

        {/* Contact */}
        <div className="footer-links-group">
          <h4 className="footer-links-title">Contact</h4>
          <p className="footer-link">📧 caleborabe78@gmail.com</p>
          <p className="footer-link">📞 08114855342</p>
          <p className="footer-link">📍 Ado-Ekiti, Ekiti State</p>
        </div>

        {/* Emergency */}
        <div className="footer-links-group">
          <h4 className="footer-links-title">Emergency</h4>
          <p className="footer-emergency-text">
            If this is a life-threatening emergency
            please call your nearest hospital immediately.
          </p>
          <a href="#request" className="footer-emergency-btn">
            🚨 Request Blood Now
          </a>
        </div>

      </div>

      {/* BOTTOM — Copyright */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © 2026 BloodLink. Built by group 2 with ❤️ to save lives across Nigeria.
        </p>
      </div>

    </footer>
  )
}

export default Footer