"use client"

import { useState, useMemo } from "react"

import { DataTable, type Column } from "@/components/shared/data-table"

interface Permission {
  id: number
  name: string
  resource: string
  action: string
}

const dummyPermissions: Permission[] = [
  { id: 1, name: "Melihat Daftar Pengguna", resource: "users", action: "read" },
  { id: 2, name: "Membuat Pengguna Baru", resource: "users", action: "create" },
  { id: 3, name: "Mengedit Pengguna", resource: "users", action: "update" },
  { id: 4, name: "Menghapus Pengguna", resource: "users", action: "delete" },
  { id: 5, name: "Melihat Role", resource: "roles", action: "read" },
  { id: 6, name: "Membuat Role", resource: "roles", action: "create" },
  { id: 7, name: "Mengedit Role", resource: "roles", action: "update" },
  { id: 8, name: "Menghapus Role", resource: "roles", action: "delete" },
  { id: 9, name: "Melihat Pendaftaran Qurban", resource: "qurban_registrations", action: "read" },
  { id: 10, name: "Memverifikasi Pendaftaran", resource: "qurban_registrations", action: "verify" },
  { id: 11, name: "Membatalkan Pendaftaran", resource: "qurban_registrations", action: "cancel" },
  { id: 12, name: "Mengelola Hewan Qurban", resource: "qurban_animals", action: "manage" },
  { id: 13, name: "Mencatat Pembayaran Qurban", resource: "qurban_payments", action: "create" },
  { id: 14, name: "Mencatat Distribusi Qurban", resource: "qurban_distributions", action: "create" },
  { id: 15, name: "Melihat Transaksi ZIS", resource: "zakat_transactions", action: "read" },
  { id: 16, name: "Mencatat Transaksi ZIS", resource: "zakat_transactions", action: "create" },
  { id: 17, name: "Mengelola Muzakki", resource: "zakat_muzakkis", action: "manage" },
  { id: 18, name: "Mengelola Mustahiq", resource: "zakat_mustahiqs", action: "manage" },
  { id: 19, name: "Mencatat Penyaluran Zakat", resource: "zakat_distributions", action: "create" },
  { id: 20, name: "Melihat Laporan Keuangan", resource: "zakat_reports", action: "read" },
  { id: 21, name: "Mengelola Blog", resource: "blog", action: "manage" },
  { id: 22, name: "Mengelola Kategori Blog", resource: "blog_categories", action: "manage" },
  { id: 23, name: "Mengelola Tag Blog", resource: "blog_tags", action: "manage" },
  { id: 24, name: "Menyetujui Komentar", resource: "blog_comments", action: "approve" },
]

export default function PermissionsPage() {
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())

  const filtered = useMemo(
    () => dummyPermissions.filter((p) =>
      !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.resource.toLowerCase().includes(search.toLowerCase()) ||
      p.action.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  )

  const columns: Column<Permission>[] = [
    {
      id: "name",
      header: "Nama Permission",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "resource",
      header: "Resource",
      accessorKey: "resource",
      sortable: true,
      className: "w-40",
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "action",
      sortable: true,
      className: "w-32",
      cell: (row) => (
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
          {row.action}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Permission</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(p) => p.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari permission..."
        emptyMessage="Tidak ada permission"
        defaultSortField="resource"
        pageSize={10}
      />
    </div>
  )
}
