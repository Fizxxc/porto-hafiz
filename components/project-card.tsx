import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/project/${project.slug}`} className="bento-card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[var(--line-strong)] bg-[var(--surface-2)]">
        <img src={project.cover_url} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute left-4 top-4 border-2 border-[var(--line-strong)] bg-[var(--secondary)] px-3 py-2 font-mono-ui text-[11px] font-black uppercase tracking-[0.16em] text-[#111827] shadow-[3px_3px_0_var(--line-strong)]">
          {project.category}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-3xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-[var(--text)]">{project.title}</h3>
          <p className="mt-3 text-sm font-bold leading-7 text-[var(--muted)]">{project.summary}</p>
        </div>

        <div className="flex items-center justify-between gap-4 text-[var(--text)]">
          <span className="font-mono-ui text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">{project.year}</span>
          <span className="flex h-11 w-11 items-center justify-center border-2 border-[var(--line-strong)] bg-[var(--primary)] text-white shadow-[3px_3px_0_var(--line-strong)] transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_var(--line-strong)]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
