# Wireframe Mockup – Masjidfy Frontend

**Versi:** 2.0  
**Tanggal:** 1 Juni 2026  
**Fokus:** Halaman Login, Register & Dashboard

---

## 1. Halaman Login

### 1.1 Desktop (>1024px) — Two-Column Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────┐   ┌──────────────────────────────────────┐  │
│ │  Kolom Kiri (50%)        │   │  Kolom Kanan (50%)                   │  │
│ │  bg-primary               │   │  bg-background                       │  │
│ │                          │   │                                      │  │
│ │      M A S J I D F Y      │   │  Selamat Datang                     │  │
│ │      text-4xl font-bold   │   │  Silakan masuk ke akun Anda         │  │
│ │      text-primary-foreground│  │                                      │  │
│ │                          │   │  ┌──────────────────────────────┐   │  │
│ │     ┌──────────────┐    │   │  │ Username atau Email          │   │  │
│ │     │  SVG Siluet  │    │   │  │ [__________________________]│   │  │
│ │     │   Masjid     │    │   │  └──────────────────────────────┘   │  │
│ │     │  + Bulan     │    │   │                                      │  │
│ │     │    Sabit     │    │   │  ┌──────────────────────────────┐   │  │
│ │     │  + Bintang   │    │   │  │ Password              [👁]   │   │  │
│ │     └──────────────┘    │   │  │ [__________________________]│   │  │
│ │                          │   │  └──────────────────────────────┘   │  │
│ │                          │   │                                      │  │
│ │  "Memudahkan ibadah,     │   │  [✓] Ingat saya                     │  │
│ │   memberdayakan umat."   │   │                                      │  │
│ │                          │   │  ┌──────────────────────────────┐   │  │
│ │                          │   │  │           MASUK              │   │  │
│ │                          │   │  └──────────────────────────────┘   │  │
│ │                          │   │                                      │  │
│ │                          │   │  Belum punya akun? Daftar           │  │
│ └──────────────────────────┘   └──────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Mobile (<768px) — Full Width

```
┌──────────────────────────┐
│                          │
│      Masjidfy            │  ← text-2xl font-bold
│                          │
│  Selamat Datang          │
│  Silakan masuk ke akun   │
│                          │
│ ┌──────────────────────┐ │
│ │ Username atau Email  │ │
│ │ [__________________] │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Password        [👁] │ │
│ │ [__________________] │ │
│ └──────────────────────┘ │
│                          │
│ [✓] Ingat saya           │
│                          │
│ ┌──────────────────────┐ │
│ │        MASUK         │ │
│ └──────────────────────┘ │
│                          │
│ Belum punya akun? Daftar │
└──────────────────────────┘
```

### 1.3 Spesifikasi Layout

| Area | Styling |
|------|---------|
| Kolom kiri (desktop) | `hidden md:flex w-1/2 flex-col items-center justify-center bg-primary p-12` |
| Kolom kanan | `flex w-full md:w-1/2 items-center justify-center bg-background px-6 py-12` |
| Form wrapper | `w-full max-w-sm space-y-8` |
| Branding wrapper | `mx-auto max-w-sm space-y-10 text-center text-primary-foreground` |
| Judul branding | `text-4xl font-bold tracking-tight` |
| Ilustrasi | SVG `size-48` (200×160 viewBox) |
| Tagline | `text-lg leading-relaxed text-primary-foreground/80` |
| Judul form | `text-2xl font-semibold tracking-tight` |
| Subtitle form | `text-sm text-muted-foreground` |
| Form spacing | `space-y-5` |
| Input height | `h-8` + `pr-10` untuk icon password |
| Icon password | `absolute inset-y-0 right-0 pr-3`, `size-4` |
| Button | `w-full` size `lg` |

### 1.4 States Visual

| State | Perubahan Visual | Keterangan |
|-------|-----------------|------------|
| **Auth Loading** | Skeleton grid dua kolom | `Skeleton className="h-[600px]"` untuk kiri & kanan, muncul saat restore session |
| **Default** | Form kosong, tombol "Masuk" | `bg-primary` |
| **Submitting** | Tombol disabled + spinner | `Loader2` animasi spin + teks "Memproses..." |
| **Error** | Toast sonner merah | "Username atau password salah" |
| **Success** | Toast hijau → push `/dashboard` | "Selamat datang!" |
| **Validation Error** | Pesan merah per field | `text-sm text-destructive` |

### 1.5 Component Tree

```
PublicLayout (min-h-screen bg-zinc-50)
└── LoginPage ("use client")
    ├── div.flex.min-h-screen
    │   ├── LeftColumn (hidden md:flex w-1/2 bg-primary)
    │   │   ├── h1 "Masjidfy"
    │   │   ├── MasjidSilhouette (SVG)
    │   │   └── p tagline
    │   │
    │   └── RightColumn (flex w-full md:w-1/2 bg-background)
    │       ├── h1 "Masjidfy" (mobile only, md:hidden)
    │       ├── Header
    │       │   ├── h2 "Selamat Datang"
    │       │   └── p "Silakan masuk ke akun Anda"
    │       └── Form (react-hook-form + Zod)
    │           ├── Field Username/Email (Label + Input + error)
    │           ├── Field Password (Label + Input + toggle 👁 + error)
    │           ├── Checkbox "Ingat saya"
    │           ├── Button "Masuk" (loading state)
    │           └── Link "Belum punya akun? Daftar"
```

---

## 2. Halaman Register

### 2.1 Desktop (>1024px) — Two-Column Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────┐   ┌──────────────────────────────────────┐  │
│ │  Kolom Kiri (50%)        │   │  Kolom Kanan (50%)                   │  │
│ │  bg-primary               │   │  bg-background                       │  │
│ │                          │   │                                      │  │
│ │      M A S J I D F Y      │   │  Buat Akun Baru                     │  │
│ │                          │   │  Bergabung dengan ribuan             │  │
│ │     ┌──────────────┐    │   │  jamaah lainnya                      │  │
│ │     │  SVG Siluet  │    │   │                                      │  │
│ │     │   Masjid     │    │   │  ┌──────────────────────────────┐   │  │
│ │     │  + Bulan     │    │   │  │ Nama Lengkap *              │   │  │
│ │     │    Sabit     │    │   │  │ [__________________________]│   │  │
│ │     └──────────────┘    │   │  └──────────────────────────────┘   │  │
│ │                          │   │                                      │  │
│ │  "Mudahkan urusan        │   │  ┌──────────────────────────────┐   │  │
│ │   ibadahmu bersama       │   │  │ Username *                  │   │  │
│ │   Masjidfy."             │   │  │ [__________________________]│   │  │
│ │                          │   │  └──────────────────────────────┘   │  │
│ │                          │   │                                      │  │
│ │                          │   │  ┌──────────────────────────────┐   │  │
│ │                          │   │  │ Email *                     │   │  │
│ │                          │   │  │ [__________________________]│   │  │
│ │                          │   │  └──────────────────────────────┘   │  │
│ │                          │   │                                      │  │
│ │                          │   │  ┌─────────────────┐ ┌───────────┐  │  │
│ │                          │   │  │ Password * [👁] │ │Konfirmasi │  │  │
│ │                          │   │  │ [_____________] │ │[👁]       │  │  │
│ │                          │   │  │                 │ │[________] │  │  │
│ │                          │   │  └─────────────────┘ └───────────┘  │  │
│ │                          │   │                                      │  │
│ │                          │   │  ┌──────────────────────────────┐   │  │
│ │                          │   │  │           DAFTAR             │   │  │
│ │                          │   │  └──────────────────────────────┘   │  │
│ │                          │   │                                      │  │
│ │                          │   │  Sudah punya akun? Masuk            │  │
│ └──────────────────────────┘   └──────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Mobile (<768px)

```
┌──────────────────────────┐
│                          │
│      Masjidfy            │
│                          │
│  Buat Akun Baru          │
│  Bergabung dengan        │
│  ribuan jamaah lainnya   │
│                          │
│ ┌──────────────────────┐ │
│ │ Nama Lengkap *       │ │
│ │ [__________________] │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Username *           │ │
│ │ [__________________] │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Email *              │ │
│ │ [__________________] │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────┐    │
│ │ Password *  [👁] │    │
│ │ [______________] │    │
│ └──────────────────┘    │
│ ┌──────────────────┐    │
│ │ Konfirmasi  [👁] │    │
│ │ [______________] │    │
│ └──────────────────┘    │
│                          │
│ ┌──────────────────────┐ │
│ │        DAFTAR        │ │
│ └──────────────────────┘ │
│                          │
│ Sudah punya akun? Masuk │
└──────────────────────────┘
```

### 2.3 Spesifikasi Layout

| Elemen | Detail |
|--------|--------|
| Password & Konfirmasi | `grid grid-cols-1 sm:grid-cols-2 gap-4` — satu baris di desktop, stack di mobile |
| Tagline | "Mudahkan urusan ibadahmu bersama Masjidfy." (berbeda dari halaman login) |
| Field opsional | Tidak ada — phone & address disembunyikan (menunggu update API) |

### 2.4 Zod Schema

```typescript
const registerSchema = z.object({
  fullName: z.string().min(1, "Nama lengkap wajib diisi"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi password wajib diisi"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})
```

### 2.5 States Visual

| State | UI |
|-------|-----|
| **Default** | Form kosong, button "Daftar" |
| **Submitting** | Button spinner "Memproses..." |
| **Success** | Toast "Pendaftaran berhasil, silakan login" → push `/login` |
| **Error 409** | Toast "Username atau email sudah digunakan" |
| **Error lain** | Toast "Pendaftaran gagal, silakan coba lagi" |
| **Validation** | Pesan merah per field |

### 2.6 Component Tree

```
PublicLayout
└── RegisterPage ("use client")
    ├── div.flex.min-h-screen
    │   ├── LeftColumn (hidden md:flex w-1/2 bg-primary)
    │   │   ├── h1 "Masjidfy"
    │   │   ├── MasjidSilhouette (SVG)
    │   │   └── p tagline (berbeda dengan login)
    │   │
    │   └── RightColumn (flex w-full md:w-1/2 bg-background)
    │       ├── h1 "Masjidfy" (mobile only)
    │       ├── Header
    │       │   ├── h2 "Buat Akun Baru"
    │       │   └── p "Bergabung dengan ribuan jamaah lainnya"
    │       └── Form (react-hook-form + Zod)
    │           ├── Field Nama Lengkap
    │           ├── Field Username
    │           ├── Field Email
    │           ├── div.grid (Password + Konfirmasi)
    │           │   ├── Field Password + toggle 👁
    │           │   └── Field Konfirmasi + toggle 👁
    │           ├── Button "Daftar" (loading state)
    │           └── Link "Sudah punya akun? Masuk"
```

---

## 3. Dashboard Layout (Desktop)

### 3.1 Full Desktop Layout (>1024px)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ┌─────────────┐  ┌──────────────────────────────────────────────────────┐   │
│  │             │  │  Header                                    🔔 👤 Nama │   │
│  │  Sidebar    │  │  ─────────────────────────────────────────────────── │   │
│  │             │  │  Home > Qurban > Pendaftaran                         │   │
│  │  🕌 Dashboard│  │                                                     │   │
│  │  🐄 Qurban  │  │  ┌─────────────────────────────────────────────────┐│   │
│  │   • Regist  │  │  │                                                 ││   │
│  │   • Hewan   │  │  │          MAIN CONTENT AREA                      ││   │
│  │   • Bayar   │  │  │          (berubah sesuai navigasi)              ││   │
│  │  💰 Zakat   │  │  │                                                 ││   │
│  │  📝 Blog    │  │  │  [Widget ringkasan / tabel / form / chart]      ││   │
│  │  👥 Users   │  │  │                                                 ││   │
│  │  ⚙️ Roles   │  │  │                                                 ││   │
│  │             │  │  │                                                 ││   │
│  │  Collapse   │  │  │                                                 ││   │
│  │  [ < ]      │  │  │                                                 ││   │
│  │             │  │  └─────────────────────────────────────────────────┘│   │
│  └─────────────┘  └──────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Layout Specifications

| Area | Width | Height | Styling |
|------|-------|--------|---------|
| Sidebar | `w-56` or `w-64` (fixed) | `h-screen` | `border-r bg-card`, `fixed left-0 top-0`, sidebar dinamis per role |
| Header | `flex-1` | `h-14` | `sticky top-0 z-40 border-b bg-background/95 backdrop-blur` |
| Main Content | `flex-1` | `min-h-screen` | `p-6 bg-muted/30` |
| Breadcrumb | Di dalam header | — | `text-sm text-muted-foreground` |
| Notification Bell | Kanan header | — | Icon `Bell`, badge notifikasi |
| Avatar | Kanan header | — | `ui/avatar` + dropdown menu |
| Collapse Button | Bawah sidebar | — | Icon chevron, toggle sidebar width |

### 3.3 Sidebar Menu (Desktop)

```
┌─────────────────────────┐
│  Masjidfy               │  ← Logo, p-4, border-bottom
│                         │
├─────────────────────────┤
│                         │
│  🕌  Dashboard          │  ← icon + label, hover:bg-accent
│                         │     active: bg-accent font-medium
│  🐄  Qurban             │  ← collapsible parent
│       📋 Registrasi     │  ← submenu (indented, pl-10)
│       🐄 Hewan         │
│       💳 Pembayaran    │
│       📦 Distribusi    │
│                         │
│  💰  Zakat              │
│       💳 Transaksi      │
│       👤 Muzakki        │
│       👥 Mustahiq       │
│       🎯 Penyaluran     │
│       📊 Laporan        │
│                         │
│  📝  Blog               │
│       📄 Postingan      │
│       🏷️ Kategori      │
│       💬 Komentar       │
│                         │
│  👥  Pengguna           │  ← hanya admin / superadmin
│  ⚙️  Role & Permission │  ← hanya superadmin
│                         │
├─────────────────────────┤
│                         │
│  [ < ] Collapse         │  ← toggle sidebar width
│                         │
└─────────────────────────┘
```

### 3.4 Header (Desktop)

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│  ☰ (mobile only)    Home > Qurban > Pendaftaran            │
│                                             🔔    👤 Budi  │
│                                                             │
└────────────────────────────────────────────────────────────┘

  ☰  = Mobile toggle (hidden on desktop)
  🔔  = Notification bell (ui/button ghost, icon Bell)
  👤  = User avatar + name (trigger dropdown)
```

### 3.5 User Dropdown Menu

```
        ┌──────────────────────────┐
        │  👤 Budi Santoso         │  ← user info (non-clickable)
        │     budi@email.com       │
        ├──────────────────────────┤
        │  👤 Profil Saya         │  ← /dashboard/profile
        ├──────────────────────────┤
        │  ⚙️ Pengaturan          │  ← /dashboard/settings
        ├──────────────────────────┤
        │  🚪 Keluar              │  → logout
        └──────────────────────────┘
```
Triggered by klik avatar/name di header. Menggunakan `ui/dropdown-menu`.

### 3.6 Sidebar Behavior

| State | Behavior |
|-------|----------|
| **Expanded** | Lebar `w-56`, label teks tampil, icon + gap |
| **Collapsed** | Lebar `w-16`, hanya icon, tooltip pada hover |
| **Hover (collapsed)** | Tooltip muncul di samping icon |
| **Active** | `bg-accent text-accent-foreground` + border kiri indikator |
| **Submenu open** | Chevron rotate, children visible |

---

## 4. Dashboard Layout (Mobile <768px)

### 4.1 Mobile Layout

```
┌──────────────────────────┐
│ Header                   │
│ ☰  Judul Halaman    🔔👤 │
├──────────────────────────┤
│                          │
│  ┌────────────────────┐ │
│  │                    │ │
│  │  MAIN CONTENT      │ │
│  │  (stacked, full    │ │
│  │   width, scroll)   │ │
│  │                    │ │
│  │  [Card]            │ │
│  │  [Card]            │ │
│  │  [Table scroll H]  │ │
│  │                    │ │
│  └────────────────────┘ │
│                          │
└──────────────────────────┘
```

### 4.2 Mobile Sidebar (Sheet/Drawer)

```
┌──────────────────────────┐
│  ✕                      │
│  Masjidfy               │
├──────────────────────────┤
│                          │
│  🕌  Dashboard           │
│                          │
│  🐄  Qurban              │
│       📋 Registrasi      │
│       🐄 Hewan           │
│       💳 Pembayaran      │
│       📦 Distribusi      │
│                          │
│  💰  Zakat               │
│       💳 Transaksi       │
│       👤 Muzakki         │
│       👥 Mustahiq        │
│       🎯 Penyaluran      │
│       📊 Laporan         │
│                          │
│  📝  Blog                │
│  👥  Pengguna            │
│  ⚙️  Role & Permission  │
│                          │
├──────────────────────────┤
│  👤 Budi Santoso         │
│  🚪 Keluar              │
└──────────────────────────┘
```
Sidebar muncul sebagai `Sheet` (dari kiri) saat tombol ☰ di header diklik.  
Menggunakan `ui/sheet` dari shadcn.  
User info + logout di _footer sheet_ (terpisah dari menu navigasi).

---

## 5. Dashboard Beranda (Widget per Role)

### 5.1 Jamaah

```
┌───────────────────────────────────────┐
│  Selamat datang, Budi!       🎉      │
│                                       │
│  ┌────────────┐  ┌────────────┐      │
│  │ 📋         │  │ 💳         │      │
│  │ Pendaftaran│  │ Pembayaran │      │
│  │    2       │  │  Lunas     │      │
│  └────────────┘  └────────────┘      │
│  ┌────────────┐  ┌────────────┐      │
│  │ 📰         │  │ 🧮         │      │
│  │ Artikel    │  │ Kalkulator │      │
│  │ Baru: 3    │  │  Zakat     │      │
│  └────────────┘  └────────────┘      │
└───────────────────────────────────────┘
```

### 5.2 Petugas

```
┌───────────────────────────────────────┐
│  Selamat datang, Amir!      🔧       │
│                                       │
│  ┌────────────┐  ┌────────────┐      │
│  │ ⏳         │  │ 🐄         │      │
│  │ Pending    │  │ Hewan      │      │
│  │    5       │  │    8       │      │
│  └────────────┘  └────────────┘      │
│  ┌────────────┐  ┌────────────┐      │
│  │ 📅         │  │ 📦         │      │
│  │ Jadwal     │  │ Distribusi │      │
│  │ Potong: 2  │  │ Hari Ini:  │      │
│  └────────────┘  └────:──3────┘      │
└───────────────────────────────────────┘
```

### 5.3 Bendahara

```
┌───────────────────────────────────────┐
│  Selamat datang, Sari!     💰        │
│                                       │
│  ┌────────────┐  ┌────────────┐      │
│  │ 💳         │  │ 🐑         │      │
│  │ Penerimaan │  │ Pembayaran │      │
│  │ ZIS: Rp50jt│  │ Qurban:    │      │
│  │            │  │ Rp30jt     │      │
│  └────────────┘  └────────────┘      │
│  ┌────────────┐  ┌────────────┐      │
│  │ 📊         │  │ 📋         │      │
│  │ Saldo      │  │ Laporan    │      │
│  │ Rp20jt     │  │ → Detail   │      │
│  └────────────┘  └────────────┘      │
└───────────────────────────────────────┘
```

### 5.4 Admin

```
┌───────────────────────────────────────┐
│  Selamat datang, Admin!    ⚙️        │
│                                       │
│  ┌────────────┐  ┌────────────┐      │
│  │ 👥         │  │ 📝         │      │
│  │ User Aktif │  │ Blog Posts │      │
│  │    12      │  │    15      │      │
│  └────────────┘  └────────────┘      │
│  ┌────────────┐  ┌────────────┐      │
│  │ 💬         │  │ 🐄         │      │
│  │ Komentar   │  │ Qurban     │      │
│  │ Pending: 7 │  │ Regist.: 23│      │
│  └────────────┘  └────────────┘      │
└───────────────────────────────────────┘
```

### 5.5 StatCard Specifications

```
┌──────────────────────┐
│                      │
│   🔵 (ikon)          │  ← icon color sesuai variant
│                      │
│   Pendaftaran Aktif  │  ← text-sm text-muted-foreground
│         2            │  ← text-3xl font-bold
│                      │
│   ↑ 12% dari bln lalu│  ← optional trend
│                      │
└──────────────────────┘

Props:
- icon: LucideIcon
- title: string
- value: string | number
- variant: 'default' | 'success' | 'warning' | 'danger' | 'info'
- trend?: { value: number; isUp: boolean }
- isLoading?: boolean
```

### 5.6 States Visual (StatCard)

| State | Visual |
|-------|--------|
| **Loading** | Skeleton (shimmer) persegi panjang dengan tinggi card |
| **Ready** | Ikon + judul + nilai + trend opsional |
| **Error** | Tidak handle error per card (cukup di level page) |

---

## 6. DataTable Component

### 6.1 Layout

```
┌────────────────────────────────────────────────┐
│  🔍 Cari...                         [+ Baru]  │
├────────────────────────────────────────────────┤
│ ┌─────┬──────────┬───────┬────────┬──────────┐│
│ │ No  │ Nama     │Status │  Aksi  │          ││
│ ├─────┼──────────┼───────┼────────┼──────────┤│
│ │  1  │ Budi     │ ✅    │ [Detail]│          ││
│ │  2  │ Sari     │ ⏳    │ [Detail]│          ││
│ │  3  │ Amir     │ ❌    │ [Detail]│          ││
│ └─────┴──────────┴───────┴────────┴──────────┘│
├────────────────────────────────────────────────┤
│              ← 1 2 3 ... 10 →                  │
│          Menampilkan 1-10 dari 100             │
└────────────────────────────────────────────────┘
```

### 6.2 Spesifikasi

| Elemen | Posisi | Styling |
|--------|--------|---------|
| Search input | Kiri atas | `max-w-sm` |
| Action button | Kanan atas | `ui/button` |
| Table | Full width | `ui/table` (`overflow-x-auto` di mobile) |
| Pagination | Tengah bawah | `ui/button` variant outline, nomor halaman |
| Info text | Tengah bawah, samping pagination | `text-sm text-muted-foreground` |
| Loading | — | Skeleton 5 baris |
| Empty | Tengah table | EmptyState component |

### 6.3 States Visual

| State | Visual |
|-------|--------|
| **Loading** | Skeleton table: 5 baris dengan shimmer |
| **Empty** | EmptyState: ikon + "Belum ada data" + deskripsi + tombol aksi |
| **Error** | Toast error + retry button di atas table |
| **Data** | Table normal dengan rows |

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Sidebar | Layout |
|------------|-------|---------|--------|
| Mobile | <768px | Sheet (drawer) via ☰ | Single column, stacked |
| Tablet | 768–1024px | Sheet (drawer) via ☰ | 2 column grid, stacked cards |
| Desktop | >1024px | Permanent `w-56` (collapsible to `w-16`) | Multi column grid, sidebar collapse toggle |

---

## 8. Color Tokens Reference

Semua dari theme shadcn (Nova/Zinc), tidak ada hardcode hex:

| Token | Usage |
|-------|-------|
| `bg-background` | Background utama |
| `bg-zinc-50` | Background area konten |
| `bg-card` | Card background |
| `bg-primary` | Tombol utama, active state |
| `bg-accent` | Hover/active sidebar item |
| `bg-destructive` | Tombol hapus, error badge |
| `text-foreground` | Teks utama |
| `text-muted-foreground` | Teks sekunder, placeholder |
| `text-primary` | Teks pada tombol primary |
| `border-border` | Border card, table, input |
| `border-destructive` | Border error |
| `shadow-lg` | Card shadow |
| `shadow-sm` | Table shadow |

---

## 9. Component Hierarchy (Login + Register + Dashboard)

```
RootLayout (Server)
└── Providers (Client)
    ├── QueryClientProvider
    ├── AuthProvider
    │   └── Sonner Toaster
    │
    ├── (public)/layout.tsx (PublicLayout — min-h-screen bg-zinc-50)
    │   ├── login/page.tsx
    │   │   ├── LeftColumn (bg-primary)
    │   │   │   ├── h1 "Masjidfy"
    │   │   │   ├── MasjidSilhouette (SVG)
    │   │   │   └── p tagline
    │   │   └── RightColumn (bg-background)
    │   │       └── Form (react-hook-form + Zod)
    │   │           ├── Input (username/email)
    │   │           ├── Input (password + toggle)
    │   │           ├── Checkbox "Ingat saya"
    │   │           └── Button "Masuk"
    │   │
    │   └── register/page.tsx
    │       ├── LeftColumn (bg-primary) — branding + tagline berbeda
    │       └── RightColumn (bg-background)
    │           └── Form (react-hook-form + Zod)
    │               ├── Input (fullName)
    │               ├── Input (username)
    │               ├── Input (email)
    │               ├── Input (password + toggle)
    │               ├── Input (confirmPassword + toggle)
    │               └── Button "Daftar"
    │
    └── (dashboard)/layout.tsx (DashboardLayout — client)
        ├── AuthGuard (cek isAuthenticated/isLoading)
        ├── Sidebar (desktop: fixed, mobile: sheet)
        ├── Header (sticky, breadcrumb + user menu)
        └── main (content area, p-6)
            ├── dashboard/page.tsx (StatCard grid per role)
            ├── qurban/... (DataTable + Form + Detail)
            ├── zakat/... (DataTable + Form + Report)
            ├── blog-admin/... (DataTable + Editor)
            └── users/... (DataTable + Form)
```

---

## 10. Shared Components — MasjidSilhouette

### 10.1 Lokasi
`src/components/shared/masjid-silhouette.tsx`

### 10.2 Deskripsi
SVG siluet masjid dengan bulan sabit dan bintang. Digunakan di kolom kiri halaman login dan register.

### 10.3 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `"size-48"` | Ekstensi styling Tailwind |

### 10.4 SVG Elements

| Elemen | Keterangan |
|--------|------------|
| Bulan sabit | Pojok kanan atas, `opacity="0.3"` |
| Bintang | Di dekat bulan sabit, `opacity="0.4"` |
| Minaret kiri & kanan | Menara masjid, tinggi 50px |
| Badan masjid | Persegi panjang 104×35 |
| Kubah utama | Path melengkung (25px tinggi) |
| Puncak kubah | Segitiga kecil di atas kubah |
| Pintu | Lengkungan, `fill="var(--primary)"` |
| Jendela kiri & kanan | Lengkungan, `fill="var(--primary)" opacity="0.7"` |
| Garis dekoratif | Horizontal di atas badan masjid |

---

*Dokumen ini akan diperbarui seiring pengembangan halaman baru.*
