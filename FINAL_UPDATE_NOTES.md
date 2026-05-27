# Final Update Notes — Hafiz Al Fariz Neobrutalism Refresh

## Update terbaru

- Hero/home page dirombak ulang supaya lebih rapi, clean, dan keren dengan konsep neobrutalism yang lebih jelas.
- Elemen dekoratif besar yang sebelumnya bisa menutupi teks/konten sudah dipindahkan ke layer background (`z-0`) dan semua section konten dibuat di atasnya (`relative z-10`).
- Shape dekoratif dibuat lebih halus/transparan dan ditempatkan di area pinggir agar tidak mengganggu readability.
- Navbar diubah dari bottom floating nav menjadi top neobrutalist navbar yang lebih mirip portfolio UI modern.
- Hero sekarang memakai layout window/panel dengan title besar `Hafiz Al Fariz`, label portfolio, CTA, profile snapshot, dan UX note.
- Card project, about, software stack, contact, dan project detail dibuat lebih konsisten: border tebal, hard shadow, spacing lebih lega, dan hierarchy lebih jelas.
- Protected preview modal dan asset preview modal ikut dirapikan ke gaya neobrutalism agar tidak lagi terasa seperti dark glass UI lama.
- Database tetap 1 file saja: `sql/database.sql`.
- Branding/metadata/watermark tetap menggunakan nama `Hafiz Al Fariz`.

## Validasi

- `npx tsc --noEmit` berhasil tanpa error.
- `npm run build` berhasil melewati compile, lint, dan type-check, tetapi proses berhenti saat tahap `Collecting page data` karena worker terkena SIGTERM di environment ini. Biasanya tahap ini perlu dicoba ulang di lokal/server dengan environment Supabase yang valid.

## File penting yang diubah

- `app/page.tsx`
- `app/project/[slug]/page.tsx`
- `app/globals.css`
- `components/navbar.tsx`
- `components/protected-asset-preview.tsx`
- `components/asset-preview-modal.tsx`
