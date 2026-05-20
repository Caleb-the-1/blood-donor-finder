import SOSButton from '../components/SOSButton'
import '../components/SOSButton.css'

function SOS() {
  return (
    <div className="sos-page">

      <div className="sos-page-header">
        <span className="sos-tag">🆘 Emergency</span>
        <h2 className="sos-heading">
          Need Blood <br />
          <span className="sos-heading-red">Immediately?</span>
        </h2>
        <p className="sos-subtext">
          Press the SOS button below and every available
          donor within 10km will be alerted instantly.
          Only use this in a real emergency.
        </p>
      </div>

      {/* The big SOS button */}
      <SOSButton />

    </div>
  )
}

export default SOS