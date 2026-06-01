import { Users } from "lucide-react"

import { Button } from "@/components/ui/button"

interface BidangCardProps {
  icon: string
  nama: string
  ketua: string
  jumlahAnggota: number
  onDetail: () => void
}

function BidangCard({ icon, nama, ketua, jumlahAnggota, onDetail }: BidangCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm">
      <div className="mb-3 text-2xl">{icon}</div>
      <h3 className="mb-2 font-semibold">{nama}</h3>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>Ketua: <span className="text-foreground">{ketua}</span></p>
        <p className="flex items-center gap-1">
          <Users className="size-3.5" />
          Anggota: {jumlahAnggota}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={onDetail}
      >
        Lihat Detail
      </Button>
    </div>
  )
}

export { BidangCard }
