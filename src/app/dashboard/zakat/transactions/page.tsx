"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { TransactionFormDialog, typeList } from "./_components/transaction-form-dialog"

const typeLabels: Record<string, string> = {}
for (const t of typeList) {
  typeLabels[t.value] = t.label
}

const typeColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  zakat_fitrah: "default",
  zakat_maal: "secondary",
  infaq: "default",
  sedekah: "secondary",
  fidyah: "destructive",
}

interface Transaction {
  id: number
  type: string
  amount: number
  method: string
  muzakkiName: string
  transactionDate: string
  notes: string
}

const dummyTransactions: Transaction[] = [
  { id: 1, type: "zakat_fitrah", amount: 50000, method: "cash", muzakkiName: "Contoh_Nama_01", transactionDate: "2026-06-01", notes: "" },
  { id: 2, type: "zakat_maal", amount: 2500000, method: "transfer", muzakkiName: "Contoh_Nama_02", transactionDate: "2026-06-02", notes: "Zakat maal tahunan" },
  { id: 3, type: "infaq", amount: 200000, method: "cash", muzakkiName: "Contoh_Nama_03", transactionDate: "2026-06-03", notes: "Infaq Jumat" },
  { id: 4, type: "sedekah", amount: 100000, method: "cash", muzakkiName: "Contoh_Nama_04", transactionDate: "2026-06-05", notes: "" },
  { id: 5, type: "zakat_fitrah", amount: 50000, method: "cash", muzakkiName: "Contoh_Nama_05", transactionDate: "2026-06-07", notes: "" },
  { id: 6, type: "zakat_maal", amount: 3500000, method: "transfer", muzakkiName: "Contoh_Nama_06", transactionDate: "2026-06-10", notes: "Zakat maal" },
  { id: 7, type: "infaq", amount: 150000, method: "transfer", muzakkiName: "Contoh_Nama_07", transactionDate: "2026-06-12", notes: "Infaq pembangunan" },
  { id: 8, type: "fidyah", amount: 300000, method: "cash", muzakkiName: "Contoh_Nama_08", transactionDate: "2026-06-15", notes: "Fidyah 30 hari" },
  { id: 9, type: "sedekah", amount: 75000, method: "cash", muzakkiName: "Contoh_Nama_09", transactionDate: "2026-06-18", notes: "" },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(dummyTransactions)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const filtered = useMemo(() => {
    let result = transactions
    if (typeFilter !== "all") result = result.filter((t) => t.type === typeFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((t) =>
        t.muzakkiName.toLowerCase().includes(q) || t.notes.toLowerCase().includes(q)
      )
    }
    return result
  }, [transactions, search, typeFilter])

  const columns: Column<Transaction>[] = [
    {
      id: "type",
      header: "Jenis",
      cell: (row) => <Badge variant={typeColors[row.type]}>{typeLabels[row.type] || row.type}</Badge>,
      sortable: true,
      className: "w-28",
    },
    {
      id: "amount",
      header: "Jumlah",
      cell: (row) => `Rp${row.amount.toLocaleString("id")}`,
      sortable: true,
      className: "w-24",
    },
    {
      id: "method",
      header: "Metode",
      cell: (row) => row.method === "cash" ? "Tunai" : "Transfer",
      className: "w-20",
    },
    { id: "muzakkiName", header: "Muzakki", accessorKey: "muzakkiName", sortable: true },
    {
      id: "transactionDate",
      header: "Tanggal",
      cell: (row) => {
        const d = new Date(row.transactionDate)
        return d.toLocaleDateString("id-ID")
      },
      sortable: true,
      className: "w-24",
    },
    { id: "notes", header: "Catatan", accessorKey: "notes", className: "max-w-40 truncate" },
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
              if (confirm(`Hapus transaksi ini?`)) {
                setTransactions((prev) => prev.filter((t) => t.id !== row.id))
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
      <h1 className="text-xl font-bold tracking-tight">Penerimaan ZIS</h1>

      <div className="flex items-center gap-2">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="all">Semua Jenis</option>
          {typeList.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(t) => t.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari muzakki/catatan..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Transaksi
          </Button>
        }
        emptyMessage="Belum ada transaksi"
        emptyDescription="Catat penerimaan zakat, infaq, atau sedekah"
        emptyAction={{ label: "Tambah Transaksi", onClick: () => setDialogOpen(true) }}
        defaultSortField="transactionDate"
        defaultSortDir="desc"
        pageSize={8}
      />

      <TransactionFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing ? {
          id: editing.id,
          type: editing.type,
          amount: String(editing.amount),
          method: editing.method,
          transactionDate: editing.transactionDate,
          muzakkiId: "",
          notes: editing.notes,
        } : undefined}
        onSave={(data) => {
          if (editing) {
            setTransactions((prev) =>
              prev.map((t) => (t.id === editing.id
                ? { ...t, type: data.type, method: data.method, transactionDate: data.transactionDate, notes: data.notes, amount: Number(data.amount) }
                : t))
            )
            toast.success("Transaksi diperbarui")
          } else {
            setTransactions((prev) => [...prev, {
              id: Date.now(),
              type: data.type,
              amount: Number(data.amount),
              method: data.method,
              transactionDate: data.transactionDate,
              muzakkiName: "—",
              notes: data.notes,
            }])
            toast.success("Transaksi berhasil dicatat")
          }
        }}
      />
    </div>
  )
}
