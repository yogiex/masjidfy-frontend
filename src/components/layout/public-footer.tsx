import Link from "next/link"
import { MapPin, Mail, Phone } from "lucide-react"

import { MasjidSilhouette } from "@/components/shared/masjid-silhouette"

function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <MasjidSilhouette className="size-7" />
              <span>Masjidfy</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform manajemen masjid digital. Kelola zakat, qurban, dan dakwah
              masjid Anda dalam satu platform terpadu.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kalkulator-zakat" className="hover:text-foreground transition-colors">
                  Kalkulator Zakat
                </Link>
              </li>
              <li>
                <Link href="/tentang/struktur-organisasi" className="hover:text-foreground transition-colors">
                  Struktur Organisasi
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Kontak</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>Jl. Masjid Agung No. 1, Kota Contoh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <span>info@masjidfy.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <span>08xx-xxxx-xxxx</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 text-sm text-muted-foreground">
          <p>&copy; 2026 Masjidfy</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { PublicFooter }
