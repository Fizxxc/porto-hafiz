import Link from 'next/link';
import type { Profile } from '@/types';

export function Footer({ profile }: { profile: Profile }) {
  const socials = [
    { label: 'Instagram', href: profile.social_links?.ig },
    { label: 'TikTok', href: profile.social_links?.tiktok },
    { label: 'YouTube', href: profile.social_links?.youtube },
    { label: 'Behance', href: profile.social_links?.behance }
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="border-t-[3px] border-[#111] bg-[#fffdf2] px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-end">
        <div className="space-y-4">
          <p className="section-label bg-[#7df9ff]">Support Mail</p>
          <a className="text-2xl font-black tracking-tight text-[#111] transition hover:opacity-70" href="mailto:hafizalfariz.support@gmail.com">
            hafizalfariz.support@gmail.com
          </a>
          <p className="max-w-xl text-sm font-semibold leading-7 text-[#111]/70">
            Portfolio ini dibangun untuk presentasi karya, identitas personal, akses cepat ke project asset, dan UX neobrutalism yang jelas.
          </p>
        </div>

        <div className="space-y-4 md:justify-self-end">
          <p className="section-label bg-[#ffb000]">Find Me On</p>
          <div className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href!}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-[3px] border-[#111] bg-[#d7ff31] px-4 py-2 text-sm font-black text-[#111] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
