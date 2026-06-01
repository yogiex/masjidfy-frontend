```markdown
# Struktur Folder – Masjidfy Frontend

Dokumen ini menjelaskan struktur direktori proyek Masjidfy Frontend, filosofi di balik organisasi kode, konvensi penamaan, dan panduan untuk pengembang saat menambahkan fitur baru.

---

## Filosofi

- **Modular & Terpisah per Tanggung Jawab** – Setiap folder memiliki peran jelas: routing, UI, logika data, state management, dan tipe data.
- **Route Group Next.js** – Memanfaatkan App Router untuk memisahkan halaman publik (tanpa autentikasi) dan dashboard (dengan autentikasi + sidebar) tanpa memengaruhi URL.
- **Lapisan Komponen** :
  - `ui/` : atom murni dari shadcn (tidak diubah manual).
  - `shared/` : molekul yang menggabungkan atom untuk use case berulang (DataTable, StatCard, dll).
  - `layout/` : organisme yang mengatur struktur halaman (sidebar, header).
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
│   ├── hooks/                  # Custom hook TanStack Query per modul
│   ├── lib/                    # Utilitas, klien API, konteks auth, role helper
│   ├── providers/              # Provider untuk QueryClient, Auth, Toaster
│   └── types/                  # Definisi tipe TypeScript (dari API contract)
├── .env.local                  # Environment variable lokal
├── next.config.ts              # Konfigurasi Next.js
├── tailwind.config.ts          # Konfigurasi Tailwind CSS
├── tsconfig.json               # Konfigurasi TypeScript
└── package.json                # Dependensi proyek
```

---

## Rincian Direktori

### 1. `src/app/` – Routing & Halaman

Menggunakan **App Router** Next.js dengan struktur berbasis file.

```
src/app/
├── (public)/                   # Route Group: halaman tanpa autentikasi
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── blog/                   # (nanti) halaman blog publik
│       ├── page.tsx            # Daftar artikel
│       └── [slug]/
│           └── page.tsx        # Detail artikel
├── (dashboard)/                # Route Group: halaman dengan autentikasi + sidebar
│   ├── layout.tsx              # Layout dashboard (AuthGuard, Sidebar, Header)
│   ├── page.tsx                # Dashboard home (widget per role)
│   ├── qurban/
│   │   ├── registrations/
│   │   │   ├── page.tsx        # Daftar pendaftaran (admin/petugas)
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx    # Detail pendaftaran + tab
│   │   │   └── new/
│   │   │       └── page.tsx    # Form pendaftaran (jamaah/admin)
│   │   ├── my-registrations/
│   │   │   └── page.tsx        # Pendaftaran saya (jamaah)
│   │   ├── animals/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── payments/
│   │   │   └── ...
│   │   └── distributions/
│   │       └── ...
│   ├── zakat/
│   │   ├── transactions/
│   │   ├── muzakkis/
│   │   ├── mustahiqs/
│   │   ├── distributions/
│   │   └── reports/
│   ├── blog-admin/             # Manajemen blog (admin/penulis)
│   │   ├── posts/
│   │   ├── categories/
│   │   ├── tags/
│   │   └── comments/
│   ├── users/                  # Manajemen pengguna (admin)
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── new/
│   │       └── page.tsx
│   └── roles/                  # Manajemen role (superadmin)
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
├── layout.tsx                  # Root layout (Providers, font, metadata)
└── globals.css                 # Styling global Tailwind + shadcn
```

**Aturan:**
- Setiap halaman adalah file `page.tsx` (atau `page.tsx` + komponen lokal di folder `_components/`).
- Halaman yang membutuhkan interaksi berat adalah **Client Component** (`"use client"`). Halaman publik statis (blog) bisa **Server Component** untuk SEO.
- Layout `(dashboard)/layout.tsx` menangani pengecekan autentikasi dan render sidebar + header.

### 2. `src/components/` – Komponen Reusable

```
src/components/
├── ui/                         # Komponen dasar dari shadcn (otomatis)
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   └── ... (lengkap sesuai instalasi)
├── layout/                     # Komponen pengatur tata letak utama
│   ├── sidebar.tsx             # Sidebar navigasi dinamis berbasis role
│   ├── header.tsx              # Header dashboard (breadcrumb, user menu)
│   └── breadcrumb-nav.tsx      # Breadcrumb otomatis dari pathname
└── shared/                     # Komponen molekul yang sering dipakai
    ├── data-table.tsx          # Tabel data generik + pagination
    ├── stat-card.tsx           # Kartu statistik (judul, nilai, ikon, warna)
    └── empty-state.tsx         # Tampilan saat data kosong (ikon, pesan, aksi opsional)
```

**Aturan:**
- **Jangan ubah isi `ui/`** – kustomisasi dilakukan di `shared/` dengan membungkus komponen `ui/`.
- Semua komponen `shared/` harus menerima props `className` untuk ekstensi Tailwind dan menggunakan CVA jika memiliki varian.
- Komponen `layout/` hanya boleh digunakan di layout dashboard, bukan di halaman publik.

### 3. `src/hooks/` – Custom Hook Data

```
src/hooks/
├── use-qurban.ts               # Hook untuk modul qurban
├── use-zakat.ts                # Hook untuk modul zakat
├── use-blog.ts                 # Hook untuk blog publik & admin
└── use-users.ts                # Hook untuk manajemen pengguna & role
```

Setiap file mengekspor hook berbasis **TanStack Query**:
- **`useQuery`** untuk operasi baca (GET) dengan caching otomatis.
- **`useMutation`** untuk operasi tulis (POST/PATCH/DELETE) dengan invalidasi query setelah sukses.
- Hook menerima parameter filter/pagination dan mengembalikan `data`, `isLoading`, `error`, dll.

**Mengapa dipisah per modul?** Agar hook tetap kecil, mudah diuji, dan tidak saling bergantung.

### 4. `src/lib/` – Utilitas & Konfigurasi Inti

```
src/lib/
├── api-client.ts               # Axios instance + interceptor (token, 401 handling)
├── auth.tsx                    # AuthContext, AuthProvider, useAuth hook
├── roles.ts                    # Konstanta nama role dan helper `hasRole`
└── utils.ts                    # Fungsi utilitas (cn dari shadcn, format angka, tanggal, dll.)
```

- **`api-client.ts`**: Konfigurasi base URL dari `NEXT_PUBLIC_API_URL`, sisipkan token JWT dari `localStorage`, tangani respons 401 dengan redirect ke login.
- **`auth.tsx`**: Provider global untuk state user dan token, fungsi `login`, `logout`, dan `hasRole`.
- **`roles.ts`**: Daftar role sebagai string literal (`'jamaah'`, `'admin'`, dll.) untuk menghindari typo dan memudahkan pengecekan.

### 5. `src/providers/` – Client-Side Providers

```
src/providers/
└── providers.tsx               # Menggabungkan QueryClientProvider, AuthProvider, Toaster
```

Komponen ini diimpor di root layout `src/app/layout.tsx` untuk membungkus seluruh aplikasi. Di dalamnya:
- **`QueryClientProvider`** dari TanStack Query dengan konfigurasi default (staleTime, retry).
- **`AuthProvider`** dari `@/lib/auth`.
- **`Toaster`** dari Sonner untuk notifikasi toast.

### 6. `src/types/` – Definisi Tipe

```
src/types/
└── index.ts                    # Semua interface TypeScript dari API contract
```

Berisi tipe data yang mencerminkan response API (misal `User`, `QurbanRegistration`, `Animal`, `ZakatTransaction`, dll.). **Sumber kebenaran tunggal** – setiap komponen/hook yang membutuhkan tipe data API harus mengimpornya dari sini. Tidak boleh ada definisi tipe lokal yang duplikat.

---

## Konvensi Penamaan File

- **File Komponen**: PascalCase, ekstensi `.tsx` (contoh: `DataTable.tsx`, `Sidebar.tsx`). Untuk halaman Next.js, gunakan nama file khusus seperti `page.tsx`, `layout.tsx`.
- **File Hook**: camelCase dengan prefix `use-` (contoh: `use-qurban.ts`).
- **File Utilitas/Lib**: camelCase (contoh: `api-client.ts`, `roles.ts`).
- **Folder Modul di `app/`**: gunakan nama pendek dan deskriptif, hindari spasi (contoh: `my-registrations`, `blog-admin`).
- **Sub-komponen lokal di halaman**: letakkan di folder `_components/` di dalam rute yang sama (contoh: `app/(dashboard)/qurban/registrations/_components/RegistrationForm.tsx`). Awali folder dengan underscore agar tidak dianggap sebagai rute oleh Next.js.

---

## Cara Menambahkan Modul Baru

1. **Tentukan kebutuhan rute** – Apakah publik atau dashboard? Buat folder di `(public)/` atau `(dashboard)/` sesuai.
2. **Buat halaman** – `page.tsx` dengan komponen utama.
3. **Jika perlu komponen lokal** – Buat folder `_components/` di samping `page.tsx` untuk menyimpan komponen yang hanya digunakan di halaman tersebut.
4. **Tambah hook data** – Buat file baru di `hooks/` (contoh: `use-infaq.ts`) berisi `useQuery`/`useMutation` untuk endpoint terkait.
5. **Perbarui tipe** – Jika ada tipe data baru dari API, tambahkan ke `src/types/index.ts`.
6. **Perbarui sidebar** – Tambahkan item menu di konfigurasi `Sidebar.tsx` dengan filter role yang sesuai.
7. **Tulis test** – Unit test untuk hook, integration test untuk halaman, E2E untuk alur utama.
8. **Pastikan tidak melanggar aturan** – Gunakan komponen `shared/`, jangan ubah `ui/`, sertakan state loading/empty/error.

---

## Catatan Penting

- **Server vs Client Component**: Halaman blog publik sebaiknya Server Component untuk SEO. Dashboard sebagian besar Client Component karena butuh interaksi dan state. Jangan lupa tambahkan `"use client"` di baris pertama jika menggunakan hooks atau event handler.
- **Import Alias**: Selalu gunakan `@/` (misal `import { useAuth } from '@/lib/auth'`) sesuai konfigurasi di `tsconfig.json`.
- **Environment Variable**: Semua konfigurasi yang berbeda antar environment disimpan di `.env.local` (atau `.env.production`) dan diakses dengan `process.env.NEXT_PUBLIC_...`.

---

*Dengan mengikuti struktur ini, proyek tetap terorganisir, mudah dinavigasi, dan scalable seiring pertumbuhan fitur Masjidfy.*
```