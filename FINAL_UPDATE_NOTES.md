# HAFIZ AL FARIZ — BRUTAL R3F UI/UX UPDATE V4

## UI/UX Update
- Design system diganti ke arah **Brutalism**: warna utama `#DD614C`, secondary `#DAA144`, border tebal, hard shadow, spacing 4/8/12/16/24/32, dan komponen lebih tegas.
- Homepage dirapikan supaya tidak ada dekorasi yang menutupi konten.
- Card project, navbar, footer, button, input, panel, dan label dibuat konsisten dengan gaya brutalism.
- Responsive behavior dibuat lebih aman untuk HP: touch target minimal 44px, grid lebih stabil, label bisa wrap, dan hover movement dimatikan di layar kecil.

## React Three Fiber Loading
- Menambahkan dependency `@react-three/fiber`, `three`, dan `@types/three`.
- Komponen baru: `components/brutal-loading-experience.tsx`.
- Loading page memakai Canvas React Three Fiber dengan objek 3D berputar.
- Setelah loading 100%, overlay bergerak naik keluar layar.
- Landing page ikut naik/transisi masuk dari bawah supaya terasa smooth dan detail.
- Mendukung `prefers-reduced-motion` dari global CSS.

## Admin Dashboard
- Dashboard admin dibuat ulang supaya lebih nyaman di HP dan desktop.
- Ada sticky quick navigation untuk Projects, Profile, Landing, dan AI Studio.
- Header admin lebih jelas dengan stat card Projects, Events, dan Mobile Ready.
- Access denied sekarang menampilkan user ID yang bisa langsung dipakai untuk tabel `admin_users`.
- Form lama tetap dipakai, tapi styling global diperbaiki supaya lebih rapi dan readable.

## Database/Admin
- Struktur SQL tetap satu file: `sql/database.sql`.
- Email/admin user sebelumnya tetap dipertahankan.

## Validasi
- `npx tsc --noEmit` berhasil.
- `npm run build` berhasil compile dan type-check, lalu berhenti di tahap `Collecting page data` karena worker Next.js terkena `EPIPE`/timeout di environment ini. Coba ulang di lokal/server dengan dependency sudah ter-install.
