import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

import { MasjidSilhouette } from "@/components/shared/masjid-silhouette"
import { Button } from "@/components/ui/button"

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Mudahkan Ibadah,
            <br />
            <span className="text-primary">Berdayakan Umat</span>
          </h1>
          <p className="mx-auto max-w-lg text-muted-foreground lg:mx-0">
            Kelola zakat, qurban, dan dakwah masjid Anda dalam satu platform
            terpadu. Mudah, transparan, dan berkah.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button size="lg" asChild>
              <Link href="/register">
                Daftar Gratis
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#layanan">
                Pelajari
                <ChevronDown className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
            <MasjidSilhouette className="relative size-56 text-primary/80 sm:size-72" />
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroSection }
