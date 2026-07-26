# Software Requirements Specification (SRS) – Masjidfy Frontend

**Versi:** 1.1  
**Tanggal:** 6 Juni 2026  
**Tim:** System Analyst & Frontend Developer  

> **Catatan Implementasi MVP:** Semua halaman dashboard sudah dibangun dengan dummy data. Auth guard aktif. Role-aware widgets sudah berfungsi. Zod validation dan API integration menyusul.  

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini berisi spesifikasi kebutuhan perangkat lunak (SRS) untuk **antarmuka pengguna (frontend) Masjidfy**, sebuah platform manajemen masjid digital. Tujuannya adalah mendefinisikan secara rinci fungsionalitas, antarmuka, performa, dan batasan sistem yang harus dipenuhi dalam pengembangan frontend menggunakan Next.js, shadcn/ui, Tailwind CSS, dan ekosistem pendukungnya.

### 1.2 Lingkup
SRS ini mencakup seluruh modul yang diimplementasikan di sisi klien, termasuk:
- Autentikasi dan otorisasi (JWT)
- Multi-role dashboard (Jamaah, Petugas, Bendahara, Admin, Superadmin)
- Modul Qurban: pendaftaran, hewan, pembayaran, distribusi
- Modul Zakat: transaksi, muzakki, mustahiq, distribusi, laporan, kalkulator
- Blog: publikasi artikel, komentar, moderasi
- Manajemen pengguna dan peran (admin)

Lingkup tidak mencakup backend API (yang sudah ada dan didokumentasikan terpisah di `API_REFERENCE.md`). Frontend hanya mengonsumsi API sesuai kontrak yang telah disepakati.

### 1.3 Definisi, Akronim, Singkatan
- **Masjidfy** : Nama aplikasi manajemen masjid digital.
- **JWT** : JSON Web Token, digunakan untuk autentikasi.
- **ZIS** : Zakat, Infaq, Sedekah.
- **Mustahiq** : Penerima zakat.
- **Muzakki** : Pemberi zakat.
- **shadcn/ui** : Komponen UI berbasis Radix UI dan Tailwind.
- **TanStack Query** : Library manajemen server state.
- **TDD** : Test-Driven Development.

### 1.4 Referensi
- `PRD.md` – Product Requirement Document
- `API_REFERENCE.md` – Dokumentasi endpoint backend (di folder `docs/`)
- `WORKFLOW.md` – Alur kerja pengembangan frontend
- `docs/` – Berisi dokumen analisis (SRS, SDD, dll.)

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk
Masjidfy Frontend adalah aplikasi web responsif yang mengonsumsi API RESTful dari backend. Ia berfungsi sebagai lapisan presentasi yang adaptif terhadap peran pengguna, memastikan pengalaman yang efisien untuk jamaah, petugas, bendahara, admin, dan superadmin.

Aplikasi dibangun dengan **Next.js App Router** untuk dukungan Server-Side Rendering (SSR) pada konten publik, dan **Client Components** untuk interaksi dinamis di dashboard. Seluruh komponen UI menggunakan **shadcn/ui** (di atas Radix UI) dan **Tailwind CSS** untuk konsistensi desain.

### 2.2 Fungsi Produk
Fungsi utama aplikasi meliputi:
- **Autentikasi** : Pendaftaran, login, manajemen profil.
- **Dashboard berbasis peran** : Setiap peran melihat ringkasan dan menu yang relevan.
- **Modul Qurban** : Pendaftaran, verifikasi, manajemen hewan, pembayaran, distribusi daging.
- **Modul Zakat** : Penerimaan, manajemen muzakki & mustahiq, penyaluran, laporan keuangan, kalkulator zakat mal.
- **Blog** : Manajemen konten (admin/penulis), tampilan publik, komentar bertingkat, moderasi.
- **Manajemen Pengguna & Role** : CRUD pengguna, penetapan peran, manajemen hak akses (superadmin).

### 2.3 Karakteristik Pengguna
| Peran | Tingkat Keahlian | Frekuensi Penggunaan | Kebutuhan Utama |
|------|------------------|----------------------|-----------------|
| Jamaah | Umum, tidak teknis | Rendah – menengah (musiman) | Pendaftaran qurban, kalkulator zakat, membaca artikel |
| Petugas | Menengah (terbiasa dengan aplikasi) | Tinggi (musim qurban/zakat) | Entri cepat, verifikasi data |
| Bendahara | Menengah – tinggi (keuangan) | Tinggi (rutin) | Pencatatan keuangan, laporan |
| Admin | Tinggi | Menengah | Manajemen sistem dan konten |
| Superadmin | Tinggi | Rendah | Konfigurasi role & permission |

### 2.4 Batasan Desain dan Implementasi
- **Frontend hanya berjalan di browser modern** (Chrome, Firefox, Safari versi terbaru). Tidak ada dukungan untuk IE11.
- **Tidak ada dukungan offline.** Aplikasi memerlukan koneksi internet.
- **Token JWT disimpan di localStorage** (bukan httpOnly cookie) untuk kemudahan implementasi.
- **Bahasa hanya Bahasa Indonesia** untuk konten dan label UI.
- **Tidak ada fitur real-time** (misal notifikasi push) pada versi awal.

### 2.5 Asumsi dan Dependensi
- Backend API berjalan di URL yang dikonfigurasi melalui environment variable `NEXT_PUBLIC_API_URL`.
- Response API mengikuti format standar (`{ statusCode, message, data, meta }`).
- Data pengguna (roles) selalu dikembalikan dari endpoint `/auth/me`.
- Server backend mampu menangani beban permintaan yang datang dari frontend.

---

## 3. Kebutuhan Fungsional

### 3.1 Autentikasi dan Profil

#### 3.1.1 Register
- **Aktor**: Publik (calon jamaah)
- **Deskripsi**: Pengguna baru dapat mendaftar dengan mengisi username, email, password, nama lengkap, dan opsional telepon/alamat.
- **Alur**:
  1. Pengguna membuka halaman `/register`.
  2. Mengisi form yang divalidasi di sisi klien (Zod): username minimal 3 karakter, email valid, password minimal 8 karakter.
  3. Mengirim `POST /auth/register`.
  4. Jika berhasil (201), tampilkan pesan sukses dan arahkan ke halaman login.
  5. Jika gagal, tampilkan pesan error dari server di bawah field terkait atau sebagai toast.
- **Batasan**: Pengguna yang sudah login tidak dapat mengakses halaman register.

#### 3.1.2 Login
- **Aktor**: Publik
- **Deskripsi**: Pengguna terdaftar masuk dengan username dan password.
- **Alur**:
  1. Pengguna membuka `/login`.
  2. Mengisi form, submit `POST /auth/login`.
  3. Jika berhasil (200), token disimpan di `localStorage`, kemudian panggil `/auth/me` untuk mendapatkan data user dan role, lalu redirect ke `/dashboard`.
  4. Jika gagal, tampilkan error "Username atau password salah".
- **Keamanan**: Tidak ada batas percobaan di frontend (backend yang bertanggung jawab).

#### 3.1.3 Profil Saya
- **Aktor**: Semua pengguna terautentikasi
- **Deskripsi**: Menampilkan data diri pengguna (dari `/auth/me`).
- **Alur**: Pengguna mengakses menu "Profil" di dropdown header. Data ditampilkan dalam Card. Tidak ada edit di versi ini (bisa melalui manajemen pengguna oleh admin).

#### 3.1.4 Logout
- **Aktor**: Semua pengguna terautentikasi
- **Deskripsi**: Menghapus token dan data user, mengarahkan ke login.

### 3.2 Manajemen Pengguna (Admin & Superadmin)

#### 3.2.1 Daftar Pengguna
- **Aktor**: Admin, Superadmin
- **Deskripsi**: Menampilkan semua pengguna dengan filter: pencarian (nama/username/email), status aktif, peran.
- **Alur**:
  - Halaman `/dashboard/users` dengan DataTable.
  - Data diambil dari `GET /users` dengan query parameter `page, limit, search, is_active, role`.
  - Kolom: Username, Nama Lengkap, Email, Status (badge), Role (badge), Aksi (detail, edit, nonaktifkan).
  - Pagination menggunakan `meta` dari respons.

#### 3.2.2 Tambah/Edit User
- **Aktor**: Admin, Superadmin
- **Deskripsi**: Form untuk menambah atau mengedit data pengguna.
- **Validasi**: Full name wajib, email valid, username unik (cek dari server), role bisa dipilih multiple.

#### 3.2.3 Nonaktifkan User (Soft Delete)
- **Aktor**: Superadmin
- **Deskripsi**: Mengubah status `is_active` menjadi false. Konfirmasi dengan dialog.

#### 3.2.4 Kelola Role & Permission (Superadmin)
- **Aktor**: Superadmin
- **Deskripsi**: Halaman terpisah untuk CRUD role (nama, deskripsi, permission) dan melihat daftar permission. Data diambil dari `GET /roles`, `GET /permissions`.

### 3.3 Modul Qurban

#### 3.3.1 Pendaftaran Qurban (Jamaah)
- **Aktor**: Jamaah (juga bisa oleh admin/petugas, tapi UI untuk jamaah diprioritaskan)
- **Deskripsi**: Jamaah dapat mendaftar qurban baru.
- **Alur**:
  1. Dari dashboard, klik "Pendaftaran Saya" > "Daftar Baru".
  2. Isi form: nama peserta, nama kelompok (opsional), kontak telepon, pemilihan hewan (jenis, perkiraan berat, sumber dana).
  3. Submit `POST /qurban/registrations`.
  4. Redirect ke daftar pendaftaran saya, tampil toast sukses.

#### 3.3.2 Daftar Pendaftaran (Admin, Petugas, Bendahara)
- **Deskripsi**: Melihat semua pendaftaran dengan filter status (pending, verified, cancelled) dan jenis.
- **UI**: DataTable dengan kolom: Nama Peserta, Grup, Kontak, Status (badge warna), Hewan, Pembayaran (terhubung), Aksi (verifikasi, detail).
- **Verifikasi** dilakukan dengan `PATCH /qurban/registrations/:id/status`.

#### 3.3.3 Detail Pendaftaran
- **Deskripsi**: Halaman detail dengan tab: Informasi, Pembayaran, Distribusi.
- Informasi dari `GET /qurban/registrations/:id`.
- Tab Pembayaran menampilkan daftar pembayaran terkait (dari endpoint pembayaran) dan tombol "Catat Pembayaran" (jika role bendahara/admin).
- Tab Distribusi menampilkan distribusi daging jika hewan sudah disembelih.

#### 3.3.4 Manajemen Hewan Qurban (Admin, Petugas)
- **Deskripsi**: CRUD data hewan (jenis sapi/kambing, berat, harga, sumber, tanggal potong, lokasi). Halaman `/dashboard/qurban/animals`.
- Setelah ditambahkan, hewan bisa dipilih saat pendaftaran atau distribusi.

#### 3.3.5 Pembayaran Qurban (Bendahara, Admin)
- **Deskripsi**: Mencatat pembayaran untuk pendaftaran tertentu.
- **Alur**: Pilih pendaftaran, klik "Catat Pembayaran", isi jumlah, metode (cash/transfer), status (DP/Lunas). Submit `POST /qurban/payments`. Update status pembayaran bisa dilakukan di halaman pembayaran.

#### 3.3.6 Distribusi Daging Qurban (Petugas, Admin)
- **Deskripsi**: Mencatat distribusi daging per hewan yang sudah dipotong.
- **Alur**: Pilih hewan (dropdown dari daftar hewan), tambahkan distribusi: nama penerima, jumlah kupon, tanggal. Submit `POST /qurban/distributions`.
- **Status MVP**: Dropdown pilih hewan sudah menggunakan data dummy.

### 3.4 Modul Zakat

#### 3.4.1 Transaksi ZIS (Bendahara, Admin, Petugas)
- **Deskripsi**: Mencatat penerimaan zakat fitrah, maal, infaq, sedekah, fidyah.
- **UI**: DataTable dengan filter tipe, tanggal. Form tambah transaksi memilih tipe, jumlah, metode, dan muzakki (bisa pilih dari yang sudah ada atau tambah baru).

#### 3.4.2 Manajemen Muzakki (Bendahara, Admin, Petugas)
- **Deskripsi**: Daftar pemberi zakat. Bisa ditambah langsung dari form transaksi atau halaman terpisah. Detail muzakki menampilkan riwayat transaksi.

#### 3.4.3 Manajemen Mustahiq (Admin, Petugas)
- **Deskripsi**: Daftar penerima zakat dengan kategori asnaf (8 asnaf). Admin bisa memverifikasi mustahiq. Digunakan saat mencatat penyaluran.

#### 3.4.4 Penyaluran Zakat (Bendahara, Admin, Petugas)
- **Deskripsi**: Mencatat penyaluran dana ZIS ke mustahiq. Pilih mustahiq (harus terverifikasi), jumlah, tanggal.
- **Status MVP**: Dropdown pilih mustahiq sudah menggunakan data dummy.

#### 3.4.5 Laporan Keuangan ZIS (Bendahara, Admin)
- **Deskripsi**: Halaman laporan dengan filter tahun, bulan. Menampilkan ringkasan total penerimaan, penyaluran, dan saldo. Gunakan `GET /zakat/reports`.

#### 3.4.6 Kalkulator Zakat Mal (Publik)
- **Deskripsi**: Halaman publik `/kalkulator-zakat` tanpa login. Form input harta (emas, perak, uang, perdagangan, dll.), hitung otomatis nisab dan jumlah zakat menggunakan endpoint `POST /zakat/calculator`.

### 3.5 Blog

#### 3.5.1 Halaman Publik
- **Daftar Artikel**: Tampilan grid/list dengan pagination, filter kategori dan tag. Setiap kartu berisi gambar, judul, excerpt, penulis, tanggal.
- **Detail Artikel**: Konten penuh, daftar komentar bertingkat (nested) yang sudah disetujui. Form komentar hanya untuk pengguna login (jamaah).

#### 3.5.2 Manajemen Blog (Admin, Penulis)
- **Daftar Postingan**: DataTable dengan status (draft, published, archived). Aksi: edit, hapus.
- **Editor Postingan**: Form dengan input judul, slug (otomatis dari judul), konten (richtext sederhana), excerpt, gambar utama, kategori, tag, status.
- **Kategori & Tag**: Kelola melalui dialog sederhana.
- **Moderasi Komentar**: Tabel komentar dengan status persetujuan. Admin bisa menyetujui, menolak, atau menghapus.

### 3.6 Dashboard Beranda

- **Widget Peran**:
  - **Jamaah**: Pendaftaran Saya, Transaksi ZIS, Total Pembayaran.
  - **Bendahara**: Total Pemasukan ZIS, Total Penyaluran, Pembayaran Qurban, Sisa Saldo ZIS.
  - **Admin/Superadmin**: Total Pengguna, Pendaftaran Pending, Hewan Tersedia, Total Terdaftar.
  - **Default (role lain)**: Pendaftaran Pending, Hewan Tersedia, Pembayaran Terkumpul, Total Terdaftar.
- Widget diimplementasikan sebagai **StatCard** dengan data dummy dan conditional rendering berdasarkan `useAuth().hasRole()`.
- **Auth Guard**: Dashboard layout redirect ke `/login` jika `isAuthenticated` false.

---

## 4. Kebutuhan Antarmuka Eksternal

### 4.1 Antarmuka API
- Semua komunikasi dengan backend menggunakan RESTful API di `NEXT_PUBLIC_API_URL`.
- Format request/response sesuai `API_REFERENCE.md`.
- Autentikasi menggunakan header `Authorization: Bearer <token>`.
- Error response memiliki `statusCode` dan `message`.

### 4.2 Antarmuka Perangkat Lunak
- **Next.js v14+** (App Router) sebagai framework.
- **TypeScript** untuk semua kode.
- **shadcn/ui** (komponen siap pakai) dan **Radix UI** (headless primitives).
- **Tailwind CSS** untuk styling.

### 4.3 Antarmuka Perangkat Keras
- Aplikasi diakses melalui browser di desktop, tablet, atau smartphone. Tidak ada persyaratan perangkat keras khusus.

---

## 5. Kebutuhan Non-Fungsional

### 5.1 Performa
- **First Contentful Paint (FCP)** < 1,5 detik.
- **Largest Contentful Paint (LCP)** < 2,5 detik.
- **Time to Interactive (TTI)** < 3,5 detik.
- **Ukuran bundle JavaScript** dijaga minimal, lazy loading untuk rute dan komponen berat.
- **Cache API** menggunakan TanStack Query dengan strategi `staleTime` yang sesuai untuk mengurangi beban jaringan.

### 5.2 Keamanan
- Token JWT tidak disimpan di cookie atau URL; hanya localStorage (risiko XSS diakui, mitigasi dengan Content Security Policy).
- Semua input divalidasi dengan Zod sebelum dikirim.
- Tidak ada konten HTML mentah yang di-render tanpa sanitasi (mencegah XSS).
- Halaman dashboard dilindungi pengecekan `isAuthenticated` (sudah diimplementasikan di dashboard layout — redirect ke `/login`).
- Role-based rendering di sisi klien sebagai lapisan pertama, backend tetap sebagai penjaga utama.

### 5.3 Usability
- Antarmuka intuitif dengan pola navigasi yang konsisten.
- Waktu belajar minimal: pengguna baru dapat menyelesaikan tugas utama dalam 2 menit.
- Feedback untuk setiap aksi: loading skeleton, toast sukses/gagal, empty state.

### 5.4 Aksesibilitas
- Memenuhi WCAG 2.1 level AA:
  - Kontras warna minimal 4.5:1 untuk teks normal.
  - Semua form memiliki label yang terasosiasi dengan benar.
  - Navigasi keyboard lengkap.
  - Atribut `aria` yang sesuai pada komponen interaktif.

### 5.5 Keandalan (Reliability)
- Aplikasi harus menangani error jaringan dengan graceful degradation: menampilkan pesan error, bukan crash.
- Tidak ada data yang hilang jika terjadi kegagalan request (data tetap di cache).

### 5.6 Pemeliharaan (Maintainability)
- Kode terstruktur modular (komponen, hooks, lib).
- TypeScript ketat (tidak `any` tanpa alasan).
- Dokumentasi komponen shared menggunakan JSDoc.
- Tes unit dan integrasi memadai untuk mencegah regresi.

---

## 6. Atribut Kualitas

### 6.1 Ketersediaan
Aplikasi frontend di-host di Vercel dengan SLA tinggi. Tidak ada mode offline.

### 6.2 Skalabilitas
Arsitektur Next.js memungkinkan peningkatan traffic dengan mudah (Edge Network Vercel). Komponen yang di-render di server mengurangi beban klien.

### 6.3 Portabilitas
Dapat diakses di semua browser modern dan berbagai ukuran layar.

---

## 7. Persyaratan Pengujian

- **Unit Testing** : Custom hooks, utility functions.
- **Integration Testing** : Komponen dengan mock API.
- **End-to-End Testing** : Skenario pengguna penuh dengan Playwright (multi-role).
- **Aksesibilitas Testing** : Menggunakan `axe-core` atau Lighthouse audit.
- **Regression Testing** : Menjalankan test suite yang ada setiap perubahan.

---

## 8. Use Case Diagram Ringkasan

(Teks deskripsi, karena Markdown tidak menampilkan gambar. Diagram aktual ada di dokumen desain SDD.)

- Aktor: Jamaah, Petugas, Bendahara, Admin, Superadmin, Penulis.
- Use case utama:
  - Jamaah: Mendaftar Qurban, Melihat Status Qurban, Menggunakan Kalkulator Zakat, Membaca Blog, Berkomentar.
  - Petugas: Mengelola Pendaftaran Qurban, Verifikasi, Mengelola Hewan, Distribusi, Transaksi ZIS.
  - Bendahara: Mencatat Pembayaran Qurban, Penerimaan ZIS, Penyaluran Zakat, Melihat Laporan.
  - Admin: Semua di atas + Manajemen Pengguna, Moderasi Blog.
  - Superadmin: Semua admin + Kelola Role.

---

## 9. Persetujuan

Dokumen ini telah ditinjau dan disetujui oleh:

| Peran | Nama | Tanggal | Tanda Tangan |
|-------|------|---------|---------------|
| System Analyst | [Nama] | 31/05/2026 | |
| Lead Frontend | [Nama] | 31/05/2026 | |
| Product Owner | [Nama] | 31/05/2026 | |

---

*Dokumen SRS ini akan digunakan sebagai acuan utama dalam pengembangan dan pengujian frontend Masjidfy.*