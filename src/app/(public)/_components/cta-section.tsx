import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

function CTASection() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Siap Memudahkan Ibadah?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Bergabung dengan Masjidfy dan kelola aktivitas masjid Anda dengan
            mudah.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-6"
            asChild
          >
            <Link href="/register">
              Daftar Sekarang Gratis
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export { CTASection }
