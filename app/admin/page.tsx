import { LayoutDashboard, LockKeyhole, MonitorSmartphone, ShieldCheck, SlidersHorizontal, Sparkles, TableProperties } from 'lucide-react';
import { AdminAuthGate } from '@/components/admin/admin-auth-gate';
import { AiStudioCard } from '@/components/admin/ai-studio-card';
import { ContentForm } from '@/components/admin/content-form';
import { ProfileForm } from '@/components/admin/profile-form';
import { ProjectForm } from '@/components/admin/project-form';
import { SecurityEventsCard } from '@/components/admin/security-events-card';
import { getAdminSession } from '@/lib/admin';
import { getProfile, getProjects, getSecurityEvents, getSiteContent } from '@/lib/data';

const adminLinks = [
  { href: '#projects-panel', label: 'Projects' },
  { href: '#profile-panel', label: 'Profile' },
  { href: '#content-panel', label: 'Landing' },
  { href: '#ai-panel', label: 'AI Studio' }
];

export default async function AdminPage() {
  const { user, isAdmin } = await getAdminSession();

  if (!user) {
    return (
      <main className="section-shell flex min-h-screen items-center py-10 md:py-16">
        <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <section className="surface-panel p-6 md:p-10">
            <p className="section-label"><LockKeyhole className="h-3.5 w-3.5" /> Admin Only</p>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.82] tracking-[-0.055em] md:text-7xl">Brutal Admin Control.</h1>
            <p className="mt-5 max-w-2xl text-base font-extrabold leading-8 text-[var(--muted)]">
              Dashboard dibuat ulang dengan gaya brutalism: panel tegas, touch target besar, form gampang discan, dan layout tetap nyaman di HP maupun desktop.
            </p>
          </section>
          <AdminAuthGate />
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="section-shell flex min-h-screen items-center justify-center py-10 text-center">
        <div className="surface-panel w-full max-w-xl p-6 md:p-8">
          <p className="section-label mx-auto">Access Denied</p>
          <h1 className="mt-6 text-4xl font-black uppercase leading-[0.9] tracking-[-0.055em] md:text-6xl">Login sukses, tapi belum admin.</h1>
          <p className="mx-auto mt-5 max-w-lg text-sm font-bold leading-7 text-[var(--muted)]">
            Tambahkan user ID akun ini ke tabel <code className="border-2 border-[var(--line-strong)] bg-[var(--surface-2)] px-2 py-1 font-mono-ui">admin_users</code>, lalu logout dan login ulang.
          </p>
          <p className="mx-auto mt-4 max-w-lg break-all border-2 border-[var(--line-strong)] bg-[var(--surface-2)] p-3 font-mono-ui text-xs font-black text-[var(--text)] shadow-[var(--shadow-small)]">
            {user.id}
          </p>
        </div>
      </main>
    );
  }

  const [profile, content, projects, securityEvents] = await Promise.all([
    getProfile(),
    getSiteContent(),
    getProjects(),
    getSecurityEvents(10)
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden py-5 md:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="halo-orb left-[5%] top-12 h-72 w-72" />
        <div className="halo-orb bottom-10 right-[4%] h-80 w-80 bg-[color-mix(in_srgb,var(--secondary)_26%,transparent)]" />
        <div className="halftone absolute right-8 top-24 h-32 w-32 opacity-50" />
      </div>

      <div className="section-shell relative z-10 space-y-6 md:space-y-8">
        <header className="surface-panel p-5 sm:p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
            <div>
              <p className="section-label"><LayoutDashboard className="h-3.5 w-3.5" /> Admin Dashboard</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.82] tracking-[-0.06em] md:text-7xl xl:text-8xl">Portfolio Command Room.</h1>
              <p className="mt-5 max-w-3xl text-sm font-extrabold leading-7 text-[var(--muted)] md:text-base">
                Kelola project, profil, konten landing, asset, AI assist, dan security log dari layout brutal yang lebih rapi, lebih cepat discan, dan aman untuk layar kecil.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:min-w-[420px]">
              <div className="bento-card p-4 text-left">
                <p className="font-mono-ui text-[11px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">Projects</p>
                <p className="mt-2 text-4xl font-black leading-none text-[var(--text)]">{projects.length}</p>
              </div>
              <div className="bento-card bg-[var(--surface-2)] p-4 text-left">
                <p className="font-mono-ui text-[11px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">Events</p>
                <p className="mt-2 text-4xl font-black leading-none text-[var(--text)]">{securityEvents.length}</p>
              </div>
              <div className="bento-card col-span-2 bg-[var(--surface-3)] p-4 text-left sm:col-span-1">
                <p className="font-mono-ui text-[11px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">Device</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-black uppercase text-[var(--text)]"><MonitorSmartphone className="h-4 w-4 text-[var(--primary)]" /> Mobile Ready</p>
              </div>
            </div>
          </div>
        </header>

        <nav className="sticky top-3 z-30 grid grid-cols-2 gap-3 sm:grid-cols-4 md:top-5" aria-label="Admin quick navigation">
          {adminLinks.map((item) => (
            <a key={item.href} href={item.href} className="btn-secondary min-h-12 px-3 py-3 text-center text-[11px]">
              {item.label}
            </a>
          ))}
        </nav>

        <section id="projects-panel" className="scroll-mt-28">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="section-label"><TableProperties className="h-3.5 w-3.5" /> Project CRUD</p>
            <span className="status-pill">Mobile first form order</span>
          </div>
          <ProjectForm projects={projects} />
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.55fr)] xl:items-start">
          <section id="profile-panel" className="scroll-mt-28">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="section-label"><SlidersHorizontal className="h-3.5 w-3.5" /> Profile</p>
              <span className="status-pill">Identity Settings</span>
            </div>
            <ProfileForm profile={profile} />
          </section>

          <aside className="space-y-6">
            <SecurityEventsCard events={securityEvents} />
            <div className="surface-panel p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between xl:flex-col xl:items-start">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[var(--success)]" />
                  <p className="text-sm font-black text-[var(--text)]">Logged in as {user.email}</p>
                </div>
                <p className="max-w-full break-all font-mono-ui text-xs font-black text-[var(--muted)]">Admin ID: {user.id}</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-start">
          <section id="content-panel" className="scroll-mt-28">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="section-label">Landing Copy</p>
              <span className="status-pill">Hero / About / Contact</span>
            </div>
            <ContentForm content={content} />
          </section>

          <section id="ai-panel" className="scroll-mt-28">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="section-label"><Sparkles className="h-3.5 w-3.5" /> AI Studio</p>
              <span className="status-pill">Prompt Helper</span>
            </div>
            <AiStudioCard profile={profile} content={content} />
          </section>
        </div>
      </div>
    </main>
  );
}
