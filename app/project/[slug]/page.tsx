import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, FolderOpenDot, ShieldCheck } from 'lucide-react';
import { DownloadLink } from '@/components/download-link';
import { ProtectedAssetPreview } from '@/components/protected-asset-preview';
import { getProjectBySlug, getProjects } from '@/lib/data';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const otherProjects = (await getProjects()).filter((item) => item.slug !== project.slug).slice(0, 6);

  return (
    <main className="relative isolate min-h-screen overflow-hidden py-6 text-[var(--text)] md:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="halo-orb -left-24 top-20 h-80 w-80" />
        <div className="halo-orb -right-24 bottom-[12%] h-96 w-96 bg-[radial-gradient(circle,rgba(230,0,118,0.2),transparent_70%)]" />
      </div>

      <div className="section-shell relative z-10 space-y-6 md:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="btn-secondary px-5 py-3 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="status-pill gap-2 font-mono-ui uppercase tracking-[0.12em]">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
        </div>

        <section className="surface-panel overflow-hidden">
          <div className="neo-window-bar">
            <p className="section-label">Project Case Study</p>
            <p className="font-mono-ui hidden text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--muted)] sm:block">Hafiz Al Fariz</p>
          </div>

          <div className="grid gap-8 p-5 sm:p-7 md:p-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="space-y-6">
              <div>
                <p className="section-label">Project Detail</p>
                <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.075em] md:text-7xl"><span className="gradient-text">{project.title}</span></h1>
                <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[var(--muted)]">{project.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bento-card p-5">
                  <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Category</p>
                  <p className="mt-3 text-sm font-extrabold text-[var(--text)]">{project.category}</p>
                </div>
                <div className="bento-card p-5">
                  <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Year</p>
                  <p className="mt-3 text-sm font-extrabold text-[var(--text)]">{project.year}</p>
                </div>
                <div className="bento-card p-5">
                  <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Client</p>
                  <p className="mt-3 text-sm font-extrabold text-[var(--text)]">{project.client_name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <DownloadLink href={`/api/projects/${project.slug}/download`} />
                <ProtectedAssetPreview slug={project.slug} title={project.title} items={project.gallery} />
              </div>

              <div className="bento-card p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--primary)]" />
                  <p className="text-sm font-semibold leading-7 text-[var(--muted)]">
                    Semua preview dan hasil download tetap memakai watermark Hafiz Al Fariz untuk menjaga identitas author.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bento-card overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-2)]">
                  <img src={project.cover_url} alt={project.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 font-mono-ui text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900 backdrop-blur">Protected Preview</div>
                </div>
                <div className="p-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--muted)]">Visual preview with protected flow</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.slice(0, 2).map((item, index) => (
                  <div key={`${item.url}-${index}`} className="bento-card p-5">
                    <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Image {index + 1}</p>
                    <p className="mt-3 text-sm font-semibold leading-7 text-[var(--text)]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {project.gallery.length > 0 ? (
          <section className="surface-panel space-y-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white">
                <FolderOpenDot className="h-4 w-4" />
              </span>
              <p className="section-label">Preview Sequence</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.gallery.map((item, index) => (
                <div key={`${item.url}-${index}`} className="bento-card overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
                    <img src={item.url} alt={item.label} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Preview {index + 1}</p>
                    <p className="mt-3 text-sm font-semibold leading-7 text-[var(--text)]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-5 pt-4">
          <div>
            <p className="section-label">Other Creative Works</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.06em] text-[var(--text)]">Continue exploring the portfolio loop.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map((item) => (
              <Link key={item.id} href={`/project/${item.slug}`} className="bento-card p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="section-label">{item.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--text)]">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[var(--muted)]">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
