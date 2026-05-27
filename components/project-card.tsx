import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/project/${project.slug}`} className="brutal-card group overflow-hidden bg-[#fffdf2]">
      <div className="relative aspect-[5/6] overflow-hidden border-b-[3px] border-[#111] bg-[#111]">
        <Image src={project.cover_url} alt={project.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full border-[3px] border-[#111] bg-[#d7ff31] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_#111]">
          {project.category}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-2xl font-black leading-tight tracking-[-0.05em] text-[#111]">{project.title}</h3>
          <p className="text-sm font-semibold leading-7 text-[#111]/75">{project.summary}</p>
        </div>

        <div className="flex items-center justify-between text-[#111]">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">{project.year}</span>
          <span className="rounded-full border-[3px] border-[#111] bg-[#ffb000] p-3 shadow-[4px_4px_0_#111] transition group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
