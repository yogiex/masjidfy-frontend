"use client"

import { useState, useMemo } from "react"
import { Check, X, Trash2, MessageSquare } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: number
  author: string
  content: string
  post: string
  status: "pending" | "approved" | "rejected"
  date: string
}

const dummy: Comment[] = [
  { id: 1, author: "Contoh_Nama_02", content: "Alhamdulillah artikelnya bermanfaat, mohon izin share ustadz", post: "Keutamaan Berkurban", status: "pending", date: "01/06/2026" },
  { id: 2, author: "Contoh_Nama_03", content: "Kapan pendaftaran qurban dibuka?", post: "Panduan Qurban", status: "pending", date: "31/05/2026" },
  { id: 3, author: "Contoh_Nama_04", content: "Assalamu'alaikum, apakah ada kajian rutin?", post: "Jadwal Kajian", status: "approved", date: "30/05/2026" },
  { id: 4, author: "Contoh_Nama_05", content: "Komentar spam mengandung link mencurigakan", post: "Tata Cara Shalat", status: "rejected", date: "29/05/2026" },
  { id: 5, author: "Contoh_Nama_06", content: "Mohon informasi lebih lanjut mengenai zakat mal", post: "Panduan Zakat", status: "pending", date: "28/05/2026" },
  { id: 6, author: "Contoh_Nama_07", content: "Terima kasih, sangat membantu!", post: "Hikmah Ibadah Haji", status: "approved", date: "27/05/2026" },
  { id: 7, author: "Contoh_Nama_08", content: "Artikelnya kurang lengkap, mohon ditambahkan referensi", post: "Puasa Sunnah", status: "pending", date: "26/05/2026" },
]

const statusColors: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
}

const statusLabels: Record<string, string> = {
  pending: "🟡 Pending",
  approved: "🟢 Approved",
  rejected: "🔴 Rejected",
}

export default function CommentsPage() {
  const [comments, setComments] = useState(dummy)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())

  const filtered = useMemo(() => {
    let result = comments
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((c) => c.author.toLowerCase().includes(q) || c.content.toLowerCase().includes(q))
    }
    return result
  }, [comments, search, statusFilter])

  const columns: Column<Comment>[] = [
    { id: "author", header: "Pengirim", accessorKey: "author", sortable: true },
    {
      id: "content",
      header: "Komentar",
      cell: (row) => (
        <div>
          <p className="line-clamp-2 text-sm">{row.content}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            pada &quot;{row.post}&quot; — {row.date}
          </p>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => <Badge variant={statusColors[row.status]}>{statusLabels[row.status]}</Badge>,
      sortable: true,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          {row.status === "pending" && (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600" title="Setujui"
                onClick={() => setComments((prev) => prev.map((c) => c.id === row.id ? { ...c, status: "approved" } : c))}>
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600" title="Tolak"
                onClick={() => setComments((prev) => prev.map((c) => c.id === row.id ? { ...c, status: "rejected" } : c))}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="Hapus"
            onClick={() => { if (confirm("Hapus komentar ini?")) setComments((prev) => prev.filter((c) => c.id !== row.id)) }}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
      className: "w-28",
    },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Komentar</h1>

      <div className="flex items-center gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
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
        searchPlaceholder="Cari pengirim/komentar..."
        emptyMessage="Belum ada komentar"
        emptyDescription="Komentar dari pengunjung akan muncul di sini"
        defaultSortField="date"
        pageSize={8}
      />

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-md border bg-muted/50 px-4 py-2 text-sm">
          <span className="font-medium">{selectedIds.size} komentar terpilih</span>
          <Button variant="outline" size="sm"
            onClick={() => {
              setComments((prev) => prev.map((c) => selectedIds.has(c.id) ? { ...c, status: "approved" } : c))
              setSelectedIds(new Set())
            }}>
            Setujui Semua
          </Button>
          <Button variant="outline" size="sm"
            onClick={() => {
              setComments((prev) => prev.map((c) => selectedIds.has(c.id) ? { ...c, status: "rejected" } : c))
              setSelectedIds(new Set())
            }}>
            Tolak Semua
          </Button>
          <Button variant="outline" size="sm"
            onClick={() => { setComments((prev) => prev.filter((c) => !selectedIds.has(c.id))); setSelectedIds(new Set()) }}>
            Hapus Semua
          </Button>
        </div>
      )}
    </div>
  )
}
