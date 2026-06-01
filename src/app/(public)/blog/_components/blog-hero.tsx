"use client"

import { Search } from "lucide-react"

interface BlogHeroProps {
  searchValue: string
  onSearchChange: (val: string) => void
}

export function BlogHero({ searchValue, onSearchChange }: BlogHeroProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-8 text-center sm:p-12">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        📰 Artikel &amp; Kajian Islami
      </h1>
      <p className="mt-2 text-muted-foreground">
        Membaca, memahami, dan mengamalkan ajaran Islam
      </p>
      <div className="mx-auto mt-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}
