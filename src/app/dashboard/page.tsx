"use client"

import { Clock, Beef, Banknote, UserCheck, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import Link from "next/link"

const recentRegistrations = [
  { time: "10:30", name: "Contoh_Nama_14", animal: "Sapi", price: "Rp2.500.000" },
  { time: "09:15", name: "Contoh_Nama_15", animal: "Kambing", price: "Rp1.200.000" },
  { time: "08:00", name: "Contoh_Nama_16", animal: "Sapi", price: "Rp3.000.000" },
  { time: "07:45", name: "Contoh_Nama_17", animal: "Kambing", price: "Rp1.500.000" },
  { time: "07:20", name: "Contoh_Nama_13", animal: "Sapi", price: "Rp2.750.000" },
]

const recentActivities = [
  { icon: "📝", text: "Contoh_Nama_02 mendaftar qurban", time: "10 menit lalu" },
  { icon: "💰", text: "Pembayaran zakat dari Ani", time: "30 menit lalu" },
  { icon: "✅", text: "Verifikasi data Contoh_Nama_16", time: "1 jam lalu" },
  { icon: "🐄", text: "Hewan qurban baru ditambahkan", time: "2 jam lalu" },
  { icon: "📋", text: "Laporan distribusi diperbarui", time: "3 jam lalu" },
]

export default function DashboardHome() {
  const { hasRole } = useAuth()

  const isJamaah = hasRole("jamaah")
  const isBendahara = hasRole("bendahara")
  const isAdminOrSuper = hasRole("admin") || hasRole("superadmin")

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Assalamu&apos;alaikum</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {isJamaah ? (
          <>
            <StatCard title="Pendaftaran Saya" value="3" icon={ClipboardListIcon} variant="default" />
            <StatCard title="Transaksi ZIS" value="2" icon={Banknote} variant="default" />
            <StatCard title="Total Pembayaran" value="Rp3,7JT" icon={ArrowUpRight} variant="success" />
          </>
        ) : isBendahara ? (
          <>
            <StatCard title="Total Pemasukan ZIS" value="Rp7,4JT" icon={ArrowUpRight} variant="success" />
            <StatCard title="Total Penyaluran" value="Rp4,6JT" icon={ArrowDownRight} variant="danger" />
            <StatCard title="Pembayaran Qurban" value="Rp10,2JT" icon={Banknote} variant="default" />
            <StatCard title="Sisa Saldo ZIS" value="Rp2,8JT" icon={Clock} variant="warning" />
          </>
        ) : isAdminOrSuper ? (
          <>
            <StatCard title="Total Pengguna" value="24" icon={Users} variant="default" />
            <StatCard title="Pendaftaran Pending" value="12" icon={Clock} variant="warning" />
            <StatCard title="Hewan Tersedia" value="8" icon={Beef} variant="default" />
            <StatCard title="Total Terdaftar" value="25" icon={UserCheck} variant="default" />
          </>
        ) : (
          <>
            <StatCard title="Pendaftaran Pending" value="12" icon={Clock} variant="warning" />
            <StatCard title="Hewan Tersedia" value="8" icon={Beef} variant="default" />
            <StatCard title="Pembayaran Terkumpul" value="Rp45,5JT" icon={Banknote} variant="success" />
            <StatCard title="Total Terdaftar" value="25" icon={UserCheck} variant="default" />
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pendaftaran Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {recentRegistrations.map((item) => (
              <div
                key={`${item.time}-${item.name}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/50"
              >
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.time}
                </span>
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">—</span>
                <span className="text-muted-foreground">{item.animal}</span>
                <span className="ml-auto font-medium">{item.price}</span>
              </div>
            ))}
            <Link
              href="/dashboard/qurban/registrations"
              className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Lihat semua pendaftaran
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Aktivitas Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {recentActivities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/50"
              >
                <span className="shrink-0 text-base">{item.icon}</span>
                <span className="flex-1 truncate">{item.text}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ClipboardListIcon(props: React.ComponentProps<typeof Banknote>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  )
}
