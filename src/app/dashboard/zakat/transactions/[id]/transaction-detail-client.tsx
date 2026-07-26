"use client"

import { use } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ReactNode } from "react"

const typeLabels: Record<string, string> = {
  zakat_fitrah: "Zakat Fitrah",
  zakat_maal: "Zakat Maal",
  infaq: "Infaq",
  sedekah: "Sedekah",
  fidyah: "Fidyah",
}

const typeColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  zakat_fitrah: "default",
  zakat_maal: "secondary",
  infaq: "default",
  sedekah: "secondary",
  fidyah: "destructive",
}

interface TransactionItem {
  id: string; type: string; amount: number; method: string
  muzakkiName: string; transactionDate: string; notes: string
  muzakkiPhone: string; muzakkiAddress: string
}

export default function TransactionDetailClient({
  transactions,
  params,
}: {
  transactions: TransactionItem[]
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const tx = transactions.find((t) => t.id === id)

  if (!tx) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Kembali
        </Button>
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-lg font-medium">Transaksi tidak ditemukan</p>
          <p className="text-sm text-muted-foreground">ID transaksi &quot;{id}&quot; tidak dikenal</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="mr-1 h-4 w-4" />
        Kembali
      </Button>

      <h1 className="text-xl font-bold tracking-tight">Detail Transaksi #{tx.id}</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Informasi Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-xs text-muted-foreground">Jenis</dt>
                <dd><Badge variant={typeColors[tx.type]}>{typeLabels[tx.type] || tx.type}</Badge></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-muted-foreground">Jumlah</dt>
                <dd className="font-medium">Rp{tx.amount.toLocaleString("id")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-muted-foreground">Metode</dt>
                <dd>{tx.method === "cash" ? "Tunai" : "Transfer"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-muted-foreground">Tanggal</dt>
                <dd>{new Date(tx.transactionDate).toLocaleDateString("id-ID")}</dd>
              </div>
              {tx.notes && (
                <div className="flex justify-between">
                  <dt className="text-xs text-muted-foreground">Catatan</dt>
                  <dd className="max-w-48 text-right">{tx.notes}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Informasi Muzakki</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-xs text-muted-foreground">Nama</dt>
                <dd className="font-medium">{tx.muzakkiName || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-muted-foreground">Telepon</dt>
                <dd>{tx.muzakkiPhone || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-muted-foreground">Alamat</dt>
                <dd className="max-w-48 text-right">{tx.muzakkiAddress || "—"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
