import type { Project } from '@/types';
import { ProjectCard } from '@/components/project-card';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
