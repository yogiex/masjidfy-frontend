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

const dummyAnimals = [
  { id: "HEW-001", label: "Sapi (350kg) - HEW-001" },
  { id: "HEW-002", label: "Kambing (30kg) - HEW-002" },
  { id: "HEW-003", label: "Sapi (400kg) - HEW-003" },
  { id: "HEW-004", label: "Kambing (28kg) - HEW-004" },
  { id: "HEW-005", label: "Sapi (320kg) - HEW-005" },
]

interface DistributionFormData {
  animal_id: string
  recipient_name: string
  coupon_count: string
  distribution_date: string
}

interface DistributionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: DistributionFormData & { id: number }
  onSave: (data: DistributionFormData) => void
}

function DistributionFormDialog({ open, onOpenChange, editing, onSave }: DistributionFormDialogProps) {
  const [form, setForm] = useState<DistributionFormData>({
    animal_id: editing?.animal_id ?? "",
    recipient_name: editing?.recipient_name ?? "",
    coupon_count: editing?.coupon_count ?? "",
    distribution_date: editing?.distribution_date ?? "",
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
          <DialogTitle>{editing ? "Edit Distribusi" : "Tambah Distribusi"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="animal_id">Hewan</Label>
            <select
              id="animal_id"
              value={form.animal_id}
              onChange={(e) => setForm({ ...form, animal_id: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              required
            >
              <option value="">Pilih hewan</option>
              {dummyAnimals.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient_name">Nama Penerima</Label>
            <Input
              id="recipient_name"
              value={form.recipient_name}
              onChange={(e) => setForm({ ...form, recipient_name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coupon_count">Jumlah Kupon</Label>
            <Input
              id="coupon_count"
              type="number"
              value={form.coupon_count}
              onChange={(e) => setForm({ ...form, coupon_count: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="distribution_date">Tanggal</Label>
            <Input
              id="distribution_date"
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
