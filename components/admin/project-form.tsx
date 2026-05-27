'use client';

import { Plus, RefreshCcw, Trash2 } from 'lucide-react';
import { type FormEvent, useMemo, useState } from 'react';
import { AiPromptAssist } from '@/components/admin/ai-prompt-assist';
import { createClient } from '@/lib/supabase/browser';
import { slugify } from '@/lib/utils';
import type { GalleryItem, Project } from '@/types';

type State = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  year: string;
  client_name: string;
  featured: boolean;
  cover_url: string;
  asset_url: string;
  cover_label: string;
  asset_label: string;
  gallery: GalleryItem[];
  cover: File | null;
  asset: File | null;
};

function projectToState(project?: Project): State {
  return {
    id: project?.id,
    title: project?.title ?? '',
    slug: project?.slug ?? '',
    summary: project?.summary ?? '',
    description: project?.description ?? '',
    category: project?.category ?? '',
    year: project?.year ?? '',
    client_name: project?.client_name ?? '',
    featured: project?.featured ?? false,
    cover_url: project?.cover_url ?? '',
    asset_url: project?.asset_url ?? '',
    cover_label: project?.cover_label ?? 'Image 1 · Cover preview',
    asset_label: project?.asset_label ?? 'Image 2 · Downloadable asset',
    gallery: project?.gallery?.length
      ? project.gallery
      : [
          { url: '', label: 'Image 1 · Cover preview' },
          { url: '', label: 'Image 2 · Downloadable asset' }
        ],
    cover: null,
    asset: null
  };
}

type Props = {
  projects: Project[];
};

export function ProjectForm({ projects }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [selectedId, setSelectedId] = useState<string>('new');
  const [form, setForm] = useState<State>(projectToState());
  const [status, setStatus] = useState('Idle');

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('Uploading project assets...');

    const slug = slugify(form.slug || form.title);
    let coverUrl = form.cover_url || '/textures/noir-01.jpg';
    let assetUrl = form.asset_url || coverUrl;

    if (form.cover) {
      const ext = form.cover.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${slug}-cover.${ext}`;
      const { error } = await supabase.storage.from('project-images').upload(fileName, form.cover, { upsert: true });
      if (error) {
        setStatus(error.message);
        return;
      }
      coverUrl = supabase.storage.from('project-images').getPublicUrl(fileName).data.publicUrl;
    }

    if (form.asset) {
      const ext = form.asset.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${slug}-asset.${ext}`;
      const { error } = await supabase.storage.from('project-assets').upload(fileName, form.asset, { upsert: true });
      if (error) {
        setStatus(error.message);
        return;
      }
      assetUrl = supabase.storage.from('project-assets').getPublicUrl(fileName).data.publicUrl;
    }

    const gallery = [
      { url: coverUrl, label: form.cover_label || 'Image 1 · Cover preview' },
      { url: assetUrl, label: form.asset_label || 'Image 2 · Downloadable asset' },
      ...form.gallery.filter((item) => item.url.trim())
    ].filter((item, index, all) => item.url.trim() && all.findIndex((next) => next.url === item.url) === index);

    const payload = {
      id: form.id,
      title: form.title,
      slug,
      summary: form.summary,
      description: form.description,
      category: form.category,
      year: form.year,
      client_name: form.client_name,
      cover_url: coverUrl,
      asset_url: assetUrl,
      cover_label: form.cover_label,
      asset_label: form.asset_label,
      gallery,
      featured: form.featured
    };

    const { error } = await (supabase.from('projects') as any).upsert(payload);
    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus(selectedId === 'new' ? 'Project saved. Refresh page to see the latest list.' : 'Project updated. Refresh page to reload the latest data.');
  };

  return (
    <form onSubmit={save} className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="space-y-1">
        <p className="section-label">Project Manager</p>
        <h3 className="text-2xl tracking-tighter text-white">Create & Edit Projects</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <select
          className="input-shell"
          value={selectedId}
          onChange={(event) => {
            const nextId = event.target.value;
            setSelectedId(nextId);
            const selectedProject = projects.find((item) => item.id === nextId);
            setForm(projectToState(selectedProject));
          }}
        >
          <option value="new">Create new project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              Edit · {project.title}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            setSelectedId('new');
            setForm(projectToState());
            setStatus('Reset to new project form.');
          }}
          className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/76 transition hover:border-white/20 hover:text-white"
        >
          <RefreshCcw className="mr-2 inline h-4 w-4" />Reset
        </button>
      </div>

      <input className="input-shell" placeholder="Project title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, slug: slugify(e.target.value || p.slug) }))} required />
      <input className="input-shell" placeholder="Slug" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))} required />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-white/72">Short summary</p>
          <AiPromptAssist kind="project_summary" label="Summary" context={{ title: form.title, category: form.category, year: form.year, client_name: form.client_name }} onApply={(value) => setForm((p) => ({ ...p, summary: value }))} />
        </div>
        <input className="input-shell" placeholder="Short summary" value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} required />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-white/72">Project description</p>
          <AiPromptAssist kind="project_description" label="Description" context={{ title: form.title, category: form.category, year: form.year, client_name: form.client_name, summary: form.summary }} onApply={(value) => setForm((p) => ({ ...p, description: value }))} />
        </div>
        <textarea className="input-shell min-h-[180px]" placeholder="Project description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <input className="input-shell" placeholder="Category" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} required />
        <input className="input-shell" placeholder="Year" value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))} required />
        <input className="input-shell" placeholder="Client / Project type" value={form.client_name} onChange={(e) => setForm((p) => ({ ...p, client_name: e.target.value }))} required />
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/75">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} />
        Featured project
      </label>

      <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="section-label">Primary Assets</p>
            <p className="mt-2 text-sm text-white/55">Tambahin gambar yang mau kamu tampilin di web ya. minimal max upload 50MB (disarankan untuk kompres gambar terlebih dahulu supaya cepat di buka di web).</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-shell" placeholder="Cover label / Image 1 info" value={form.cover_label} onChange={(e) => setForm((p) => ({ ...p, cover_label: e.target.value }))} />
          <input className="input-shell" placeholder="Asset label / Image 2 info" value={form.asset_label} onChange={(e) => setForm((p) => ({ ...p, asset_label: e.target.value }))} />
          <input className="input-shell" placeholder="Existing cover URL (optional)" value={form.cover_url} onChange={(e) => setForm((p) => ({ ...p, cover_url: e.target.value }))} />
          <input className="input-shell" placeholder="Existing asset URL (optional)" value={form.asset_url} onChange={(e) => setForm((p) => ({ ...p, asset_url: e.target.value }))} />
          <input className="input-shell file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-black" type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, cover: e.target.files?.[0] ?? null }))} />
          <input className="input-shell file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-black" type="file" onChange={(e) => setForm((p) => ({ ...p, asset: e.target.files?.[0] ?? null }))} />
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="section-label">Additional Gallery Items</p>
            <p className="mt-2 text-sm text-white/55">Untuk preview internal browser. Masukkan URL asset dan info singkat gambarnya.</p>
          </div>
          <button type="button" onClick={() => setForm((prev) => ({ ...prev, gallery: [...prev.gallery, { url: '', label: '' }] }))} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/78 transition hover:border-white/20 hover:text-white">
            <Plus className="mr-2 inline h-4 w-4" />Tambah Item
          </button>
        </div>

        <div className="space-y-3">
          {form.gallery.map((item, index) => (
            <div key={`gallery-${index}`} className="grid gap-3 rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[1fr_1fr_auto]">
              <input className="input-shell" placeholder={`Gallery URL ${index + 1}`} value={item.url} onChange={(e) => setForm((prev) => ({ ...prev, gallery: prev.gallery.map((current, currentIndex) => currentIndex === index ? { ...current, url: e.target.value } : current) }))} />
              <input className="input-shell" placeholder={`Label ${index + 1}`} value={item.label} onChange={(e) => setForm((prev) => ({ ...prev, gallery: prev.gallery.map((current, currentIndex) => currentIndex === index ? { ...current, label: e.target.value } : current) }))} />
              <button type="button" onClick={() => setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((_, currentIndex) => currentIndex !== index) }))} className="rounded-2xl border border-white/10 px-4 text-white/70 transition hover:border-white/20 hover:text-white">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85">
          {selectedId === 'new' ? 'Save Project' : 'Update Project'}
        </button>
        <p className="text-sm text-white/[0.55]">{status}</p>
      </div>
    </form>
  );
}
