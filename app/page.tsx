import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

/**
 * MapleSky Travels Home Page
 *
 * Landing page featuring:
 * - Sticky responsive navbar
 * - Full viewport hero with GIDS display
 * - Email capture CTA section
 * - Minimal footer
 */
export default function HomePage() {
  return (
    <>
      {/* Sticky navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero section with GIDS display */}
        <Hero />

        {/* Email capture section */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}