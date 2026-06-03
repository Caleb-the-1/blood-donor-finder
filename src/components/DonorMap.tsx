import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getDonors } from '../appwrite'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const redIcon = new L.Icon({
  iconUrl:       'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:      [25, 41],
  iconAnchor:    [12, 41],
  popupAnchor:   [1, -34],
})

// Ekiti State locations with their coordinates
// We use this to place pins on the map based on donor location text
const locationCoordinates: Record<string, [number, number]> = {
  'ado-ekiti':      [7.6263, 5.2213],
  'ikere-ekiti':    [7.4897, 5.2432],
  'ikole-ekiti':    [7.7944, 5.5041],
  'aramoko-ekiti':  [7.6667, 5.0833],
  'oye-ekiti':      [7.8167, 5.3167],
  'ijero-ekiti':    [7.8167, 5.0667],
  'efon-alaaye':    [7.6500, 4.9833],
  'ido-ekiti':      [7.6500, 5.0833],
  'ilawe-ekiti':    [7.6333, 5.0500],
  'emure-ekiti':    [7.4500, 5.4667],
}

// Find coordinates for a donor based on their location text
function getCoordinates(location: string): [number, number] | null {
  const lower = location.toLowerCase()
  for (const [key, coords] of Object.entries(locationCoordinates)) {
    if (lower.includes(key)) return coords
  }
  // Default to Ado-Ekiti if location not recognized
  return [7.6263, 5.2213]
}

function DonorMap() {

  const [donors, setDonors]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDonors() {
      try {
        const result = await getDonors()
        setDonors(result.documents)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDonors()
  }, [])

  return (
    <section className="map-section" id="map">

      <div className="map-header">
        <span className="map-tag">🗺️ Live Donor Map</span>
        <h2 className="map-heading">
          Donors Near <br />
          <span className="map-heading-red">You Right Now</span>
        </h2>
        <p className="map-subtext">
          See real registered blood donors across Ekiti State
          on a live map. Click any pin to see their details.
        </p>
      </div>

      {loading ? (
        <div className="map-loading">
          <span>🩸</span>
          <p>Loading donor locations...</p>
        </div>
      ) : (
        <div className="map-wrapper">
          <MapContainer
            center={[7.6263, 5.2213]}
            zoom={9}
            className="leaflet-map"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {donors.map((donor) => {
              const coords = getCoordinates(donor.location)
              if (!coords) return null
              return (
                <Marker
                  key={donor.$id}
                  position={coords}
                  icon={redIcon}
                >
                  <Popup>
                    <div className="map-popup">
                      <h4 className="map-popup-name">{donor.name}</h4>
                      <span className="map-popup-blood">{donor.bloodType}</span>
                      <p className="map-popup-location">📍 {donor.location}</p>
                      <p className={`map-popup-status ${donor.available ? 'status-available' : 'status-unavailable'}`}>
                        {donor.available ? '✅ Available' : '❌ Unavailable'}
                      </p>
                      {donor.available && (
                        <button className="map-popup-btn">📞 Contact</button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            })}

          </MapContainer>

          {donors.length === 0 && (
            <div className="map-empty">
              <p>🩸 No donors registered yet. Be the first!</p>
            </div>
          )}

        </div>
      )}

    </section>
  )
}

export default DonorMap