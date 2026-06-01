```markdown
# Masjidfy Frontend

Antarmuka pengguna untuk **Masjidfy** — platform manajemen masjid digital yang mencakup modul Qurban, Zakat, Blog, serta Manajemen Pengguna dan Role. Dibangun dengan **Next.js 14+ (App Router)**, **TypeScript**, **shadcn/ui**, dan **Tailwind CSS**, aplikasi ini menyediakan dashboard adaptif berbasis peran (jamaah, petugas, bendahara, admin, superadmin) dengan pengalaman pengguna yang modern, responsif, dan aksesibel.

---

## ✨ Fitur Utama

- **Multi‑Role Dashboard** — Tampilan dan menu otomatis menyesuaikan peran pengguna.
- **Autentikasi JWT** — Login, registrasi, dan proteksi rute dengan token berbasis localStorage.
- **Modul Qurban** — Pendaftaran, verifikasi, manajemen hewan, pencatatan pembayaran, dan distribusi daging.
- **Modul Zakat** — Penerimaan ZIS, manajemen muzakki & mustahiq, penyaluran, laporan keuangan, dan kalkulator zakat mal (publik).
- **Blog** — Publikasi artikel dengan dukungan SEO (SSR/ISR), komentar bertingkat, dan moderasi oleh admin.
- **Manajemen Pengguna** — Admin dapat mengelola pengguna dan role; superadmin dapat mengatur permission.
- **Responsif & Aksesibel** — Mobile‑first dengan komponen Radix UI yang memenuhi standar WCAG 2.1 AA.
- **State Management Modern** — TanStack Query untuk server state, React Context untuk auth, dan React Hook Form + Zod untuk validasi form.

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | [Next.js 14+](https://nextjs.org/) (App Router) |
| Bahasa | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Komponen UI | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Ikon | [Lucide Icons](https://lucide.dev/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Server State | [TanStack Query](https://tanstack.com/query) |
| Form & Validasi | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Notifikasi | [Sonner](https://sonner.emilkowal.ski/) |
| Tanggal | [date-fns](https://date-fns.org/) |
| Testing | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + [Playwright](https://playwright.dev/) |
| Hosting | [Vercel](https://vercel.com/) |

---

## 📋 Prasyarat

- **Node.js** versi 18 atau lebih baru
- **npm** versi 9+ (atau yarn/pnpm)
- Backend Masjidfy berjalan (default di `http://localhost:3000/api/v1` — lihat `.env.local`)

---

## ⚙️ Instalasi

1. **Clone repositori**:

   ```bash
   git clone https://github.com/username/masjidfy-frontend.git
   cd masjidfy-frontend
   ```

2. **Pasang dependensi**:

   ```bash
   npm install
   ```

3. **Salin environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Sesuaikan `NEXT_PUBLIC_API_URL` dengan URL backend Anda.

4. **Inisialisasi shadcn/ui** (jika pertama kali setelah clone):

   ```bash
   npx shadcn@latest init
   ```

   Pilih preset **Nova** (Lucide + Geist) agar sesuai dengan konfigurasi proyek.

5. **Jalankan development server**:

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Folder

```
masjidfy-frontend/
├── public/                     # Aset statis
├── src/
│   ├── app/                    # Rute Next.js (App Router)
│   │   ├── (public)/           # Rute publik: login, register, blog, kalkulator
│   │   ├── (dashboard)/        # Rute dengan autentikasi & sidebar
│   │   │   ├── qurban/
│   │   │   ├── zakat/
│   │   │   ├── blog-admin/
│   │   │   ├── users/
│   │   │   └── roles/
│   │   └── layout.tsx          # Root layout (Providers, font)
│   ├── components/
│   │   ├── ui/                 # Komponen dasar shadcn (dihasilkan)
│   │   ├── layout/             # Sidebar, Header, Breadcrumb
│   │   └── shared/             # DataTable, StatCard, EmptyState, dll.
│   ├── hooks/                  # Custom hook TanStack Query per modul
│   ├── lib/                    # api-client, auth context, roles, utils
│   ├── providers/              # QueryClientProvider, AuthProvider, Toaster
│   └── types/                  # Interface TypeScript (dari API Contract)
├── docs/                       # Dokumen analisis (PRD, SRS, API Contract)
├── .env.local                  # Environment variable (tidak di-commit)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🧪 Testing

- **Unit/Integration Test**:

  ```bash
  npm run test
  ```

- **End‑to‑End Test** (Playwright):

  ```bash
  npx playwright test
  ```

- **Lighthouse Audit** (produksi):

  ```bash
  npm run build && npm run start
  ```

  Gunakan Chrome DevTools atau [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) untuk mengukur performa dan aksesibilitas.

---

## 🚀 Deployment

Proyek dioptimalkan untuk **Vercel**. Cukup hubungkan repositori ke Vercel, atur environment variable `NEXT_PUBLIC_API_URL`, dan deploy. Alternatif lain: build produksi manual dengan:

```bash
npm run build
npm run start
```

---

## 🤝 Kontribusi

Kami mengikuti alur kerja yang tertuang di [WORKFLOW.md](./WORKFLOW.md). Secara singkat:

1. Buat branch fitur dari `dev` (contoh: `feat/qurban-registration`).
2. Tulis test terlebih dahulu (TDD).
3. Implementasi hingga test lulus.
4. Jalankan regression test.
5. Buat Pull Request ke `dev` dengan format [Conventional Commits](https://www.conventionalcommits.org/).

Pastikan Anda telah membaca [PRD.md](./PRD.md) dan [API_CONTRACT.md](./docs/API_CONTRACT.md) sebelum memulai.

---

## 📄 Dokumentasi Terkait

- [Product Requirement Document (PRD)](./PRD.md)
- [Software Requirements Specification (SRS)](./SRS.md)
- [API Contract](./docs/API_CONTRACT.md)
- [Workflow Pengembangan](./WORKFLOW.md)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

**Dibangun dengan ❤️ untuk kemaslahatan umat.**
```