import TransactionDetailClient from "./transaction-detail-client"

const dummyTransactions = [
  { id: "1", type: "zakat_fitrah", amount: 50000, method: "cash", muzakkiName: "Contoh_Nama_01", transactionDate: "2026-06-01", notes: "", muzakkiPhone: "081234567890", muzakkiAddress: "Jakarta" },
  { id: "2", type: "zakat_maal", amount: 2500000, method: "transfer", muzakkiName: "Contoh_Nama_02", transactionDate: "2026-06-02", notes: "Zakat maal tahunan", muzakkiPhone: "081234567891", muzakkiAddress: "Depok" },
  { id: "3", type: "infaq", amount: 200000, method: "cash", muzakkiName: "Contoh_Nama_03", transactionDate: "2026-06-03", notes: "Infaq Jumat", muzakkiPhone: "081234567892", muzakkiAddress: "Bogor" },
  { id: "4", type: "sedekah", amount: 100000, method: "cash", muzakkiName: "Contoh_Nama_04", transactionDate: "2026-06-05", notes: "", muzakkiPhone: "", muzakkiAddress: "" },
  { id: "5", type: "zakat_fitrah", amount: 50000, method: "cash", muzakkiName: "Contoh_Nama_05", transactionDate: "2026-06-07", notes: "", muzakkiPhone: "081234567893", muzakkiAddress: "Tangerang" },
  { id: "6", type: "zakat_maal", amount: 3500000, method: "transfer", muzakkiName: "Contoh_Nama_06", transactionDate: "2026-06-10", notes: "Zakat maal", muzakkiPhone: "", muzakkiAddress: "Jakarta" },
  { id: "7", type: "infaq", amount: 150000, method: "transfer", muzakkiName: "Contoh_Nama_07", transactionDate: "2026-06-12", notes: "Infaq pembangunan", muzakkiPhone: "081234567894", muzakkiAddress: "Depok" },
  { id: "8", type: "fidyah", amount: 300000, method: "cash", muzakkiName: "Contoh_Nama_08", transactionDate: "2026-06-15", notes: "Fidyah 30 hari", muzakkiPhone: "081234567895", muzakkiAddress: "Bekasi" },
  { id: "9", type: "sedekah", amount: 75000, method: "cash", muzakkiName: "Contoh_Nama_09", transactionDate: "2026-06-18", notes: "", muzakkiPhone: "081234567896", muzakkiAddress: "Jakarta" },
]

export function generateStaticParams() {
  return dummyTransactions.map((t) => ({ id: t.id }))
}

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <TransactionDetailClient transactions={dummyTransactions} params={params} />
}
