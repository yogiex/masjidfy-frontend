# Struktur Folder – Masjidfy Frontend

Dokumen ini menjelaskan struktur direktori proyek Masjidfy Frontend, filosofi di balik organisasi kode, konvensi penamaan, dan panduan untuk pengembang saat menambahkan fitur baru.

---

## Filosofi

- **Modular & Terpisah per Tanggung Jawab** – Setiap folder memiliki peran jelas: routing, UI, logika data, state management, dan tipe data.
- **Route Group Next.js** – Memanfaatkan App Router untuk memisahkan halaman publik (tanpa autentikasi) dan dashboard (dengan autentikasi + sidebar) tanpa memengaruhi URL.
- **Lapisan Komponen** :
  - `ui/` : atom murni dari shadcn (tidak diubah manual).
  - `shared/` : molekul yang menggabungkan atom untuk use case berulang (DataTable, StatCard, OrgChart, dll).
  - `layout/` : organisme yang mengatur struktur halaman (sidebar, header, navbar publik).
- **Pemisahan Data & Tampilan** – Logika pengambilan data (TanStack Query) berada di `hooks/`, komponen hanya menerima props.
- **Konsistensi Tipe** – Semua tipe data dari API didefinisikan terpusat di `types/`, tidak ada definisi tipe duplikat di komponen.

---

## Struktur Tingkat Atas

```
masjidfy-frontend/
├── public/                     # Aset statis (gambar, font, dll.)
├── docs/                       # Dokumen analisis (PRD, SRS, API Contract, dll.)
├── src/                        # Kode sumber aplikasi
│   ├── app/                    # Rute Next.js (App Router)
│   ├── components/             # Komponen UI (ui, shared, layout)
│   ├── hooks/                  # Custom hook TanStack Query per modul (kosong — MVP dummy data)
│   ├── lib/                    # Utilitas, klien API, konteks auth, mock handler
│   ├── providers/              # Provider untuk QueryClient, Auth, Toaster
│   └── types/                  # Definisi tipe TypeScript (dari API contract)
├── components.json           # Konfigurasi shadcn/ui
├── eslint.config.mjs         # ESLint v9 flat config
├── next.config.ts            # Konfigurasi Next.js
├── postcss.config.mjs        # PostCSS (Tailwind v4)
├── tsconfig.json             # Konfigurasi TypeScript
└── package.json              # Dependensi proyek
```

---

## Rincian Direktori

### 1. `src/app/` – Routing & Halaman

Menggunakan **App Router** Next.js dengan struktur berbasis file.

```
src/app/
├── (public)/                   # Route Group: halaman tanpa autentikasi
│   ├── layout.tsx              # PublicLayout + PublicNavbar + PublicFooter
│   ├── page.tsx                # Landing page (hero, layanan, statistik, artikel, CTA)
│   ├── _components/
│   │   ├── hero-section.tsx    # Headline + ilustrasi + CTA
│   │   ├── services-section.tsx# Grid 4 layanan (Qurban, Zakat, Blog, Kalkulator)
│   │   ├── stats-section.tsx   # Angka statistik (150+ Jamaah, dll)
│   │   ├── latest-articles.tsx # 3 artikel terbaru (reuse BlogCard)
│   │   └── cta-section.tsx     # Background hijau, daftar gratis
│   ├── login/
│   │   └── page.tsx            # Login (two-column desktop, full mobile)
│   ├── register/
│   │   └── page.tsx            # Register (two-column desktop, full mobile)
│   ├── blog/
│   │   ├── page.tsx            # Daftar artikel (grid 3 kolom, pagination)
│   │   ├── loading.tsx         # Skeleton loading list
│   │   ├── [slug]/
│   │   │   ├── page.tsx        # Detail artikel + komentar + related
│   │   │   └── loading.tsx     # Skeleton loading detail
│   │   └── _components/
│   │       ├── blog-hero.tsx   # Hero banner blog
│   │       ├── comment-section.tsx # Form + daftar komentar
│   │       └── comment-item.tsx# Satu item komentar (nestable)
│   ├── kalkulator-zakat/
│   │   ├── page.tsx            # Kalkulator zakat (form + result + info)
│   │   └── _components/
│   │       ├── zakat-form.tsx  # Form: emas, perak, uang, dagang, piutang, utang
│   │       └── zakat-result.tsx# Hasil: nisab, aset, zakat wajib
│   └── tentang/
│       └── struktur-organisasi/
│           ├── page.tsx        # Bagan kepengurusan + bidang
│           └── _components/
│               └── bidang-detail-dialog.tsx # Modal detail anggota bidang
│
├── dashboard/                  # Route Group: halaman dengan autentikasi + sidebar
│   ├── layout.tsx              # Layout dashboard (Sidebar, Header, auth guard)
│   ├── page.tsx                # Dashboard home (role-aware StatCards)
│   ├── qurban/
│   │   ├── layout.tsx          # Sub-navigasi horizontal qurban
│   │   ├── my-registrations/
│   │   │   ├── page.tsx        # DataTable pendaftaran saya + Eye → detail
│   │   │   └── new/
│   │   │       ├── page.tsx    # Form pendaftaran baru (Card layout, 6 field)
│   │   │       └── _components/
│   │   │           └── registration-form.tsx
│   │   ├── registrations/
│   │   │   ├── page.tsx        # DataTable + filter (status/grup) + verify/cancel
│   │   │   ├── print/
│   │   │   │   └── page.tsx    # Cetak dengan PrintLayout + filter
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Detail dengan Tabs (Info, Pembayaran, Distribusi)
│   │   ├── payments/
│   │   │   ├── page.tsx        # DataTable pembayaran
│   │   │   └── _components/
│   │   │       └── payment-form-dialog.tsx
│   │   ├── animals/
│   │   │   ├── page.tsx        # DataTable hewan
│   │   │   └── _components/
│   │   │       └── animal-form-dialog.tsx
│   │   └── distributions/
│   │       ├── page.tsx        # DataTable distribusi
│   │       └── _components/
│   │           └── distribution-form-dialog.tsx  # Dropdown pilih hewan
│   ├── zakat/
│   │   ├── transactions/
│   │   │   ├── page.tsx        # DataTable + filter jenis + form dialog
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx    # Detail transaksi + info muzakki
│   │   │   └── _components/
│   │   │       └── transaction-form-dialog.tsx
│   │   ├── muzakkis/
│   │   │   ├── page.tsx        # DataTable muzakki
│   │   │   └── _components/
│   │   │       └── muzakki-form-dialog.tsx
│   │   ├── mustahiqs/
│   │   │   ├── page.tsx        # DataTable + asnaf filter + verify toggle
│   │   │   └── _components/
│   │   │       └── mustahiq-form-dialog.tsx
│   │   ├── distributions/
│   │   │   ├── page.tsx        # DataTable penyaluran
│   │   │   └── _components/
│   │   │       └── distribution-form-dialog.tsx  # Dropdown pilih mustahiq
│   │   └── reports/
│   │       └── page.tsx        # StatCards + breakdown per jenis (penerimaan/penyaluran/saldo)
│   ├── users/
│   │   ├── page.tsx            # DataTable + form dialog + delete confirm
│   │   └── _components/
│   │       └── user-form-dialog.tsx  # Add/edit user dengan role select
│   ├── roles/
│   │   ├── page.tsx            # DataTable + form dialog + permissions grid
│   │   └── _components/
│   │       └── role-form-dialog.tsx  # Add/edit role dengan permission checklist
│   ├── permissions/
│   │   └── page.tsx            # DataTable daftar semua permission
│   └── blog-admin/
│       ├── posts/
│       │   ├── page.tsx        # List posts (status filter)
│       │   ├── new/
│       │   │   └── page.tsx    # WYSIWYG + metabox + autosave
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx# Edit post (WYSIWYG + metabox)
│       ├── categories/
│       │   ├── page.tsx        # DataTable + category-dialog
│       │   └── _components/
│       │       └── category-dialog.tsx
│       ├── tags/
│       │   ├── page.tsx        # DataTable + tag-dialog
│       │   └── _components/
│       │       └── tag-dialog.tsx
│       └── comments/
│           └── page.tsx        # Approve/reject/delete + bulk actions
│
├── layout.tsx                  # Root layout (Providers, font, metadata)
└── globals.css                 # Styling global Tailwind + shadcn
```

**Aturan:**
- Setiap halaman adalah file `page.tsx` (atau `page.tsx` + komponen lokal di folder `_components/`).
- Halaman yang membutuhkan interaksi berat adalah **Client Component** (`"use client"`). Halaman publik statis bisa **Server Component** untuk SEO.
- Layout `dashboard/layout.tsx` menangani render sidebar + header + **auth guard** (redirect ke `/login` jika tidak terautentikasi).
- Layout `dashboard/qurban/layout.tsx` menangani sub-navigasi horizontal modul qurban.

### 2. `src/components/` – Komponen Reusable

```
src/components/
├── ui/                         # Komponen dasar dari shadcn (otomatis)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── sheet.tsx
│   ├── table.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── breadcrumb.tsx
│   ├── checkbox.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   ├── sonner.tsx
│   ├── tabs.tsx
│   └── textarea.tsx
├── layout/                     # Komponen pengatur tata letak utama
│   ├── sidebar.tsx             # Sidebar navigasi dashboard (collapsible, mobile sheet)
│   ├── header.tsx              # Header dashboard (breadcrumb, user menu, notifikasi)
│   ├── breadcrumb-nav.tsx      # Breadcrumb otomatis dari pathname
│   ├── public-navbar.tsx       # Navbar publik (dropdown Tentang, active link, mobile sheet)
│   └── public-footer.tsx       # Footer 3 kolom (Masjidfy, Tautan, Kontak)
└── shared/                     # Komponen molekul yang sering dipakai
    ├── data-table.tsx          # Tabel data generik + sorting + pagination + search
    ├── stat-card.tsx           # Kartu statistik (judul, nilai, ikon, warna)
    ├── empty-state.tsx         # Tampilan saat data kosong (ikon, pesan, aksi opsional)
    ├── service-card.tsx        # Kartu layanan (icon, title, description, link)
    ├── blog-card.tsx           # Kartu artikel (image, kategori, judul, author, date)
    ├── filter-bar.tsx          # Blog filter (kategori, search)
    ├── share-buttons.tsx       # Tombol share (WhatsApp, Facebook, Twitter, copy link)
    ├── masjid-silhouette.tsx   # SVG siluet masjid + bulan sabit
    ├── wysiwyg-editor.tsx      # TipTap editor (B/I/U/S, H1-H3, list, quote, code, table)
    ├── post-metabox.tsx        # Blog metabox (kategori, tags, featured image, status, jadwal)
    ├── org-chart.tsx           # Bagan organisasi 3 level + CSS connectors
    ├── org-node.tsx            # Satu node dalam bagan (jabatan + nama)
    ├── print-layout.tsx        # Layout cetak: header masjid, tabel, filter info, TTD, timestamp
    └── bidang-card.tsx         # Kartu bidang (icon, nama, ketua, jumlah anggota, detail)
```

**Aturan:**
- **Jangan ubah isi `ui/`** – kustomisasi dilakukan di `shared/` dengan membungkus komponen `ui/`.
- Semua komponen `shared/` harus menerima props `className` untuk ekstensi Tailwind.

### 3. `src/hooks/` – Custom Hook Data

```
src/hooks/
├── use-qurban.ts               # Hook untuk modul qurban ❌ (belum dibuat)
├── use-zakat.ts                # Hook untuk modul zakat ❌ (belum dibuat)
├── use-blog.ts                 # Hook untuk blog publik & admin ❌ (belum dibuat)
└── use-users.ts                # Hook untuk manajemen pengguna & role ❌ (belum dibuat)
```

**Status:** Kosong. MVP masih menggunakan dummy data lokal di masing-masing page. Setiap file akan mengekspor hook berbasis **TanStack Query** saat integrasi API dimulai:
- **`useQuery`** untuk operasi baca (GET) dengan caching otomatis.
- **`useMutation`** untuk operasi tulis (POST/PATCH/DELETE) dengan invalidasi query setelah sukses.

### 4. `src/lib/` – Utilitas & Konfigurasi Inti

```
src/lib/
├── api-client.ts               # Axios instance + interceptor (token, 401 handling)
├── auth.tsx                    # AuthContext, AuthProvider, useAuth hook
├── mock-handler.ts             # Mock API adapter (override axios untuk prototype)
├── roles.ts                    # Konstanta nama role dan helper `hasRole`
└── utils.ts                    # Fungsi utilitas (cn dari shadcn)
```

### 4a. Mock API Layer (`mock-handler.ts`)

Layer mock untuk prototype yang memungkinkan aplikasi berjalan tanpa backend nyata.

**Cara kerja:**
- `enableMockApi(apiClient)` dipanggil di `providers.tsx` saat inisialisasi
- Mengganti `apiClient.defaults.adapter` dengan fungsi custom
- Intercept request berdasarkan URL + method, lalu return response palsu
- Request yang tidak dikenal diteruskan ke axios adapter asli

**Endpoint yang di-mock:**

| Endpoint | Method | Response |
|---|---|---|
| `/auth/login` | POST | `{ accessToken: "mock-token-masjidfy-001" }` |
| `/auth/me` | GET | `AuthMeResponse` (superadmin + admin) |
| `/auth/register` | POST | `{ id, message }` (selalu sukses) |

**Credential testing:**
- Username: `admin@masjidfy.local`
- Password: `admin123`

**Catatan:** Mock handler hanya untuk auth flow. Semua halaman dashboard lain sudah menggunakan data dummy hardcoded via `useState` di masing-masing page — tidak perlu mock endpoint tambahan.

### 5. `src/providers/` – Client-Side Providers

```
src/providers/
└── providers.tsx               # QueryClientProvider + AuthProvider + Toaster
```

### 6. `src/types/` – Definisi Tipe

```
src/types/
└── index.ts                    # Semua interface TypeScript (Auth, User, Role, Permission, Qurban, Zakat, Blog, Pagination)
```

---

## Konvensi Penamaan File

- **File Komponen**: PascalCase, ekstensi `.tsx`. Untuk halaman Next.js, gunakan nama file khusus seperti `page.tsx`, `layout.tsx`.
- **File Hook**: camelCase dengan prefix `use-` (contoh: `use-qurban.ts`).
- **File Utilitas/Lib**: camelCase (contoh: `api-client.ts`, `roles.ts`).
- **Folder Modul di `app/`**: gunakan nama pendek dan deskriptif, hindari spasi.
- **Sub-komponen lokal di halaman**: letakkan di folder `_components/` di dalam rute yang sama. Awali folder dengan underscore agar tidak dianggap sebagai rute oleh Next.js.

---

## Cara Menambahkan Modul Baru

1. **Tentukan kebutuhan rute** – Apakah publik atau dashboard? Buat folder di `(public)/` atau `dashboard/` sesuai.
2. **Buat halaman** – `page.tsx` dengan komponen utama.
3. **Jika perlu komponen lokal** – Buat folder `_components/` di samping `page.tsx`.
4. **Tambah hook data** – Buat file baru di `hooks/` berisi `useQuery`/`useMutation` untuk endpoint terkait.
5. **Perbarui tipe** – Jika ada tipe data baru dari API, tambahkan ke `src/types/index.ts`.
6. **Perbarui sidebar** – Tambahkan item menu di konfigurasi `Sidebar.tsx`.
7. **Pastikan tidak melanggar aturan** – Gunakan komponen `shared/`, jangan ubah `ui/`, sertakan state loading/empty/error.

---

## Catatan Penting

- **Server vs Client Component**: Halaman blog publik sebaiknya Server Component untuk SEO. Dashboard sebagian besar Client Component karena butuh interaksi dan state.
- **Import Alias**: Selalu gunakan `@/` (misal `import { useAuth } from '@/lib/auth'`) sesuai konfigurasi di `tsconfig.json`.
- **Auth Guard**: Dashboard layout sudah memiliki pengecekan `isAuthenticated` — redirect ke `/login` jika belum login.
- **Data Dummy (MVP)**: Auth flow menggunakan mock handler (`mock-handler.ts`). Semua halaman dashboard menggunakan data hardcoded via `useState`. Integrasi API menyusul di fase berikutnya.
- **TanStack Query**: `@tanstack/react-query` v5 terinstal, `QueryClientProvider` sudah di setup di `providers.tsx`.
- **Zod Validation**: Belum ada — semua form masih pakai HTML `required`.

---

*Dengan mengikuti struktur ini, proyek tetap terorganisir, mudah dinavigasi, dan scalable seiring pertumbuhan fitur Masjidfy.*
