"use client"

import { useState, useMemo } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { DataTable, type Column } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaymentFormDialog } from "./_components/payment-form-dialog"

interface Payment {
  id: number
  registration_id: string
  participant_name: string
  amount: number
  method: string
  status: string
  payment_date: string
}

const dummyPayments: Payment[] = [
  { id: 1, registration_id: "REG-001", participant_name: "Contoh_Nama_01", amount: 1500000, method: "transfer", status: "dp", payment_date: "01/06/2026" },
  { id: 2, registration_id: "REG-001", participant_name: "Contoh_Nama_01", amount: 1000000, method: "cash", status: "lunas", payment_date: "10/06/2026" },
  { id: 3, registration_id: "REG-002", participant_name: "Contoh_Nama_02", amount: 1200000, method: "cash", status: "lunas", payment_date: "02/06/2026" },
  { id: 4, registration_id: "REG-005", participant_name: "Contoh_Nama_05", amount: 2000000, method: "transfer", status: "dp", payment_date: "05/06/2026" },
  { id: 5, registration_id: "REG-005", participant_name: "Contoh_Nama_05", amount: 1000000, method: "transfer", status: "lunas", payment_date: "12/06/2026" },
]

const methodLabels: Record<string, string> = {
  cash: "Tunai",
  transfer: "Transfer",
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState(dummyPayments)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)

  const filtered = useMemo(
    () => payments.filter((p) =>
      !search || p.participant_name.toLowerCase().includes(search.toLowerCase()) ||
      p.registration_id.toLowerCase().includes(search.toLowerCase())
    ),
    [payments, search]
  )

  const columns: Column<Payment>[] = [
    { id: "registration_id", header: "Registrasi", accessorKey: "registration_id", sortable: true },
    { id: "participant_name", header: "Peserta", accessorKey: "participant_name", sortable: true },
    {
      id: "amount",
      header: "Jumlah",
      cell: (r) => `Rp${r.amount.toLocaleString("id")}`,
      sortable: true,
      className: "w-24",
    },
    {
      id: "method",
      header: "Metode",
      cell: (r) => methodLabels[r.method] || r.method,
      className: "w-20",
    },
    {
      id: "status",
      header: "Status",
      cell: (r) => (
        <Badge variant={r.status === "lunas" ? "default" : "secondary"}>
          {r.status === "lunas" ? "✅ Lunas" : "📄 DP"}
        </Badge>
      ),
      sortable: true,
      className: "w-20",
    },
    { id: "payment_date", header: "Tanggal", accessorKey: "payment_date", className: "w-24" },
    {
      id: "actions",
      header: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => { setEditingPayment(row); setDialogOpen(true) }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => {
              if (confirm(`Hapus pembayaran ini?`)) {
                setPayments((prev) => prev.filter((p) => p.id !== row.id))
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
      <h1 className="text-xl font-bold tracking-tight">Pembayaran Qurban</h1>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(p) => p.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari peserta/ID..."
        toolbarContent={
          <Button size="sm" onClick={() => { setEditingPayment(null); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />
            Tambah Pembayaran
          </Button>
        }
        emptyMessage="Belum ada pembayaran"
        emptyDescription="Catat pembayaran untuk pendaftaran qurban"
        defaultSortField="payment_date"
        defaultSortDir="desc"
        pageSize={8}
      />

      <PaymentFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editingPayment ? { ...editingPayment, amount: String(editingPayment.amount) } : undefined}
        onSave={(data) => {
          if (editingPayment) {
            setPayments((prev) =>
              prev.map((p) => (p.id === editingPayment.id
                ? {
                    ...p,
                    registration_id: data.registration_id,
                    method: data.method,
                    status: data.status,
                    amount: Number(data.amount),
                  }
                : p))
            )
          } else {
            setPayments((prev) => [...prev, {
              id: Date.now(),
              registration_id: data.registration_id,
              participant_name: "Peserta Baru",
              method: data.method,
              status: data.status,
              amount: Number(data.amount),
              payment_date: new Date().toLocaleDateString("id-ID"),
            }])
          }
        }}
      />
    </div>
  )
}
