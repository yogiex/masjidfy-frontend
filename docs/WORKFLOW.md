# OpenCode Workflow – Masjidfy Frontend

**Versi:** 1.0  
**Tujuan:** Mendefinisikan alur berpikir dan proses kerja pengembang (manusia maupun AI assistant) saat membangun atau memelihara antarmuka Masjidfy. Workflow ini mencakup peran **System Analyst**, **Frontend Engineer**, **UI/UX Designer**, **QA**, dan **Security Analyst** dalam satu siklus TDD ketat, dengan penekanan pada konsistensi desain, keamanan sisi klien, aksesibilitas, kualitas kode, dan kesiapan CI/CD.

---

## 1. Analisis Kebutuhan (Requirement Analysis)

Setiap permintaan baru (fitur, perbaikan, atau perubahan) diawali dengan pemahaman mendalam.

### 1.1 Identifikasi Aktor & Tujuan
- **Siapa penggunanya?** (Jamaah, Petugas, Bendahara, Admin, dll.)
- **Apa yang ingin dicapai?** (misal: mendaftar qurban, melihat laporan, menulis artikel)
- **Apa nilai bisnisnya?** (efisiensi, transparansi, kemudahan)

### 1.2 Periksa Dokumen Acuan
- **PRD.md** – gambaran produk dan fitur.
- **API_REFERENCE.md** (di `docs/`) – endpoint, payload, response, aturan otorisasi.
- **Desain UI/UX** (jika ada wireframe atau style guide tambahan).
- **Struktur folder** `src/` dan komponen yang sudah ada.

**Jika kebutuhan tidak jelas atau ambigu**, ajukan pertanyaan klarifikasi. Jangan melanjutkan sebelum spesifik.

### 1.3 Hasil Analisis
- Ringkasan fitur dalam 2–3 kalimat.
- Role yang terlibat dan hak aksesnya.
- Endpoint API yang digunakan.
- Komponen atau halaman yang perlu dibangun/dimodifikasi.

---

## 2. Rancangan Solusi Frontend (Solution Design)

Setelah kebutuhan jelas, susun solusi teknis yang mencakup UI, data, dan keamanan.

### 2.1 Desain UI/UX
- Tentukan **layout halaman** (apakah bagian dari dashboard dengan sidebar, atau halaman publik penuh).
- Pilih **komponen shadcn** yang sesuai (`Card`, `Table`, `Form`, `Dialog`, dll.) dan **komponen shared** (`DataTable`, `StatCard`, `EmptyState`).
- Pastikan desain mengikuti **prinsip mobile-first** dan **aksesibilitas** (misal: warna kontras, label form, fokus keyboard).
- Sertakan sketsa sederhana atau deskripsi alur interaksi.

### 2.2 Desain Data Flow
- **Endpoint API** yang akan dipanggil, termasuk method, query params, body.
- **State management:**
  - **Server state** → custom hook di `src/hooks/` dengan TanStack Query (`useQuery`, `useMutation`).
  - **UI state** → `useState` lokal (misal: selected tab, dialog open/close).
  - **Form state** → React Hook Form + Zod.
- **Caching & invalidation:** tentukan query keys dan kapan harus invalidate setelah mutasi.

### 2.3 Navigasi & Routing
- Apakah perlu rute baru? Tentukan path di dalam `(dashboard)/...` atau `(public)/...`.
- Pastikan proteksi role (misal halaman admin hanya bisa diakses admin) menggunakan layout guard dan/atau komponen `<RoleGuard>`.

### 2.4 Keamanan Frontend
- **Token JWT** hanya disimpan di `localStorage`, dikirim via interceptor Axios.
- **Validasi input** di sisi klien menggunakan Zod (selain validasi server).
- **XSS Prevention:** hindari `dangerouslySetInnerHTML` kecuali dengan sanitasi. Gunakan `{text}` aman.
- **Role-Based UI:** sembunyikan elemen dengan `useAuth().hasRole()`, tapi jangan andalkan hanya penyembunyian – backend tetap harus mengotorisasi.

---

## 3. Pembuatan Subtask (Task Breakdown)

Pecah solusi menjadi tugas-tugas kecil berurutan yang mendukung TDD. Sertakan **regression check** untuk modul terkait.

### 3.1 Subtask Standar untuk Fitur Baru
1. **QA:** Tulis unit test untuk custom hook (Red) – mock `apiClient`.
2. **Frontend:** Implementasi hook (Green).
3. **QA:** Tulis integration test untuk komponen/halaman (Red) – menggunakan React Testing Library.
4. **Frontend:** Buat komponen/halaman dengan markup + hook (Green).
5. **QA:** Tulis E2E test untuk alur utama (Red) – Playwright.
6. **Frontend:** Lengkapi interaksi hingga E2E lulus (Green).
7. **UI/UX Designer:** Review tampilan, responsivitas, aksesibilitas.
8. **Security Analyst:** Periksa penyimpanan token, validasi input, potensi XSS.
9. **Semua:** Refactor kode (Refactor).
10. **QA:** Jalankan **regression test suite** – pastikan halaman/komponen lain tidak rusak.
11. **QA:** Pastikan semua test (baru & lama) hijau.

### 3.2 Format Subtask
Setiap subtask harus memiliki:
- **Nama tugas** (jelas, kata kerja).
- **Peran** yang bertanggung jawab.
- **Kriteria selesai** (test lulus, tampilan sesuai desain, tidak ada error, dll.).

---

## 4. Tinjauan Pra-Implementasi (Pre-Implementation Review)

Sebelum menulis kode, lakukan tinjauan pada rancangan.

### 4.1 Aspek UI/UX & Aksesibilitas
- Apakah desain sudah responsif? (mobile, tablet, desktop)
- Apakah komponen yang dipilih dari shadcn/shared sudah sesuai?
- Apakah ada empty state, loading skeleton, dan pesan error?
- Apakah warna kontras cukup untuk teks di atas background?
- Apakah form memiliki label dan pesan error yang jelas?

### 4.2 Aspek Keamanan (Security Analyst)
- Apakah token disimpan di `localStorage`? (tidak ada di URL atau cookie yang rentan)
- Apakah input pengguna divalidasi dengan Zod sebelum dikirim?
- Apakah ada penggunaan `dangerouslySetInnerHTML`? Jika iya, pastikan sudah disanitasi.
- Apakah data sensitif (password) tidak ditampilkan?

### 4.3 Aspek Performa (Frontend)
- Apakah halaman dapat di-render sebagai **Server Component** (jika tidak perlu interaktivitas berat)? Jika ya, gunakan untuk mengurangi JS di klien.
- Apakah komponen berat (modals, drawer) di-load secara lazy (`next/dynamic`)?
- Apakah gambar menggunakan `next/image` untuk optimasi?

### 4.4 Aspek Tipe Data (TypeScript)
- Apakah semua props memiliki tipe eksplisit (tidak `any`)?
- Apakah interface diimpor dari `src/types/index.ts`?
- Apakah response API di-wrap dengan tipe yang sesuai?

**Keputusan:** Jika ada risiko atau pelanggaran, rancangan harus diperbaiki sebelum menulis kode.

---

## 5. Generasi Kode (Code Generation – TDD Cycle)

Mulai siklus TDD setelah desain disetujui.

### 5.1 Red Phase
- **QA Engineer** menulis test yang gagal:
  - **Unit test** untuk custom hook (mock Axios, pastikan query key, data transform).
  - **Integration test** untuk komponen (render, interaksi, panggilan API).
  - **E2E test** untuk skenario penuh (user login, navigasi, isi form, submit).

### 5.2 Green Phase
- **Frontend Engineer** menulis kode minimum yang lulus test:
  - **Custom hook** dengan `useQuery`/`useMutation`, definisikan query key, error handling.
  - **Komponen halaman** dengan layout yang sesuai, panggil hook, distribusikan data ke komponen anak.
  - **Form** menggunakan `react-hook-form` dengan resolver `zod`.
  - **UI/UX** pastikan semua state (loading, empty, error) tertangani dengan skeleton, EmptyState, dan toast.
  - **Role guard** jika diperlukan.

### 5.3 Refactor Phase
- Semua berkolaborasi:
  - Hapus duplikasi, pecah komponen besar menjadi lebih kecil.
  - Pastikan tidak ada inline style, gunakan Tailwind.
  - Tambahkan komentar jika logika rumit.
  - Pastikan semua test tetap hijau.

---

## 6. Tinjauan Setelah Implementasi (Post-Implementation Review)

Setelah kode selesai dan test lulus, lakukan tinjauan akhir.

### 6.1 Tinjauan QA
- Apakah unit, integration, dan E2E test lulus?
- Apakah coverage minimal 70% (atau sesuai kesepakatan)?
- Apakah edge case sudah diuji (misal: API gagal, data kosong, role tidak sah)?
- Apakah regression test pada modul terkait lulus?

### 6.2 Tinjauan UI/UX
- Apakah tampilan sesuai dengan rancangan (warna, spacing, typography)?
- Apakah responsif di breakpoint mobile (sidebar menjadi drawer, tabel bisa scroll horizontal).
- Apakah aksesibilitas dasar terpenuhi: navigasi keyboard, fokus terlihat, atribut `aria` jika perlu.
- Apakah loading state dan empty state ditampilkan dengan baik?

### 6.3 Tinjauan Keamanan
- Apakah token JWT tidak terekspos di URL atau console?
- Apakah input pengguna divalidasi dengan Zod? (cek duplikasi validasi dengan backend)
- Apakah tidak ada dependensi baru yang memiliki CVE High/Critical? (`npm audit`)

### 6.4 Tinjauan Performa
- Jalankan Lighthouse di halaman yang baru. Pastikan skor Performance ≥ 80, Accessibility ≥ 90.
- Periksa ukuran bundle (gunakan `@next/bundle-analyzer` jika perlu). Komponen besar seharusnya di-lazy load.

### 6.5 Tinjauan CI/CD
- Pastikan kode akan di-push ke branch `dev` atau branch fitur.
- Pastikan pipeline CI/CD (lint, test, build) akan berhasil.
- Jika ada perubahan pada `package.json` atau dependensi, pastikan lock file terbarui dan kompatibel.

---

## 7. Penyelesaian & Definition of Done

Suatu fitur dianggap **selesai** hanya jika **semua** kriteria berikut terpenuhi:

- [ ] Semua unit, integration, dan E2E test **lulus 100%**.
- [ ] Tidak ada penggunaan `any` tanpa alasan jelas (disetujui oleh TypeScript reviewer).
- [ ] Desain sesuai dengan PRD dan style guide (warna, font, spacing).
- [ ] Responsif di mobile, tablet, dan desktop.
- [ ] Aksesibilitas dasar terpenuhi (kontras, label, keyboard).
- [ ] Komponen shared baru didokumentasikan (minimal JSDoc props).
- [ ] Tidak ada kerentanan CVE High/Critical pada dependensi.
- [ ] CI/CD pipeline **hijau** (lint, test, build sukses) di branch target.
- [ ] Kode sudah di-review dan disetujui oleh minimal satu peran lain (Frontend/QA/Design).
- [ ] Commit mengikuti format [Conventional Commits](https://www.conventionalcommits.org/).

Jika semua kotak tercentang, task dipindahkan ke **Done**.

---

## 8. Contoh Alur Lengkap (Fitur: Halaman Pendaftaran Qurban Jamaah)

1. **Analisis Kebutuhan:** Jamaah ingin mendaftar qurban baru. Endpoint `POST /qurban/registrations` (akses: jamaah, admin, petugas). Sudah jelas.
2. **Rancangan Solusi:**
   - **UI:** Halaman form di `/dashboard/qurban/my-registrations/new`. Gunakan `Card` + `Form`. Submit → redirect ke daftar dengan toast sukses.
   - **Data:** Custom hook `useCreateRegistration` dengan `useMutation` + `invalidateQueries(['qurban-registrations'])`.
   - **Keamanan:** Form divalidasi Zod, token otomatis disisipkan interceptor. Halaman hanya bisa diakses oleh role `jamaah` (cek via layout).
   - **Routing:** Tambahkan folder `(dashboard)/qurban/my-registrations/new/page.tsx`.
3. **Subtask:**
   - [ ] QA: Tulis unit test `useCreateRegistration` (mock apiClient) – Red
   - [ ] Frontend: Buat hook – Green
   - [ ] QA: Tulis integration test untuk halaman form (isi field, submit) – Red
   - [ ] Frontend: Buat halaman form dengan `react-hook-form`, Zod, dan submit – Green
   - [ ] UI/UX: Cek tampilan, loading state, toast.
   - [ ] QA: Tulis E2E test (login sebagai jamaah, navigasi, isi form, lihat daftar) – Red, lalu Green.
   - [ ] Refactor.
   - [ ] Regression test: pastikan halaman my-registrations tidak rusak.
4. **Tinjauan Pra-Implementasi:**
   - UI/UX: Form sudah ada label, tombol submit, responsif.
   - Keamanan: Tidak ada XSS, token di header.
   - TypeScript: DTO dengan Zod, tipe respons dari `QurbanRegistration`.
5. **Generasi Kode:** TDD seperti di atas.
6. **Tinjauan Pasca:**
   - QA: Semua test lulus, coverage 85%.
   - Aksesibilitas: Form fokus, label terbaca.
   - Performa: Halaman kecil, Lighthouse 95.
   - CI/CD: Build sukses.
7. **Selesai:** Centang DoD, commit `feat(qurban): add registration form for jamaah`.

---

*Workflow ini memastikan setiap kode frontend yang dihasilkan teruji, aman, responsif, aksesibel, dan siap produksi.*