import { cn } from "@/lib/utils"

interface ZakatResultProps {
  result: {
    nisabEmas: number
    nisabPerak: number
    totalAset: number
    asetBersih: number
    zakat: number
    wajib: boolean
    nisabTerpakai: "emas" | "perak"
  } | null
}

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

export function ZakatResult({ result }: ZakatResultProps) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-sm text-muted-foreground">
        <span className="text-3xl">📊</span>
        <p className="mt-2">Isi form dan klik &quot;Hitung Zakat&quot;</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 text-sm">
      <div className="space-y-1.5">
        <Row label="Nisab Emas" value={formatRp(result.nisabEmas)} />
        <Row label="Nisab Perak" value={formatRp(result.nisabPerak)} />
        <Row label="Total Aset" value={formatRp(result.totalAset)} />
        <Row label="Utang" value={formatRp(result.totalAset - result.asetBersih)} />
        <Row label="Aset Bersih" value={formatRp(result.asetBersih)} bold />
        <div className="border-t pt-1.5" />
        <Row
          label="Status"
          value={result.wajib ? "🟢 WAJIB ZAKAT" : "🔴 TIDAK WAJIB"}
          className={result.wajib ? "text-emerald-600 font-bold" : "text-muted-foreground"}
        />
        <Row
          label="Zakat yang Dibayar"
          value={formatRp(result.zakat)}
          bold
          className="text-primary"
        />
      </div>
    </div>
  )
}

function Row({ label, value, bold, className }: { label: string; value: string; bold?: boolean; className?: string }) {
  return (
    <div className={cn("flex justify-between", className)}>
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  )
}
