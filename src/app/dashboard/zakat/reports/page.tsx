"use client"

import { useState, useMemo } from "react"
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react"

import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const yearList = [2024, 2025, 2026]
const monthList = [
  { value: "", label: "Semua Bulan" },
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Maret" },
  { value: "04", label: "April" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Agustus" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
]

const typeLabels: Record<string, string> = {
  zakat_fitrah: "Zakat Fitrah",
  zakat_maal: "Zakat Maal",
  infaq: "Infaq",
  sedekah: "Sedekah",
  fidyah: "Fidyah",
}

const dummyTransactions = [
  { type: "zakat_fitrah", amount: 50000, date: "2026-06-01" },
  { type: "zakat_maal", amount: 2500000, date: "2026-06-02" },
  { type: "infaq", amount: 200000, date: "2026-06-03" },
  { type: "sedekah", amount: 100000, date: "2026-06-05" },
  { type: "zakat_fitrah", amount: 50000, date: "2026-06-07" },
  { type: "zakat_maal", amount: 3500000, date: "2026-06-10" },
  { type: "infaq", amount: 150000, date: "2026-06-12" },
  { type: "fidyah", amount: 300000, date: "2026-06-15" },
  { type: "sedekah", amount: 75000, date: "2026-06-18" },
]

const dummyDistributions = [
  { type: "zakat_fitrah", amount: 500000, date: "2026-06-15" },
  { type: "zakat_fitrah", amount: 300000, date: "2026-06-15" },
  { type: "zakat_maal", amount: 2000000, date: "2026-06-16" },
  { type: "infaq", amount: 1500000, date: "2026-06-18" },
  { type: "sedekah", amount: 350000, date: "2026-06-20" },
]

function fmt(n: number) {
  return `Rp${n.toLocaleString("id")}`
}

export default function ReportsPage() {
  const [year, setYear] = useState("2026")
  const [month, setMonth] = useState("")

  const filteredTx = useMemo(() => {
    return dummyTransactions.filter((t) => {
      const d = new Date(t.date)
      if (d.getFullYear().toString() !== year) return false
      if (month && (d.getMonth() + 1).toString().padStart(2, "0") !== month) return false
      return true
    })
  }, [year, month])

  const filteredDist = useMemo(() => {
    return dummyDistributions.filter((d) => {
      const date = new Date(d.date)
      if (date.getFullYear().toString() !== year) return false
      if (month && (date.getMonth() + 1).toString().padStart(2, "0") !== month) return false
      return true
    })
  }, [year, month])

  const totalPenerimaan = filteredTx.reduce((sum, t) => sum + t.amount, 0)
  const totalPenyaluran = filteredDist.reduce((sum, d) => sum + d.amount, 0)
  const saldo = totalPenerimaan - totalPenyaluran

  const breakdown = useMemo(() => {
    const byType: Record<string, { income: number; distribution: number }> = {}
    for (const t of filteredTx) {
      if (!byType[t.type]) byType[t.type] = { income: 0, distribution: 0 }
      byType[t.type].income += t.amount
    }
    for (const d of filteredDist) {
      if (!byType[d.type]) byType[d.type] = { income: 0, distribution: 0 }
      byType[d.type].distribution += d.amount
    }
    return Object.entries(byType).map(([type, data]) => ({
      type,
      label: typeLabels[type] || type,
      income: data.income,
      distribution: data.distribution,
      balance: data.income - data.distribution,
    }))
  }, [filteredTx, filteredDist])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Laporan Keuangan ZIS</h1>
        <div className="flex items-center gap-2">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            {yearList.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            {monthList.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          title="Total Penerimaan"
          value={fmt(totalPenerimaan)}
          icon={ArrowUpRight}
          variant="success"
        />
        <StatCard
          title="Total Penyaluran"
          value={fmt(totalPenyaluran)}
          icon={ArrowDownRight}
          variant="danger"
        />
        <StatCard
          title="Saldo Akhir"
          value={fmt(saldo)}
          icon={Wallet}
          variant={saldo >= 0 ? "default" : "danger"}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Rincian per Jenis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase">
                    Jenis
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground uppercase">
                    Penerimaan
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground uppercase">
                    Penyaluran
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground uppercase">
                    Saldo
                  </th>
                </tr>
              </thead>
              <tbody>
                {breakdown.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-sm text-muted-foreground">
                      Tidak ada data untuk periode ini
                    </td>
                  </tr>
                ) : (
                  breakdown.map((row) => (
                    <tr key={row.type} className="border-b border-border/50">
                      <td className="px-3 py-2 font-medium">{row.label}</td>
                      <td className="px-3 py-2 text-right text-emerald-600">
                        {fmt(row.income)}
                      </td>
                      <td className="px-3 py-2 text-right text-red-600">
                        {fmt(row.distribution)}
                      </td>
                      <td className="px-3 py-2 text-right font-medium">
                        {fmt(row.balance)}
                      </td>
                    </tr>
                  ))
                )}
                <tr className="border-t-2 border-border font-medium">
                  <td className="px-3 py-2">Total</td>
                  <td className="px-3 py-2 text-right">{fmt(totalPenerimaan)}</td>
                  <td className="px-3 py-2 text-right">{fmt(totalPenyaluran)}</td>
                  <td className="px-3 py-2 text-right">{fmt(saldo)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
