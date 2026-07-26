# Wireframe Mockup – Masjidfy Frontend

**Versi:** 3.0  
**Tanggal:** 1 Juni 2026  
**Fokus:** Semua halaman publik + dashboard

---

## 1. Public Layout

### 1.1 Desktop (≥1024px)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────────────────────┐  │
│  │  Navbar (Sticky)                                                               │  │
│  │  🕌 Masjidfy     Beranda    Tentang ▾    Blog    Kalkulator          [Masuk]   │  │
│  │                         ┌─────────────────────┐                                │  │
│  │                         │ Visi & Misi         │                                │  │
│  │                         │ Struktur Organisasi │                                │  │
│  │                         │ Sejarah Masjid      │                                │  │
│  │                         └─────────────────────┘                                │  │
│  └────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐  │
│  │                         MAIN CONTENT AREA                                      │  │
│  └────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐  │
│  │  Footer                                                                        │  │
│  │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐                │  │
│  │  │ Masjidfy         │ │ Tautan Cepat     │ │ Kontak           │                │  │
│  │  │ Platform manaje- │ │ • Beranda        │ │ 📍 Alamat        │                │  │
│  │  │ men masjid digital│ │ • Blog          │ │ 📧 email@...     │                │  │
│  │  │                  │ │ • Kalkulator     │ │ 📱 08xx-xxxx     │                │  │
│  │  │                  │ │ • Struktur       │ │                  │                │  │
│  │  └──────────────────┘ └──────────────────┘ └──────────────────┘                │  │
│  │  ──────────────────────────────────────────────────────────────────────────    │  │
│  │  © 2026 Masjidfy. Semua hak dilindungi.                                        │  │
│  └────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Mobile (<768px)

Navbar minimal (logo + hamburger), Sheet muncul dari kanan dengan daftar menu + ikon.

Footer 1 kolom: Masjidfy (deskripsi), Tautan Cepat, Kontak (stack vertical).

---

## 2. Landing Page (Home Publik)

### 2.1 Layout

```
┌─ Hero Section ──────────────────────────────────────────────────────────────────┐
│  Mudahkan Ibadah, Berdayakan Umat                          [Ilustrasi Masjid]   │
│  Kelola zakat, qurban, dan dakwah masjid dalam 1 platform                       │
│  [Daftar Gratis]  [Pelajari ▾]                                                   │
└──────────────────────────────────────────────────────────────────────────────────┘

┌─ Layanan Utama ─────────────────────────────────────────────────────────────────┐
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ 🐄 Qurban   │ │ 💰 Zakat     │ │ 📰 Blog      │ │ 🧮 Kalkulator│           │
│  │ Selengkapnya │ │ Selengkapnya │ │ Selengkapnya │ │ Selengkapnya │           │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘           │
└──────────────────────────────────────────────────────────────────────────────────┘

┌─ Statistik ─────────────────────────────────────────────────────────────────────┐
│  150+ Jamaah    500+ Transaksi    50+ Artikel    10+ Masjid                      │
└──────────────────────────────────────────────────────────────────────────────────┘

┌─ Artikel Terbaru ───────────────────────────────────────────────────────────────┐
│  [Card 1]  [Card 2]  [Card 3]                                    [Lihat Semua →]│
└──────────────────────────────────────────────────────────────────────────────────┘

┌─ CTA ───────────────────────────────────────────────────────────────────────────┐
│  Siap Memudahkan Ibadah?                                                         │
│  Bergabung dengan Masjidfy dan kelola aktivitas masjid Anda dengan mudah.        │
│  [Daftar Sekarang Gratis]                                                        │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Komponen

| Komponen | Lokasi | Keterangan |
|----------|--------|------------|
| `HeroSection` | `(public)/_components/hero-section.tsx` | Headline + ilustrasi MasjidSilhouette + 2 CTA |
| `ServiceCard` | `shared/service-card.tsx` | Card reusable (icon, judul, deskripsi, link) |
| `ServicesSection` | `(public)/_components/services-section.tsx` | Grid 4 layanan |
| `StatsSection` | `(public)/_components/stats-section.tsx` | 4 angka statistik (border-y bg-muted) |
| `BlogCard` | `shared/blog-card.tsx` | Card artikel (image, kategori, judul, excerpt, author, date) |
| `LatestArticles` | `(public)/_components/latest-articles.tsx` | Grid 3 artikel terbaru + "Lihat Semua" |
| `CTASection` | `(public)/_components/cta-section.tsx` | Gradient primary + tombol daftar |

---

## 3. Blog Publik

### 3.1 List (`/blog`)

| Area | Detail |
|------|--------|
| Hero | Gradient card: "Artikel & Kajian Islami" |
| Grid | 3 kolom desktop, 2 tablet, 1 mobile — `BlogCard` |
| Pagination | Nomor halaman (1 2 3 ... 5) |

### 3.2 Detail (`/blog/[slug]`)

| Area | Detail |
|------|--------|
| Header | Kategori badge + judul + author + tanggal + share buttons |
| Konten | Artikel penuh (Server Component) |
| Komentar | Form (nama, email, komentar) + list komentar (nested) |
| Related | 3 artikel terkait |

State: Loading skeleton (`loading.tsx` di list & detail), empty untuk blog yang belum ada.

---

## 4. Kalkulator Zakat (`/kalkulator-zakat`)

### 4.1 Layout

```
┌─ Header ───────────────────────────────────────────────────────────────────────┐
│  🧮 Kalkulator Zakat Maal                                                       │
│  Hitung zakat maal Anda dengan mudah dan cepat                                  │
└──────────────────────────────────────────────────────────────────────────────────┘

┌─ Form (kiri) ─────────────────────────┐  ┌─ Hasil (kanan) ────────────────────┐
│ Emas (gram): [___]                    │  │ Nisab: Rp 5.000.000                │
│ Perak (gram): [___]                   │  │ Total Aset: Rp 50.000.000          │
│ Uang Tunai: [___]                     │  │ Hutang: Rp 5.000.000               │
│ Tabungan: [___]                       │  │ Aset Bersih: Rp 45.000.000         │
│ Barang Dagangan: [___]                │  │                                      │
│ Piutang: [___]                        │  │ ✅ WAJIB ZAKAT                      │
│ Hutang: [___]                         │  │ Zakat: Rp 1.125.000                │
│                                       │  │                                      │
│  [Hitung] [Reset]                     │  └──────────────────────────────────────┘
└────────────────────────────────────────┘

┌─ Informasi Tambahan ───────────────────────────────────────────────────────────┐
│  ℹ️ Nisab zakat maal: setara 85 gram emas atau 595 gram perak                  │
│     Kadar zakat: 2,5% dari harta bersih                                        │
│     "Ambilah zakat dari harta mereka..." (QS. At-Taubah: 103)                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Login

### 5.1 Desktop (≥1024px)

Two-column: kiri `bg-primary` (branding + MasjidSilhouette + tagline), kanan `bg-background` (form).

### 5.2 Mobile (<768px)

Full width, branding di atas form. Stack vertical.

### Form Fields

| Field | Type | Validasi |
|-------|------|----------|
| Username/Email | Input text | min 3 karakter |
| Password | Input password + toggle 👁 | min 6 karakter |
| Ingat saya | Checkbox | opsional |

### States

| State | UI |
|-------|-----|
| Default | Form kosong, button "Masuk" |
| Submitting | Button disabled + spinner "Memproses..." |
| Error | Toast "Username atau password salah" |
| Success | Toast → redirect `/dashboard` |

---

## 6. Register

### 6.1 Layout

Same two-column pattern (kiri: branding berbeda, kanan: form).

### Form Fields

| Field | Type | Validasi |
|-------|------|----------|
| Nama Lengkap | Input text | min 1 karakter |
| Username | Input text | min 3 karakter |
| Email | Input email | format email |
| Password | Input password + toggle 👁 | min 6 karakter |
| Konfirmasi Password | Input password + toggle 👁 | harus cocok |

---

## 7. Struktur Organisasi (`/tentang/struktur-organisasi`)

### 7.1 Layout

```
┌─ Hero ─────────────────────────────────────────────────────────────────────────┐
│  🕌 Struktur Organisasi Masjid                                                  │
│  Mengenal para pengurus yang mengelola kegiatan masjid                          │
└──────────────────────────────────────────────────────────────────────────────────┘

┌─ Bagan Kepengurusan ───────────────────────────────────────────────────────────┐
│                                                                                 │
│              ┌─────────────────┐                                                │
│              │ DEWAN PENASEHAT │                                                │
│              └────────┬────────┘                                                │
│                       │                                                         │
│              ┌────────┴────────┐                                                │
│              │   KETUA DKM    │                                                │
│              └────────┬────────┘                                                │
│                       │                                                         │
│     ┌─────────────────┼─────────────────┐                                      │
│     │                 │                 │                                       │
│ ┌───┴────┐      ┌────┴────┐      ┌────┴───┐                                   │
│ │Sekretaris│    │Bendahara I│    │Bendahara II│                                 │
│ └─────────┘    └──────────┘    └──────────┘                                   │
└──────────────────────────────────────────────────────────────────────────────────┘

┌─ Bidang-Bidang ─────────────────────────────────────────────────────────────────┐
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ 🕌 Ibadah   │ │ 📚 Pendidikan│ │ 🤝 Sosial   │ │ 🧹 Pemuda   │           │
│  │ [Lihat Detail]│ [Lihat Detail]│ [Lihat Detail]│ [Lihat Detail]│           │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘           │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Bidang Detail Dialog

| Area | Detail |
|------|--------|
| Title | Bidang {nama} + close button |
| Ketua | Nama ketua bidang |
| Anggota | Table (No, Nama, Jabatan) |
| Tugas Pokok | List bullet |

### 7.3 Komponen

| Komponen | Lokasi |
|----------|--------|
| `OrgChart` | `shared/org-chart.tsx` |
| `OrgNode` | `shared/org-node.tsx` |
| `BidangCard` | `shared/bidang-card.tsx` |
| `BidangDetailDialog` | `(public)/tentang/struktur-organisasi/_components/bidang-detail-dialog.tsx` |

---

## 8. Dashboard

### 8.1 Layout Desktop (>1024px)

```
┌─────────────┐  ┌──────────────────────────────────────────────────────────────┐
│  Sidebar    │  │  Header                              🔔   👤 User            │
│  (w-56)     │  │  ──────────────────────────────────────────────────────────── │
│             │  │  Home > Dashboard                                             │
│  🕌 Dashboard│  │                                                              │
│  🐄 Qurban  │  │  ┌──────────────────────────────────────────────────────────┐│
│  💰 Zakat   │  │  │  4 StatCards (grid 2x2)                                  ││
│  📝 Blog    │  │  │                                                          ││
│  👥 Users   │  │  │  2 Activity Lists (grid 1x2)                            ││
│  ⚙️ Roles   │  │  │                                                          ││
│             │  │  └──────────────────────────────────────────────────────────┘│
│  Collapse   │  │                                                              │
└─────────────┘  └──────────────────────────────────────────────────────────────┘
```

### 8.2 Mobile

Sidebar → Sheet dari kiri via ☰ header. Content stack vertical.

### 8.3 Sidebar Items

| Menu | Icon | Submenu |
|------|------|---------|
| Dashboard | LayoutDashboard | - |
| Qurban | Beef | Pendaftaran Saya, Daftar Pendaftaran, Hewan, Pembayaran, Penyaluran |
| Zakat | Wallet | Penerimaan, Muzakki, Mustahiq, Penyaluran, Laporan |
| Blog | Newspaper | Postingan, Kategori, Tags, Komentar |
| Users | Users | - |
| Roles | Shield | - |
| Permission | Shield | - |

### 8.4 Dashboard Home

4 StatCards: Jamaah Terdaftar, Total Transaksi, Artikel Terbit, Masjid Terdaftar.
2 Activity Lists: Aktivitas Terbaru + Pengumuman.

### 8.5 StatCard

Props: icon, title, value, variant (default/success/warning/danger/info), trend opsional.
States: loading skeleton, ready.

### 8.6 DataTable

| Elemen | Detail |
|--------|--------|
| Search | Left top, max-w-sm |
| Action | Right top, button |
| Table | Full width, overflow-x-auto mobile |
| Pagination | Center bottom, page numbers |
| Loading | Skeleton 5 rows |
| Empty | EmptyState (icon + message + optional action) |

---

## 9. Breakpoints Responsive

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | <768px | Single column, Sheet sidebar, stacked cards |
| Tablet | 768–1023px | 2 column grid, Sheet sidebar |
| Desktop | ≥1024px | Multi column, permanent sidebar (collapsible) |

---

## 10. Komponen Shared

| Komponen | Fungsi |
|----------|--------|
| `MasjidSilhouette` | SVG masjid untuk branding |
| `ServiceCard` | Kartu layanan landing page |
| `BlogCard` | Kartu artikel (image, kategori, judul, author, date) |
| `StatCard` | Kartu statistik dashboard |
| `DataTable` | Tabel generik dengan sorting/pagination/search |
| `EmptyState` | Tampilan data kosong |
| `FilterBar` | Filter blog (kategori + search) |
| `ShareButtons` | Share artikel (WA, FB, Twitter, copy) |
| `WYSIWYGEditor` | TipTap editor untuk blog admin |
| `PostMetabox` | Sidebar blog admin (kategori, tags, image, status) |
| `OrgChart` | Bagan organisasi dengan CSS connectors |
| `OrgNode` | Node dalam org chart |
| `BidangCard` | Kartu bidang struktur organisasi |

---

## 11. Color Tokens

Semua dari theme shadcn (Nova/Zinc), tidak ada hardcode hex.

| Token | Usage |
|-------|-------|
| `bg-background` | Background utama |
| `bg-card` | Card background |
| `bg-primary` | Tombol utama, active state |
| `bg-accent` | Hover/active item |
| `bg-muted` | Background sekunder (stats section) |
| `text-foreground` | Teks utama |
| `text-muted-foreground` | Teks sekunder |
| `border-border` | Border card, table, input |

---

*Dokumen ini akan diperbarui seiring pengembangan halaman baru.*
