# Milestone – Masjidfy Frontend

**Versi:** 2.0  
**Tanggal:** 1 Juni 2026  
**Total Estimasi:** ~16 hari kerja

---

## Fase 0: Foundation Awal ✅ (Selesai)

| Item | Detail | Status |
|------|--------|--------|
| Inisialisasi Next.js + TypeScript | next@16.2.6, react@19.2.4, typescript@5 | ✅ |
| Instalasi shadcn/ui & komponen dasar | 15 komponen: button, card, input, label, badge, dialog, sheet, skeleton, sonner, table, tabs, avatar, breadcrumb, dropdown-menu, separator | ✅ |
| Konfigurasi Tailwind CSS (Nova preset) | tailwindcss@4, `tw-animate-css` | ✅ |
| Setup axios instance | `src/lib/api-client.ts` — baseURL dari `NEXT_PUBLIC_API_URL`, request interceptor (sisip token), response interceptor (redirect 401) | ✅ |
| Definisi `roles.ts` & role helpers | `src/lib/roles.ts` — konstanta ROLES, `hasRole()`, `hasAnyRole()` | ✅ |
| Definisi semua tipe TypeScript | `src/types/index.ts` — Auth, User, Role, Qurban, Zakat, Blog + PaginationMeta, ApiResponse<T> | ✅ |

---

## Fase 1: Foundation Inti (2 hari)

### Tujuan
Membangun fondasi auth, routing, dan layout yang digunakan seluruh aplikasi.

### Daftar Lengkap File

| # | File | Baru/Modif | Priority |
|---|------|------------|----------|
| 1.0 | `.env.local` | Baru | 🔴 Critical |
| 1.1 | `src/lib/auth.tsx` | Baru | 🔴 Critical |
| 1.2 | `src/providers/providers.tsx` | Baru | 🔴 Critical |
| 1.3 | `src/app/layout.tsx` | Modif | 🔴 Critical |
| 1.4 | `src/app/(public)/layout.tsx` | Baru | 🔴 Critical |
| 1.5 | `src/app/(public)/login/page.tsx` | Baru | 🔴 Critical |
| 1.6 | `src/app/(public)/register/page.tsx` | Baru | 🟡 High |
| 1.7 | `src/app/(public)/kalkulator-zakat/page.tsx` | Baru | 🟢 Medium |
| 1.8 | `src/app/(dashboard)/layout.tsx` | Baru | 🔴 Critical |
| 1.9 | `src/app/(dashboard)/page.tsx` | Baru | 🟡 High |
| 1.10 | `src/components/layout/sidebar.tsx` | Baru | 🔴 Critical |
| 1.11 | `src/components/layout/header.tsx` | Baru | 🔴 Critical |
| 1.12 | `src/components/layout/breadcrumb-nav.tsx` | Baru | 🟡 High |
| 1.13 | `src/components/shared/empty-state.tsx` | Baru | 🟡 High |
| 1.14 | `src/components/shared/role-guard.tsx` | Baru | 🟡 High |

---

### Task Detail

#### 1.0 — Environment Variables
- **File**: `.env.local`
- **Isi**:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3000/api
  NEXT_PUBLIC_APP_NAME=Masjidfy
  ```

#### 1.1 — Auth Context & Provider
- **File**: `src/lib/auth.tsx`
- **Fungsi**:
  - `AuthProvider` — React context provider untuk state auth global
  - `useAuth()` — hook untuk akses context (throw error jika di luar provider)
- **State**:
  ```typescript
  interface AuthState {
    user: AuthMeResponse | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean; // true saat initial mount (restore session)
  }
  ```
- **Methods on context**:
  ```typescript
  interface AuthContextValue extends AuthState {
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    hasRole: (roleName: string) => boolean;
    hasAnyRole: (roleNames: string[]) => boolean;
  }
  ```
- **Flow login**:
  1. `POST /auth/login` dengan `{ username, password }`
  2. Simpan `accessToken` ke `localStorage`
  3. Fetch `GET /auth/me` untuk dapat data user + roles
  4. Simpan user ke state + `localStorage('user')`
  5. Set `isAuthenticated = true`
- **Flow logout**:
  1. Hapus `localStorage('accessToken')` dan `localStorage('user')`
  2. Set state user = null, token = null
  3. Redirect ke `/login`
- **Flow restore session** (on mount):
  1. Cek `localStorage('accessToken')`
  2. Jika ada, fetch `GET /auth/me`
  3. Jika sukses → restore user ke state
  4. Jika gagal (401) → clear localStorage, redirect ke `/login`
  5. Set `isLoading = false`
- **Error handling**: error login ditangani di komponen (throw, tidak di-swallow)
- **Zod**: tidak perlu di sini, cukup tipe dari `types/index.ts`

#### 1.2 — App Providers
- **File**: `src/providers/providers.tsx`
- **Komposisi**:
  ```typescript
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  </QueryClientProvider>
  ```
- **QueryClient config**:
  ```typescript
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 menit
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
  ```
- **Props**: `{ children: React.ReactNode }`
- **Toaster**: dari `sonner`, positioned `top-right`

#### 1.3 — Root Layout (Modifikasi)
- **File**: `src/app/layout.tsx`
- **Perubahan**:
  - Tambah import `Providers` dari `@/providers/providers`
  - Bungkus `{children}` dengan `<Providers>`
  - `<html lang="id">` (ubah dari "en")
  - Metadata title → `"Masjidfy"`, description → `"Platform manajemen masjid digital"`
  - `<body className="min-h-screen">`

#### 1.4 — Public Layout
- **File**: `src/app/(public)/layout.tsx`
- **Fungsi**: Layout minimal untuk halaman publik (login, register, blog, kalkulator)
- **Struktur**:
  ```typescript
  // Server Component (tidak perlu "use client")
  export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }
  ```
- **Styling**: center secara vertikal & horizontal, bg abu terang, max-width card

#### 1.5 — Halaman Login
- **File**: `src/app/(public)/login/page.tsx`
- **Role access**: Publik (tidak login)
- **Jika sudah login**: redirect ke `/dashboard`
- **UI Components**: `ui/card`, `ui/button`, `ui/input`, `ui/label`, `ui/skeleton`
- **Form (react-hook-form + Zod)**:
  ```typescript
  const loginSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
  });
  type LoginFormData = z.infer<typeof loginSchema>;
  ```
- **Layout** (dari atas ke bawah):
  1. Logo/title "Masjidfy" — text-2xl font-bold text-center
  2. Subtitle "Masuk ke akun Anda" — text-muted-foreground
  3. Card dengan shadow:
     - Field: Username/Email (input dengan label)
     - Field: Password (input type="password" dengan label)
     - Tombol "Masuk" (full width, loading state)
  4. Link "Belum punya akun? Daftar" → `/register`
- **States**:
  | State | UI |
  |-------|-----|
  | Default | Form kosong, tombol "Masuk" |
  | Loading | Tombol disabled + spinner "Memproses..." |
  | Error | Toast sonner "Username atau password salah" |
  | Success | Redirect ke `/dashboard`, toast "Selamat datang, {fullName}!" |
- **Data Flow**:
  ```
  User submit form
    → useAuth().login({ username, password })
    → POST /api/auth/login → { accessToken, user }
    → simpan accessToken di localStorage
    → GET /api/auth/me → AuthMeResponse (full user + roles)
    → set state auth
    → router.push('/dashboard')
  ```

#### 1.6 — Halaman Register
- **File**: `src/app/(public)/register/page.tsx`
- **Role access**: Publik
- **UI Components**: sama seperti login (card, button, input, label)
- **Form (Zod)**:
  ```typescript
  const registerSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
  });
  ```
- **Flow**:
  1. Submit → `POST /api/auth/register`
  2. Success (201) → toast "Pendaftaran berhasil, silakan login" → redirect `/login`
  3. Error → toast dengan pesan dari server (misal "Username sudah digunakan")
- **Link**: "Sudah punya akun? Masuk" → `/login`

#### 1.7 — Dashboard Layout
- **File**: `src/app/(dashboard)/layout.tsx`
- **Fungsi**: Layout untuk semua halaman dashboard (butuh auth)
- **Komponen**:
  - `AuthGuard` — Cek `isAuthenticated` + `isLoading` dari useAuth
  - `Sidebar` — Navigasi samping, responsive (sheet di mobile)
  - `Header` — Top bar dengan breadcrumb + user menu
  - `<main>` — Content area dengan padding
- **Structure**:
  ```typescript
  "use client";
  export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // Cek auth + loading
    // Jika loading → Skeleton (full page)
    // Jika tidak auth → redirect /login
    // Jika auth → render sidebar + header + main
  }
  ```
- **States**:
  | State | UI |
  |-------|-----|
  | Loading auth | Full-page skeleton (sidebar placeholder + content placeholder) |
  | Not authenticated | Redirect ke `/login` |
  | Authenticated | Sidebar + Header + Content |

#### 1.8 — Sidebar Component
- **File**: `src/components/layout/sidebar.tsx`
- **Props**:
  ```typescript
  interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }
  ```
- **Menu items** (hardcoded, difilter per role):
  ```typescript
  interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
    roles: RoleName[]; // role yang bisa melihat menu ini
    children?: SidebarItem[]; // submenu
  }
  ```
- **Menu structure**:
  | Menu | Icon | Roles |
  |------|------|-------|
  | Beranda | LayoutDashboard | Semua |
  | Pendaftaran Saya | ClipboardList | jamaah |
  | Qurban | | admin, petugas_qurban, bendahara |
  | ├ Pendaftaran | ClipboardCheck | admin, petugas_qurban |
  | ├ Hewan | PawPrint | admin, petugas_qurban |
  | ├ Pembayaran | Wallet | bendahara |
  | └ Distribusi | Share2 | admin, petugas_qurban |
  | Zakat | | admin, petugas_zakat, bendahara |
  | ├ Transaksi | ArrowRightLeft | admin, petugas_zakat, bendahara |
  | ├ Muzakki | UserPlus | admin, petugas_zakat, bendahara |
  | ├ Mustahiq | Users | admin, petugas_zakat |
  | ├ Penyaluran | HandCoins | admin, petugas_zakat, bendahara |
  | └ Laporan | FileBarChart | bendahara, admin |
  | Blog | | admin, penulis |
  | ├ Postingan | FileText | admin, penulis |
  | ├ Kategori | Tags | admin, penulis |
  | └ Komentar | MessageSquare | admin |
  | Pengguna | Users | admin, superadmin |
  | Role & Permission | Shield | superadmin |
- **Responsive**:
  - Desktop (>1024px): sidebar permanent (w-64)
  - Mobile (<768px): sheet/drawer (overlay)
  - Tablet (768-1024px): collapsible atau sheet
- **Active state**: highlight menu berdasarkan pathname

#### 1.9 — Header Component
- **File**: `src/components/layout/header.tsx`
- **Props**:
  ```typescript
  interface HeaderProps {
    onMenuToggle: () => void; // untuk mobile toggle sidebar
  }
  ```
- **Elements** (left to right):
  1. Hamburger button (mobile only) — `onMenuToggle`
  2. Breadcrumb (`breadcrumb-nav.tsx`)
  3. Spacer (flex-1)
  4. User dropdown menu:
     - Avatar + nama
     - "Profil Saya" link
     - Separator
     - "Keluar" button → logout
- **Styling**: `sticky top-0 z-40`, border bottom, bg putih

#### 1.10 — Breadcrumb Nav
- **File**: `src/components/layout/breadcrumb-nav.tsx`
- **Fungsi**: Generate breadcrumb otomatis dari `pathname`
- **Mapping path ke label**:
  ```
  /dashboard          → Beranda
  /dashboard/qurban/... → Qurban > ...
  /dashboard/zakat/...  → Zakat > ...
  ```
- **Props**: none (self-contained, baca dari `usePathname()`)
- **UI**: `ui/breadcrumb` dari shadcn

#### 1.11 — Halaman Dashboard (Beranda)
- **File**: `src/app/(dashboard)/page.tsx`
- **Role**: Semua role
- **UI**:
  - Greeting: "Selamat datang, {fullName}" dengan avatar
  - Grid StatCard (2 kolom desktop, 1 kolom mobile) — placeholder dulu
  - Setiap card: judul, nilai "—", ikon abu-abu (data belum ada sampai Fase 6)
- **States**:
  | State | UI |
  |-------|-----|
  | Loading | Skeleton grid (4 card placeholder) |
  | Ready | Greeting + StatCard placeholders |

#### 1.12 — EmptyState Component
- **File**: `src/components/shared/empty-state.tsx`
- **Props**:
  ```typescript
  interface EmptyStateProps {
    icon?: LucideIcon;       // default: Inbox
    title: string;           // "Belum ada data"
    description?: string;    // "Belum ada pendaftaran qurban"
    action?: {
      label: string;         // "Daftar Baru"
      onClick: () => void;
    };
    className?: string;      // untuk ekstensi Tailwind
  }
  ```
- **CVA**: none (tidak perlu varian)
- **UI**: Centered layout, icon large + muted, title, description, optional button

#### 1.13 — RoleGuard Component
- **File**: `src/components/shared/role-guard.tsx`
- **Props**:
  ```typescript
  interface RoleGuardProps {
    roles: string[];           // role yang diizinkan
    fallback?: React.ReactNode; // optional: tampilkan jika tidak punya akses
    children: React.ReactNode;
  }
  ```
- **Behavior**: Jika user tidak punya role → fallback atau null (jika fallback tidak ada)

---

## Fase 2: Modul Qurban (3 hari)

### Tujuan
CRUD pendaftaran qurban, verifikasi, hewan, pembayaran, dan distribusi.

### Daftar Lengkap File

| # | File | Priority |
|---|------|----------|
| 2.0 | `src/hooks/use-qurban.ts` | 🔴 Critical |
| 2.1 | `src/components/shared/data-table.tsx` | 🔴 Critical |
| 2.2 | `src/app/(dashboard)/qurban/my-registrations/page.tsx` | 🟡 High |
| 2.3 | `src/app/(dashboard)/qurban/my-registrations/_components/registration-form.tsx` | 🔴 Critical |
| 2.4 | `src/app/(dashboard)/qurban/my-registrations/new/page.tsx` | 🔴 Critical |
| 2.5 | `src/app/(dashboard)/qurban/registrations/page.tsx` | 🔴 Critical |
| 2.6 | `src/app/(dashboard)/qurban/registrations/[id]/page.tsx` | 🟡 High |
| 2.7 | `src/app/(dashboard)/qurban/animals/page.tsx` | 🟡 High |
| 2.8 | `src/app/(dashboard)/qurban/animals/new/page.tsx` | 🟢 Medium |
| 2.9 | `src/app/(dashboard)/qurban/animals/[id]/page.tsx` | 🟢 Medium |
| 2.10 | `src/app/(dashboard)/qurban/payments/new/page.tsx` | 🟡 High |
| 2.11 | `src/app/(dashboard)/qurban/payments/page.tsx` | 🟡 High |
| 2.12 | `src/app/(dashboard)/qurban/distributions/new/page.tsx` | 🟢 Medium |
| 2.13 | `src/app/(dashboard)/qurban/distributions/page.tsx` | 🟢 Medium |

### Task Detail

#### 2.0 — Hook Qurban
- **File**: `src/hooks/use-qurban.ts`
- **Query keys**:
  ```typescript
  const QURBAN_KEYS = {
    all: ['qurban'] as const,
    registrations: (params?: Record<string, unknown>) => ['qurban', 'registrations', params] as const,
    myRegistrations: (params?: Record<string, unknown>) => ['qurban', 'my-registrations', params] as const,
    registration: (id: string) => ['qurban', 'registrations', id] as const,
    animals: (params?: Record<string, unknown>) => ['qurban', 'animals', params] as const,
    animal: (id: string) => ['qurban', 'animals', id] as const,
    payments: (registrationId: string) => ['qurban', 'payments', registrationId] as const,
    distributions: (animalId: string) => ['qurban', 'distributions', animalId] as const,
  };
  ```
- **Hooks to export**:
  | Hook | Method | Endpoint | Return |
  |------|--------|----------|--------|
  | `useQurbanRegistrations(params)` | GET | `/qurban/registrations` | `{ data, meta, isLoading, error }` |
  | `useMyQurbanRegistrations(params)` | GET | `/qurban/my-registrations` | `{ data, meta, isLoading, error }` |
  | `useQurbanRegistration(id)` | GET | `/qurban/registrations/:id` | `{ data, isLoading, error }` |
  | `useCreateQurbanRegistration()` | POST | `/qurban/registrations` | mutation |
  | `useVerifyQurbanRegistration()` | PATCH | `/qurban/registrations/:id/status` | mutation |
  | `useAnimals(params)` | GET | `/qurban/animals` | `{ data, meta, isLoading, error }` |
  | `useAnimal(id)` | GET | `/qurban/animals/:id` | `{ data, isLoading, error }` |
  | `useCreateAnimal()` | POST | `/qurban/animals` | mutation |
  | `useUpdateAnimal()` | PATCH | `/qurban/animals/:id` | mutation |
  | `useDeleteAnimal()` | DELETE | `/qurban/animals/:id` | mutation |
  | `useCreatePayment()` | POST | `/qurban/payments` | mutation |
  | `usePayments(registrationId)` | GET | `/qurban/registrations/:id/payments` | `{ data, isLoading }` |
  | `useCreateDistribution()` | POST | `/qurban/distributions` | mutation |
  | `useDistributions(animalId)` | GET | `/qurban/animals/:id/distributions` | `{ data, isLoading }` |
- **Return types**: semua di-wrap `ApiResponse<T>`, error dari interceptor

#### 2.1 — DataTable Shared Component
- **File**: `src/components/shared/data-table.tsx`
- **Props**:
  ```typescript
  interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    meta?: PaginationMeta;
    isLoading?: boolean;
    onPageChange?: (page: number) => void;
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: { label: string; onClick: () => void };
    className?: string;
  }

  interface Column<T> {
    key: string;
    header: string;
    render: (item: T) => React.ReactNode;
    sortable?: boolean;
    className?: string;
  }
  ```
- **CVA**: none
- **UI Components**: `ui/table`, `ui/input` (search), `ui/button` (pagination)
- **States**:
  | State | UI |
  |-------|-----|
  | Loading | Skeleton table (5 baris) |
  | Empty | EmptyState component |
  | Error | Toast + retry button |
  | Data | Table dengan data + pagination |

#### 2.2 — My Registrations Page (Jamaah)
- **File**: `/dashboard/qurban/my-registrations/page.tsx`
- **Role**: `jamaah`
- **Endpoint**: `GET /qurban/my-registrations?page=1&limit=10`
- **UI**: DataTable dengan columns:
  | Column | Render |
  |--------|--------|
  | Peserta | `participant_name` |
  | Hewan | `animal_type` → badge "Sapi"/"Kambing" |
  | Status | Badge warna (pending=amber, verified=green, cancelled=red) |
  | Pembayaran | status pembayaran + jumlah |
  | Aksi | Button "Detail" link ke `[id]` |
- **Action button**: "Daftar Baru" → `/qurban/my-registrations/new`
- **States**: DataTable states (loading skeleton, empty, error)

#### 2.3 — Registration Form Component
- **File**: `_components/registration-form.tsx`
- **Props**:
  ```typescript
  interface RegistrationFormProps {
    onSuccess?: () => void;
  }
  ```
- **Zod schema**:
  ```typescript
  const registrationSchema = z.object({
    participant_name: z.string().min(1, "Nama peserta wajib diisi"),
    group_name: z.string().optional(),
    contact_phone: z.string().min(10, "Nomor telepon tidak valid"),
    animal_type: z.enum(["cow", "goat"], { required_error: "Pilih jenis hewan" }),
    amount: z.number().min(1, "Jumlah pembayaran wajib diisi"),
    method: z.enum(["cash", "transfer"], { required_error: "Pilih metode" }),
  });
  ```
- **UI**: `ui/form`, `ui/input`, `ui/select` (atau combobox), `ui/button`

#### 2.4 — New Registration Page
- **File**: `/dashboard/qurban/my-registrations/new/page.tsx`
- **Role**: `jamaah`
- **Fungsi**: Wrapper untuk `RegistrationForm`, handle redirect + toast setelah submit

#### 2.5 — All Registrations Page (Admin/Petugas)
- **File**: `/dashboard/qurban/registrations/page.tsx`
- **Role**: `admin`, `petugas_qurban`
- **Endpoint**: `GET /qurban/registrations?page&limit&status&search`
- **UI**: DataTable + filter tabs (Semua/Pending/Verified/Cancelled) + search

#### 2.6 — Registration Detail Page
- **File**: `/dashboard/qurban/registrations/[id]/page.tsx`
- **Role**: `admin`, `petugas_qurban`, `jamaah` (pemilik)
- **UI**: Tabs (shadcn `ui/tabs`):
  - **Informasi**: Detail pendaftaran (Card)
  - **Pembayaran**: Riwayat pembayaran + tombol "Catat Pembayaran" (jika role bendahara/admin)
  - **Distribusi**: Data distribusi (jika hewan sudah disembelih)

#### 2.7 — Animals Management
- **File**: `/dashboard/qurban/animals/page.tsx`
- **Role**: `admin`, `petugas_qurban`
- **UI**: DataTable (jenis, berat, harga, sumber, tanggal potong, aksi)

#### 2.8-2.13 — CRUD pages for animals, payments, distributions
- Pola yang konsisten: DataTable untuk daftar, Form untuk create/edit, Detail untuk view

---

## Fase 3: Modul Zakat (3 hari)

### Tujuan
Transaksi ZIS, manajemen muzakki & mustahiq, penyaluran, laporan, kalkulator.

### Daftar Lengkap File

| # | File | Priority |
|---|------|----------|
| 3.0 | `src/hooks/use-zakat.ts` | 🔴 Critical |
| 3.1 | `src/app/(dashboard)/zakat/transactions/page.tsx` | 🔴 Critical |
| 3.2 | `src/app/(dashboard)/zakat/transactions/new/page.tsx` | 🔴 Critical |
| 3.3 | `src/app/(dashboard)/zakat/transactions/[id]/page.tsx` | 🟡 High |
| 3.4 | `src/app/(dashboard)/zakat/muzakkis/page.tsx` | 🟡 High |
| 3.5 | `src/app/(dashboard)/zakat/muzakkis/new/page.tsx` | 🟡 High |
| 3.6 | `src/app/(dashboard)/zakat/muzakkis/[id]/page.tsx` | 🟡 High |
| 3.7 | `src/app/(dashboard)/zakat/mustahiqs/page.tsx` | 🟡 High |
| 3.8 | `src/app/(dashboard)/zakat/mustahiqs/new/page.tsx` | 🟢 Medium |
| 3.9 | `src/app/(dashboard)/zakat/distributions/page.tsx` | 🟡 High |
| 3.10 | `src/app/(dashboard)/zakat/distributions/new/page.tsx` | 🟡 High |
| 3.11 | `src/app/(dashboard)/zakat/reports/page.tsx` | 🟡 High |
| 3.12 | `src/app/(public)/kalkulator-zakat/page.tsx` | 🟢 Medium |

### Task Detail

#### 3.0 — Hook Zakat
- **File**: `src/hooks/use-zakat.ts`
- **Query keys**: `['zakat', 'transactions', params]`, `['zakat', 'muzakkis', params]`, dll.
- **Hooks**:
  | Hook | Endpoint |
  |------|----------|
  | `useZakatTransactions(params)` | `GET /zakat/transactions` |
  | `useZakatTransaction(id)` | `GET /zakat/transactions/:id` |
  | `useCreateZakatTransaction()` | `POST /zakat/transactions` |
  | `useUpdateZakatTransaction()` | `PATCH /zakat/transactions/:id` |
  | `useDeleteZakatTransaction()` | `DELETE /zakat/transactions/:id` |
  | `useMuzakkis(params)` | `GET /zakat/muzakkis` |
  | `useMuzakki(id)` | `GET /zakat/muzakkis/:id` |
  | `useCreateMuzakki()` | `POST /zakat/muzakkis` |
  | `useUpdateMuzakki()` | `PATCH /zakat/muzakkis/:id` |
  | `useDeleteMuzakki()` | `DELETE /zakat/muzakkis/:id` |
  | `useMustahiqs(params)` | `GET /zakat/mustahiqs` |
  | `useCreateMustahiq()` | `POST /zakat/mustahiqs` |
  | `useVerifyMustahiq()` | `PATCH /zakat/mustahiqs/:id/verify` |
  | `useCreateDistribution()` | `POST /zakat/distributions` |
  | `useDistributions(params)` | `GET /zakat/distributions` |
  | `useZakatReport(year, month?)` | `GET /zakat/reports` |
  | `useZakatCalculator()` | `POST /zakat/calculator` |

#### 3.1 — Transactions List
- **File**: `/dashboard/zakat/transactions/page.tsx`
- **Role**: `bendahara`, `admin`, `petugas_zakat`
- **UI**: DataTable + filter (tabs: Semua/Zakat Fitrah/Zakat Maal/Infaq/Sedekah/Fidyah) + date range filter
- **Columns**: Type (badge), Amount (format Rupiah), Date, Method, Muzakki, Actions

#### 3.2 — New Transaction
- **File**: `/dashboard/zakat/transactions/new/page.tsx`
- **Zod schema**:
  ```typescript
  const transactionSchema = z.object({
    type: z.enum(["zakat_fitrah", "zakat_maal", "infaq", "sedekah", "fidyah"]),
    amount: z.number().min(1, "Jumlah wajib diisi"),
    transactionDate: z.string().min(1, "Tanggal wajib diisi"),
    method: z.enum(["cash", "transfer"]),
    muzakkiId: z.string().optional(),
    notes: z.string().optional(),
  });
  ```
- **UI**: Form dengan select untuk type & method, input number untuk amount, date picker

#### 3.3-3.10 — CRUD pages for muzakki, mustahiq, distributions
- Pola konsisten: DataTable + Form + Detail

#### 3.11 — Zakat Report
- **File**: `/dashboard/zakat/reports/page.tsx`
- **Role**: `bendahara`, `admin`
- **UI**:
  - Filter: year (select), month (select optional)
  - Summary cards: Total Penerimaan, Total Penyaluran, Saldo
  - Detail table per jenis zakat
- **States**: loading skeleton, empty (pilih tahun), error

#### 3.12 — Kalkulator Zakat (Public)
- **File**: `src/app/(public)/kalkulator-zakat/page.tsx`
- **Role**: Publik (tanpa login)
- **UI**: Form sederhana tanpa layout dashboard
- **Fields**: emas (gram), perak (gram), uang tunai (IDR), barang dagangan, piutang, hutang
- **Flow**:
  1. User isi form
  2. Submit `POST /zakat/calculator`
  3. Tampilkan hasil: nisab, total harta, hutang, harta bersih, zakat yang harus dibayar, status wajib/tidak

---

## Fase 4: Blog (2 hari)

### Tujuan
Public blog + admin panel + moderasi komentar.

### Daftar Lengkap File

| # | File | Priority |
|---|------|----------|
| 4.0 | `src/hooks/use-blog.ts` | 🔴 Critical |
| 4.1 | `src/app/(public)/blog/page.tsx` | 🟡 High |
| 4.2 | `src/app/(public)/blog/[slug]/page.tsx` | 🟡 High |
| 4.3 | `src/app/(dashboard)/blog-admin/posts/page.tsx` | 🔴 Critical |
| 4.4 | `src/app/(dashboard)/blog-admin/posts/new/page.tsx` | 🔴 Critical |
| 4.5 | `src/app/(dashboard)/blog-admin/posts/[id]/page.tsx` | 🟡 High |
| 4.6 | `src/app/(dashboard)/blog-admin/categories/page.tsx` | 🟢 Medium |
| 4.7 | `src/app/(dashboard)/blog-admin/tags/page.tsx` | 🟢 Medium |
| 4.8 | `src/app/(dashboard)/blog-admin/comments/page.tsx` | 🟢 Medium |

### Task Detail

#### 4.0 — Hook Blog
- **File**: `src/hooks/use-blog.ts`
- **Query keys**: `['blog', 'posts', params]`, `['blog', 'post', slug]`, `['admin-blog', 'posts', params]`
- **Hooks publik**: `useBlogPosts(params)`, `useBlogPost(slug)`, `useBlogComments(slug)`, `useCreateComment()`
- **Hooks admin**: `useAdminPosts(params)`, `useCreatePost()`, `useUpdatePost()`, `useDeletePost()`, `useCategories()`, `useTags()`, `useComments()`, `useModerateComment()`

#### 4.1 — Public Blog List
- **File**: `src/app/(public)/blog/page.tsx`
- **Bisa Server Component** (SEO) atau Client Component (jika perlu filter interaktif)
- **UI**: Grid artikel (card: gambar, judul, excerpt, penulis, tanggal)

#### 4.2 — Public Blog Detail
- **File**: `src/app/(public)/blog/[slug]/page.tsx`
- **UI**: Konten penuh, kategori, tags, komentar (nested)
- **Form komentar**: hanya untuk user login

#### 4.3 — Admin Blog Posts
- **File**: `/dashboard/blog-admin/posts/page.tsx`
- **UI**: DataTable (judul, status badge, penulis, tanggal, aksi)
- **Status tabs**: Semua/Draft/Published/Archived

#### 4.4 — New Post
- **File**: `/dashboard/blog-admin/posts/new/page.tsx`
- **Form**: judul, slug (auto dari judul), konten (textarea atau rich text sederhana), excerpt, gambar utama, kategori, tags, status

#### 4.5-4.8 — Category, Tag, Comment management
- Pola konsisten: DataTable + Dialog untuk create/edit

---

## Fase 5: User Management (2 hari)

### Tujuan
CRUD user, role, dan permission (admin/superadmin).

### Daftar Lengkap File

| # | File | Priority |
|---|------|----------|
| 5.0 | `src/hooks/use-users.ts` | 🔴 Critical |
| 5.1 | `src/app/(dashboard)/users/page.tsx` | 🔴 Critical |
| 5.2 | `src/app/(dashboard)/users/new/page.tsx` | 🟡 High |
| 5.3 | `src/app/(dashboard)/users/[id]/page.tsx` | 🟡 High |
| 5.4 | `src/app/(dashboard)/roles/page.tsx` | 🟡 High |
| 5.5 | `src/app/(dashboard)/roles/[id]/page.tsx` | 🟡 High |
| 5.6 | `src/app/(dashboard)/permissions/page.tsx` | 🟢 Medium |

### Task Detail

#### 5.0 — Hook Users
- **File**: `src/hooks/use-users.ts`
- **Hooks**:
  | Hook | Endpoint |
  |------|----------|
  | `useUsers(params)` | `GET /users` |
  | `useUser(id)` | `GET /users/:id` |
  | `useCreateUser()` | `POST /users` |
  | `useUpdateUser()` | `PATCH /users/:id` |
  | `useDeleteUser()` | `DELETE /users/:id` (soft delete) |
  | `useAssignRole()` | `POST /users/:id/roles` |
  | `useRoles()` | `GET /roles` |
  | `useCreateRole()` | `POST /roles` |
  | `useUpdateRole()` | `PATCH /roles/:id` |
  | `useDeleteRole()` | `DELETE /roles/:id` |
  | `usePermissions()` | `GET /permissions` |

#### 5.1 — Users List
- **File**: `/dashboard/users/page.tsx`
- **Role**: `admin`, `superadmin`
- **UI**: DataTable (username, nama, email, status badge aktif/nonaktif, role badges, aksi)
- **Filter**: search (nama/username/email), role select, status toggle

#### 5.2-5.3 — Create/Edit User
- **Zod schema**:
  ```typescript
  const userSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).optional(), // optional on edit
    fullName: z.string().min(1),
    phone: z.string().optional(),
    address: z.string().optional(),
    role_ids: z.array(z.string().uuid()).min(1, "Pilih minimal 1 role"),
  });
  ```

#### 5.4 — Roles List
- **File**: `/dashboard/roles/page.tsx`
- **Role**: `superadmin`
- **UI**: DataTable + dialog untuk create/edit
- **Columns**: Nama role, deskripsi, jumlah user, permission list

#### 5.5 — Role Detail
- **File**: `/dashboard/roles/[id]/page.tsx`
- **UI**: Form edit role (name, description) + permission checklist (dari `usePermissions()`)

#### 5.6 — Permissions List
- **File**: `/dashboard/permissions/page.tsx`
- **Role**: `superadmin`
- **UI**: View-only table (resource, action, name) — no CRUD

---

## Fase 6: Dashboard & Polish (2 hari)

### Tujuan
Widget dashboard peran, responsive refinement, error handling global.

### Daftar Lengkap File

| # | File | Priority |
|---|------|----------|
| 6.0 | `src/components/shared/stat-card.tsx` | 🟡 High |
| 6.1 | `src/app/(dashboard)/page.tsx` (modifikasi) | 🟡 High |
| 6.2 | `src/components/layout/sidebar.tsx` (modifikasi) | 🔴 Critical |
| 6.3 | `src/app/error.tsx` (Error Boundary) | 🟡 High |

### Task Detail

#### 6.0 — StatCard Component
- **File**: `src/components/shared/stat-card.tsx`
- **Props**:
  ```typescript
  interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    trend?: { value: number; isUp: boolean };
    isLoading?: boolean;
    className?: string;
  }
  ```
- **CVA** untuk variant warna:
  ```typescript
  const cardVariants = cva("...", {
    variants: {
      variant: {
        default: "border-border",
        success: "border-green-200 bg-green-50",
        warning: "border-amber-200 bg-amber-50",
        danger: "border-red-200 bg-red-50",
        info: "border-blue-200 bg-blue-50",
      },
    },
    defaultVariants: { variant: "default" },
  });
  ```
- **States**: loading skeleton, value, trend arrow

#### 6.1 — Dashboard Widgets
- **File**: `src/app/(dashboard)/page.tsx` (modifikasi dari placeholder)
- **Jamaah**: 4 StatCards (Pendaftaran Aktif, Status Pembayaran, Artikel Terbaru, Kalkulator Zakat)
- **Petugas**: 4 StatCards (Pending Registrations, Jadwal Potong, Stok Hewan, Distribusi Hari Ini)
- **Bendahara**: 4 StatCards (Penerimaan ZIS Bulan Ini, Pembayaran Qurban, Saldo, Laporan)
- **Admin**: 4 StatCards (User Aktif, Blog Posts, Komentar Pending, Quran Registrations)

#### 6.2 — Mobile Responsive
- Sidebar → Sheet (drawer dari kiri) pada mobile
- DataTable → horizontal scroll pada mobile
- Form → full width pada mobile
- Grid → 1 column pada mobile, 2 pada tablet, 3-4 pada desktop

#### 6.3 — Error Boundary
- **File**: `src/app/error.tsx`
- **UI**: "Terjadi kesalahan" + ilustrasi + tombol "Coba Lagi"
- Client component error boundary

---

## Fase 7: Testing & Deploy (2 hari)

### Tujuan
Unit test, integration test, E2E, deploy ke Vercel, monitoring.

### Daftar Task

| # | Task | Detail | Priority |
|---|------|--------|----------|
| 7.1 | Unit Test Hooks | Mock apiClient, test query keys, test mutation invalidate | 🔴 Critical |
| 7.2 | Unit Test Utils | `hasRole()`, `cn()`, format functions | 🟡 High |
| 7.3 | Integration Test Pages | Render + mock API + user interaction | 🔴 Critical |
| 7.4 | E2E Auth | Register → Login → Logout → Protected Routes | 🔴 Critical |
| 7.5 | E2E Qurban | Jamaah daftar qurban, admin verifikasi, bendahara bayar | 🟡 High |
| 7.6 | E2E Zakat | Transaksi, muzakki, mustahiq, penyaluran | 🟡 High |
| 7.7 | Lighthouse Audit | Score ≥ 90 untuk Accessibility | 🟡 High |
| 7.8 | Vercel Deploy | Environment variables, build settings, domain | 🔴 Critical |
| 7.9 | CI/CD | GitHub Actions: lint → test → build | 🟡 High |

### Teknologi Testing
- **Framework**: Vitest (unit/integration)
- **Rendering**: React Testing Library
- **E2E**: Playwright
- **Coverage target**: ≥ 70%

---

## Ringkasan Timeline

| Fase | Durasi | Total Kumulatif |
|------|--------|-----------------|
| Fase 1: Foundation Inti | 2 hari | Hari 1–2 |
| Fase 2: Modul Qurban | 3 hari | Hari 3–5 |
| Fase 3: Modul Zakat | 3 hari | Hari 6–8 |
| Fase 4: Blog | 2 hari | Hari 9–10 |
| Fase 5: User Management | 2 hari | Hari 11–12 |
| Fase 6: Dashboard & Polish | 2 hari | Hari 13–14 |
| Fase 7: Testing & Deploy | 2 hari | Hari 15–16 |
| **Total** | **16 hari** | |

---

## Dependency Graph

```
Fase 1 (Foundation) ──▶ selesai duluan
  ├── Fase 2 (Qurban) ─── butuh: DataTable, layout dashboard
  ├── Fase 3 (Zakat) ──── butuh: DataTable, layout dashboard
  ├── Fase 4 (Blog) ───── butuh: DataTable, layout dashboard
  ├── Fase 5 (Users) ──── butuh: DataTable, layout dashboard, RoleGuard
  └── Fase 6 (Dashboard) ─ butuh: SEMUA modul selesai

Fase 2, 3, 4, 5 → bisa PARALEL (setelah Fase 1)
Fase 7 (Testing) → setelah semua modul stabil
```

---

## Definition of Done (Setiap Task)
- [ ] File dibuat/dimodifikasi sesuai spesifikasi
- [ ] Zero `any` (TypeScript strict)
- [ ] Semua props memiliki interface eksplisit
- [ ] Loading skeleton + EmptyState + Error handling
- [ ] Responsive (mobile/tablet/desktop)
- [ ] Role guard terpasang jika perlu
- [ ] Tidak ada inline styles (Tailwind only)
- [ ] Tidak ada `dangerouslySetInnerHTML`
- [ ] Tidak ada `console.log` tersisa

---

*Catatan: Timeline dapat berubah tergantung kompleksitas backend dan ketersediaan endpoint API.*
