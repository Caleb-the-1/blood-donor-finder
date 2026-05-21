import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet's default icon issue with React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Custom red marker for donors
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

// Fake donors with real Ekiti coordinates
const donors = [
  {
    id: 1,
    name: 'Amara Okafor',
    bloodType: 'O+',
    location: 'Ado-Ekiti',
    available: true,
    lat: 7.6263,
    lng: 5.2213,
  },
  {
    id: 2,
    name: 'Chidi Nwosu',
    bloodType: 'A+',
    location: 'Ikere-Ekiti',
    available: true,
    lat: 7.4897,
    lng: 5.2432,
  },
  {
    id: 3,
    name: 'Fatima Bello',
    bloodType: 'B-',
    location: 'Ikole-Ekiti',
    available: false,
    lat: 7.7944,
    lng: 5.5041,
  },
  {
    id: 4,
    name: 'Emeka Eze',
    bloodType: 'AB+',
    location: 'Aramoko-Ekiti',
    available: true,
    lat: 7.6667,
    lng: 5.0833,
  },
  {
    id: 5,
    name: 'Ngozi Adeyemi',
    bloodType: 'O-',
    location: 'Oye-Ekiti',
    available: true,
    lat: 7.8167,
    lng: 5.3167,
  },
  {
    id: 6,
    name: 'Tunde Bakare',
    bloodType: 'A-',
    location: 'Ijero-Ekiti',
    available: false,
    lat: 7.8167,
    lng: 5.0667,
  },
]

function DonorMap() {
  return (
    <section className="map-section" id="map">

      {/* Header */}
      <div className="map-header">
        <span className="map-tag">🗺️ Live Donor Map</span>
        <h2 className="map-heading">
          Donors Near <br />
          <span className="map-heading-red">You Right Now</span>
        </h2>
        <p className="map-subtext">
          See available blood donors across Ekiti State
          on a live map. Click any pin to see their details.
        </p>
      </div>

      {/* The actual map */}
      <div className="map-wrapper">
        <MapContainer
          center={[7.6263, 5.2213]}
          zoom={9}
          className="leaflet-map"
          scrollWheelZoom={false}
        >
          {/* Map tiles — the actual map background */}
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* A pin for each donor */}
          {donors.map((donor) => (
            <Marker
              key={donor.id}
              position={[donor.lat, donor.lng]}
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
          ))}

        </MapContainer>
      </div>

    </section>
  )
}

export default DonorMap