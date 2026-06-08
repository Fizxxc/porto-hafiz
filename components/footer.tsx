import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Profile } from '@/types';

export function Footer({ profile }: { profile: Profile }) {
  const email = profile.email || 'hafizalfariz.support@gmail.com';

  const socials = [
    { label: 'Instagram', href: profile.social_links?.ig },
    { label: 'TikTok', href: profile.social_links?.tiktok },
    { label: 'YouTube', href: profile.social_links?.youtube },
    { label: 'Behance', href: profile.social_links?.behance },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="section-shell overflow-hidden pb-8 pt-4 sm:pb-10">
      <div className="surface-panel overflow-hidden p-5 sm:p-6 md:p-8">
        <div className="grid min-w-0 gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end">
          <div className="min-w-0">
            <p className="section-label w-fit">Support Mail</p>

            <a
              href={`mailto:${email}`}
              className="mt-5 block max-w-full break-all text-[clamp(2rem,13vw,4rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-[var(--text)] transition hover:text-[var(--primary)] md:text-6xl"
            >
              {email}
            </a>

            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[var(--muted)] sm:text-base">
              Portfolio Hafiz Al Fariz dengan gaya brutalism, hard-edge cards,
              loading React Three Fiber, dan dashboard admin responsive.
            </p>
          </div>

          <div className="min-w-0 space-y-4 md:justify-self-end">
            <p className="section-label w-fit md:ml-auto">Find Me On</p>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:justify-end">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href!}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary min-h-11 min-w-0 justify-center px-3 py-3 text-[10px] sm:px-4 sm:text-xs"
                >
                  <span className="truncate">{social.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}