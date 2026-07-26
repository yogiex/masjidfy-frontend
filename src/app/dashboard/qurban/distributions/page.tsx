"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { DistributionFormDialog } from "./_components/distribution-form-dialog"

interface Distribution {
  id: number
  animal_id: string
  recipient_name: string
  coupon_count: number
  distribution_date: string
}

const dummyDistributions: Distribution[] = [
  { id: 1, animal_id: "HEW-001", recipient_name: "Contoh_Penerima_01", coupon_count: 2, distribution_date: "15/06/2026" },
  { id: 2, animal_id: "HEW-001", recipient_name: "Contoh_Penerima_02", coupon_count: 1, distribution_date: "15/06/2026" },
  { id: 3, animal_id: "HEW-002", recipient_name: "Contoh_Penerima_03", coupon_count: 3, distribution_date: "16/06/2026" },
  { id: 4, animal_id: "HEW-003", recipient_name: "Contoh_Penerima_04", coupon_count: 2, distribution_date: "17/06/2026" },
  { id: 5, animal_id: "HEW-003", recipient_name: "Contoh_Penerima_05", coupon_count: 1, distribution_date: "17/06/2026" },
]

export default function DistributionsPage() {
  const [distributions, setDistributions] = useState(dummyDistributions)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDist, setEditingDist] = useState<Distribution | null>(null)

  const filtered = useMemo(
    () => distributions.filter((d) =>
      !search || d.recipient_name.toLowerCase().includes(search.toLowerCase()) ||
      d.animal_id.toLowerCase().includes(search.toLowerCase())
    ),
    [distributions, search]
  )

  const columns: Column<Distribution>[] = [
    { id: "animal_id", header: "Hewan", accessorKey: "animal_id", sortable: true },
    { id: "recipient_name", header: "Penerima", accessorKey: "recipient_name", sortable: true },
    { id: "coupon_count", header: "Jml Kupon", accessorKey: "coupon_count", sortable: true, className: "w-24" },
    { id: "distribution_date", header: "Tanggal", accessorKey: "distribution_date", sortable: true, className: "w-28" },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => { setEditingDist(row); setDialogOpen(true) }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => {
              if (confirm(`Hapus distribusi ini?`)) {
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
      <h1 className="text-xl font-bold tracking-tight">Distribusi Daging Qurban</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(d) => d.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari penerima/ID hewan..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditingDist(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Distribusi
          </Button>
        }
        emptyMessage="Belum ada distribusi"
        emptyDescription="Catat distribusi daging qurban"
        defaultSortField="distribution_date"
        defaultSortDir="desc"
        pageSize={8}
      />

      <DistributionFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editingDist ? { ...editingDist, coupon_count: String(editingDist.coupon_count) } : undefined}
        onSave={(data) => {
          if (editingDist) {
            setDistributions((prev) =>
              prev.map((d) => (d.id === editingDist.id
                ? {
                    ...d,
                    animal_id: data.animal_id,
                    recipient_name: data.recipient_name,
                    distribution_date: data.distribution_date,
                    coupon_count: Number(data.coupon_count),
                  }
                : d))
            )
          } else {
            setDistributions((prev) => [...prev, {
              id: Date.now(),
              animal_id: data.animal_id,
              recipient_name: data.recipient_name,
              distribution_date: data.distribution_date,
              coupon_count: Number(data.coupon_count),
            }])
          }
        }}
      />
    </div>
  )
}
