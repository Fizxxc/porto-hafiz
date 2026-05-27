import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="section-label">404</p>
      <h1 className="mt-4 text-5xl tracking-[-0.08em]">Project not found</h1>
      <p className="mt-4 max-w-lg text-sm leading-7 text-white/[0.55]">
        Project ini belum tersedia atau slug sudah berubah. Silakan kembali ke halaman portfolio.
      </p>
      <Link href="/" className="mt-8 rounded-full border border-white bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-85">
        Back Home
      </Link>
    </main>
  );
}
