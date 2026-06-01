"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { ImagePlus, X } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PostMetaboxProps {
  category: string
  onCategoryChange: (val: string) => void
  tags: string[]
  onTagsChange: (tags: string[]) => void
  featuredImage: string
  onFeaturedImageChange: (url: string) => void
  status: string
  onStatusChange: (val: string) => void
  scheduledAt: string
  onScheduledAtChange: (val: string) => void
  author: string
  onAuthorChange: (val: string) => void
}

const categories = [
  { value: "keislaman", label: "Keislaman" },
  { value: "ibadah", label: "Ibadah" },
  { value: "berita-masjid", label: "Berita Masjid" },
  { value: "kajian", label: "Kajian" },
  { value: "inspirasi", label: "Inspirasi" },
]

const allTags = ["zakat", "qurban", "puasa", "haji", "sedekah", "shalat", "kajian"]

const authors = [
  { value: "ahmad", label: "Ahmad Fauzi" },
  { value: "budi", label: "Budi Santoso" },
  { value: "citra", label: "Citra Dewi" },
]

export function PostMetabox({
  category, onCategoryChange,
  tags, onTagsChange,
  featuredImage, onFeaturedImageChange,
  status, onStatusChange,
  scheduledAt, onScheduledAtChange,
  author, onAuthorChange,
}: PostMetaboxProps) {
  const [tagInput, setTagInput] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const url = URL.createObjectURL(acceptedFiles[0])
      onFeaturedImageChange(url)
    }
  }, [onFeaturedImageChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  })

  function addTag(tag: string) {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag])
    }
    setTagInput("")
  }

  function removeTag(tag: string) {
    onTagsChange(tags.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Kategori</Label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        >
          <option value="">Pilih kategori...</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Tag</Label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          <Input
            placeholder="Tambah tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); addTag(tagInput) }
            }}
            className="h-8 text-xs"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => addTag(tagInput)}>+</Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gambar Unggulan</Label>
        {featuredImage ? (
          <div className="relative overflow-hidden rounded-md border">
            <img src={featuredImage} alt="Preview" className="h-32 w-full object-cover" />
            <button
              type="button"
              onClick={() => onFeaturedImageChange("")}
              className="absolute right-1 top-1 rounded-full bg-background/80 p-1 hover:bg-background"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground hover:bg-accent/50 ${isDragActive ? "border-primary bg-accent/50" : ""}`}
          >
            <input {...getInputProps()} />
            <ImagePlus className="mb-1 h-5 w-5" />
            {isDragActive ? "Lepaskan file..." : "Klik atau seret gambar"}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Penulis</Label>
        <select
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        >
          <option value="">Pilih penulis...</option>
          {authors.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <div className="space-y-1">
          {["draft", "published", "archived"].map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={(e) => onStatusChange(e.target.value)}
                className="accent-primary"
              />
              {s === "draft" ? "Draft" : s === "published" ? "Published" : "Archived"}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scheduledAt">Jadwal Terbit</Label>
        <Input
          id="scheduledAt"
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => onScheduledAtChange(e.target.value)}
          className="h-9 text-sm"
        />
      </div>
    </div>
  )
}
