"use client"

import { useState, useMemo } from "react"
import { Plus, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MyRegistration {
  id: number
  participant_name: string
  group_name: string
  contact_phone: string
  animal_type: string
  amount: number
  status: "pending" | "verified" | "cancelled"
  created_at: string
}

const dummyRegistrations: MyRegistration[] = [
  { id: 1, participant_name: "Contoh_Nama_01", group_name: "Kelompok 1", contact_phone: "081234567890", animal_type: "cow", amount: 2500000, status: "verified", created_at: "01/06/2026" },
  { id: 2, participant_name: "Contoh_Nama_02", group_name: "", contact_phone: "081234567891", animal_type: "goat", amount: 1200000, status: "pending", created_at: "02/06/2026" },
  { id: 3, participant_name: "Contoh_Nama_03", group_name: "Kelompok 1", contact_phone: "081234567892", animal_type: "cow", amount: 2500000, status: "pending", created_at: "03/06/2026" },
  { id: 4, participant_name: "Contoh_Nama_04", group_name: "", contact_phone: "081234567893", animal_type: "goat", amount: 1500000, status: "cancelled", created_at: "04/06/2026" },
  { id: 5, participant_name: "Contoh_Nama_05", group_name: "Kelompok 2", contact_phone: "081234567894", animal_type: "cow", amount: 3000000, status: "verified", created_at: "05/06/2026" },
]

const statusColors: Record<string, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  verified: "default",
  cancelled: "destructive",
}

const statusLabels: Record<string, string> = {
  pending: "🟡 Pending",
  verified: "🟢 Terverifikasi",
  cancelled: "🔴 Dibatalkan",
}

const typeLabels: Record<string, string> = {
  cow: "Sapi",
  goat: "Kambing",
}

export default function MyRegistrationsPage() {
  const router = useRouter()
  const [registrations] = useState(dummyRegistrations)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())

  const filtered = useMemo(
    () => registrations.filter((r) =>
      !search || r.participant_name.toLowerCase().includes(search.toLowerCase()) ||
      r.contact_phone.includes(search)
    ),
    [registrations, search]
  )

  const columns: Column<MyRegistration>[] = [
    { id: "participant_name", header: "Nama Peserta", accessorKey: "participant_name", sortable: true },
    { id: "group_name", header: "Kelompok", accessorKey: "group_name", sortable: true },
    { id: "contact_phone", header: "Kontak", accessorKey: "contact_phone" },
    {
      id: "status",
      header: "Status",
      cell: (row) => <Badge variant={statusColors[row.status]}>{statusLabels[row.status]}</Badge>,
      sortable: true,
      className: "w-28",
    },
    {
      id: "animal_type",
      header: "Hewan",
      cell: (row) => typeLabels[row.animal_type] || row.animal_type,
      className: "w-20",
    },
    {
      id: "amount",
      header: "Jumlah",
      cell: (row) => `Rp${row.amount.toLocaleString("id")}`,
      sortable: true,
      className: "w-24",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Link href={`/dashboard/qurban/registrations/${row.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      ),
      className: "w-16",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Pendaftaran Saya</h1>
        <Button size="sm" onClick={() => router.push("/dashboard/qurban/my-registrations/new")}>
          <Plus className="mr-1 h-4 w-4" />
          Daftar Baru
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(r) => r.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama/kontak..."
        emptyMessage="Belum ada pendaftaran"
        emptyDescription="Daftar qurban sekarang untuk memulai"
        emptyAction={{ label: "Daftar Baru", onClick: () => router.push("/dashboard/qurban/my-registrations/new") }}
        defaultSortField="created_at"
        defaultSortDir="desc"
        pageSize={8}
      />
    </div>
  )
}
