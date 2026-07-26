"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimalFormDialog } from "./_components/animal-form-dialog"

interface Animal {
  id: number
  type: string
  estimated_weight: number
  price: number
  source: string
  slaughter_date: string
  slaughter_location: string
}

const dummyAnimals: Animal[] = [
  { id: 1, type: "cow", estimated_weight: 350, price: 25000000, source: "donation", slaughter_date: "", slaughter_location: "" },
  { id: 2, type: "goat", estimated_weight: 30, price: 3000000, source: "self_funded", slaughter_date: "2026-06-10", slaughter_location: "Halaman Masjid" },
  { id: 3, type: "cow", estimated_weight: 400, price: 28000000, source: "donation", slaughter_date: "", slaughter_location: "" },
  { id: 4, type: "goat", estimated_weight: 28, price: 2800000, source: "donation", slaughter_date: "2026-06-15", slaughter_location: "Lapangan Desa" },
  { id: 5, type: "cow", estimated_weight: 320, price: 22000000, source: "self_funded", slaughter_date: "", slaughter_location: "" },
]

const typeLabels: Record<string, string> = {
  cow: "🐄 Sapi",
  goat: "🐐 Kambing",
}

const typeColors: Record<string, "default" | "secondary"> = {
  cow: "default",
  goat: "secondary",
}

const sourceLabels: Record<string, string> = {
  donation: "Donasi",
  self_funded: "Dana Sendiri",
}

export default function AnimalsPage() {
  const [animals, setAnimals] = useState(dummyAnimals)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)

  const filtered = useMemo(
    () => animals.filter((a) =>
      !search || a.type.toLowerCase().includes(search.toLowerCase()) ||
      a.slaughter_location.toLowerCase().includes(search.toLowerCase())
    ),
    [animals, search]
  )

  const columns: Column<Animal>[] = [
    {
      id: "type",
      header: "Jenis",
      cell: (row) => <Badge variant={typeColors[row.type]}>{typeLabels[row.type]}</Badge>,
      sortable: true,
    },
    { id: "estimated_weight", header: "Berat (kg)", accessorKey: "estimated_weight", sortable: true, className: "w-24" },
    {
      id: "price",
      header: "Harga",
      cell: (row) => `Rp${row.price.toLocaleString("id")}`,
      sortable: true,
      className: "w-28",
    },
    {
      id: "source",
      header: "Sumber",
      cell: (row) => sourceLabels[row.source] || row.source,
      sortable: true,
      className: "w-24",
    },
    { id: "slaughter_date", header: "Tgl Potong", accessorKey: "slaughter_date", className: "w-28" },
    { id: "slaughter_location", header: "Lokasi Potong", accessorKey: "slaughter_location" },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => { setEditingAnimal(row); setDialogOpen(true) }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => {
              if (confirm(`Hapus hewan ini?`)) {
                setAnimals((prev) => prev.filter((a) => a.id !== row.id))
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
      <h1 className="text-xl font-bold tracking-tight">Hewan Qurban</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(a) => a.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari jenis/lokasi..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditingAnimal(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Hewan
          </Button>
        }
        emptyMessage="Belum ada hewan qurban"
        emptyDescription="Tambahkan hewan qurban untuk memulai"
        emptyAction={{ label: "Tambah Hewan", onClick: () => setDialogOpen(true) }}
        defaultSortField="type"
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

      <AnimalFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editingAnimal ? { ...editingAnimal, estimated_weight: String(editingAnimal.estimated_weight), price: String(editingAnimal.price) } : undefined}
        onSave={(data) => {
          if (editingAnimal) {
            setAnimals((prev) =>
              prev.map((a) => (a.id === editingAnimal.id
                ? {
                    ...a,
                    type: data.type,
                    source: data.source,
                    slaughter_date: data.slaughter_date,
                    slaughter_location: data.slaughter_location,
                    estimated_weight: Number(data.estimated_weight),
                    price: Number(data.price),
                  }
                : a))
            )
          } else {
            setAnimals((prev) => [...prev, {
              id: Date.now(),
              type: data.type,
              estimated_weight: Number(data.estimated_weight),
              price: Number(data.price),
              source: data.source,
              slaughter_date: data.slaughter_date,
              slaughter_location: data.slaughter_location,
            }])
          }
        }}
      />
    </div>
  )
}
