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
    <main className="relative isolate min-h-screen overflow-hidden px-5 py-10 text-[#111] md:px-10 md:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="neo-orb soft -left-24 top-20 h-72 w-72 rounded-full bg-[#7df9ff]" />
        <div className="neo-orb soft -right-24 bottom-[12%] h-80 w-80 rounded-full bg-[#ff5ca8]" />
        <div className="halftone absolute right-10 top-28 h-36 w-36 opacity-30" />
        <div className="halftone absolute bottom-12 left-8 h-40 w-40 opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="brutal-button bg-[#fffdf2] px-5 py-3 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="brutal-pill bg-[#ffb000] px-4 py-2 text-xs uppercase tracking-[0.18em]">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
        </div>

        <section className="neo-window brutal-panel bg-[#fffdf2]">
          <div className="neo-window-bar">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#111] bg-[#ff5ca8]" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#111] bg-[#ffb000]" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#111] bg-[#7df9ff]" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#111]/65">Project Case Study</p>
          </div>

          <div className="grid gap-8 p-5 sm:p-7 md:p-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="space-y-6">
              <div>
                <p className="section-label bg-[#7df9ff]">Project Detail</p>
                <h1 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.09em] text-[#111] md:text-7xl">{project.title}</h1>
                <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#111]/80">{project.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="neo-stat bg-[#d7ff31]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">Category</p>
                  <p className="mt-3 text-sm font-bold text-[#111]">{project.category}</p>
                </div>
                <div className="neo-stat bg-[#7df9ff]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">Year</p>
                  <p className="mt-3 text-sm font-bold text-[#111]">{project.year}</p>
                </div>
                <div className="neo-stat bg-[#ffb000]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">Client</p>
                  <p className="mt-3 text-sm font-bold text-[#111]">{project.client_name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <DownloadLink href={`/api/projects/${project.slug}/download`} />
                <ProtectedAssetPreview slug={project.slug} title={project.title} items={project.gallery} />
              </div>

              <div className="brutal-card bg-[#ff5ca8] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#111]" />
                  <p className="text-sm font-black leading-7 text-[#111]">
                    Semua preview dan hasil download tetap memakai watermark Hafiz Al Fariz untuk menjaga identitas author.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="brutal-panel overflow-hidden bg-[#fffdf2]">
                <div className="relative aspect-[4/5] overflow-hidden border-b-[3px] border-[#111] bg-[#111]">
                  <img src={project.cover_url} alt={project.title} className="h-full w-full object-cover" />
                  <div className="absolute left-4 top-4 rounded-full border-[3px] border-[#111] bg-[#d7ff31] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_#111]">Protected Preview</div>
                </div>
                <div className="bg-[#d7ff31] p-4 text-sm font-black uppercase tracking-[0.16em] text-[#111]">Visual preview with protected flow</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.slice(0, 2).map((item, index) => (
                  <div key={`${item.url}-${index}`} className={`${index % 2 ? 'bg-[#ff5ca8]' : 'bg-[#7df9ff]'} brutal-card p-5`}>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">Image {index + 1}</p>
                    <p className="mt-3 text-sm font-semibold leading-7 text-[#111]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {project.gallery.length > 0 ? (
          <section className="brutal-panel space-y-5 bg-[#fffdf2] p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border-[3px] border-[#111] bg-[#ffb000] p-3 shadow-[4px_4px_0_#111]">
                <FolderOpenDot className="h-4 w-4 text-[#111]" />
              </span>
              <p className="section-label bg-[#7df9ff]">Preview Sequence</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.gallery.map((item, index) => (
                <div key={`${item.url}-${index}`} className={`${index % 3 === 0 ? 'bg-[#d7ff31]' : index % 3 === 1 ? 'bg-[#7df9ff]' : 'bg-[#ff5ca8]'} brutal-card overflow-hidden`}>
                  <div className="aspect-[4/3] overflow-hidden border-b-[3px] border-[#111] bg-[#111]">
                    <img src={item.url} alt={item.label} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">Preview {index + 1}</p>
                    <p className="mt-3 text-sm font-semibold leading-7 text-[#111]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-5 pt-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label bg-[#ffb000]">Other Creative Works</p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.07em] text-[#111]">Continue exploring the portfolio loop.</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map((item, index) => (
              <Link key={item.id} href={`/project/${item.slug}`} className={`${index % 2 ? 'bg-[#fffdf2]' : 'bg-[#d7ff31]'} brutal-card p-5`}>
                <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">
                  <span>{item.category}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight tracking-[-0.05em] text-[#111]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#111]/75">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
