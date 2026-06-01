```markdown
# API Contract – Masjidfy

**Versi:** 2.0  
**Base URL:** `/api`  
**Format:** JSON (camelCase)  
**Autentikasi:** JWT Bearer Token (kecuali endpoint publik)

> **Catatan:** `TransformInterceptor` belum didaftarkan secara global. Response saat ini dikembalikan langsung dari service tanpa wrapper `{ statusCode, message, data }`. Halaman ini mendokumentasikan kontrak aktual dari implementasi saat ini.

---

## 1. Auth

### 1.1 Register
- **Method:** `POST`
- **Path:** `/auth/register`
- **Deskripsi:** Pendaftaran jamaah baru. Akun default tidak aktif (`isActive: false`), otomatis mendapat role `jamaah`.
- **Request Body:**
  ```json
  {
    "username": "string (min 3, unique)",
    "email": "string (email format, unique)",
    "password": "string (min 6)",
    "fullName": "string"
  }
  ```
- **Response Success (201):**
  ```json
  {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "isActive": false,
    "createdAt": "datetime"
  }
  ```
- **Error Responses:**
  - `409 Conflict` – Username atau email sudah digunakan.
  - `400 Bad Request` – Validasi input gagal.

### 1.2 Login
- **Method:** `POST`
- **Path:** `/auth/login`
- **Deskripsi:** Mendapatkan access token JWT. Menerima username atau email.
- **Request Body:**
  ```json
  {
    "username": "string (username atau email)",
    "password": "string"
  }
  ```
- **Response Success (200):**
  ```json
  {
    "accessToken": "string (JWT)",
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "fullName": "string",
      "roles": ["string"]
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` – Kredensial salah.
  - `403 Forbidden` – Akun belum diverifikasi/dinonaktifkan.

### 1.3 Profil Sendiri
- **Method:** `GET`
- **Path:** `/auth/me`
- **Deskripsi:** Mendapatkan data pengguna yang sedang login.
- **Headers:** `Authorization: Bearer <token>`
- **Response Success (200):**
  ```json
  {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "phone": "string|null",
    "address": "string|null",
    "isActive": true,
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "roles": [
      {
        "role": {
          "id": "uuid",
          "name": "string"
        }
      }
    ]
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` – Token tidak valid/kadaluarsa.

---

## 2. Users

### 2.1 Daftar Semua User (Admin)
- **Method:** `GET`
- **Path:** `/users`
- **Deskripsi:** Mendapatkan daftar pengguna dengan paginasi, pencarian, filter.
- **Headers:** `Authorization: Bearer <token>` (admin/superadmin)
- **Query Parameters:**
  - `page` (int, default 1)
  - `limit` (int, default 10)
  - `search` (string) – cari nama/username/email
  - `is_active` (boolean) – filter status aktif
  - `role` (string) – filter nama peran
- **Response Success (200):**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "username": "string",
        "email": "string",
        "fullName": "string",
        "phone": "string|null",
        "isActive": true,
        "createdAt": "datetime"
      }
    ],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`
  - `403 Forbidden` – Bukan admin/superadmin.

### 2.2 Detail User
- **Method:** `GET`
- **Path:** `/users/:id`
- **Deskripsi:** Mendapatkan detail satu pengguna.
- **Headers:** `Authorization: Bearer <token>` (admin/superadmin)
- **Response Success (200):**
  ```json
  {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "phone": "string|null",
    "address": "string|null",
    "isActive": true,
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "roles": [
      {
        "role": {
          "id": "uuid",
          "name": "string"
        }
      }
    ]
  }
  ```
- **Error Responses:**
  - `404 Not Found` – User tidak ditemukan.

### 2.3 Buat User Baru (Admin)
- **Method:** `POST`
- **Path:** `/users`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Request Body:**
  ```json
  {
    "username": "string (min 3, unique)",
    "email": "string (email, unique)",
    "password": "string (min 6)",
    "fullName": "string",
    "phone": "string (optional)",
    "address": "string (optional)",
    "role_ids": ["uuid", "uuid"]
  }
  ```
- **Response Success (201):**
  ```json
  {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "phone": "string|null",
    "address": "string|null",
    "isActive": true,
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
  ```
- **Error Responses:**
  - `409 Conflict` – Username atau email sudah ada.
  - `400 Bad Request` – Validasi gagal.

### 2.4 Update User (Admin)
- **Method:** `PATCH`
- **Path:** `/users/:id`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Request Body (semua opsional):**
  ```json
  {
    "fullName": "string",
    "phone": "string",
    "address": "string",
    "password": "string (min 6)"
  }
  ```
- **Response Success (200):**
  ```json
  {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "phone": "string|null",
    "address": "string|null",
    "isActive": true,
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
  ```
- **Error Responses:**
  - `404 Not Found` – User tidak ditemukan.

### 2.5 Hapus User (Soft Delete)
- **Method:** `DELETE`
- **Path:** `/users/:id`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Deskripsi:** Soft delete — mengubah `isActive` menjadi `false`.
- **Response Success (200):**
  ```json
  {
    "deleted": true
  }
  ```

### 2.6 Assign Role ke User
- **Method:** `POST`
- **Path:** `/users/:id/roles`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Request Body:**
  ```json
  {
    "userId": "uuid",
    "roleId": "uuid"
  }
  ```
- **Response Success (201):**
  ```json
  {
    "userId": "uuid",
    "roleId": "uuid",
    "user": {
      "id": "uuid",
      "username": "string",
      "fullName": "string"
    },
    "role": {
      "id": "uuid",
      "name": "string",
      "description": "string"
    }
  }
  ```

---

## 3. Roles & Permissions

### 3.1 Daftar Role
- **Method:** `GET`
- **Path:** `/roles`
- **Headers:** `Authorization: Bearer <token>` (admin/superadmin)
- **Response Success (200):**
  ```json
  [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "permissions": [
        {
          "permission": {
            "id": "uuid",
            "name": "string"
          }
        }
      ],
      "_count": {
        "users": 2
      },
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ]
  ```

### 3.2 Buat Role Baru
- **Method:** `POST`
- **Path:** `/roles`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Request Body:**
  ```json
  {
    "name": "string (unique)",
    "description": "string (optional)",
    "permission_ids": ["uuid", "uuid"]
  }
  ```
- **Response Success (201):**
  ```json
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "permissions": [...],
    "_count": { "users": 0 },
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
  ```
- **Error Responses:**
  - `409 Conflict` – Role sudah ada.

### 3.3 Update Role
- **Method:** `PATCH`
- **Path:** `/roles/:id`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Request Body:**
  ```json
  {
    "name": "string (optional)",
    "description": "string (optional)",
    "permission_ids": ["uuid"]  // mengganti semua permission
  }
  ```
- **Response Success (200):** Sama seperti create.

### 3.4 Hapus Role
- **Method:** `DELETE`
- **Path:** `/roles/:id`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Response Success (200):**
  ```json
  {
    "deleted": true
  }
  ```

### 3.5 Assign Role (via Roles Controller)
- **Method:** `POST`
- **Path:** `/roles/assign`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Request Body:**
  ```json
  {
    "userId": "uuid",
    "roleId": "uuid"
  }
  ```
- **Response Success (201):** Sama seperti assign via users/:id/roles.
- **Error Responses:**
  - `404` – User atau role tidak ditemukan.
  - `409` – User sudah memiliki role tersebut.

### 3.6 Remove Role dari User
- **Method:** `DELETE`
- **Path:** `/roles/:userId/:roleId`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Response Success (200):**
  ```json
  {
    "deleted": true
  }
  ```

### 3.7 Daftar Permission
- **Method:** `GET`
- **Path:** `/permissions`
- **Headers:** `Authorization: Bearer <token>` (superadmin)
- **Response Success (200):**
  ```json
  [
    {
      "id": "uuid",
      "name": "string (e.g., manage_users)",
      "resource": "string",
      "action": "string",
      "createdAt": "datetime"
    }
  ]
  ```

---

## 4. Qurban

### 4.1 Pendaftaran Qurban
- **Method:** `POST`
- **Path:** `/qurban/registrations`
- **Headers:** `Authorization: Bearer <token>` (jamaah/admin/petugas_qurban)
- **Request Body:**
  ```json
  {
    "participant_name": "string",
    "group_name": "string|null",
    "contact_phone": "string",
    "animal_type": "cow | goat",
    "amount": 2500000,
    "method": "cash | transfer"
  }
  ```
- **Response Success (201):**
  ```json
  {
    "statusCode": 201,
    "message": "Pendaftaran qurban berhasil",
    "data": {
      "id": "uuid",
      "participant_name": "string",
      "status": "pending",
      "payment": {
        "amount": 2500000,
        "status": "dp",
        "method": "transfer"
      },
      "created_at": "datetime"
    }
  }
  ```

### 4.2 Daftar Pendaftaran (Admin)
- **Method:** `GET`
- **Path:** `/qurban/registrations`
- **Headers:** `Authorization: Bearer <token>` (admin/petugas/bendahara)
- **Query:** `page`, `limit`, `status`, `animal_type`, `search`
- **Response Success (200):** `{ "statusCode": 200, "data": [...], "meta": {...} }`

### 4.3 Pendaftaran Saya (Jamaah)
- **Method:** `GET`
- **Path:** `/qurban/my-registrations`
- **Headers:** `Authorization: Bearer <token>` (jamaah)
- **Response Success (200):** Daftar pendaftaran milik sendiri.

### 4.4 Detail Pendaftaran
- **Method:** `GET`
- **Path:** `/qurban/registrations/:id`
- **Headers:** `Authorization: Bearer <token>` (admin/petugas/pemilik)

### 4.5 Verifikasi/Ubah Status Pendaftaran
- **Method:** `PATCH`
- **Path:** `/qurban/registrations/:id/status`
- **Headers:** `Authorization: Bearer <token>` (admin/petugas)
- **Request Body:**
  ```json
  {
    "status": "pending | verified | cancelled"
  }
  ```

### 4.6 Hewan Qurban
- **Tambah Hewan:** `POST /qurban/animals` (admin/petugas)
- **Daftar Hewan:** `GET /qurban/animals` (admin/petugas/bendahara)
- **Detail Hewan:** `GET /qurban/animals/:id`
- **Update Hewan:** `PATCH /qurban/animals/:id`
- **Hapus Hewan:** `DELETE /qurban/animals/:id` (admin, jika belum terkait)

Request/response sesuai spesifikasi modul qurban.

### 4.7 Pembayaran Qurban
- **Catat Pembayaran:** `POST /qurban/payments` (bendahara/admin)
- **Riwayat Pembayaran:** `GET /qurban/registrations/:id/payments`
- **Update Pembayaran:** `PATCH /qurban/payments/:id`

### 4.8 Distribusi Daging
- **Catat Distribusi:** `POST /qurban/distributions` (petugas/admin)
- **Daftar Distribusi:** `GET /qurban/distributions`
- **Distribusi per Hewan:** `GET /qurban/animals/:id/distributions`

---

## 5. Zakat

### 5.1 Transaksi Penerimaan ZIS

#### 5.1.1 Catat Penerimaan
- **Method:** `POST`
- **Path:** `/zakat/transactions`
- **Headers:** `Authorization: Bearer <token>` (bendahara/admin/petugas_zakat)
- **Request Body:**
  ```json
  {
    "type": "zakat_fitrah | zakat_maal | infaq | sedekah | fidyah",
    "amount": 150000,
    "transactionDate": "2026-06-01T00:00:00.000Z",
    "method": "cash | transfer",
    "muzakkiId": "uuid (optional)",
    "notes": "string (optional)"
  }
  ```
- **Response Success (201):**
  ```json
  {
    "id": "uuid",
    "type": "zakat_maal",
    "amount": 150000,
    "transactionDate": "2026-06-01T00:00:00.000Z",
    "method": "cash",
    "muzakkiId": null,
    "recordedById": "uuid",
    "notes": "Zakat maal bulanan",
    "createdAt": "datetime"
  }
  ```
- **Error Responses:**
  - `400 Bad Request` – Validasi input gagal.

#### 5.1.2 Daftar Transaksi
- **Method:** `GET`
- **Path:** `/zakat/transactions`
- **Headers:** `Authorization: Bearer <token>` (bendahara/admin/petugas_zakat)
- **Query Parameters:**
  - `page` (int, default 1)
  - `limit` (int, default 10)
  - `type` (string) – filter jenis zakat
  - `dateFrom` (string, ISO date) – filter tanggal awal
  - `dateTo` (string, ISO date) – filter tanggal akhir
  - `muzakkiId` (string) – filter pemberi
- **Response Success (200):**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "type": "zakat_maal",
        "amount": 150000,
        "transactionDate": "datetime",
        "method": "cash",
        "muzakkiId": null,
        "recordedById": "uuid",
        "notes": null,
        "createdAt": "datetime"
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
  ```

#### 5.1.3 Detail Transaksi
- **Method:** `GET`
- **Path:** `/zakat/transactions/:id`
- **Headers:** `Authorization: Bearer <token>` (bendahara/admin/petugas_zakat)
- **Response Success (200):**
  ```json
  {
    "id": "uuid",
    "type": "zakat_maal",
    "amount": 150000,
    "transactionDate": "datetime",
    "method": "cash",
    "muzakkiId": null,
    "recordedById": "uuid",
    "notes": "string|null",
    "createdAt": "datetime",
    "muzakki": { "id": "uuid", "name": "string" } | null,
    "recordedBy": { "id": "uuid", "username": "string" }
  }
  ```
- **Error Responses:**
  - `404 Not Found` – Transaksi tidak ditemukan.

#### 5.1.4 Update Transaksi
- **Method:** `PATCH`
- **Path:** `/zakat/transactions/:id`
- **Headers:** `Authorization: Bearer <token>` (bendahara/admin)
- **Request Body (semua opsional):**
  ```json
  {
    "type": "zakat_fitrah",
    "amount": 200000,
    "transactionDate": "2026-06-15T00:00:00.000Z",
    "method": "transfer",
    "muzakkiId": "uuid",
    "notes": "string"
  }
  ```
- **Response Success (200):** Sama seperti detail.
- **Error Responses:**
  - `404 Not Found` – Transaksi tidak ditemukan.

#### 5.1.5 Hapus Transaksi
- **Method:** `DELETE`
- **Path:** `/zakat/transactions/:id`
- **Headers:** `Authorization: Bearer <token>` (admin)
- **Response Success (200):**
  ```json
  {
    "deleted": true
  }
  ```
- **Error Responses:**
  - `404 Not Found` – Transaksi tidak ditemukan.

### 5.2 Muzakki (Pemberi)

#### 5.2.1 Daftar Muzakki
- **Method:** `GET`
- **Path:** `/zakat/muzakkis`
- **Akses:** bendahara/admin/petugas_zakat
- **Query:**
  ```json
  { "page": 1, "limit": 10, "search": "Satu" }
  ```
- **Response 200:**
  ```json
  {
    "data": [{ "id": "uuid", "name": "Muzakki Satu", "phone": "08123456789", "address": "Jakarta", "isAnonymous": false, "createdAt": "2026-06-01T00:00:00.000Z" }],
    "meta": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
  }
  ```

#### 5.2.2 Tambah Muzakki
- **Method:** `POST`
- **Path:** `/zakat/muzakkis`
- **Akses:** bendahara/admin/petugas_zakat
- **Request Body:**
  ```json
  { "name": "Muzakki Satu", "phone": "08123456789", "address": "Jakarta" }
  ```
  Keterangan:
  - `name` (string, required, min 1 char)
  - `phone` (string, optional)
  - `address` (string, optional)
  - `isAnonymous` (boolean, optional, default false)
- **Response 201:**
  ```json
  { "id": "uuid", "name": "Muzakki Satu", "phone": "08123456789", "address": "Jakarta", "isAnonymous": false, "createdAt": "2026-06-01T00:00:00.000Z" }
  ```
- **Response 400:**
  ```json
  { "message": ["name must be a string"], "error": "Bad Request", "statusCode": 400 }
  ```

#### 5.2.3 Detail Muzakki
- **Method:** `GET`
- **Path:** `/zakat/muzakkis/:id`
- **Akses:** bendahara/admin/petugas_zakat
- **Response 200:**
  ```json
  { "id": "uuid", "name": "Muzakki Satu", "phone": "08123456789", "address": "Jakarta", "isAnonymous": false, "createdAt": "2026-06-01T00:00:00.000Z" }
  ```
- **Response 404:**
  ```json
  { "message": "Muzakki not found", "error": "Not Found", "statusCode": 404 }
  ```

#### 5.2.4 Update Muzakki
- **Method:** `PATCH`
- **Path:** `/zakat/muzakkis/:id`
- **Akses:** bendahara/admin
- **Request Body:**
  ```json
  { "name": "Updated Name", "phone": "08111111111" }
  ```
  (semua field optional)
- **Response 200:** (sama dengan response create)
- **Response 404:** (sama dengan not found di atas)

#### 5.2.5 Hapus Muzakki
- **Method:** `DELETE`
- **Path:** `/zakat/muzakkis/:id`
- **Akses:** admin
- **Response 200:**
  ```json
  { "deleted": true }
  ```
- **Response 404:**
  ```json
  { "message": "Muzakki not found", "error": "Not Found", "statusCode": 404 }
  ```

### 5.3 Mustahiq (Penerima)
- **Daftar Mustahiq:** `GET /zakat/mustahiqs`
- **Tambah Mustahiq:** `POST /zakat/mustahiqs`
- **Verifikasi Mustahiq:** `PATCH /zakat/mustahiqs/:id/verify`

### 5.4 Penyaluran Zakat
- **Catat Penyaluran:** `POST /zakat/distributions` (bendahara/admin/petugas)
- **Daftar Penyaluran:** `GET /zakat/distributions`

### 5.5 Kalkulator Zakat Maal
- **Method:** `POST`
- **Path:** `/zakat/calculator`
- **Akses:** Publik (tanpa token)
- **Request Body:**
  ```json
  {
    "gold_grams": 100,
    "silver_grams": 0,
    "cash_idr": 50000000,
    "trade_goods_idr": 20000000,
    "receivables_idr": 0,
    "debts_idr": 10000000
  }
  ```
- **Response Success (200):**
  ```json
  {
    "statusCode": 200,
    "data": {
      "nisab_idr": 85000000,
      "total_assets": 120000000,
      "total_debts": 10000000,
      "net_assets": 110000000,
      "zakat_due": 2750000,
      "is_obliged": true,
      "calculation_date": "2026-06-01"
    }
  }
  ```

### 5.6 Laporan Keuangan ZIS
- **Method:** `GET`
- **Path:** `/zakat/reports`
- **Query:** `year` (wajib), `month` (opsional)
- **Headers:** `Authorization: Bearer <token>` (bendahara/admin)
- **Response Success (200):** Ringkasan per jenis dana (in, out, balance).

---

## 6. Blog (Publik)

### 6.1 Daftar Postingan Publik
- **Method:** `GET`
- **Path:** `/blog/posts`
- **Query:** `page`, `limit`, `category` (slug), `tag` (slug), `search`
- **Response Success (200):**
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": "uuid",
        "title": "string",
        "slug": "string",
        "excerpt": "string",
        "featured_image_url": "string|null",
        "category": { "name": "string", "slug": "string" },
        "tags": [ { "name": "string", "slug": "string" } ],
        "author": { "full_name": "string" },
        "published_at": "datetime"
      }
    ],
    "meta": { ... }
  }
  ```

### 6.2 Detail Postingan
- **Method:** `GET`
- **Path:** `/blog/posts/:slug`
- **Response Success (200):** Full content + category + tags + author.

### 6.3 Komentar Postingan
- **Lihat Komentar:** `GET /blog/posts/:slug/comments`
- **Tambah Komentar:** `POST /blog/posts/:slug/comments` (jamaah login)

### 6.4 Kategori & Tag
- **Daftar Kategori:** `GET /blog/categories`
- **Daftar Tag:** `GET /blog/tags`

---

## 7. Blog (Admin)

### 7.1 Manajemen Postingan
- **Daftar Semua Postingan:** `GET /admin/blog/posts` (admin/penulis)
- **Buat Postingan:** `POST /admin/blog/posts`
- **Update Postingan:** `PATCH /admin/blog/posts/:id`
- **Hapus Postingan:** `DELETE /admin/blog/posts/:id`

### 7.2 Manajemen Kategori
- **Buat Kategori:** `POST /admin/blog/categories`
- **Update Kategori:** `PATCH /admin/blog/categories/:id`
- **Hapus Kategori:** `DELETE /admin/blog/categories/:id`

### 7.3 Manajemen Tag
- **Buat Tag:** `POST /admin/blog/tags`
- **Hapus Tag:** `DELETE /admin/blog/tags/:id`

### 7.4 Moderasi Komentar
- **Daftar Komentar:** `GET /admin/blog/comments` (admin)
- **Setujui/Tolak Komentar:** `PATCH /admin/blog/comments/:id`
- **Hapus Komentar:** `DELETE /admin/blog/comments/:id`

---

## 8. Response Error Standar

Semua error mengikuti format:
```json
{
  "statusCode": 400,
  "message": "Deskripsi kesalahan",
  "error": "Bad Request"  // optional
}
```

Status code umum:
- `400` – Validasi input gagal
- `401` – Belum login/token tidak valid
- `403` – Tidak memiliki izin
- `404` – Data tidak ditemukan
- `409` – Konflik (duplikasi)
- `500` – Kesalahan server internal
```

Dokumen ini memberikan gambaran lengkap kontrak API untuk seluruh modul.
