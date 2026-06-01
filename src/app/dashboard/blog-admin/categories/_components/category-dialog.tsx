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

interface CategoryFormData {
  name: string
  slug: string
}

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing?: CategoryFormData
  onSave: (data: CategoryFormData) => void
}

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function CategoryDialog({ open, onOpenChange, editing, onSave }: CategoryDialogProps) {
  const [name, setName] = useState(editing?.name ?? "")
  const [slug, setSlug] = useState(editing?.slug ?? "")
  const [manualSlug, setManualSlug] = useState(!!editing)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ name, slug: slug || toSlug(name) })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Nama</Label>
            <Input
              id="cat-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!manualSlug) setSlug(toSlug(e.target.value))
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-slug">Slug</Label>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>/blog/</span>
              <Input
                id="cat-slug"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setManualSlug(true) }}
                className="h-8"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CategoryDialog }
