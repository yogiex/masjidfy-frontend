"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RoleFormDialog } from "./_components/role-form-dialog"

interface Role {
  id: number
  name: string
  description: string
  userCount: number
  permissions: string[]
}

const dummyRoles: Role[] = [
  { id: 1, name: "superadmin", description: "Akses penuh ke seluruh sistem", userCount: 1, permissions: ["manage_users", "manage_roles", "manage_zakat", "manage_qurban", "manage_blog", "view_reports", "manage_distributions", "manage_settings"] },
  { id: 2, name: "admin", description: "Administrator sistem", userCount: 3, permissions: ["manage_users", "manage_zakat", "manage_qurban", "manage_blog", "view_reports", "manage_distributions"] },
  { id: 3, name: "bendahara", description: "Mengelola keuangan dan laporan", userCount: 2, permissions: ["manage_zakat", "manage_qurban", "view_reports"] },
  { id: 4, name: "petugas_qurban", description: "Mengelola data qurban", userCount: 4, permissions: ["manage_qurban", "manage_distributions"] },
  { id: 5, name: "petugas_zakat", description: "Mengelola data zakat", userCount: 3, permissions: ["manage_zakat", "manage_distributions"] },
  { id: 6, name: "penulis", description: "Mengelola konten blog", userCount: 2, permissions: ["manage_blog"] },
  { id: 7, name: "jamaah", description: "Pengguna umum masjid", userCount: 50, permissions: [] },
]

export default function RolesPage() {
  const [roles, setRoles] = useState(dummyRoles)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const filtered = useMemo(
    () => roles.filter((r) =>
      !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    ),
    [roles, search]
  )

  const columns: Column<Role>[] = [
    { id: "name", header: "Nama Role", accessorKey: "name", sortable: true },
    { id: "description", header: "Deskripsi", accessorKey: "description" },
    { id: "userCount", header: "Jml User", accessorKey: "userCount", sortable: true, className: "w-20" },
    {
      id: "permissions",
      header: "Permissions",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.permissions.length === 0 ? (
            <span className="text-xs text-muted-foreground">—</span>
          ) : (
            row.permissions.slice(0, 3).map((p) => (
              <Badge key={p} variant="outline" className="text-xs">
                {p}
              </Badge>
            ))
          )}
          {row.permissions.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{row.permissions.length - 3}
            </Badge>
          )}
        </div>
      ),
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
            onClick={() => { setEditingRole(row); setDialogOpen(true) }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => {
              if (confirm(`Hapus role ${row.name}?`)) {
                setRoles((prev) => prev.filter((r) => r.id !== row.id))
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
      <h1 className="text-xl font-bold tracking-tight">Role</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(r) => r.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama role..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditingRole(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Role
          </Button>
        }
        emptyMessage="Belum ada role"
        emptyDescription="Tambahkan role baru untuk mengatur akses pengguna"
        emptyAction={{ label: "Tambah Role", onClick: () => setDialogOpen(true) }}
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

      <RoleFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editingRole ?? undefined}
        onSave={(data) => {
          if (editingRole) {
            setRoles((prev) =>
              prev.map((r) => (r.id === editingRole.id ? { ...r, ...data } : r))
            )
          } else {
            setRoles((prev) => [...prev, { ...data, id: Date.now(), userCount: 0 }])
          }
        }}
      />
    </div>
  )
}
