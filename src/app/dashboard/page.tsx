import { Clock, Beef, Banknote, UserCheck } from "lucide-react"

import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const recentRegistrations = [
  { time: "10:30", name: "Ahmad", animal: "Sapi", price: "Rp2.500.000" },
  { time: "09:15", name: "Budi", animal: "Kambing", price: "Rp1.200.000" },
  { time: "08:00", name: "Citra", animal: "Sapi", price: "Rp3.000.000" },
  { time: "07:45", name: "Dewi", animal: "Kambing", price: "Rp1.500.000" },
  { time: "07:20", name: "Eko", animal: "Sapi", price: "Rp2.750.000" },
]

const recentActivities = [
  { icon: "📝", text: "Budi Santoso mendaftar qurban", time: "10 menit lalu" },
  { icon: "💰", text: "Pembayaran zakat dari Ani", time: "30 menit lalu" },
  { icon: "✅", text: "Verifikasi data Citra", time: "1 jam lalu" },
  { icon: "🐄", text: "Hewan qurban baru ditambahkan", time: "2 jam lalu" },
  { icon: "📋", text: "Laporan distribusi diperbarui", time: "3 jam lalu" },
]

export default function DashboardHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Assalamu&apos;alaikum</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pendaftaran Pending"
          value="12"
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Hewan Tersedia"
          value="8"
          icon={Beef}
          variant="default"
        />
        <StatCard
          title="Pembayaran Terkumpul"
          value="Rp45,5JT"
          icon={Banknote}
          variant="success"
        />
        <StatCard
          title="Total Terdaftar"
          value="25"
          icon={UserCheck}
          variant="default"
        />
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
