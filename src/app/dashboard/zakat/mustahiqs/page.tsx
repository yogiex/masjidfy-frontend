"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus, CheckCircle, XCircle } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { MustahiqFormDialog, asnafList } from "./_components/mustahiq-form-dialog"

const asnafLabels: Record<string, string> = {}
for (const a of asnafList) {
  asnafLabels[a.value] = a.label
}

interface Mustahiq {
  id: number
  name: string
  asnaf_category: string
  verified: boolean
}

const dummyMustahiqs: Mustahiq[] = [
  { id: 1, name: "Contoh_Mustahiq_01", asnaf_category: "miskin", verified: true },
  { id: 2, name: "Contoh_Mustahiq_02", asnaf_category: "fakir", verified: true },
  { id: 3, name: "Contoh_Mustahiq_03", asnaf_category: "fi_sabilillah", verified: false },
  { id: 4, name: "Contoh_Mustahiq_04", asnaf_category: "amil", verified: true },
  { id: 5, name: "Contoh_Mustahiq_05", asnaf_category: "gharimin", verified: false },
  { id: 6, name: "Contoh_Mustahiq_06", asnaf_category: "muallaf", verified: true },
  { id: 7, name: "Contoh_Mustahiq_07", asnaf_category: "fi_sabilillah", verified: false },
  { id: 8, name: "Contoh_Mustahiq_08", asnaf_category: "ibnu_sabil", verified: true },
]

export default function MustahiqsPage() {
  const [mustahiqs, setMustahiqs] = useState(dummyMustahiqs)
  const [search, setSearch] = useState("")
  const [asnafFilter, setAsnafFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Mustahiq | null>(null)

  const filtered = useMemo(() => {
    let result = mustahiqs
    if (asnafFilter !== "all") result = result.filter((m) => m.asnaf_category === asnafFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((m) => m.name.toLowerCase().includes(q))
    }
    return result
  }, [mustahiqs, search, asnafFilter])

  function handleVerify(id: number) {
    setMustahiqs((prev) =>
      prev.map((m) => m.id === id ? { ...m, verified: !m.verified } : m)
    )
    const m = mustahiqs.find((x) => x.id === id)
    toast.success(m?.verified ? "Verifikasi dibatalkan" : "Mustahiq terverifikasi")
  }

  const columns: Column<Mustahiq>[] = [
    { id: "name", header: "Nama", accessorKey: "name", sortable: true },
    {
      id: "asnaf_category",
      header: "Asnaf",
      cell: (row) => <Badge variant="secondary">{asnafLabels[row.asnaf_category] || row.asnaf_category}</Badge>,
      sortable: true,
    },
    {
      id: "verified",
      header: "Verifikasi",
      cell: (row) => row.verified
        ? <Badge variant="default">✅ Terverifikasi</Badge>
        : <Badge variant="outline">⏳ Belum</Badge>,
      className: "w-28",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${row.verified ? "text-amber-600" : "text-emerald-600"}`}
            onClick={() => handleVerify(row.id)}
            title={row.verified ? "Batalkan Verifikasi" : "Verifikasi"}
          >
            {row.verified ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
          </Button>
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
                setMustahiqs((prev) => prev.filter((m) => m.id !== row.id))
              }
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
      className: "w-28",
    },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Mustahiq</h1>

      <div className="flex items-center gap-2">
        <select
          value={asnafFilter}
          onChange={(e) => setAsnafFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="all">Semua Asnaf</option>
          {asnafList.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(m) => m.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Mustahiq
          </Button>
        }
        emptyMessage="Belum ada mustahiq"
        emptyDescription="Tambahkan mustahiq baru"
        emptyAction={{ label: "Tambah Mustahiq", onClick: () => setDialogOpen(true) }}
        defaultSortField="name"
        pageSize={8}
      />

      <MustahiqFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing ?? undefined}
        onSave={(data) => {
          if (editing) {
            setMustahiqs((prev) =>
              prev.map((m) => (m.id === editing.id ? { ...m, ...data } : m))
            )
          } else {
            setMustahiqs((prev) => [...prev, { ...data, id: Date.now(), verified: false }])
          }
        }}
      />
    </div>
  )
}
