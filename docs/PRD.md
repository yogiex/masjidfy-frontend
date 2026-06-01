
### 7.3 State Management Strategy
- **Server State** : TanStack Query (caching, pagination, optimistic update).
- **Auth State** : React Context (token, profil, role).
- **UI State** : useState lokal (sidebar, dialog, tab).
- **Form State** : React Hook Form (uncontrolled).
- **URL State** : query params untuk filter/pagination (gunakan `useSearchParams`).

### 7.4 Component Architecture
- **Atom (ui/)** : Komponen shadcn, tidak dimodifikasi langsung.
- **Molecule (shared/)** : Gabungan atom untuk use case spesifik (DataTable, StatCard).
- **Organism (layout/ & halaman)** : Rangkaian molecule membentuk halaman.
- Semua komponen shared wajib:
  - Menerima `className` untuk ekstensi Tailwind.
  - Menggunakan CVA untuk varian.
  - Props terdokumentasi JSDoc.

---

## 8. UI/UX Design Guidelines

### 8.1 Prinsip Desain
- **Konsistensi** : Gunakan komponen shared; jangan ada styling inline.
- **Feedback** : Setiap aksi harus ada respon (toast sukses/gagal, skeleton loading).
- **Empty State** : Tampilkan ilustrasi + pesan jika data kosong.
- **Konfirmasi** : Dialog untuk aksi destruktif (hapus, tolak, batalkan).
- **Mobile First** : Semua halaman harus berfungsi baik di mobile.

### 8.2 Warna & Tema
- Base color: Zinc (dari preset shadcn "Nova").
- Semantic colors: success (green), warning (amber), danger (red), info (blue).
- Dark mode opsional untuk fase berikutnya.

### 8.3 Tipografi
- Font: Geist (Sans) dari preset Nova, fallback ke system font.

---

## 9. Development Phases & Milestones

| Fase | Fokus | Komponen Utama | Estimasi |
|------|-------|----------------|----------|
| **Phase 1: Foundation** | Setup project, autentikasi, layout dashboard, sidebar dinamis, routing proteksi | Auth, Layout, Providers | 2 hari |
| **Phase 2: Qurban Module** | CRUD pendaftaran, verifikasi, hewan, pembayaran, distribusi | DataTable, Form, Tabs | 3 hari |
| **Phase 3: Zakat Module** | Transaksi, muzakki, mustahiq, distribusi, laporan, kalkulator | Form wizard, Report page | 3 hari |
| **Phase 4: Blog** | Public blog, admin panel, moderasi komentar | Server Components, ISR | 2 hari |
| **Phase 5: User Management** | CRUD user, role, permission (admin/superadmin) | DataTable, Role Guard | 2 hari |
| **Phase 6: Dashboard & Polish** | Widget peran, responsive refinement, error handling global | StatCard, Mobile sidebar | 2 hari |
| **Phase 7: Testing & Deploy** | Unit test, integration test, deploy Vercel, monitoring | – | 2 hari |

Total estimasi: ~16 hari kerja (dapat disesuaikan dengan jumlah developer).

---

## 10. Assumptions & Constraints

### 10.1 Asumsi
- Backend API sudah berjalan di `http://localhost:3000/api/v1` sesuai dokumentasi.
- Token JWT hanya disimpan di localStorage (tidak HttpOnly cookie).
- Tidak ada kebutuhan real-time (WebSocket) pada versi awal.
- Pengguna sudah memiliki akses internet stabil.

### 10.2 Batasan
- Role-based access control sepenuhnya bergantung pada backend; frontend hanya menyembunyikan UI, bukan pengaman utama.
- Belum ada fitur upload gambar (menunggu endpoint backend).
- Belum ada internasionalisasi (i18n), hanya Bahasa Indonesia.
- Tidak ada offline support.

---

## 11. Appendix: API Quick Reference
Seluruh endpoint yang digunakan mengikuti spesifikasi di **API_REFERENCE.md** (tersedia di folder `docs/`). Ringkasan singkat:

- **Base URL** : `http://localhost:3000/api/v1`
- **Auth** : JWT Bearer Token
- **Pagination** : `page`, `limit` → response `{ data, meta: { total, page, limit, totalPages } }`
- **Error** : `{ statusCode, message }`

---

**Dokumen ini akan terus diperbarui seiring dengan perkembangan proyek dan feedback dari stakeholder.**