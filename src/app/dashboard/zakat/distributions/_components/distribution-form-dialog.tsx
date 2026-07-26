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

const dummyMustahiqs = [
  { id: "1", label: "Contoh_Mustahiq_01 — Miskin" },
  { id: "2", label: "Contoh_Mustahiq_02 — Fakir" },
  { id: "3", label: "Contoh_Mustahiq_03 — Fisabilillah" },
  { id: "4", label: "Contoh_Mustahiq_04 — Amil" },
  { id: "5", label: "Contoh_Mustahiq_05 — Gharimin" },
  { id: "6", label: "Contoh_Mustahiq_06 — Muallaf" },
  { id: "7", label: "Contoh_Mustahiq_07 — Fisabilillah" },
  { id: "8", label: "Contoh_Nama_15 — Ibnu Sabil" },
]

interface DistributionFormData {
  mustahiqId: string
  amount: string
  distribution_date: string
}

interface DistributionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: DistributionFormData & { id: number }
  onSave: (data: DistributionFormData) => void
}

function DistributionFormDialog({ open, onOpenChange, editing, onSave }: DistributionFormDialogProps) {
  const today = new Date().toISOString().split("T")[0]

  const [form, setForm] = useState<DistributionFormData>({
    mustahiqId: editing?.mustahiqId ?? "",
    amount: editing?.amount ?? "",
    distribution_date: editing?.distribution_date ?? today,
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
          <DialogTitle>{editing ? "Edit Penyaluran" : "Catat Penyaluran"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mustahiqId">Mustahiq</Label>
            <select
              id="mustahiqId"
              value={form.mustahiqId}
              onChange={(e) => setForm({ ...form, mustahiqId: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              required
            >
              <option value="">Pilih mustahiq</option>
              {dummyMustahiqs.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dist-amount">Jumlah (Rp)</Label>
            <Input
              id="dist-amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dist-date">Tanggal</Label>
            <Input
              id="dist-date"
              type="date"
              value={form.distribution_date}
              onChange={(e) => setForm({ ...form, distribution_date: e.target.value })}
              required
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

export { DistributionFormDialog }
