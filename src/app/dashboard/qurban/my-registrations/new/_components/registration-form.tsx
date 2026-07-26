"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

const initialForm = {
  participant_name: "",
  group_name: "",
  contact_phone: "",
  animal_type: "goat",
  amount: "",
  method: "cash",
}

export function RegistrationForm() {
  const router = useRouter()
  const [form, setForm] = useState({ ...initialForm })
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      toast.success("Pendaftaran qurban berhasil")
      router.push("/dashboard/qurban/my-registrations")
    }, 500)
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="mr-1 h-4 w-4" />
        Kembali
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Qurban Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="participant_name">Nama Peserta</Label>
              <Input
                id="participant_name"
                value={form.participant_name}
                onChange={(e) => setForm({ ...form, participant_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group_name">Nama Kelompok (opsional)</Label>
              <Input
                id="group_name"
                value={form.group_name}
                onChange={(e) => setForm({ ...form, group_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">No. Telepon</Label>
              <Input
                id="contact_phone"
                type="tel"
                value={form.contact_phone}
                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="animal_type">Jenis Hewan</Label>
              <select
                id="animal_type"
                value={form.animal_type}
                onChange={(e) => setForm({ ...form, animal_type: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              >
                <option value="cow">Sapi</option>
                <option value="goat">Kambing</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Jumlah Pembayaran (Rp)</Label>
              <Input
                id="amount"
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Metode Pembayaran</Label>
              <select
                id="method"
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              >
                <option value="cash">Tunai</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Batal
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Menyimpan..." : "Daftar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
