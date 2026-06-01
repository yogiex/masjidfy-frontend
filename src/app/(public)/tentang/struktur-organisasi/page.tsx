"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

import { OrgChart } from "@/components/shared/org-chart"
import { BidangCard } from "@/components/shared/bidang-card"
import { BidangDetailDialog } from "@/app/(public)/tentang/struktur-organisasi/_components/bidang-detail-dialog"
import { MasjidSilhouette } from "@/components/shared/masjid-silhouette"

const strukturData = {
  penasehat: [
    { nama: "KH. Ahmad Fauzi" },
    { nama: "Prof. Dr. Budi Santoso" },
    { nama: "Ust. Deni Pratama" },
  ],
  ketua: { nama: "H. Abdullah Karim" },
  sekretaris: { nama: "Muhammad Rizki" },
  bendaharaI: { nama: "Citra Dewi" },
  bendaharaII: { nama: "Fahrul Hadi" },
}

const bidangData = [
  {
    icon: "🕌",
    nama: "Ibadah",
    ketua: "Ahmad Fauzi",
    anggota: [
      { nama: "Budi Santoso", jabatan: "Koordinator" },
      { nama: "Citra Dewi", jabatan: "Anggota" },
      { nama: "Deni Pratama", jabatan: "Anggota" },
      { nama: "Eka Rahmawati", jabatan: "Anggota" },
      { nama: "Fahrul Hadi", jabatan: "Anggota" },
    ],
    tugas: [
      "Mengatur jadwal imam dan muadzin",
      "Menyelenggarakan kajian rutin",
      "Mengelola perpustakaan masjid",
    ],
  },
  {
    icon: "📚",
    nama: "Pendidikan",
    ketua: "Budi Santoso",
    anggota: [
      { nama: "Ahmad Fauzi", jabatan: "Koordinator" },
      { nama: "Gita Permata", jabatan: "Anggota" },
      { nama: "Hendra Gunawan", jabatan: "Anggota" },
    ],
    tugas: [
      "Mengelola TPA dan TPQ",
      "Menyusun kurikulum kajian",
      "Mengadakan pelatihan guru ngaji",
    ],
  },
  {
    icon: "🤝",
    nama: "Sosial",
    ketua: "Citra Dewi",
    anggota: [
      { nama: "Budi Santoso", jabatan: "Koordinator" },
      { nama: "Indra Wijaya", jabatan: "Anggota" },
      { nama: "Joko Susilo", jabatan: "Anggota" },
      { nama: "Kartika Sari", jabatan: "Anggota" },
    ],
    tugas: [
      "Menyalurkan bantuan sosial",
      "Mengelola dana infak dan sedekah",
      "Menyelenggarakan bakti sosial",
    ],
  },
  {
    icon: "🧹",
    nama: "Pemuda & Sarana",
    ketua: "Deni Pratama",
    anggota: [
      { nama: "Ahmad Fauzi", jabatan: "Koordinator" },
      { nama: "Luki Firmansyah", jabatan: "Anggota" },
      { nama: "Mega Wati", jabatan: "Anggota" },
    ],
    tugas: [
      "Merawat dan menjaga kebersihan masjid",
      "Mengelola kegiatan pemuda masjid",
      "Memelihara inventaris dan perlengkapan",
    ],
  },
]

function StrukturOrganisasiPage() {
  const [selectedBidang, setSelectedBidang] = useState<typeof bidangData[number] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleDetail(bidang: typeof bidangData[number]) {
    setSelectedBidang(bidang)
    setDialogOpen(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">
          Beranda
        </a>
        <ChevronRight className="size-3.5" />
        <a href="/tentang" className="hover:text-foreground transition-colors">
          Tentang
        </a>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium">Struktur Organisasi</span>
      </nav>

      {/* Hero */}
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center sm:p-12">
        <div className="flex justify-center mb-4">
          <MasjidSilhouette className="size-16 text-primary/60" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Struktur Organisasi Masjid
        </h1>
        <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
          Mengenal para pengurus yang mengelola kegiatan masjid
        </p>
      </div>

      {/* Bagan Struktur */}
      <section className="rounded-xl border bg-card p-6 sm:p-10">
        <h2 className="mb-8 text-center text-lg font-semibold">Bagan Kepengurusan</h2>
        <OrgChart data={strukturData} />
      </section>

      {/* Bidang-Bidang */}
      <section>
        <h2 className="mb-6 text-lg font-semibold">Bidang-Bidang</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bidangData.map((bidang) => (
            <BidangCard
              key={bidang.nama}
              icon={bidang.icon}
              nama={bidang.nama}
              ketua={bidang.ketua}
              jumlahAnggota={bidang.anggota.length}
              onDetail={() => handleDetail(bidang)}
            />
          ))}
        </div>
      </section>

      {/* Detail Dialog */}
      <BidangDetailDialog
        bidang={selectedBidang}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}

export default StrukturOrganisasiPage
