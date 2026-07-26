"use client"

import { useState } from "react"
import { Calculator, Info } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ZakatForm } from "./_components/zakat-form"
import { ZakatResult } from "./_components/zakat-result"

interface ZakatInput {
  emas: number; perak: number; uangTunai: number; barangDagang: number
  piutang: number; tabungan: number; utang: number
}

interface ZakatOutput {
  nisabEmas: number
  nisabPerak: number
  totalAset: number
  asetBersih: number
  zakat: number
  wajib: boolean
  nisabTerpakai: "emas" | "perak"
}

const HARGA_EMAS_PER_GRAM = 1_000_000
const HARGA_PERAK_PER_GRAM = 12_000
const NISAB_EMAS = 85
const NISAB_PERAK = 595
const ZAKAT_PERSEN = 0.025

function hitungZakat(input: ZakatInput): ZakatOutput {
  const totalAset = input.emas * HARGA_EMAS_PER_GRAM + input.perak * HARGA_PERAK_PER_GRAM +
    input.uangTunai + input.piutang + input.tabungan + input.barangDagang
  const asetBersih = totalAset - input.utang

  const nisabEmas = NISAB_EMAS * HARGA_EMAS_PER_GRAM
  const nisabPerak = NISAB_PERAK * HARGA_PERAK_PER_GRAM

  const nisabTerpakai: "emas" | "perak" = nisabEmas >= nisabPerak ? "perak" : "emas"
  const nisab = nisabTerpakai === "emas" ? nisabEmas : nisabPerak

  const wajib = asetBersih >= nisab
  const zakat = wajib ? asetBersih * ZAKAT_PERSEN : 0

  return { nisabEmas, nisabPerak, totalAset, asetBersih, zakat, wajib, nisabTerpakai }
}

export default function KalkulatorZakatPage() {
  const [result, setResult] = useState<ZakatOutput | null>(null)

  function handleHitung(input: ZakatInput) {
    setResult(hitungZakat(input))
  }

  function handleReset() {
    setResult(null)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16 xl:px-24 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">🧮 Kalkulator Zakat</h1>
        <p className="mt-1 text-muted-foreground">
          Hitung kewajiban zakat harta Anda dengan mudah
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calculator className="h-4 w-4" /> Masukkan Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ZakatForm onHitung={handleHitung} onReset={handleReset} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hasil Perhitungan</CardTitle>
          </CardHeader>
          <CardContent>
            <ZakatResult result={result} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Info className="h-4 w-4" /> Informasi Tambahan
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>• Nisab emas: 85 gram emas (Rp85.000.000)</p>
          <p>• Nisab perak: 595 gram perak (Rp7.140.000)</p>
          <p>• Nisab yang digunakan: nisab terendah dari keduanya</p>
          <p>• Kadar zakat: 2,5% dari aset bersih</p>
          <p>• Hasil ini hanya perkiraan. Konsultasikan dengan amil zakat terdekat.</p>
        </CardContent>
      </Card>
    </div>
  )
}
