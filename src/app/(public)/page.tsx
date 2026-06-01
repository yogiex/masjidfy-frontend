import { HeroSection } from "@/app/(public)/_components/hero-section"
import { ServicesSection } from "@/app/(public)/_components/services-section"
import { StatsSection } from "@/app/(public)/_components/stats-section"
import { LatestArticles } from "@/app/(public)/_components/latest-articles"
import { CTASection } from "@/app/(public)/_components/cta-section"

export const metadata = {
  title: "Masjidfy — Kelola Masjid Lebih Mudah",
  description:
    "Platform manajemen masjid terpadu. Kelola zakat, qurban, dan dakwah masjid Anda dalam satu platform.",
}

function LandingPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <LatestArticles />
      <CTASection />
    </>
  )
}

export default LandingPage
