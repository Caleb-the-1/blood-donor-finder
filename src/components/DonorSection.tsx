import DonorCard from './DonorCard'

// Fake donors so we can see the cards on screen
// We will replace this with real data later
const fakeDonors = [
  {
    id: 1,
    name: 'Amara Okafor',
    bloodType: 'O+',
    location: 'Ado-Ekiti, Ekiti',
    distance: '1.2km',
    available: true,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Chidi Nwosu',
    bloodType: 'A+',
    location: 'Ikere-Ekiti, Ekiti',
    distance: '3.5km',
    available: true,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Fatima Bello',
    bloodType: 'B-',
    location: 'Ikole-Ekiti, Ekiti',
    distance: '5.1km',
    available: false,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'Emeka Eze',
    bloodType: 'AB+',
    location: 'Aramoko-Ekiti, Ekiti',
    distance: '2.8km',
    available: true,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 5,
    name: 'Ngozi Adeyemi',
    bloodType: 'O-',
    location: 'Oye-Ekiti, Ekiti',
    distance: '7.3km',
    available: true,
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 6,
    name: 'Tunde Bakare',
    bloodType: 'A-',
    location: 'Ijero-Ekiti, Ekiti',
    distance: '4.6km',
    available: false,
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
]
function DonorSection() {
  return (
    <section className="donor-section" id="donors">

      {/* Section heading */}
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

      {/* Grid of donor cards */}
      <div className="donor-grid">
        {fakeDonors.map((donor) => (
          <DonorCard
            key={donor.id}
            name={donor.name}
            bloodType={donor.bloodType}
            location={donor.location}
            distance={donor.distance}
            available={donor.available}
            image={donor.image}
          />
        ))}
      </div>

    </section>
  )
}

export default DonorSection