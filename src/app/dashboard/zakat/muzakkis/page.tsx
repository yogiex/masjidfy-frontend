"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MuzakkiFormDialog } from "./_components/muzakki-form-dialog"

interface Muzakki {
  id: number
  name: string
  phone: string
  address: string
  isAnonymous: boolean
  created_at: string
}

const dummyMuzakkis: Muzakki[] = [
  { id: 1, name: "Contoh_Nama_01", phone: "081234567890", address: "Jakarta", isAnonymous: false, created_at: "01/06/2026" },
  { id: 2, name: "Contoh_Nama_02", phone: "081234567891", address: "Depok", isAnonymous: false, created_at: "02/06/2026" },
  { id: 3, name: "Contoh_Nama_03", phone: "081234567892", address: "Bogor", isAnonymous: true, created_at: "03/06/2026" },
  { id: 4, name: "Contoh_Nama_04", phone: "", address: "", isAnonymous: false, created_at: "05/06/2026" },
  { id: 5, name: "Contoh_Nama_05", phone: "081234567893", address: "Tangerang", isAnonymous: false, created_at: "07/06/2026" },
  { id: 6, name: "Contoh_Nama_06", phone: "", address: "Jakarta", isAnonymous: false, created_at: "10/06/2026" },
]

export default function MuzakkisPage() {
  const [muzakkis, setMuzakkis] = useState(dummyMuzakkis)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Muzakki | null>(null)

  const filtered = useMemo(
    () => muzakkis.filter((m) =>
      !search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
    ),
    [muzakkis, search]
  )

  const columns: Column<Muzakki>[] = [
    { id: "name", header: "Nama", accessorKey: "name", sortable: true },
    { id: "phone", header: "Telepon", accessorKey: "phone" },
    { id: "address", header: "Alamat", accessorKey: "address" },
    {
      id: "isAnonymous",
      header: "Anonim",
      cell: (row) => row.isAnonymous
        ? <Badge variant="secondary">Anonim</Badge>
        : <span className="text-muted-foreground">—</span>,
      className: "w-20",
    },
    { id: "created_at", header: "Tgl Daftar", accessorKey: "created_at", sortable: true, className: "w-28" },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => { setEditing(row); setDialogOpen(true) }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => {
              if (confirm(`Hapus ${row.name}?`)) {
                setMuzakkis((prev) => prev.filter((m) => m.id !== row.id))
              }
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
      className: "w-20",
    },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Muzakki</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(m) => m.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama/telepon..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Muzakki
          </Button>
        }
        emptyMessage="Belum ada muzakki"
        emptyDescription="Tambahkan muzakki baru untuk memulai"
        emptyAction={{ label: "Tambah Muzakki", onClick: () => setDialogOpen(true) }}
        defaultSortField="name"
        pageSize={8}
      />

      <MuzakkiFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing ? { ...editing, phone: editing.phone, address: editing.address } : undefined}
        onSave={(data) => {
          if (editing) {
            setMuzakkis((prev) =>
              prev.map((m) => (m.id === editing.id ? { ...m, ...data } : m))
            )
          } else {
            setMuzakkis((prev) => [...prev, {
              ...data,
              id: Date.now(),
              created_at: new Date().toLocaleDateString("id-ID"),
            }])
          }
        }}
      />
    </div>
  )
}
