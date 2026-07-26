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

interface AnimalFormData {
  type: string
  estimated_weight: string
  price: string
  source: string
  slaughter_date: string
  slaughter_location: string
}

interface AnimalFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: AnimalFormData & { id: number }
  onSave: (data: AnimalFormData) => void
}

function AnimalFormDialog({ open, onOpenChange, editing, onSave }: AnimalFormDialogProps) {
  const [form, setForm] = useState<AnimalFormData>({
    type: editing?.type ?? "goat",
    estimated_weight: editing?.estimated_weight ?? "",
    price: editing?.price ?? "",
    source: editing?.source ?? "donation",
    slaughter_date: editing?.slaughter_date ?? "",
    slaughter_location: editing?.slaughter_location ?? "",
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
          <DialogTitle>{editing ? "Edit Hewan" : "Tambah Hewan"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Jenis Hewan</Label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="cow">Sapi</option>
              <option value="goat">Kambing</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated_weight">Berat Estimasi (kg)</Label>
            <Input
              id="estimated_weight"
              type="number"
              value={form.estimated_weight}
              onChange={(e) => setForm({ ...form, estimated_weight: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Harga (Rp)</Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Sumber Dana</Label>
            <select
              id="source"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="donation">Donasi</option>
              <option value="self_funded">Dana Sendiri</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slaughter_date">Tanggal Potong</Label>
            <Input
              id="slaughter_date"
              type="date"
              value={form.slaughter_date}
              onChange={(e) => setForm({ ...form, slaughter_date: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slaughter_location">Lokasi Potong</Label>
            <Input
              id="slaughter_location"
              value={form.slaughter_location}
              onChange={(e) => setForm({ ...form, slaughter_location: e.target.value })}
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

export { AnimalFormDialog }
