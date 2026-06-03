
import HeroSection from '../components/HeroSection'
import SearchSection from '../components/SearchSection'
import DonorSection from '../components/DonorSection'
import StatsSection from '../components/StatsSection'
import '../components/StatsSection.css'

function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <SearchSection />
      <DonorSection />
    </div>
  )
}

export default Home