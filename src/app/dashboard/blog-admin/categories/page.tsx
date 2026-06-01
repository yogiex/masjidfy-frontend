"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { CategoryDialog } from "./_components/category-dialog"

interface Category {
  id: number
  name: string
  slug: string
  postCount: number
}

const dummy: Category[] = [
  { id: 1, name: "Keislaman", slug: "keislaman", postCount: 15 },
  { id: 2, name: "Ibadah", slug: "ibadah", postCount: 10 },
  { id: 3, name: "Berita Masjid", slug: "berita-masjid", postCount: 8 },
  { id: 4, name: "Kajian", slug: "kajian", postCount: 6 },
  { id: 5, name: "Inspirasi", slug: "inspirasi", postCount: 4 },
]

export default function CategoriesPage() {
  const [items, setItems] = useState(dummy)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  const filtered = useMemo(
    () => items.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  )

  const columns: Column<Category>[] = [
    { id: "name", header: "Nama", accessorKey: "name", sortable: true },
    { id: "slug", header: "Slug", accessorKey: "slug" },
    { id: "postCount", header: "Jml Post", accessorKey: "postCount", sortable: true, className: "w-20" },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(row); setDialogOpen(true) }}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => {
            if (confirm(`Hapus kategori ${row.name}?`)) setItems((prev) => prev.filter((c) => c.id !== row.id))
          }}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
      className: "w-20",
    },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Kategori</h1>
      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(r) => r.id}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari kategori..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" /> Tambah Kategori
          </Button>
        }
        emptyMessage="Belum ada kategori"
        emptyAction={{ label: "Tambah Kategori", onClick: () => setDialogOpen(true) }}
        defaultSortField="name"
        pageSize={10}
      />
      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing ?? undefined}
        onSave={(data) => {
          if (editing) {
            setItems((prev) => prev.map((c) => c.id === editing.id ? { ...c, ...data } : c))
          } else {
            setItems((prev) => [...prev, { ...data, id: Date.now(), postCount: 0 }])
          }
        }}
      />
    </div>
  )
}
