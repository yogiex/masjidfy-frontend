"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "sonner"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable, type Column } from "@/components/shared/data-table"

interface Payment {
  id: number; amount: number; method: string; status: string; payment_date: string
}

interface Distribution {
  id: number; recipient_name: string; coupon_count: number; distribution_date: string
}

interface Registration {
  id: number; participant_name: string; group_name: string; contact_phone: string
  animal_type: string; amount: number; method: string; status: string; created_at: string
}

const statusLabels: Record<string, string> = {
  pending: "🟡 Pending",
  verified: "🟢 Terverifikasi",
  cancelled: "🔴 Dibatalkan",
}

const statusColors: Record<string, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  verified: "default",
  cancelled: "destructive",
}

function formatAmount(n: number) {
  return `Rp${n.toLocaleString("id")}`
}

export default function RegistrationDetailClient({
  registrations,
  payments: initialPayments,
  distributions: initialDistributions,
  params,
}: {
  registrations: Registration[]
  payments: Payment[]
  distributions: Distribution[]
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const reg = registrations.find((r) => r.id === Number(id))

  const [payments, setPayments] = useState(initialPayments)
  const [distributions, setDistributions] = useState(initialDistributions)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [distributionDialogOpen, setDistributionDialogOpen] = useState(false)

  const [paymentForm, setPaymentForm] = useState({ amount: "", method: "cash", status: "dp" })
  const [distributionForm, setDistributionForm] = useState({ recipient_name: "", coupon_count: "", distribution_date: "" })

  const paymentColumns: Column<Payment>[] = [
    { id: "amount", header: "Jumlah", cell: (r) => formatAmount(r.amount), sortable: true },
    { id: "method", header: "Metode", cell: (r) => r.method === "cash" ? "Tunai" : "Transfer" },
    { id: "status", header: "Status", cell: (r) => <Badge variant={r.status === "lunas" ? "default" : "secondary"}>{r.status.toUpperCase()}</Badge> },
    { id: "payment_date", header: "Tanggal", accessorKey: "payment_date" },
  ]

  const distributionColumns: Column<Distribution>[] = [
    { id: "recipient_name", header: "Penerima", accessorKey: "recipient_name" },
    { id: "coupon_count", header: "Jml Kupon", accessorKey: "coupon_count" },
    { id: "distribution_date", header: "Tanggal", accessorKey: "distribution_date" },
  ]

  function handleAddPayment() {
    setPayments((prev) => [...prev, {
      id: Date.now(),
      amount: Number(paymentForm.amount),
      method: paymentForm.method,
      status: paymentForm.status,
      payment_date: new Date().toLocaleDateString("id-ID"),
    }])
    setPaymentDialogOpen(false)
    setPaymentForm({ amount: "", method: "cash", status: "dp" })
    toast.success("Pembayaran berhasil dicatat")
  }

  function handleAddDistribution() {
    setDistributions((prev) => [...prev, {
      id: Date.now(),
      recipient_name: distributionForm.recipient_name,
      coupon_count: Number(distributionForm.coupon_count),
      distribution_date: distributionForm.distribution_date,
    }])
    setDistributionDialogOpen(false)
    setDistributionForm({ recipient_name: "", coupon_count: "", distribution_date: "" })
    toast.success("Distribusi berhasil dicatat")
  }

  if (!reg) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Kembali
        </Button>
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-lg font-medium">Pendaftaran tidak ditemukan</p>
          <p className="text-sm text-muted-foreground">ID pendaftaran &quot;{id}&quot; tidak dikenal</p>
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

      <h1 className="text-xl font-bold tracking-tight">
        Detail Pendaftaran — {reg.participant_name}
      </h1>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Informasi</TabsTrigger>
          <TabsTrigger value="payments">Pembayaran</TabsTrigger>
          <TabsTrigger value="distributions">Distribusi</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Data Pendaftaran</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">Nama Peserta</dt>
                  <dd className="text-sm font-medium">{reg.participant_name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Kelompok</dt>
                  <dd className="text-sm font-medium">{reg.group_name || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Kontak</dt>
                  <dd className="text-sm font-medium">{reg.contact_phone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Status</dt>
                  <dd><Badge variant={statusColors[reg.status]}>{statusLabels[reg.status]}</Badge></dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Jenis Hewan</dt>
                  <dd className="text-sm font-medium">{reg.animal_type === "cow" ? "Sapi" : "Kambing"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Metode</dt>
                  <dd className="text-sm font-medium">{reg.method === "cash" ? "Tunai" : "Transfer"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Jumlah</dt>
                  <dd className="text-sm font-medium">{formatAmount(reg.amount)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Tanggal Daftar</dt>
                  <dd className="text-sm font-medium">{reg.created_at}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Riwayat Pembayaran</h2>
            <Button size="sm" onClick={() => setPaymentDialogOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Catat Pembayaran
            </Button>
          </div>
          <DataTable
            columns={paymentColumns}
            data={payments}
            keyExtractor={(r) => r.id}
            emptyMessage="Belum ada pembayaran"
            pageSize={5}
          />
        </TabsContent>

        <TabsContent value="distributions" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Distribusi Daging</h2>
            <Button size="sm" onClick={() => setDistributionDialogOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Catat Distribusi
            </Button>
          </div>
          <DataTable
            columns={distributionColumns}
            data={distributions}
            keyExtractor={(r) => r.id}
            emptyMessage="Belum ada distribusi"
            pageSize={5}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Catat Pembayaran</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pay-amount">Jumlah (Rp)</Label>
              <Input id="pay-amount" type="number" value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pay-method">Metode</Label>
              <select id="pay-method" value={paymentForm.method}
                onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                <option value="cash">Tunai</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pay-status">Status</Label>
              <select id="pay-status" value={paymentForm.status}
                onChange={(e) => setPaymentForm({ ...paymentForm, status: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                <option value="dp">DP</option>
                <option value="lunas">Lunas</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Batal</Button>
              <Button onClick={handleAddPayment}>Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={distributionDialogOpen} onOpenChange={setDistributionDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Catat Distribusi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dist-recipient">Nama Penerima</Label>
              <Input id="dist-recipient" value={distributionForm.recipient_name}
                onChange={(e) => setDistributionForm({ ...distributionForm, recipient_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dist-coupon">Jumlah Kupon</Label>
              <Input id="dist-coupon" type="number" value={distributionForm.coupon_count}
                onChange={(e) => setDistributionForm({ ...distributionForm, coupon_count: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dist-date">Tanggal</Label>
              <Input id="dist-date" type="date" value={distributionForm.distribution_date}
                onChange={(e) => setDistributionForm({ ...distributionForm, distribution_date: e.target.value })} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDistributionDialogOpen(false)}>Batal</Button>
              <Button onClick={handleAddDistribution}>Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
