# Hafiz Al Fariz Vault v3.0

Portfolio Next.js + Supabase dengan UI/UX contemporary untuk Hafiz Al Fariz: bento grid, dark mode support, typography expressive, dan dashboard admin yang nyaman di HP maupun desktop.

## Update v3.0

- UI utama diganti ke konsep **Contemporary** sesuai file design: minimalist, bold, playful, bento grids, dan dark mode support.
- Elemen dekoratif tidak lagi menutupi konten; semua aksen dipindah ke background layer yang aman.
- Homepage, navbar, footer, project detail, project card, download dock, dan internal browser dirapikan dengan token warna `#C800DF` dan `#E60076`.
- Dashboard admin dirombak menjadi layout bento responsive: form project, profile, content, AI studio, dan security log lebih enak di HP serta desktop.
- Input, button, focus state, status pill, dan touch target dibuat konsisten serta accessible.
- Database tetap satu file: `sql/database.sql`.
- Admin email utama `kographh@gmail.com` dan user id `5945e93f-cb5a-498d-93d9-dbe9ab9d5ede` sudah disiapkan di SQL.

## Setup

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build check

```bash
npx tsc --noEmit
npm run build
```

Catatan: build bisa butuh environment Supabase yang valid ketika Next.js mengumpulkan page data.

## Database

Import satu file ini ke Supabase SQL editor:

```text
sql/database.sql
```

## Branding

Semua branding utama menggunakan nama:

```text
Hafiz Al Fariz
```

Watermark download dan metadata image juga menggunakan identitas Hafiz Al Fariz.

## Admin Access

Email admin utama: `kographh@gmail.com`.
User ID admin yang sudah ditambahkan di SQL: `5945e93f-cb5a-498d-93d9-dbe9ab9d5ede`.

Langkah aktivasi di Supabase:
1. Buka **Authentication > Users**.
2. Pastikan user dengan ID di atas atau email `kographh@gmail.com` sudah ada.
3. Jalankan ulang `sql/database.sql` di **SQL Editor**.
4. Logout/login ulang di website, lalu buka `/admin`.

Kalau mau tambah admin lain, tambahkan user id ke tabel `public.admin_users` dan pastikan RLS policy `Admin users can read own row` tetap aktif.
