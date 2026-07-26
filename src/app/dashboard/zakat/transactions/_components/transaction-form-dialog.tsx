"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const typeList = [
  { value: "zakat_fitrah", label: "Zakat Fitrah" },
  { value: "zakat_maal", label: "Zakat Maal" },
  { value: "infaq", label: "Infaq" },
  { value: "sedekah", label: "Sedekah" },
  { value: "fidyah", label: "Fidyah" },
] as const

interface TransactionFormData {
  type: string
  amount: string
  method: string
  transactionDate: string
  muzakkiId: string
  notes: string
}

interface TransactionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: TransactionFormData & { id: number }
  onSave: (data: TransactionFormData) => void
}

function TransactionFormDialog({ open, onOpenChange, editing, onSave }: TransactionFormDialogProps) {
  const today = new Date().toISOString().split("T")[0]

  const [form, setForm] = useState<TransactionFormData>({
    type: editing?.type ?? "zakat_fitrah",
    amount: editing?.amount ?? "",
    method: editing?.method ?? "cash",
    transactionDate: editing?.transactionDate ?? today,
    muzakkiId: editing?.muzakkiId ?? "",
    notes: editing?.notes ?? "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Transaksi" : "Tambah Transaksi"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Jenis</Label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              {typeList.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tx-amount">Jumlah (Rp)</Label>
            <Input
              id="tx-amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tx-method">Metode</Label>
            <select
              id="tx-method"
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="cash">Tunai</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tx-date">Tanggal</Label>
            <Input
              id="tx-date"
              type="date"
              value={form.transactionDate}
              onChange={(e) => setForm({ ...form, transactionDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tx-muzakki">Muzakki (ID)</Label>
            <Input
              id="tx-muzakki"
              value={form.muzakkiId}
              onChange={(e) => setForm({ ...form, muzakkiId: e.target.value })}
              placeholder="ID Muzakki (opsional)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tx-notes">Catatan</Label>
            <Textarea
              id="tx-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { TransactionFormDialog, typeList }
export type { TransactionFormData }
