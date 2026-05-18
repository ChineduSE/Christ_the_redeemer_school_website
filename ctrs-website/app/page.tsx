import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Academics from '@/components/Academics'
import Facilities from '@/components/Facilities'
import Gallery from '@/components/Gallery'
import Admissions from '@/components/Admissions'
import News from '@/components/News'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Academics />
      <Facilities />
      <Gallery />
      <Admissions />
      <News />
      <Contact />
      <Footer />
    </main>
  )
}
