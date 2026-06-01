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

const allPermissions = [
  "manage_users",
  "manage_roles",
  "manage_zakat",
  "manage_qurban",
  "manage_blog",
  "view_reports",
  "manage_distributions",
  "manage_settings",
]

interface RoleFormData {
  name: string
  description: string
  permissions: string[]
}

interface RoleFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: RoleFormData & { id: number }
  onSave: (data: RoleFormData) => void
}

function RoleFormDialog({ open, onOpenChange, editing, onSave }: RoleFormDialogProps) {
  const [form, setForm] = useState<RoleFormData>({
    name: editing?.name ?? "",
    description: editing?.description ?? "",
    permissions: editing?.permissions ?? [],
  })

  function togglePermission(perm: string) {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Role" : "Tambah Role"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Role</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2 rounded-md border p-3">
              {allPermissions.map((perm) => (
                <label
                  key={perm}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={form.permissions.includes(perm)}
                    onCheckedChange={() => togglePermission(perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>
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

export { RoleFormDialog }
