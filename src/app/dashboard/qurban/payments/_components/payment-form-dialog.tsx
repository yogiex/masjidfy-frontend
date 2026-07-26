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

interface PaymentFormData {
  registration_id: string
  amount: string
  method: string
  status: string
}

interface PaymentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: PaymentFormData & { id: number }
  onSave: (data: PaymentFormData) => void
}

function PaymentFormDialog({ open, onOpenChange, editing, onSave }: PaymentFormDialogProps) {
  const [form, setForm] = useState<PaymentFormData>({
    registration_id: editing?.registration_id ?? "",
    amount: editing?.amount ?? "",
    method: editing?.method ?? "cash",
    status: editing?.status ?? "dp",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Pembayaran" : "Tambah Pembayaran"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reg_id">ID Pendaftaran</Label>
            <Input
              id="reg_id"
              value={form.registration_id}
              onChange={(e) => setForm({ ...form, registration_id: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-amount">Jumlah (Rp)</Label>
            <Input
              id="pay-amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-method">Metode</Label>
            <select
              id="pay-method"
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="cash">Tunai</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-status">Status</Label>
            <select
              id="pay-status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="dp">DP</option>
              <option value="lunas">Lunas</option>
            </select>
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

export { PaymentFormDialog }
