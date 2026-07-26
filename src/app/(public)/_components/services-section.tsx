import { Beef, Wallet, Newspaper, Calculator } from "lucide-react"

import { ServiceCard } from "@/components/shared/service-card"

const services = [
  {
    icon: <Beef className="size-6" />,
    title: "Qurban",
    description: "Daftar, verifikasi, dan distribusi hewan qurban dengan sistem terpadu.",
    href: "/dashboard/qurban",
  },
  {
    icon: <Wallet className="size-6" />,
    title: "Zakat",
    description: "Penerimaan, penyaluran, dan laporan ZIS yang transparan.",
    href: "/dashboard/zakat",
  },
  {
    icon: <Newspaper className="size-6" />,
    title: "Blog",
    description: "Artikel dan kajian Islami untuk menambah wawasan dan keimanan.",
    href: "/blog",
  },
  {
    icon: <Calculator className="size-6" />,
    title: "Kalkulator Zakat",
    description: "Hitung zakat maal Anda dengan mudah dan cepat.",
    href: "/kalkulator-zakat",
  },
]

function ServicesSection() {
  return (
    <section id="layanan" className="scroll-mt-20 px-4 md:px-8 lg:px-16 xl:px-24 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Layanan Utama
          </h2>
          <p className="mt-2 text-muted-foreground">
            Semua kebutuhan manajemen masjid dalam satu platform
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { ServicesSection }
