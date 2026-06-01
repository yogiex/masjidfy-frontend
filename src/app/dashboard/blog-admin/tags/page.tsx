"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { TagDialog } from "./_components/tag-dialog"

interface Tag {
  id: number
  name: string
  slug: string
  postCount: number
}

const dummy: Tag[] = [
  { id: 1, name: "Zakat", slug: "zakat", postCount: 12 },
  { id: 2, name: "Qurban", slug: "qurban", postCount: 10 },
  { id: 3, name: "Puasa", slug: "puasa", postCount: 5 },
  { id: 4, name: "Haji", slug: "haji", postCount: 7 },
  { id: 5, name: "Sedekah", slug: "sedekah", postCount: 4 },
  { id: 6, name: "Shalat", slug: "shalat", postCount: 9 },
]

export default function TagsPage() {
  const [items, setItems] = useState(dummy)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Tag | null>(null)

  const filtered = useMemo(
    () => items.filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  )

  const columns: Column<Tag>[] = [
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
            if (confirm(`Hapus tag ${row.name}?`)) setItems((prev) => prev.filter((t) => t.id !== row.id))
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
      <h1 className="text-xl font-bold tracking-tight">Tag</h1>
      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(r) => r.id}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari tag..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" /> Tambah Tag
          </Button>
        }
        emptyMessage="Belum ada tag"
        emptyAction={{ label: "Tambah Tag", onClick: () => setDialogOpen(true) }}
        defaultSortField="name"
        pageSize={10}
      />
      <TagDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing ?? undefined}
        onSave={(data) => {
          if (editing) {
            setItems((prev) => prev.map((t) => t.id === editing.id ? { ...t, ...data } : t))
          } else {
            setItems((prev) => [...prev, { ...data, id: Date.now(), postCount: 0 }])
          }
        }}
      />
    </div>
  )
}
