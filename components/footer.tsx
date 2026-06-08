import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Profile } from '@/types';

export function Footer({ profile }: { profile: Profile }) {
  const socials = [
    { label: 'Instagram', href: profile.social_links?.ig },
    { label: 'TikTok', href: profile.social_links?.tiktok },
    { label: 'YouTube', href: profile.social_links?.youtube },
    { label: 'Behance', href: profile.social_links?.behance }
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="section-shell pb-10 pt-4">
      <div className="surface-panel p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="section-label">Support Mail</p>
            <a className="mt-5 block break-words text-4xl font-black uppercase leading-[0.9] tracking-[-0.055em] text-[var(--text)] transition hover:text-[var(--primary)] md:text-6xl" href={`mailto:${profile.email || 'hafizalfariz.support@gmail.com'}`}>
              {profile.email || 'hafizalfariz.support@gmail.com'}
            </a>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[var(--muted)]">
              Portfolio Hafiz Al Fariz dengan gaya brutalism, hard-edge cards, loading React Three Fiber, dan dashboard admin responsive.
            </p>
          </div>

          <div className="space-y-4 md:justify-self-end">
            <p className="section-label">Find Me On</p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {socials.map((social) => (
                <Link key={social.label} href={social.href!} target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-xs">
                  {social.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
