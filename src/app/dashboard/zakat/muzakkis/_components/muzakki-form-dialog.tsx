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
import { Checkbox } from "@/components/ui/checkbox"

interface MuzakkiFormData {
  name: string
  phone: string
  address: string
  isAnonymous: boolean
}

interface MuzakkiFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: MuzakkiFormData & { id: number }
  onSave: (data: MuzakkiFormData) => void
}

function MuzakkiFormDialog({ open, onOpenChange, editing, onSave }: MuzakkiFormDialogProps) {
  const [form, setForm] = useState<MuzakkiFormData>({
    name: editing?.name ?? "",
    phone: editing?.phone ?? "",
    address: editing?.address ?? "",
    isAnonymous: editing?.isAnonymous ?? false,
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
          <DialogTitle>{editing ? "Edit Muzakki" : "Tambah Muzakki"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={form.isAnonymous}
              onCheckedChange={(checked) => setForm({ ...form, isAnonymous: checked === true })}
            />
            Anonim (sembunyikan nama)
          </label>
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

export { MuzakkiFormDialog }
