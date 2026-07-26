"use client"

import type { ReactNode } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface PrintColumn<T> {
  header: string
  accessor: (row: T) => ReactNode
  className?: string
}

interface PrintLayoutProps<T> {
  title: string
  subtitle?: string
  columns: PrintColumn<T>[]
  data: T[]
  printedBy: string
  filterInfo?: string
}

function PrintLayout<T>({
  title,
  subtitle,
  columns,
  data,
  printedBy,
  filterInfo,
}: PrintLayoutProps<T>) {
  const now = format(new Date(), "dd MMMM yyyy, HH:mm 'WIB'", { locale: id })

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 1.5cm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
      <div className="mx-auto max-w-4xl p-8 print:p-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">MASJIDFY</h1>
          <p className="text-sm text-muted-foreground">Platform Manajemen Masjid Digital</p>
          <hr className="my-3" />
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          {filterInfo && (
            <p className="mt-1 text-sm text-muted-foreground">{filterInfo}</p>
          )}
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase">
                No
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-3 py-8 text-center text-sm text-muted-foreground"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border/50"
                >
                  <td className="px-3 py-2 text-muted-foreground">{rowIndex + 1}</td>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`px-3 py-2 ${col.className || ""}`}>
                      {col.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4 text-sm text-muted-foreground">
          Total data: <span className="font-medium">{data.length}</span>
        </div>

        <hr className="my-6" />

        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>
            Dicetak oleh: <span className="font-medium text-foreground">{printedBy}</span>
          </p>
          <p>
            Tanggal cetak: <span className="font-medium text-foreground">{now}</span>
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8">
          <div className="text-center">
            <p className="mb-12 text-sm font-medium">Mengetahui,</p>
            <p className="mt-2 text-sm font-semibold">Ketua Panitia</p>
            <div className="mt-8 border-t border-border pt-1">
              <p className="text-xs text-muted-foreground">( Tanda Tangan )</p>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-12 text-sm font-medium">Mengetahui,</p>
            <p className="mt-2 text-sm font-semibold">Petugas Verifikasi</p>
            <div className="mt-8 border-t border-border pt-1">
              <p className="text-xs text-muted-foreground">( Tanda Tangan )</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { PrintLayout }
export type { PrintColumn, PrintLayoutProps }
