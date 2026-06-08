import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-screen flex-col items-center justify-center py-12 text-center">
      <div className="surface-panel w-full max-w-xl p-6 md:p-8">
        <p className="section-label mx-auto">404</p>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.07em] text-[var(--text)]">Project not found</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm font-medium leading-7 text-[var(--muted)]">
          Project ini belum tersedia atau slug sudah berubah. Silakan kembali ke halaman portfolio.
        </p>
        <Link href="/" className="btn-primary mt-8 px-6 py-3 text-sm">
          Back Home
        </Link>
      </div>
    </main>
  );
}
