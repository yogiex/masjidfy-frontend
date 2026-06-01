"use client"

import { useState, useMemo, type ReactNode } from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "./empty-state"

interface Column<T> {
  id: string
  header: string
  accessorKey?: keyof T
  cell?: (row: T) => ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string | number
  loading?: boolean
  emptyMessage?: string
  emptyDescription?: string
  emptyAction?: { label: string; onClick: () => void }
  selectable?: boolean
  selectedIds?: Set<string | number>
  onSelectionChange?: (ids: Set<string | number>) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  toolbarContent?: ReactNode
  defaultSortField?: string
  defaultSortDir?: "asc" | "desc"
  pageSize?: number
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyMessage = "Tidak ada data",
  emptyDescription,
  emptyAction,
  selectable = false,
  selectedIds = new Set(),
  onSelectionChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  toolbarContent,
  defaultSortField,
  defaultSortDir = "asc",
  pageSize: pageSizeOption = 10,
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<string | undefined>(defaultSortField)
  const [sortDir, setSortDir] = useState<"asc" | "desc">(defaultSortDir)
  const [page, setPage] = useState(0)
  const pageSize = pageSizeOption

  const sortedData = useMemo(() => {
    if (!sortField) return data
    const col = columns.find((c) => c.id === sortField)
    if (!col || !col.accessorKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[col.accessorKey!]
      const bVal = b[col.accessorKey!]
      if (aVal == null) return 1
      if (bVal == null) return -1
      const cmp = String(aVal).localeCompare(String(bVal), "id", { numeric: true })
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortField, sortDir, columns])

  const pageCount = Math.ceil(sortedData.length / pageSize)
  const pageData = sortedData.slice(page * pageSize, (page + 1) * pageSize)

  const allSelected = pageData.length > 0 && pageData.every((r) => selectedIds.has(keyExtractor(r)))
  const someSelected = pageData.some((r) => selectedIds.has(keyExtractor(r)))

  function toggleSort(field: string) {
    if (sortField === field) {
      if (sortDir === "asc") setSortDir("desc")
      else { setSortField(undefined); setSortDir("asc") }
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  function toggleAll() {
    if (!onSelectionChange) return
    const next = new Set(selectedIds)
    if (allSelected) {
      pageData.forEach((r) => next.delete(keyExtractor(r)))
    } else {
      pageData.forEach((r) => next.add(keyExtractor(r)))
    }
    onSelectionChange(next)
  }

  function toggleRow(rowId: string | number) {
    if (!onSelectionChange) return
    const next = new Set(selectedIds)
    if (next.has(rowId)) next.delete(rowId)
    else next.add(rowId)
    onSelectionChange(next)
  }

  function SortIcon({ field }: { field: string }) {
    if (sortField !== field) return <ChevronsUpDown className="ml-1 inline h-3 w-3 opacity-50" />
    return sortDir === "asc"
      ? <ChevronUp className="ml-1 inline h-3 w-3" />
      : <ChevronDown className="ml-1 inline h-3 w-3" />
  }

  const colSpan = columns.length + (selectable ? 1 : 0)

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-24" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {(onSearchChange || toolbarContent) && (
        <div className="flex flex-wrap items-center gap-2">
          {onSearchChange && (
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 max-w-xs"
            />
          )}
          <div className="flex flex-1 items-center gap-2 justify-end">
            {toolbarContent}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected || someSelected ? allSelected : false}
                    onCheckedChange={toggleAll}
                    aria-label="Pilih semua"
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead key={col.id} className={col.className}>
                  {col.sortable ? (
                    <button
                      onClick={() => toggleSort(col.id)}
                      className="inline-flex items-center font-medium hover:text-foreground"
                    >
                      {col.header}
                      <SortIcon field={col.id} />
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={colSpan} className="h-48 text-center">
                  <EmptyState message={emptyMessage} description={emptyDescription} action={emptyAction} />
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((row) => {
                const rowId = keyExtractor(row)
                return (
                  <TableRow
                    key={rowId}
                    data-state={selectedIds.has(rowId) ? "selected" : undefined}
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.has(rowId)}
                          onCheckedChange={() => toggleRow(rowId)}
                          aria-label="Pilih baris"
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell key={col.id} className={col.className}>
                        {col.cell
                          ? col.cell(row)
                          : col.accessorKey
                            ? String(row[col.accessorKey] ?? "")
                            : null}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Menampilkan {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sortedData.length)} dari{" "}
            {sortedData.length} data
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => { setPage(page - 1) }}>
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pageCount - 1}
              onClick={() => { setPage(page + 1) }}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataTable }
export type { Column, DataTableProps }
