import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, CircleDot, ExternalLink, Layers3, Sparkles, Zap } from 'lucide-react';
import { DownloadDock } from '@/components/download-dock';
import { Navbar } from '@/components/navbar';
import { InternalBrowser } from '@/components/internal-browser';
import { Footer } from '@/components/footer';
import { BrutalLoadingExperience } from '@/components/brutal-loading-experience';
import { getProfile, getProjects, getSiteContent } from '@/lib/data';

export default async function HomePage() {
  const [profile, content, projects] = await Promise.all([getProfile(), getSiteContent(), getProjects()]);
  const featured = projects.filter((item) => item.featured).slice(0, 3);
  const selected = featured.length ? featured : projects.slice(0, 3);
  const others = projects.filter((item) => !selected.some((selectedProject) => selectedProject.id === item.id)).slice(0, 6);

  return (
    <BrutalLoadingExperience>
      <main className="relative isolate overflow-hidden pb-20 text-[var(--text)]">
      <Navbar />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="halo-orb -left-32 top-24 h-96 w-96" />
        <div className="halo-orb -right-24 top-[34rem] h-[28rem] w-[28rem] bg-[radial-gradient(circle,rgba(230,0,118,0.26),transparent_68%)]" />
        <div className="halftone absolute right-8 top-36 h-36 w-36 opacity-50" />
      </div>

      <section id="top" className="section-shell relative z-10 flex min-h-screen items-center pt-28 md:pt-32">
        <div className="grid w-full gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="surface-panel p-5 sm:p-7 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="section-label"><Sparkles className="h-3.5 w-3.5" /> {content.hero_badge}</p>
              <span className="status-pill font-mono-ui uppercase tracking-[0.16em]">Portfolio / Brutal UI</span>
            </div>

            <div className="mt-12 space-y-7">
              <h1 className="text-balance text-5xl font-black leading-[0.92] tracking-[-0.075em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
                <span className="gradient-text">{profile.full_name}</span>
              </h1>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
              <p className="max-w-3xl text-2xl font-bold leading-tight tracking-[-0.04em] text-[var(--text)] md:text-3xl">
                {content.hero_title}
              </p>
              <p className="max-w-2xl text-base font-medium leading-8 text-[var(--muted)] md:text-lg">
                {content.hero_subtitle}
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#works" className="btn-primary px-6 py-3 text-sm">
                Open Works
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <InternalBrowser url={content.portfolio_drive_url} label="Open Portfolio" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="bento-card overflow-hidden p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">Profile</p>
                  <h2 className="mt-5 text-4xl font-black leading-none tracking-[-0.06em] md:text-5xl">Raw visual identity with useful product flow.</h2>
                </div>
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-lg font-black text-white sm:flex">HF</div>
              </div>
              <div className="mt-8 grid gap-3">
                <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Headline</p>
                  <p className="mt-2 text-base font-bold text-[var(--text)]">{profile.headline}</p>
                </div>
                <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-3)] p-4">
                  <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">School</p>
                  <p className="mt-2 text-base font-bold text-[var(--text)]">{profile.school_info}</p>
                </div>
              </div>
            </div>

            <div className="bento-card bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-6 w-6 text-[var(--primary)]" />
                <p className="section-label">Brutal UX</p>
              </div>
              <p className="mt-5 text-sm font-semibold leading-7 text-[var(--muted)]">
                UI dibuat lebih tegas, spacing lebih konsisten, CTA lebih mudah ditekan, dan elemen dekoratif tetap aman di background tanpa menutupi konten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell relative z-10 py-10 md:py-16">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-panel p-6 md:p-8">
            <p className="section-label">{content.about_title}</p>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl">Bold, raw, and easier to browse on every screen.</h2>
          </div>

          <div className="bento-card p-6 md:p-8">
            <p className="text-base font-medium leading-8 text-[var(--muted)] md:text-lg">{content.about_body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {content.about_highlights.map((item) => (
                <span key={item} className="btn-secondary min-h-10 px-4 py-2 text-sm">
                  <CircleDot className="h-4 w-4 text-[var(--primary)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="surface-panel p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-label">{content.focus_title}</p>
                <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.06em] md:text-5xl">Software stack in a hard-edged bento system.</h3>
              </div>
              <span className="status-pill">{content.software_stack.length} tools</span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.software_stack.map((item) => (
                <div key={item.name} className="bento-card p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--surface-2)]">
                      {item.icon_url ? <img src={item.icon_url} alt={item.name} className="h-8 w-8 object-contain" /> : <Layers3 className="h-5 w-5 text-[var(--primary)]" />}
                    </div>
                    <div>
                      <p className="text-base font-extrabold tracking-[-0.02em] text-[var(--text)]">{item.name}</p>
                      <p className="font-mono-ui mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">software</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bento-card p-6 md:p-8">
            <p className="section-label">Focus</p>
            <div className="mt-6 space-y-3">
              {content.focus_items.map((item, index) => (
                <div key={`${item}-${index}`} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">0{index + 1}</p>
                  <p className="mt-2 text-base font-bold text-[var(--text)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="section-shell relative z-10 py-10 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Selected Works</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl">Brutal project showcase.</h2>
          </div>
          <p className="max-w-xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
            Card karya dibuat lebih rapi untuk HP dan desktop: gambar dominan, teks pendek, tombol jelas, dan layout tetap stabil saat konten panjang.
          </p>
        </div>

        {selected.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {selected.map((project, index) => (
              <Link key={project.id} href={`/project/${project.slug}`} className={`bento-card group overflow-hidden ${index === 0 ? 'lg:col-span-2' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
                  <img src={project.cover_url} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 font-mono-ui text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900 backdrop-blur">
                    {project.category}
                  </div>
                </div>
                <div className="space-y-4 p-5 md:p-6">
                  <div className="flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
                    <span>{project.year}</span>
                    <ArrowUpRight className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--text)] md:text-3xl">{project.title}</h3>
                  <p className="text-sm font-medium leading-7 text-[var(--muted)]">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="surface-panel p-8 text-center">
            <p className="section-label mx-auto">Empty State</p>
            <h3 className="mt-5 text-3xl font-black tracking-[-0.05em]">Belum ada project.</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[var(--muted)]">Tambahkan project dari dashboard admin, lalu card showcase akan tampil otomatis di sini.</p>
          </div>
        )}

        {others.length ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {others.map((project) => (
              <Link key={project.id} href={`/project/${project.slug}`} className="bento-card p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="section-label">{project.category}</span>
                  <ExternalLink className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--text)]">{project.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[var(--muted)]">{project.summary}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section id="contact" className="section-shell relative z-10 py-10 md:py-16">
        <div className="surface-panel overflow-hidden p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="section-label"><Zap className="h-3.5 w-3.5" /> Contact</p>
              <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl">{content.contact_title}</h2>
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[var(--muted)]">{content.contact_body}</p>
            </div>

            <div className="grid gap-3">
              {Object.entries(profile.social_links).map(([label, href]) =>
                href ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="btn-secondary justify-between px-5 py-4">
                    <span className="font-mono-ui uppercase tracking-[0.16em]">{label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null
              )}
              <a href={`mailto:${profile.email}`} className="btn-primary justify-between px-5 py-4">
                <span>Email Me</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer profile={profile} />
        <DownloadDock />
      </main>
    </BrutalLoadingExperience>
  );
}
