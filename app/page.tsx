import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Sparkles, Zap } from 'lucide-react';
import { DownloadDock } from '@/components/download-dock';
import { Navbar } from '@/components/navbar';
import { InternalBrowser } from '@/components/internal-browser';
import { getProfile, getProjects, getSiteContent } from '@/lib/data';

export default async function HomePage() {
  const [profile, content, projects] = await Promise.all([getProfile(), getSiteContent(), getProjects()]);
  const featured = projects.filter((item) => item.featured).slice(0, 3);
  const others = projects.filter((item) => !item.featured).slice(0, 6);

  return (
    <main className="relative isolate overflow-hidden pb-32 text-[#111]">
      <Navbar />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="neo-orb soft -left-28 top-28 h-72 w-72 rounded-full bg-[#7df9ff]" />
        <div className="neo-orb soft -right-24 top-[28rem] h-80 w-80 rounded-full bg-[#ff5ca8]" />
        <div className="neo-orb soft bottom-[14%] left-[5%] h-72 w-72 rotate-12 rounded-[2rem] bg-[#d7ff31]" />
        <div className="halftone absolute left-6 top-28 h-36 w-36 opacity-45" />
        <div className="halftone absolute bottom-20 right-8 h-40 w-40 opacity-35" />
      </div>

      <section id="top" className="section-shell relative z-10 flex min-h-screen flex-col justify-center pt-28 md:pt-32">
        <div className="neo-window brutal-panel bg-[#fffdf2]">
          <div className="neo-window-bar">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#111] bg-[#ff5ca8]" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#111] bg-[#ffb000]" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#111] bg-[#7df9ff]" />
            </div>
            <p className="hidden text-[11px] font-black uppercase tracking-[0.36em] text-[#111]/65 sm:block">Portfolio / UI / UX</p>
            <p className="rounded-full border-2 border-[#111] bg-[#d7ff31] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] shadow-[3px_3px_0_#111]">
              Hafiz Al Fariz
            </p>
          </div>

          <div className="relative grid gap-8 p-5 sm:p-7 md:p-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div className="neo-star absolute right-5 top-5 hidden md:block" />
            <div className="space-y-7">
              <div className="brutal-pill w-fit bg-[#7df9ff] px-4 py-2 text-xs uppercase tracking-[0.22em]">
                <span className="h-3 w-3 rounded-full border-2 border-[#111] bg-[#ff5ca8]" />
                {content.hero_badge}
              </div>

              <div className="space-y-5">
                <h1 className="max-w-5xl text-6xl font-black leading-[0.84] tracking-[-0.09em] text-[#111] sm:text-7xl md:text-8xl lg:text-[8.6rem]">
                  {profile.full_name}
                </h1>
                <div className="h-1.5 w-full max-w-4xl rounded-full bg-[repeating-linear-gradient(90deg,#111_0_10px,transparent_10px_21px)]" />
                <p className="max-w-3xl text-base font-black leading-8 tracking-[-0.02em] text-[#111] md:text-xl">
                  {content.hero_title}
                </p>
                <p className="max-w-2xl text-sm font-semibold leading-7 text-[#111]/75 md:text-base">
                  {content.hero_subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="#works" className="brutal-button px-6 py-3 text-sm">
                  Explore Works
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <InternalBrowser url={content.portfolio_drive_url} label="Open Portfolio Install" />
              </div>
            </div>

            <div className="relative space-y-4 lg:pl-4">
              <div className="brutal-card bg-[#7df9ff] p-5">
                <p className="section-label bg-[#ffb000]">Profile Snapshot</p>
                <div className="mt-5 rounded-2xl border-[3px] border-[#111] bg-[#fffdf2] p-5 shadow-[6px_6px_0_#111]">
                  <p className="text-3xl font-black leading-none tracking-[-0.06em] text-[#111] md:text-4xl">{profile.full_name}</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[#111]/65">{profile.headline}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="neo-stat bg-[#d7ff31]">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#111]/60">School</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#111]">{profile.school_info}</p>
                </div>
                <div className="neo-stat bg-[#fffdf2]">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#111]/60">Location</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#111]">{profile.address}</p>
                </div>
              </div>

              <div className="brutal-card bg-[#ff5ca8] p-5">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-[#111]" />
                  <p className="text-sm font-black leading-7 text-[#111]">
                    UX dibuat lebih jelas: CTA langsung terlihat, card mudah discan, dan elemen dekoratif tidak lagi menutup konten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell relative z-10 py-10 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="brutal-panel overflow-hidden bg-[#ff5ca8] p-7 md:p-8">
            <div className="halftone absolute -right-5 -top-5 h-36 w-36 opacity-25" />
            <p className="section-label bg-[#fffdf2]">{content.about_title}</p>
            <h2 className="relative mt-5 text-4xl font-black leading-[0.95] tracking-[-0.08em] text-[#111] md:text-6xl">About And Details Me.</h2>
          </div>

          <div className="brutal-panel bg-[#fffdf2] p-7 md:p-8">
            <p className="text-base font-semibold leading-8 text-[#111]/80">{content.about_body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {content.about_highlights.map((item, index) => (
                <span key={item} className={`${index % 2 ? 'bg-[#7df9ff]' : 'bg-[#d7ff31]'} rounded-full border-[3px] border-[#111] px-4 py-2 text-sm font-black text-[#111] shadow-[4px_4px_0_#111]`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="brutal-panel mt-8 bg-[#fffdf2] p-7 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-label bg-[#7df9ff]">{content.focus_title}</p>
              <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.07em] text-[#111] md:text-5xl">Software stack with tactile blocks.</h3>
            </div>
            <div className="rounded-full border-[3px] border-[#111] bg-[#ffb000] px-4 py-2 text-sm font-black text-[#111] shadow-[5px_5px_0_#111]">{content.software_stack.length} tools curated</div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {content.software_stack.map((item, index) => (
              <div key={item.name} className={`${index % 3 === 0 ? 'bg-[#d7ff31]' : index % 3 === 1 ? 'bg-[#7df9ff]' : 'bg-[#ff5ca8]'} brutal-card p-5`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-[#111] bg-white shadow-[4px_4px_0_#111]">
                    {item.icon_url ? <img src={item.icon_url} alt={item.name} className="h-8 w-8 object-contain" /> : <Sparkles className="h-5 w-5 text-[#111]" />}
                  </div>
                  <div>
                    <p className="text-base font-black tracking-[-0.03em] text-[#111]">{item.name}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-[#111]/60">software</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="section-shell relative z-10 py-10 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-label bg-[#ffb000]">Selected Works</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.08em] text-[#111] md:text-6xl">My Personal Project.</h2>
          </div>
          <p className="max-w-xl rounded-2xl border-[3px] border-[#111] bg-[#fffdf2] p-5 text-sm font-semibold leading-7 text-[#111]/80 shadow-[6px_6px_0_#111]">Melalui project ini, saya fokus pada penyajian detail karya yang lebih mendalam. Fitur proteksi preview dan watermark author menjaga karya tetap aman saat dibagikan.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Link key={project.id} href={`/project/${project.slug}`} className={`${index % 2 ? 'bg-[#7df9ff]' : 'bg-[#fffdf2]'} brutal-card group overflow-hidden`}>
              <div className="relative aspect-[4/5] overflow-hidden border-b-[3px] border-[#111] bg-[#111]">
                <img src={project.cover_url} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                <div className="absolute left-4 top-4 rounded-full border-[3px] border-[#111] bg-[#d7ff31] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_#111]">Featured</div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight tracking-[-0.05em] text-[#111]">{project.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#111]/75">{project.summary}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#111] bg-[#ffb000] px-4 py-2 text-sm font-black text-[#111] shadow-[4px_4px_0_#111]">
                  View Project <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {others.map((project, index) => (
            <Link key={project.id} href={`/project/${project.slug}`} className={`${index % 2 ? 'bg-[#fffdf2]' : 'bg-[#d7ff31]'} brutal-card p-5`}>
              <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="mt-6 text-xl font-black leading-tight tracking-[-0.04em] text-[#111]">{project.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#111]/75">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell relative z-10 py-10 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="brutal-panel overflow-hidden bg-[#d7ff31] p-8">
            <Zap className="absolute right-6 top-6 h-10 w-10 text-[#111]" />
            <p className="section-label bg-white">Contact</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.07em] text-[#111] md:text-6xl">{content.contact_title}</h2>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#111]/80">{content.contact_body}</p>
          </div>

          <div className="brutal-panel bg-[#fffdf2] p-8">
            <p className="section-label bg-[#7df9ff]">Find Me On</p>
            <div className="mt-6 space-y-3 text-sm font-bold text-[#111]">
              {Object.entries(profile.social_links).map(([label, href]) =>
                href ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="neo-link-row px-4 py-4">
                    <span className="uppercase tracking-[0.18em] text-[#111]/70">{label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null
              )}
            </div>
            <div className="mt-6 rounded-2xl border-[3px] border-[#111] bg-[#ff5ca8] p-4 text-sm font-black text-[#111] shadow-[5px_5px_0_#111]">
              Support mail: <span>hafizalfariz.support@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      <DownloadDock />
    </main>
  );
}
