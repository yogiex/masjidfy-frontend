"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Anggota {
  nama: string
  jabatan: string
}

interface Bidang {
  icon: string
  nama: string
  ketua: string
  anggota: Anggota[]
  tugas: string[]
}

interface BidangDetailDialogProps {
  bidang: Bidang | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function BidangDetailDialog({ bidang, open, onOpenChange }: BidangDetailDialogProps) {
  if (!bidang) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{bidang.icon}</span>
            <span>Bidang {bidang.nama}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <span className="text-sm text-muted-foreground">Ketua: </span>
            <span className="text-sm font-medium">{bidang.ketua}</span>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Anggota:</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jabatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bidang.anggota.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-medium">{a.nama}</TableCell>
                    <TableCell>{a.jabatan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Tugas Pokok:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {bidang.tugas.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { BidangDetailDialog }
