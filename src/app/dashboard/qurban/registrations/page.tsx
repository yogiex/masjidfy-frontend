"use client"

import { useState, useMemo } from "react"
import { Check, X, Eye, Printer, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

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

function getUniqueGroups(data: Registration[]): string[] {
  const groups = new Set(data.map((r) => r.group_name).filter(Boolean))
  return Array.from(groups).sort()
}

function exportToCSV(data: Registration[]) {
  const headers = ["Nama Peserta", "Kelompok", "Kontak", "Hewan", "Jumlah", "Status", "Tanggal Daftar"]
  const rows = data.map((r) => [
    r.participant_name,
    r.group_name || "-",
    r.contact_phone,
    typeLabels[r.animal_type] || r.animal_type,
    r.amount,
    statusLabels[r.status]?.replace(/[^\w\s]/g, "") || r.status,
    r.created_at,
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `pendaftaran-qurban-${new Date().toISOString().split("T")[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
  toast.success("Data berhasil diexport")
}

export default function RegistrationsPage() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState(dummyRegistrations)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [groupFilter, setGroupFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())

  const uniqueGroups = useMemo(() => getUniqueGroups(registrations), [registrations])

  const filtered = useMemo(() => {
    let result = registrations
    if (statusFilter !== "all") result = result.filter((r) => r.status === statusFilter)
    if (groupFilter !== "all") result = result.filter((r) => r.group_name === groupFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((r) =>
        r.participant_name.toLowerCase().includes(q) || r.contact_phone.includes(q)
      )
    }
    return result
  }, [registrations, search, statusFilter, groupFilter])

  function handleVerify(id: number) {
    setRegistrations((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: "verified" as const } : r)
    )
    toast.success("Pendaftaran diverifikasi")
  }

  function handleCancel(id: number) {
    setRegistrations((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: "cancelled" as const } : r)
    )
    toast.success("Pendaftaran dibatalkan")
  }

  function handlePrint() {
    const params = new URLSearchParams()
    if (groupFilter !== "all") params.set("group", groupFilter)
    if (statusFilter !== "all") params.set("status", statusFilter)
    const query = params.toString()
    router.push(`/dashboard/qurban/registrations/print${query ? `?${query}` : ""}`)
  }

  const columns: Column<Registration>[] = [
    { id: "participant_name", header: "Nama Peserta", accessorKey: "participant_name", sortable: true },
    { id: "group_name", header: "Kelompok", accessorKey: "group_name" },
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
      className: "w-16",
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
          {row.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-600"
                onClick={() => handleVerify(row.id)}
                title="Verifikasi"
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => handleCancel(row.id)}
                title="Batalkan"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
          <Link href={`/dashboard/qurban/registrations/${row.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Detail">
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      ),
      className: "w-24",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Daftar Pendaftaran</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-1 h-4 w-4" />
            Cetak
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToCSV(filtered)}>
            <Download className="mr-1 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="all">Semua Kelompok</option>
          {uniqueGroups.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Terverifikasi</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
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
        emptyDescription="Tidak ada pendaftaran qurban ditemukan"
        defaultSortField="created_at"
        defaultSortDir="desc"
        pageSize={8}
      />
    </div>
  )
}
