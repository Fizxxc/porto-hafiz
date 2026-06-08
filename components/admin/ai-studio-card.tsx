'use client';

import { CheckCircle2, Copy, LoaderCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Profile, SiteContent } from '@/types';

const OPTIONS = [
  { value: 'hero_title', label: 'Hero Headline' },
  { value: 'contact_body', label: 'Contact CTA' },
  { value: 'focus_items', label: 'Focus Items' },
  { value: 'caption_pack', label: 'Caption Pack' },
  { value: 'creative_direction', label: 'Creative Direction' }
] as const;

export function AiStudioCard({ profile, content }: { profile: Profile; content: SiteContent }) {
  const [kind, setKind] = useState<(typeof OPTIONS)[number]['value']>('creative_direction');
  const [prompt, setPrompt] = useState('Buat versi premium, clean, dan cocok untuk portfolio contemporary Hafiz Al Fariz.');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('Area generate tambahan untuk copy dan ide baru.');

  const generate = async () => {
    try {
      setStatus('loading');
      setMessage('AI sedang menyusun output tambahan...');

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          prompt,
          context: {
            full_name: profile.full_name,
            headline: profile.headline,
            school_info: profile.school_info,
            hero_title: content.hero_title,
            focus_items: content.focus_items
          }
        })
      });

      const data = (await response.json()) as { text?: string; error?: string };
      if (!response.ok || !data.text) throw new Error(data.error || 'AI output kosong.');

      setResult(data.text.trim());
      setStatus('done');
      setMessage('Output tambahan sudah siap. Bisa langsung disalin dan ditempatkan manual sesuai kebutuhan.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat generate.');
    }
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setMessage('Output berhasil disalin ke clipboard.');
  };

  return (
    <section className="admin-card space-y-5 p-5 sm:p-6">
      <div className="space-y-2">
        <p className="section-label"><Sparkles className="h-3.5 w-3.5" /> AI Studio</p>
        <h3 className="text-2xl font-black tracking-[-0.05em] text-[var(--text)] md:text-3xl">Generate ide copy tambahan</h3>
        <p className="max-w-3xl text-sm font-medium leading-7 text-[var(--muted)]">
          Dipakai untuk hero headline, CTA, focus items, caption showcase, sampai creative direction untuk section baru.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <select value={kind} onChange={(event) => setKind(event.target.value as (typeof OPTIONS)[number]['value'])} className="input-shell">
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} className="input-shell min-h-[120px]" placeholder="Jelaskan apa yang ingin dihasilkan AI..." />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={generate} className="btn-primary px-5 py-3 text-sm">
          {status === 'loading' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Generate Output
        </button>

        <button type="button" onClick={copyResult} className="btn-secondary px-5 py-3 text-sm">
          <Copy className="h-4 w-4" />
          Copy Result
        </button>
      </div>

      <div className="form-subpanel space-y-4">
        <div className="flex items-center gap-2 text-[var(--text)]">
          {status === 'done' ? <CheckCircle2 className="h-4 w-4 text-[var(--success)]" /> : <Sparkles className="h-4 w-4 text-[var(--primary)]" />}
          <p className="text-sm font-semibold">{message}</p>
        </div>

        <textarea value={result} readOnly className="input-shell min-h-[220px] resize-none" placeholder="Hasil generate akan muncul di sini..." />
      </div>
    </section>
  );
}
