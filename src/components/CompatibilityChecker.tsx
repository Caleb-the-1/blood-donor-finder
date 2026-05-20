import { useState } from 'react'


const compatibilityData: Record<string, { donateTo: string[]; receiveFrom: string[] }> = {
  'A+':  { donateTo: ['A+', 'AB+'],                        receiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  'A-':  { donateTo: ['A+', 'A-', 'AB+', 'AB-'],           receiveFrom: ['A-', 'O-'] },
  'B+':  { donateTo: ['B+', 'AB+'],                        receiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  'B-':  { donateTo: ['B+', 'B-', 'AB+', 'AB-'],           receiveFrom: ['B-', 'O-'] },
  'AB+': { donateTo: ['AB+'],                              receiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  'AB-': { donateTo: ['AB+', 'AB-'],                       receiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
  'O+':  { donateTo: ['A+', 'B+', 'AB+', 'O+'],           receiveFrom: ['O+', 'O-'] },
  'O-':  { donateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], receiveFrom: ['O-'] },
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function CompatibilityChecker() {

  const [selected, setSelected] = useState('')

  const result = selected ? compatibilityData[selected] : null

  return (
    <section className="checker-section" id="checker">

      {/* Section heading */}
      <div className="checker-header">
        <span className="checker-tag">🩸 Compatibility Checker</span>
        <h2 className="checker-heading">
          Who Can Give You <br />
          <span className="checker-heading-red">Blood?</span>
        </h2>
        <p className="checker-subtext">
          Select your blood type and instantly see
          who can donate to you and who you can save.
        </p>
      </div>

      {/* Blood type selector */}
      <div className="checker-card">
        <label className="checker-label">Select Your Blood Type:</label>
        <div className="checker-grid">
          {bloodTypes.map((type) => (
            <button
              key={type}
              className={`checker-type-btn ${selected === type ? 'checker-type-active' : ''}`}
              onClick={() => setSelected(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results */}
        {result && (
          <div className="checker-results">

            {/* Can donate to */}
            <div className="checker-result-box">
              <h4 className="checker-result-title">
                💉 You Can Donate To
              </h4>
              <div className="checker-result-tags">
                {result.donateTo.map((type) => (
                  <span key={type} className="checker-tag-green">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Can receive from */}
            <div className="checker-result-box">
              <h4 className="checker-result-title">
                🩸 You Can Receive From
              </h4>
              <div className="checker-result-tags">
                {result.receiveFrom.map((type) => (
                  <span key={type} className="checker-tag-red">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Fun fact */}
            {selected === 'O-' && (
              <p className="checker-fun-fact">
                ⭐ You are a Universal Donor! Your blood can save ANYONE!
              </p>
            )}
            {selected === 'AB+' && (
              <p className="checker-fun-fact">
                ⭐ You are a Universal Recipient! You can receive from ANYONE!
              </p>
            )}

          </div>
        )}

      </div>

    </section>
  )
}

export default CompatibilityChecker