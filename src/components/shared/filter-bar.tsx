"use client"

interface FilterBarProps {
  categories: { value: string; label: string }[]
  tags: { value: string; label: string }[]
  selectedCategory: string
  selectedTag: string
  onCategoryChange: (val: string) => void
  onTagChange: (val: string) => void
}

export function FilterBar({
  categories, tags,
  selectedCategory, selectedTag,
  onCategoryChange, onTagChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="h-9 rounded-lg border bg-background px-3 text-sm"
      >
        <option value="">Semua Kategori</option>
        {categories.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <select
        value={selectedTag}
        onChange={(e) => onTagChange(e.target.value)}
        className="h-9 rounded-lg border bg-background px-3 text-sm"
      >
        <option value="">Semua Tag</option>
        {tags.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
    </div>
  )
}
