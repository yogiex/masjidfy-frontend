"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { DistributionFormDialog } from "./_components/distribution-form-dialog"

interface Distribution {
  id: number
  mustahiqName: string
  amount: number
  distribution_date: string
}

const dummyDistributions: Distribution[] = [
  { id: 1, mustahiqName: "Contoh_Mustahiq_01", amount: 500000, distribution_date: "2026-06-15" },
  { id: 2, mustahiqName: "Contoh_Mustahiq_02", amount: 300000, distribution_date: "2026-06-15" },
  { id: 3, mustahiqName: "Contoh_Mustahiq_03", amount: 2000000, distribution_date: "2026-06-16" },
  { id: 4, mustahiqName: "Contoh_Mustahiq_04", amount: 1500000, distribution_date: "2026-06-18" },
  { id: 5, mustahiqName: "Contoh_Mustahiq_05", amount: 350000, distribution_date: "2026-06-20" },
]

export default function DistributionsPage() {
  const [distributions, setDistributions] = useState(dummyDistributions)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Distribution | null>(null)

  const filtered = useMemo(
    () => distributions.filter((d) =>
      !search || d.mustahiqName.toLowerCase().includes(search.toLowerCase())
    ),
    [distributions, search]
  )

  const columns: Column<Distribution>[] = [
    { id: "mustahiqName", header: "Mustahiq", accessorKey: "mustahiqName", sortable: true },
    {
      id: "amount",
      header: "Jumlah",
      cell: (row) => `Rp${row.amount.toLocaleString("id")}`,
      sortable: true,
      className: "w-24",
    },
    {
      id: "distribution_date",
      header: "Tanggal",
      cell: (row) => new Date(row.distribution_date).toLocaleDateString("id-ID"),
      sortable: true,
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
              if (confirm(`Hapus penyaluran ini?`)) {
                setDistributions((prev) => prev.filter((d) => d.id !== row.id))
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
      <h1 className="text-xl font-bold tracking-tight">Penyaluran Zakat</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(d) => d.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari mustahiq..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Catat Penyaluran
          </Button>
        }
        emptyMessage="Belum ada penyaluran"
        emptyDescription="Catat penyaluran dana zakat"
        emptyAction={{ label: "Catat Penyaluran", onClick: () => setDialogOpen(true) }}
        defaultSortField="distribution_date"
        defaultSortDir="desc"
        pageSize={8}
      />

      <DistributionFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing ? { id: editing.id, mustahiqId: "", amount: String(editing.amount), distribution_date: editing.distribution_date } : undefined}
        onSave={(data) => {
          if (editing) {
            setDistributions((prev) =>
              prev.map((d) => (d.id === editing.id
                ? { ...d, amount: Number(data.amount), distribution_date: data.distribution_date }
                : d))
            )
            toast.success("Penyaluran diperbarui")
          } else {
            setDistributions((prev) => [...prev, {
              id: Date.now(),
              mustahiqName: "—",
              amount: Number(data.amount),
              distribution_date: data.distribution_date,
            }])
            toast.success("Penyaluran berhasil dicatat")
          }
        }}
      />
    </div>
  )
}
