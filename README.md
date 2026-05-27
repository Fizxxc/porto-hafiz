# Hafiz Al Fariz Vault v2.1

Portfolio Next.js + Supabase dengan UI/UX neobrutalism untuk Hafiz Al Fariz.

## Update v2.1

- Hero dibuat ulang supaya lebih premium, rapi, dan tidak tertutup elemen dekoratif.
- Elemen background sekarang berada di layer belakang sehingga tidak menutup teks, button, atau card.
- Navbar top neobrutalist baru dengan brand `Hafiz Al Fariz`.
- Project detail dan protected preview modal ikut diselaraskan ke gaya neobrutalism.
- Database SQL tetap digabung menjadi satu file: `sql/database.sql`.

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
