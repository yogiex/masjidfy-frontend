"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserFormDialog } from "./_components/user-form-dialog"

interface User {
  id: number
  name: string
  username: string
  email: string
  status: "aktif" | "nonaktif"
  role: string
}

const dummyUsers: User[] = [
  { id: 1, name: "Contoh_Nama_01", username: "contoh01", email: "contoh01@email.com", status: "aktif", role: "admin" },
  { id: 2, name: "Contoh_Nama_02", username: "contoh02", email: "contoh02@email.com", status: "nonaktif", role: "jamaah" },
  { id: 3, name: "Contoh_Nama_03", username: "contoh03", email: "contoh03@email.com", status: "aktif", role: "bendahara" },
  { id: 4, name: "Contoh_Nama_04", username: "contoh04", email: "contoh04@email.com", status: "aktif", role: "petugas_qurban" },
  { id: 5, name: "Contoh_Nama_05", username: "contoh05", email: "contoh05@email.com", status: "aktif", role: "petugas_zakat" },
  { id: 6, name: "Contoh_Nama_06", username: "contoh06", email: "contoh06@email.com", status: "nonaktif", role: "penulis" },
  { id: 7, name: "Contoh_Nama_07", username: "contoh07", email: "contoh07@email.com", status: "aktif", role: "jamaah" },
  { id: 8, name: "Contoh_Nama_08", username: "contoh08", email: "contoh08@email.com", status: "aktif", role: "superadmin" },
  { id: 9, name: "Contoh_Nama_09", username: "contoh09", email: "contoh09@email.com", status: "aktif", role: "jamaah" },
  { id: 10, name: "Contoh_Nama_10", username: "contoh10", email: "contoh10@email.com", status: "nonaktif", role: "jamaah" },
  { id: 11, name: "Contoh_Nama_11", username: "contoh11", email: "contoh11@email.com", status: "aktif", role: "bendahara" },
  { id: 12, name: "Contoh_Nama_12", username: "contoh12", email: "contoh12@email.com", status: "aktif", role: "petugas_qurban" },
]

const statusColors: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
  aktif: "default",
  nonaktif: "destructive",
}

export default function UsersPage() {
  const [users, setUsers] = useState(dummyUsers)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<(User) | null>(null)

  const filtered = useMemo(
    () => users.filter((u) =>
      !search || u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    ),
    [users, search]
  )

  const columns: Column<User>[] = [
    { id: "name", header: "Nama Lengkap", accessorKey: "name", sortable: true },
    { id: "username", header: "Username", accessorKey: "username", sortable: true },
    { id: "email", header: "Email", accessorKey: "email" },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <Badge variant={statusColors[row.status] || "secondary"}>
          {row.status === "aktif" ? "🟢 Aktif" : "🔴 Nonaktif"}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: "role",
      header: "Role",
      cell: (row) => <Badge variant="secondary">{row.role}</Badge>,
      sortable: true,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => { setEditingUser(row); setDialogOpen(true) }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => {
              if (confirm(`Hapus ${row.name}?`)) {
                setUsers((prev) => prev.filter((u) => u.id !== row.id))
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
      <h1 className="text-xl font-bold tracking-tight">Pengguna</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(u) => u.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama/username/email..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditingUser(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah User
          </Button>
        }
        emptyMessage="Belum ada pengguna"
        emptyDescription="Tambahkan pengguna baru untuk memulai"
        emptyAction={{ label: "Tambah Pengguna", onClick: () => setDialogOpen(true) }}
        defaultSortField="name"
        pageSize={8}
      />

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-md border bg-muted/50 px-4 py-2 text-sm">
          <span className="font-medium">{selectedIds.size} item terpilih</span>
          <Button variant="outline" size="sm" onClick={() => setSelectedIds(new Set())}>
            Hapus pilihan
          </Button>
        </div>
      )}

      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editingUser ?? undefined}
        onSave={(data) => {
          if (editingUser) {
            setUsers((prev) =>
              prev.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u))
            )
          } else {
            setUsers((prev) => [...prev, { ...data, id: Date.now(), status: "aktif" }])
          }
        }}
      />
    </div>
  )
}
