"use client"

import { useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { PrintLayout } from "@/components/shared/print-layout"
import type { PrintColumn } from "@/components/shared/print-layout"
import { Skeleton } from "@/components/ui/skeleton"

interface Registration {
  id: number
  participant_name: string
  group_name: string
  contact_phone: string
  animal_type: string
  amount: number
  status: "pending" | "verified" | "cancelled"
  created_at: string
}

const dummyRegistrations: Registration[] = [
  { id: 1, participant_name: "Contoh_Nama_01", group_name: "Kelompok 1", contact_phone: "081234567890", animal_type: "cow", amount: 2500000, status: "verified", created_at: "01/06/2026" },
  { id: 2, participant_name: "Contoh_Nama_02", group_name: "", contact_phone: "081234567891", animal_type: "goat", amount: 1200000, status: "pending", created_at: "02/06/2026" },
  { id: 3, participant_name: "Contoh_Nama_03", group_name: "Kelompok 1", contact_phone: "081234567892", animal_type: "cow", amount: 2500000, status: "pending", created_at: "03/06/2026" },
  { id: 4, participant_name: "Contoh_Nama_04", group_name: "", contact_phone: "081234567893", animal_type: "goat", amount: 1500000, status: "cancelled", created_at: "04/06/2026" },
  { id: 5, participant_name: "Contoh_Nama_05", group_name: "Kelompok 2", contact_phone: "081234567894", animal_type: "cow", amount: 3000000, status: "verified", created_at: "05/06/2026" },
  { id: 6, participant_name: "Contoh_Nama_06", group_name: "", contact_phone: "081234567895", animal_type: "goat", amount: 1300000, status: "pending", created_at: "06/06/2026" },
  { id: 7, participant_name: "Contoh_Nama_07", group_name: "Kelompok 2", contact_phone: "081234567896", animal_type: "cow", amount: 3000000, status: "pending", created_at: "07/06/2026" },
  { id: 8, participant_name: "Contoh_Nama_08", group_name: "", contact_phone: "081234567897", animal_type: "goat", amount: 1400000, status: "cancelled", created_at: "08/06/2026" },
]

const typeLabels: Record<string, string> = {
  cow: "Sapi",
  goat: "Kambing",
}

const statusLabels: Record<string, string> = {
  pending: "Pending",
  verified: "Terverifikasi",
  cancelled: "Dibatalkan",
}

function PrintContent() {
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const groupFilter = searchParams.get("group") || ""
  const statusFilter = searchParams.get("status") || ""

  const filtered = useMemo(() => {
    let result = dummyRegistrations
    if (groupFilter) result = result.filter((r) => r.group_name === groupFilter)
    if (statusFilter) result = result.filter((r) => r.status === statusFilter)
    return result
  }, [groupFilter, statusFilter])

  useEffect(() => {
    window.print()
  }, [])

  const filterParts: string[] = []
  if (groupFilter) filterParts.push(`Kelompok: ${groupFilter}`)
  if (statusFilter) {
    const label = statusLabels[statusFilter] || statusFilter
    filterParts.push(`Status: ${label}`)
  }
  const filterInfo = filterParts.length > 0 ? filterParts.join(" | ") : "Semua data"

  const columns: PrintColumn<Registration>[] = [
    { header: "Nama Peserta", accessor: (r) => r.participant_name },
    { header: "Kelompok", accessor: (r) => r.group_name || "—" },
    { header: "Kontak", accessor: (r) => r.contact_phone },
    { header: "Hewan", accessor: (r) => typeLabels[r.animal_type] || r.animal_type },
    { header: "Jumlah", accessor: (r) => `Rp${r.amount.toLocaleString("id")}` },
    { header: "Status", accessor: (r) => statusLabels[r.status] || r.status },
  ]

  return (
    <PrintLayout
      title="LAPORAN PENDAFTARAN QURBAN"
      columns={columns}
      data={filtered}
      printedBy={user?.fullName || "—"}
      filterInfo={filterInfo}
    />
  )
}

export default function PrintPage() {
  return (
    <Suspense fallback={
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-48 mx-auto" />
        <Skeleton className="h-64 w-full mt-8" />
      </div>
    }>
      <PrintContent />
    </Suspense>
  )
}
