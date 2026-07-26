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

const asnafList = [
  { value: "fakir", label: "Fakir" },
  { value: "miskin", label: "Miskin" },
  { value: "amil", label: "Amil" },
  { value: "muallaf", label: "Muallaf" },
  { value: "riqab", label: "Riqab" },
  { value: "gharimin", label: "Gharimin" },
  { value: "fi_sabilillah", label: "Fi Sabilillah" },
  { value: "ibnu_sabil", label: "Ibnu Sabil" },
] as const

interface MustahiqFormData {
  name: string
  asnaf_category: string
}

interface MustahiqFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: MustahiqFormData & { id: number }
  onSave: (data: MustahiqFormData) => void
}

function MustahiqFormDialog({ open, onOpenChange, editing, onSave }: MustahiqFormDialogProps) {
  const [form, setForm] = useState<MustahiqFormData>({
    name: editing?.name ?? "",
    asnaf_category: editing?.asnaf_category ?? "miskin",
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
          <DialogTitle>{editing ? "Edit Mustahiq" : "Tambah Mustahiq"}</DialogTitle>
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
            <Label htmlFor="asnaf">Kategori Asnaf</Label>
            <select
              id="asnaf"
              value={form.asnaf_category}
              onChange={(e) => setForm({ ...form, asnaf_category: e.target.value })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              {asnafList.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
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

export { MustahiqFormDialog }
export { asnafList }
