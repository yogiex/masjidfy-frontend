import RegistrationDetailClient from "./registration-detail-client"

interface Registration {
  id: number; participant_name: string; group_name: string; contact_phone: string
  animal_type: string; amount: number; method: string; status: string; created_at: string
}

interface Payment {
  id: number; amount: number; method: string; status: string; payment_date: string
}

interface Distribution {
  id: number; recipient_name: string; coupon_count: number; distribution_date: string
}

const dummyRegistrations: Registration[] = [
  { id: 1, participant_name: "Contoh_Nama_01", group_name: "Kelompok 1", contact_phone: "081234567890", animal_type: "cow", amount: 2500000, method: "transfer", status: "verified", created_at: "01 Juni 2026" },
  { id: 2, participant_name: "Contoh_Nama_02", group_name: "", contact_phone: "081234567891", animal_type: "goat", amount: 1200000, method: "cash", status: "pending", created_at: "02 Juni 2026" },
  { id: 3, participant_name: "Contoh_Nama_03", group_name: "Kelompok 1", contact_phone: "081234567892", animal_type: "cow", amount: 2500000, method: "cash", status: "pending", created_at: "03 Juni 2026" },
  { id: 4, participant_name: "Contoh_Nama_04", group_name: "", contact_phone: "081234567893", animal_type: "goat", amount: 1500000, method: "transfer", status: "cancelled", created_at: "04 Juni 2026" },
  { id: 5, participant_name: "Contoh_Nama_05", group_name: "Kelompok 2", contact_phone: "081234567894", animal_type: "cow", amount: 3000000, method: "transfer", status: "verified", created_at: "05 Juni 2026" },
]

const dummyPayments: Payment[] = [
  { id: 1, amount: 1500000, method: "transfer", status: "dp", payment_date: "01/06/2026" },
  { id: 2, amount: 1000000, method: "cash", status: "lunas", payment_date: "10/06/2026" },
]

const dummyDistributions: Distribution[] = [
  { id: 1, recipient_name: "Contoh_Penerima_01", coupon_count: 2, distribution_date: "15/06/2026" },
  { id: 2, recipient_name: "Contoh_Penerima_02", coupon_count: 1, distribution_date: "15/06/2026" },
]

export function generateStaticParams() {
  return dummyRegistrations.map((r) => ({ id: String(r.id) }))
}

export default function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <RegistrationDetailClient
      registrations={dummyRegistrations}
      payments={dummyPayments}
      distributions={dummyDistributions}
      params={params}
    />
  )
}
