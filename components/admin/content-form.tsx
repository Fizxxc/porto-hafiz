'use client';

import { Plus, Save, Trash2 } from 'lucide-react';
import { type FormEvent, useMemo, useState } from 'react';
import { AiPromptAssist } from '@/components/admin/ai-prompt-assist';
import { createClient } from '@/lib/supabase/browser';
import type { SiteContent, SoftwareItem } from '@/types';

type Props = {
  content: SiteContent;
};

export function ContentForm({ content }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [form, setForm] = useState<SiteContent>(content);
  const [status, setStatus] = useState('Idle');

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('Saving landing content...');

    const payload = {
      id: form.id,
      hero_badge: form.hero_badge,
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      about_title: form.about_title,
      about_body: form.about_body,
      about_highlights: form.about_highlights.filter(Boolean),
      focus_title: form.focus_title,
      focus_items: form.focus_items.filter(Boolean),
      software_stack: form.software_stack.filter((item) => item.name.trim()),
      portfolio_drive_url: form.portfolio_drive_url,
      contact_title: form.contact_title,
      contact_body: form.contact_body
    };

    const { error } = await (supabase.from('site_content') as any).upsert(payload);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus('Landing content updated.');
  };

  const updateSoftware = (index: number, patch: Partial<SoftwareItem>) => {
    setForm((prev) => ({
      ...prev,
      software_stack: prev.software_stack.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
    }));
  };

  return (
    <form onSubmit={save} className="admin-card space-y-5 p-5 sm:p-6">
      <div className="space-y-2">
        <p className="section-label">Landing Content</p>
        <h3 className="text-2xl font-black tracking-[-0.05em] text-[var(--text)] md:text-3xl">Hero, About, Highlights & Software</h3>
        <p className="max-w-3xl text-sm font-medium leading-7 text-[var(--muted)]">Kontrol semua copy homepage dengan alur field yang lebih jelas dan nyaman di layar kecil.</p>
      </div>

      <label className="block space-y-2">
        <span className="field-label">Hero badge</span>
        <input className="input-shell" value={form.hero_badge} onChange={(e) => setForm((p) => ({ ...p, hero_badge: e.target.value }))} placeholder="Hero badge" />
      </label>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="field-label">Hero title</p>
          <AiPromptAssist kind="hero_title" label="Hero Title" context={{ hero_badge: form.hero_badge }} onApply={(value) => setForm((p) => ({ ...p, hero_title: value }))} />
        </div>
        <textarea className="input-shell min-h-[120px]" value={form.hero_title} onChange={(e) => setForm((p) => ({ ...p, hero_title: e.target.value }))} placeholder="Hero title" />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="field-label">Hero subtitle</p>
          <AiPromptAssist kind="hero_subtitle" label="Hero Subtitle" context={{ hero_title: form.hero_title }} onApply={(value) => setForm((p) => ({ ...p, hero_subtitle: value }))} />
        </div>
        <textarea className="input-shell min-h-[120px]" value={form.hero_subtitle} onChange={(e) => setForm((p) => ({ ...p, hero_subtitle: e.target.value }))} placeholder="Hero subtitle" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="field-label">About title</span>
          <input className="input-shell" value={form.about_title} onChange={(e) => setForm((p) => ({ ...p, about_title: e.target.value }))} placeholder="About title" />
        </label>
        <label className="block space-y-2">
          <span className="field-label">Portfolio / drive URL</span>
          <input className="input-shell" value={form.portfolio_drive_url} onChange={(e) => setForm((p) => ({ ...p, portfolio_drive_url: e.target.value }))} placeholder="Portfolio / drive URL" />
        </label>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="field-label">About me body</p>
          <AiPromptAssist kind="about" label="About" context={{ about_title: form.about_title, profile_focus: form.about_highlights.join(', ') }} onApply={(value) => setForm((p) => ({ ...p, about_body: value }))} />
        </div>
        <textarea className="input-shell min-h-[150px]" value={form.about_body} onChange={(e) => setForm((p) => ({ ...p, about_body: e.target.value }))} placeholder="About body" />
      </div>

      <div className="form-subpanel space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="section-label">About Highlights</p>
            <p className="mt-2 text-sm font-medium leading-7 text-[var(--muted)]">Contoh: Brand Identity, Poster & Editorial, UI / UX Visual Direction.</p>
          </div>
          <button type="button" onClick={() => setForm((prev) => ({ ...prev, about_highlights: [...prev.about_highlights, ''] }))} className="btn-secondary px-4 py-2 text-sm">
            <Plus className="h-4 w-4" /> Tambah Focus
          </button>
        </div>
        <div className="space-y-3">
          {form.about_highlights.map((item, index) => (
            <div key={`highlight-${index}`} className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input className="input-shell" value={item} onChange={(e) => setForm((prev) => ({ ...prev, about_highlights: prev.about_highlights.map((current, currentIndex) => currentIndex === index ? e.target.value : current) }))} placeholder={`Highlight ${index + 1}`} />
              <button type="button" onClick={() => setForm((prev) => ({ ...prev, about_highlights: prev.about_highlights.filter((_, currentIndex) => currentIndex !== index) }))} className="btn-secondary px-4 py-3 text-sm">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-subpanel space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="section-label">Software Stack</p>
            <p className="mt-2 text-sm font-medium leading-7 text-[var(--muted)]">Ganti creative focus menjadi software yang dipakai. Bisa tambah icon / foto manual.</p>
          </div>
          <button type="button" onClick={() => setForm((prev) => ({ ...prev, software_stack: [...prev.software_stack, { name: '', icon_url: '' }] }))} className="btn-secondary px-4 py-2 text-sm">
            <Plus className="h-4 w-4" /> Tambah Software
          </button>
        </div>

        <input className="input-shell" value={form.focus_title} onChange={(e) => setForm((p) => ({ ...p, focus_title: e.target.value }))} placeholder="Section title, mis. Software I Use" />
        <div className="space-y-3">
          {form.software_stack.map((item, index) => (
            <div key={`software-${index}`} className="grid gap-3 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-3 md:grid-cols-[1fr_1fr_auto]">
              <input className="input-shell" value={item.name} onChange={(e) => updateSoftware(index, { name: e.target.value })} placeholder="Software name" />
              <input className="input-shell" value={item.icon_url ?? ''} onChange={(e) => updateSoftware(index, { icon_url: e.target.value })} placeholder="Icon URL / Image URL" />
              <button type="button" onClick={() => setForm((prev) => ({ ...prev, software_stack: prev.software_stack.filter((_, currentIndex) => currentIndex !== index) }))} className="btn-secondary px-4 py-3 text-sm">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <label className="block space-y-2">
        <span className="field-label">Legacy focus items</span>
        <textarea
          className="input-shell min-h-[120px]"
          value={form.focus_items.join('\n')}
          onChange={(e) => setForm((p) => ({ ...p, focus_items: e.target.value.split('\n').map((item) => item.trim()).filter(Boolean) }))}
          placeholder="Legacy focus items (satu per baris)"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <input className="input-shell" value={form.contact_title} onChange={(e) => setForm((p) => ({ ...p, contact_title: e.target.value }))} placeholder="Contact title" />
        <div className="space-y-3 md:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="field-label">Contact body</p>
            <AiPromptAssist kind="contact_body" label="Contact" context={{ contact_title: form.contact_title }} onApply={(value) => setForm((p) => ({ ...p, contact_body: value }))} />
          </div>
          <textarea className="input-shell min-h-[120px]" value={form.contact_body} onChange={(e) => setForm((p) => ({ ...p, contact_body: e.target.value }))} placeholder="Contact body" />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary px-5 py-3 text-sm">
          <Save className="h-4 w-4" /> Save Landing Content
        </button>
        <p className="status-pill">{status}</p>
      </div>
    </form>
  );
}
