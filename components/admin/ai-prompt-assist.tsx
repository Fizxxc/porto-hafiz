'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, LoaderCircle, Sparkles, WandSparkles, X, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type AiPromptAssistProps = {
  kind: string;
  label: string;
  context?: Record<string, unknown>;
  onApply: (value: string) => void;
  className?: string;
};

type Phase = 'idle' | 'running' | 'done' | 'error';

const LOCAL_SUGGESTIONS: Record<string, string[]> = {
  about: [
    'Tulis about premium yang menonjolkan taste visual, karakter desain, dan pendekatan kerja yang rapi.',
    'Buat about singkat dengan tone modern, elegan, dan cocok untuk portfolio contemporary.',
    'Tulis about yang menunjukkan Hafiz Al Fariz sebagai siswa DKV dengan arah visual kuat dan eksekusi refined.',
    'Buat paragraf about yang personal, profesional, dan siap tampil di homepage portfolio.'
  ],
  project_description: [
    'Tulis deskripsi project yang menjelaskan konsep, proses visual, dan hasil akhir secara premium.',
    'Buat deskripsi karya yang profesional, mudah dipahami client, dan tetap terasa editorial.',
    'Tulis deskripsi project dengan fokus pada hierarchy, direction visual, dan impresi akhir.',
    'Buat deskripsi project yang singkat tapi tetap menunjukkan kualitas berpikir desain.'
  ],
  project_summary: [
    'Buat ringkasan project satu kalimat yang tajam dan cocok untuk card portfolio.',
    'Tulis summary pendek yang terasa premium dan mudah dipreview pengunjung.',
    'Buat summary yang menonjolkan nilai visual utama dan karakter project ini.',
    'Buat ringkasan singkat, modern, dan profesional untuk halaman project.'
  ],
  hero_title: [
    'Tulis headline hero yang premium, modern, dan mudah diingat.',
    'Buat judul hero untuk visual designer dengan nuansa editorial dan mewah.',
    'Tulis hero title yang menunjukkan taste visual yang kuat dan minimal.',
    'Buat headline utama yang terasa eksklusif tetapi tetap bersih dan elegan.'
  ],
  hero_subtitle: [
    'Tulis subtitle hero yang menjelaskan identitas visual secara singkat dan premium.',
    'Buat hero subtitle yang lembut, profesional, dan cocok untuk portfolio contemporary.',
    'Tulis subtitle hero yang menegaskan fokus karya dan arah kreatif Hafiz.',
    'Buat deskripsi hero yang modern, ringan, dan tetap terasa mewah.'
  ],
  contact_body: [
    'Tulis CTA contact yang profesional, sopan, dan mengundang kolaborasi.',
    'Buat paragraf contact singkat untuk calon client dan kolaborator kreatif.',
    'Tulis ajakan kolaborasi yang terasa premium dan tidak kaku.',
    'Buat copy contact yang hangat, rapi, dan profesional.'
  ],
  default: [
    'Buat versi premium dan lebih rapi.',
    'Tulis versi yang lebih singkat dan elegan.',
    'Buat versi modern dengan tone portfolio.',
    'Tulis versi yang lebih profesional dan siap tampil.'
  ]
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function AiPromptAssist({ kind, label, context, onApply, className }: AiPromptAssistProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [message, setMessage] = useState(`AI siap membantu untuk ${label}.`);
  const [errorText, setErrorText] = useState('');
  const title = useMemo(() => `Generate ${label}`, [label]);

  useEffect(() => {
    if (!modalOpen) return;

    const baseSuggestions = LOCAL_SUGGESTIONS[kind] ?? LOCAL_SUGGESTIONS.default;
    const parsed = shuffle(baseSuggestions).slice(0, 4);
    setSuggestions(parsed);
    setErrorText('');

    if (!prompt.trim() && parsed[0]) setPrompt(parsed[0]);
  }, [modalOpen, kind, prompt]);

  const generate = async () => {
    try {
      setPhase('running');
      setErrorText('');
      setMessage(`Generating ${label.toLowerCase()}...`);

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, prompt, context, mode: 'generate' })
      });

      let data: { text?: string; error?: string } = {};

      try {
        data = (await response.json()) as { text?: string; error?: string };
      } catch {
        data = {};
      }

      if (!response.ok || !data.text) throw new Error(data.error || `Generate ${label.toLowerCase()} gagal.`);

      onApply(data.text.trim());
      setPhase('done');
      setMessage(`${label} selesai dibuat dan langsung diisikan ke field.`);

      setTimeout(() => setModalOpen(false), 800);
    } catch (error) {
      const nextError = error instanceof Error ? error.message : 'Terjadi kesalahan saat generate.';
      setPhase('error');
      setErrorText(nextError);
      setMessage(nextError);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setModalOpen(true)} className={className ?? 'btn-secondary min-h-9 px-3 py-2 text-xs'}>
        <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
        AI
      </button>

      <AnimatePresence>
        {modalOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[92] flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="admin-card relative max-h-[92vh] w-full max-w-2xl overflow-auto p-5 sm:p-6"
            >
              {phase === 'running' ? (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] backdrop-blur-xl">
                  <div className="w-[min(92%,380px)] rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 text-center shadow-[var(--shadow-card)]">
                    <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-[var(--primary)]" />
                    <p className="section-label mx-auto mt-4">AI Generator</p>
                    <h4 className="mt-4 text-2xl font-black tracking-[-0.05em] text-[var(--text)]">Generating {label}</h4>
                    <p className="mt-3 text-sm font-medium leading-7 text-[var(--muted)]">AI sedang menyusun hasil terbaik. Field akan terisi otomatis saat selesai.</p>
                  </div>
                </div>
              ) : null}

              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="section-label"><WandSparkles className="h-3.5 w-3.5" /> AI Prompt Builder</p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.05em] text-[var(--text)]">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-7 text-[var(--muted)]">Tulis arahanmu, lalu AI akan generate field secara otomatis.</p>
                </div>

                <button type="button" onClick={() => setModalOpen(false)} disabled={phase === 'running'} className="btn-secondary min-h-11 px-3 py-3 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Close AI prompt modal">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="form-subpanel">
                  <div className="mb-3 flex items-center gap-2 text-[var(--text)]">
                    <WandSparkles className="h-4 w-4 text-[var(--primary)]" />
                    <p className="text-sm font-semibold">Saran prompt otomatis</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button key={suggestion} type="button" onClick={() => setPrompt(suggestion)} disabled={phase === 'running'} className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-left text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50">
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} disabled={phase === 'running'} placeholder={`Contoh: Buat ${label.toLowerCase()} yang lebih premium, singkat, dan menonjolkan visual rhythm.`} className="input-shell min-h-[180px] disabled:cursor-not-allowed disabled:opacity-70" />

                {errorText ? (
                  <div className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--danger)_8%,var(--surface))] px-4 py-3 text-sm font-semibold text-[var(--danger)]">
                    {errorText}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button type="button" onClick={generate} disabled={phase === 'running' || !prompt.trim()} className="btn-primary px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50">
                    {phase === 'running' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    {phase === 'running' ? `Generating ${label}...` : `Generate ${label}`}
                  </button>

                  <button type="button" onClick={() => setModalOpen(false)} disabled={phase === 'running'} className="btn-secondary px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40">
                    Tutup
                  </button>
                </div>

                <div className="status-pill w-full justify-start gap-2">
                  {phase === 'done' ? <CheckCircle2 className="h-4 w-4 text-[var(--success)]" /> : phase === 'error' ? <XCircle className="h-4 w-4 text-[var(--danger)]" /> : <Sparkles className="h-4 w-4 text-[var(--primary)]" />}
                  {message}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
