"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

import { OrgChart } from "@/components/shared/org-chart"
import { BidangCard } from "@/components/shared/bidang-card"
import { BidangDetailDialog } from "@/app/(public)/tentang/struktur-organisasi/_components/bidang-detail-dialog"
import { MasjidSilhouette } from "@/components/shared/masjid-silhouette"

const strukturData = {
  penasehat: [
    { nama: "Contoh_Penasehat_1" },
    { nama: "Contoh_Penasehat_2" },
    { nama: "Contoh_Penasehat_3" },
  ],
  ketua: { nama: "Contoh_Ketua" },
  sekretaris: { nama: "Contoh_Sekretaris" },
  bendaharaI: { nama: "Contoh_Bendahara_I" },
  bendaharaII: { nama: "Contoh_Bendahara_II" },
}

const bidangData = [
  {
    icon: "🕌",
    nama: "Ibadah",
    ketua: "Contoh_Nama_1",
    anggota: [
      { nama: "Contoh_Nama_2", jabatan: "Koordinator" },
      { nama: "Contoh_Nama_3", jabatan: "Anggota" },
      { nama: "Contoh_Nama_4", jabatan: "Anggota" },
      { nama: "Contoh_Nama_5", jabatan: "Anggota" },
      { nama: "Contoh_Nama_6", jabatan: "Anggota" },
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
    ketua: "Contoh_Nama_2",
    anggota: [
      { nama: "Contoh_Nama_1", jabatan: "Koordinator" },
      { nama: "Contoh_Nama_7", jabatan: "Anggota" },
      { nama: "Contoh_Nama_8", jabatan: "Anggota" },
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
    ketua: "Contoh_Nama_3",
    anggota: [
      { nama: "Contoh_Nama_2", jabatan: "Koordinator" },
      { nama: "Contoh_Nama_9", jabatan: "Anggota" },
      { nama: "Contoh_Nama_10", jabatan: "Anggota" },
      { nama: "Contoh_Nama_11", jabatan: "Anggota" },
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
    ketua: "Contoh_Nama_4",
    anggota: [
      { nama: "Contoh_Nama_1", jabatan: "Koordinator" },
      { nama: "Contoh_Nama_12", jabatan: "Anggota" },
      { nama: "Contoh_Nama_13", jabatan: "Anggota" },
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
    <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16 xl:px-24 py-8 space-y-8">
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
