import { OrgNode } from "@/components/shared/org-node"

interface Anggota {
  nama: string
}

interface StrukturData {
  penasehat: Anggota[]
  ketua: Anggota
  sekretaris: Anggota
  bendaharaI: Anggota
  bendaharaII: Anggota
}

function OrgChart({ data }: { data: StrukturData }) {
  return (
    <div className="flex flex-col items-center">
      {/* Level 1: Dewan Penasehat */}
      <div className="flex flex-wrap justify-center gap-4">
        {data.penasehat.map((p, i) => (
          <OrgNode key={i} title="DEWAN PENASEHAT" name={p.nama} />
        ))}
      </div>

      {/* Connector L1 → L2 */}
      <div className="flex justify-center">
        <div className="h-6 w-px bg-border" />
      </div>

      {/* Level 2: Ketua DKM */}
      <OrgNode title="KETUA DKM" name={data.ketua.nama} />

      {/* Desktop: branching connector L2 → L3 */}
      <div className="hidden sm:flex justify-center">
        <div className="relative h-8 w-48">
          <div className="absolute left-1/2 top-0 h-4 -translate-x-1/2 w-px bg-border" />
          <div className="absolute inset-x-0 top-4 h-px bg-border" />
          <div className="absolute left-[16.67%] top-4 h-4 w-px bg-border" />
          <div className="absolute left-1/2 top-4 h-4 -translate-x-1/2 w-px bg-border" />
          <div className="absolute right-[16.67%] top-4 h-4 w-px bg-border" />
        </div>
      </div>

      {/* Desktop: Level 3 — 3 cards horizontal */}
      <div className="hidden gap-8 sm:flex">
        <OrgNode title="SEKRETARIS" name={data.sekretaris.nama} />
        <OrgNode title="BENDAHARA I" name={data.bendaharaI.nama} />
        <OrgNode title="BENDAHARA II" name={data.bendaharaII.nama} />
      </div>

      {/* Mobile: Level 3 — vertical stack */}
      <div className="flex flex-col items-center sm:hidden">
        {/* Vertical connector */}
        <div className="h-6 w-px bg-border" />

        <OrgNode title="SEKRETARIS" name={data.sekretaris.nama} />

        <div className="h-6 w-px bg-border" />

        <OrgNode title="BENDAHARA I" name={data.bendaharaI.nama} />

        <div className="h-6 w-px bg-border" />

        <OrgNode title="BENDAHARA II" name={data.bendaharaII.nama} />
      </div>
    </div>
  )
}

export { OrgChart }
export type { StrukturData }
