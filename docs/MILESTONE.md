# Milestone – Masjidfy Frontend

**Versi:** 2.1  
**Tanggal:** 6 Juni 2026  
**Status:** MVP Phase — dummy data, no API integration, auth guard aktif

---

## ✅ Fase 0: Foundation Awal (Selesai)

| Item | Detail | Status |
|------|--------|--------|
| Inisialisasi Next.js + TypeScript | next@16.2.6, react@19.2.4, typescript@5 | ✅ |
| Instalasi shadcn/ui & komponen dasar | 17 komponen: button, card, input, label, badge, dialog, sheet, skeleton, sonner, table, tabs, avatar, breadcrumb, dropdown-menu, separator, checkbox, textarea | ✅ |
| Konfigurasi Tailwind CSS (Nova preset) | tailwindcss@4, `tw-animate-css` | ✅ |
| Setup axios instance | `src/lib/api-client.ts` | ✅ |
| Auth context & provider | `src/lib/auth.tsx` (AuthProvider, useAuth) | ✅ |
| Definisi roles & helpers | `src/lib/roles.ts` | ✅ |
| Definisi semua tipe TypeScript | `src/types/index.ts` — Auth, User, Role, Permission, Qurban, Zakat, Blog, Pagination | ✅ |

---

## ✅ Fase 1: Foundation Inti (Selesai)

| # | Item | Status | Catatan |
|---|------|--------|---------|
| 1.0 | Root layout + Providers | ✅ | `layout.tsx` + `providers.tsx` |
| 1.1 | Public Layout | ✅ | Navbar + Footer + `<main>` |
| 1.2 | Public Navbar | ✅ | Logo, Beranda, Tentang ▾ (dropdown), Blog, Kalkulator, Masuk |
| 1.3 | Public Footer | ✅ | 3 kolom: Masjidfy, Tautan Cepat, Kontak |
| 1.4 | Landing Page | ✅ | Hero, Layanan, Statistik, Artikel, CTA |
| 1.5 | Login Page | ✅ | Two-column layout |
| 1.6 | Register Page | ✅ | Two-column layout |
| 1.7 | Kalkulator Zakat | ✅ | Form lokal + hitung nisab |
| 1.8 | Dashboard Layout | ✅ | Sidebar + Header + main content |
| 1.9 | Dashboard Home | ✅ | 4 StatCards + 2 activity lists |
| 1.10 | Sidebar | ✅ | Collapsible, mobile Sheet, semua item visible |
| 1.11 | Header | ✅ | Breadcrumb + bell + user avatar |
| 1.12 | Breadcrumb | ✅ | Otomatis dari pathname |
| 1.13 | Shared: EmptyState | ✅ | icon, title, description, action |
| 1.14 | Shared: StatCard | ✅ | icon, title, value, variant, trend |
| 1.15 | Shared: DataTable | ✅ | Sorting, pagination, search, loading, empty, selectable |
| 1.16 | MasjidSilhouette | ✅ | SVG masjid + bulan sabit |
| 1.17 | PrintLayout | ✅ | Shared print component: header, table, filter info, TTD, timestamp |

---

## ✅ Fase 2: Modul Qurban (Selesai — dummy data)

| # | Item | Status | Catatan |
|---|------|--------|---------|
| 2.0 | Animals CRUD | ✅ | DataTable + form dialog, filter jenis |
| 2.1 | My Registrations (Jamaah) | ✅ | DataTable + search + "Daftar Baru" button, Eye → detail |
| 2.2 | Registration Form (Jamaah) | ✅ | Halaman terpisah, Card layout, 6 field |
| 2.3 | All Registrations (Admin) | ✅ | DataTable + status filter + group filter + verify/cancel actions |
| 2.4 | Registration Detail | ✅ | Tabs (Info, Pembayaran, Distribusi), URL params, fallback not found |
| 2.5 | Payments CRUD | ✅ | DataTable + form dialog, filter |
| 2.6 | Distributions CRUD | ✅ | DataTable + form dialog, **dropdown pilih hewan** |
| 2.7 | Print Registrations | ✅ | Filter by group/status, auto-print, TTD footer, timestamp |
| 2.8 | Export CSV | ✅ | Dari halaman registrasi |
| 2.9 | Qurban Layout | ✅ | Sub-navigasi horizontal ke semua halaman qurban |

---

## ✅ Fase 3: Modul Zakat (Selesai — dummy data)

| # | Item | Status | Catatan |
|---|------|--------|---------|
| 3.0 | Muzakki CRUD | ✅ | DataTable + form dialog, isAnonymous checkbox |
| 3.1 | Mustahiq CRUD | ✅ | DataTable + asnaf filter + verify toggle, 8 asnaf categories |
| 3.2 | Transactions CRUD | ✅ | DataTable + type filter + 5 type badges, edit/delete |
| 3.3 | Transaction Detail | ✅ | Route `[id]`, 2 card info (transaksi + muzakki), fallback not found |
| 3.4 | Distributions | ✅ | DataTable + form dialog, **dropdown pilih mustahiq** |
| 3.5 | Reports | ✅ | Year/month filter, 3 StatCards (penerimaan/penyaluran/saldo), breakdown per jenis |

---

## ✅ Fase 4: Blog (Selesai — dummy data)

| # | Item | Status | Catatan |
|---|------|--------|---------|
| 4.1 | Blog Publik List | ✅ | Grid 3 kolom, pagination, loading skeleton |
| 4.2 | Blog Publik Detail | ✅ | Konten + komentar + share + related, SEO metadata |
| 4.3 | Blog Admin Posts | ✅ | DataTable + status filter |
| 4.4 | Blog Admin New/Edit Post | ✅ | WYSIWYG (TipTap) + metabox + autosave |
| 4.5 | Blog Admin Categories | ✅ | CRUD dengan dialog |
| 4.6 | Blog Admin Tags | ✅ | CRUD dengan dialog |
| 4.7 | Blog Admin Comments | ✅ | Approve/reject/delete, bulk actions |
| — | Shared: BlogCard | ✅ | Kartu artikel |
| — | Shared: FilterBar | ✅ | Filter kategori + search |
| — | Shared: ShareButtons | ✅ | WhatsApp, FB, Twitter, copy link |
| — | Shared: WYSIWYGEditor | ✅ | TipTap (B/I/U/S, H1-H3, list, quote, code, table, image, link) |
| — | Shared: PostMetabox | ✅ | Kategori, tags, featured image, status, jadwal |

---

## ✅ Fase 5: User Management (Selesai — dummy data)

| # | Item | Status | Catatan |
|---|------|--------|---------|
| 5.0 | Users List | ✅ | DataTable + search + form dialog |
| 5.1 | Users Create/Edit | ✅ | Dialog form dengan role select |
| 5.2 | Users Delete | ✅ | Dialog confirm |
| 5.3 | Roles List | ✅ | DataTable + search |
| 5.4 | Roles Create/Edit | ✅ | Dialog form dengan permission grid |
| 5.5 | Permissions List | ✅ | DataTable + search + resource filter (fixed sidebar 404) |

---

## ✅ Fase 6: Dashboard & Polish (Selesai — partial API hooks)

| # | Item | Status | Catatan |
|---|------|--------|---------|
| 6.0 | StatCard Component | ✅ | |
| 6.1 | Dashboard Home | ✅ | |
| 6.2 | Dashboard Role-Aware Widgets | ✅ | StatCards berbeda per role: jamaah (pendaftaran saya), bendahara (pemasukan/penyaluran ZIS), admin (pengguna/pending) |
| 6.3 | Auth Guard Dashboard | ✅ | Redirect ke `/login` jika tidak terautentikasi, loading state |
| 6.4 | Mobile Responsive | ✅ | Sidebar sheet, grid responsive, scroll table |
| — | Landing Page | ✅ | Selesai di Fase 1 |
| — | Struktur Organisasi | ✅ | Bagan 3 level + bidang + detail dialog |
| — | Hooks (useQurban, useZakat, dll) | ❌ | Belum dibuat — MVP pakai dummy data |
| — | Zod Validation | ❌ | Belum — MVP pakai HTML required |
| — | API Integration | ❌ | Belum — 100% dummy data |

---

## ❌ Fase 7: Testing & Deploy (Belum)

| # | Item | Status |
|---|------|--------|
| 7.1 | Unit Test | ❌ |
| 7.2 | Integration Test | ❌ |
| 7.3 | E2E | ❌ |
| 7.4 | Lighthouse Audit | ❌ |
| 7.5 | Vercel Deploy | ❌ |
| 7.6 | CI/CD | ❌ |

---

## Ringkasan Timeline Aktual

| Fase | Estimasi | Aktual | Status |
|------|----------|--------|--------|
| Fase 0: Foundation Awal | — | ✅ | Selesai |
| Fase 1: Foundation Inti | 2 hari | ✅ | Selesai |
| Fase 2: Modul Qurban | 3 hari | ✅ | Selesai (dummy) |
| Fase 3: Modul Zakat | 3 hari | ✅ | Selesai (dummy) |
| Fase 4: Blog | 2 hari | ✅ | Selesai (dummy) |
| Fase 5: User Management | 2 hari | ✅ | Selesai (dummy) |
| Fase 6: Dashboard & Polish | 2 hari | ✅ | Selesai (no API hooks) |
| Fase 7: Testing & Deploy | 2 hari | ❌ | Belum |
| **Total** | **16 hari** | **~2 hari** | **≈85% selesai** |

---

## Catatan MVP

- **Auth Guard**: Dashboard layout redirect ke `/login` jika tidak terautentikasi.
- **Data Dummy**: Semua data hardcoded di masing-masing page. Integrasi API menyusul.
- **Hooks**: `useQurban`, `useZakat`, `useBlog`, `useUsers` belum diimplementasikan.
- **TanStack Query**: `@tanstack/react-query` v5 terinstal, `QueryClientProvider` aktif, siap digunakan.
- **Zod Validation**: Belum ada — semua form pakai HTML `required`.
- **Service Layer**: `src/services/` belum ada — API calls langsung via `api-client.ts` (hanya digunakan di `auth.tsx`).
- **Pre-existing lint errors**: 5 errors tidak terkait modul baru (sidebar component creation, blog-admin setState in effect, `<a>` vs Link).
