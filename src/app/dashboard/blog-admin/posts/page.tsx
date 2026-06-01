"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus, Eye } from "lucide-react"
import Link from "next/link"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Post {
  id: number
  title: string
  author: string
  status: "published" | "draft" | "archived"
  date: string
}

const dummy: Post[] = [
  { id: 1, title: "Keutamaan Berkurban di Hari Raya", author: "Ahmad Fauzi", status: "published", date: "01/06/2026" },
  { id: 2, title: "Panduan Zakat Fitrah Lengkap", author: "Budi Santoso", status: "draft", date: "-" },
  { id: 3, title: "Tata Cara Shalat Idul Fitri", author: "Citra Dewi", status: "archived", date: "15/05/2026" },
  { id: 4, title: "Hikmah Ibadah Haji bagi Umat Islam", author: "Deni Pratama", status: "published", date: "20/05/2026" },
  { id: 5, title: "Keistimewaan Bulan Ramadhan", author: "Ahmad Fauzi", status: "published", date: "10/05/2026" },
  { id: 6, title: "Doa-doa Mustajab di Bulan Dzulhijjah", author: "Citra Dewi", status: "published", date: "25/05/2026" },
  { id: 7, title: "Tips Menjaga Kekhusyukan Shalat", author: "Budi Santoso", status: "draft", date: "-" },
  { id: 8, title: "Sejarah Masjid Nabawi", author: "Deni Pratama", status: "archived", date: "01/04/2026" },
  { id: 9, title: "Pentingnya Silaturahmi dalam Islam", author: "Ahmad Fauzi", status: "published", date: "28/05/2026" },
  { id: 10, title: "Jadwal Kajian Rutin Bulan Ini", author: "Budi Santoso", status: "draft", date: "-" },
  { id: 11, title: "Fikih Muamalah untuk Pemula", author: "Citra Dewi", status: "published", date: "18/05/2026" },
  { id: 12, title: "Keajaiban Sedekah di Waktu Subuh", author: "Deni Pratama", status: "published", date: "05/05/2026" },
]

const statusColors: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
}

const statusLabels: Record<string, string> = {
  published: "🟢 Published",
  draft: "📝 Draft",
  archived: "📦 Archived",
}

export default function PostsPage() {
  const [posts, setPosts] = useState(dummy)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())

  const filtered = useMemo(() => {
    let result = posts
    if (statusFilter !== "all") result = result.filter((p) => p.status === statusFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q))
    }
    return result
  }, [posts, search, statusFilter])

  const columns: Column<Post>[] = [
    { id: "title", header: "Judul", accessorKey: "title", sortable: true },
    { id: "author", header: "Penulis", accessorKey: "author", sortable: true, className: "w-32" },
    {
      id: "status",
      header: "Status",
      cell: (row) => <Badge variant={statusColors[row.status]}>{statusLabels[row.status]}</Badge>,
      sortable: true,
      className: "w-28",
    },
    { id: "date", header: "Tgl Terbit", accessorKey: "date", sortable: true, className: "w-24" },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Link href={`/dashboard/blog-admin/posts/${row.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Preview">
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"
            onClick={() => { if (confirm(`Hapus ${row.title}?`)) setPosts((prev) => prev.filter((p) => p.id !== row.id)) }}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
      className: "w-28",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Postingan</h1>
        <Link href="/dashboard/blog-admin/posts/new">
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" /> Buat Postingan
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="all">Semua Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
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
        searchPlaceholder="Cari judul..."
        emptyMessage="Belum ada postingan"
        emptyDescription="Buat postingan pertama Anda"
        emptyAction={{ label: "Buat Postingan", onClick: () => window.location.href = "/dashboard/blog-admin/posts/new" }}
        defaultSortField="title"
        pageSize={8}
      />
    </div>
  )
}
