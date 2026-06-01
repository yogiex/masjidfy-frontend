"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const emptyForm = { emas: "", perak: "", uangTunai: "", barangDagang: "", piutang: "", tabungan: "", utang: "" }

interface ZakatFormData {
  emas: number; perak: number; uangTunai: number; barangDagang: number
  piutang: number; tabungan: number; utang: number
}

interface ZakatFormProps {
  onHitung: (data: ZakatFormData) => void
  onReset: () => void
}

export function ZakatForm({ onHitung, onReset }: ZakatFormProps) {
  const [emas, setEmas] = useState("")
  const [perak, setPerak] = useState("")
  const [uangTunai, setUangTunai] = useState("")
  const [barangDagang, setBarangDagang] = useState("")
  const [piutang, setPiutang] = useState("")
  const [tabungan, setTabungan] = useState("")
  const [utang, setUtang] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onHitung({
      emas: Number(emas) || 0,
      perak: Number(perak) || 0,
      uangTunai: Number(uangTunai) || 0,
      barangDagang: Number(barangDagang) || 0,
      piutang: Number(piutang) || 0,
      tabungan: Number(tabungan) || 0,
      utang: Number(utang) || 0,
    })
  }

  function handleReset() {
    setEmas(""); setPerak(""); setUangTunai(""); setBarangDagang("")
    setPiutang(""); setTabungan(""); setUtang("")
    onReset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Emas (gram)</Label>
        <Input type="number" min="0" placeholder="0" value={emas} onChange={(e) => setEmas(e.target.value)} className="h-8 text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Perak (gram)</Label>
        <Input type="number" min="0" placeholder="0" value={perak} onChange={(e) => setPerak(e.target.value)} className="h-8 text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Uang Tunai (Rp)</Label>
        <Input type="number" min="0" placeholder="0" value={uangTunai} onChange={(e) => setUangTunai(e.target.value)} className="h-8 text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Tabungan (Rp)</Label>
        <Input type="number" min="0" placeholder="0" value={tabungan} onChange={(e) => setTabungan(e.target.value)} className="h-8 text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Barang Dagangan (Rp)</Label>
        <Input type="number" min="0" placeholder="0" value={barangDagang} onChange={(e) => setBarangDagang(e.target.value)} className="h-8 text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Piutang (Rp)</Label>
        <Input type="number" min="0" placeholder="0" value={piutang} onChange={(e) => setPiutang(e.target.value)} className="h-8 text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Utang (Rp)</Label>
        <Input type="number" min="0" placeholder="0" value={utang} onChange={(e) => setUtang(e.target.value)} className="h-8 text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button type="submit" size="sm">Hitung Zakat</Button>
        <Button type="button" variant="outline" size="sm" onClick={handleReset}>Reset</Button>
      </div>
    </form>
  )
}
