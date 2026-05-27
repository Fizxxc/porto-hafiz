'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  LoaderCircle,
  Minimize2,
  Sparkles,
  WandSparkles,
  X,
  XCircle
} from 'lucide-react';
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
    'Buat about singkat dengan tone modern, elegan, dan cocok untuk portfolio neobrutalism.',
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
    'Buat hero subtitle yang lembut, profesional, dan cocok untuk portfolio neobrutalism.',
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

function GeneratingOverlay({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center rounded-[2rem] bg-black/75 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        className="mx-6 w-full max-w-md rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-glass"
      >
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]"
          >
            <LoaderCircle className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <p className="section-label">KOGRAPH | AI GENERATOR</p>
            <h4 className="mt-2 text-xl tracking-[-0.04em] text-white">
              Generating {label}
            </h4>
          </div>
        </div>

        <p className="text-sm leading-7 text-white/[0.58]">
          AI sedang menyusun hasil terbaik untuk field ini. Tunggu sebentar,
          hasil akan langsung masuk otomatis saat selesai.
        </p>

        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="relative h-2 overflow-hidden rounded-full bg-white/[0.07]"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '130%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + item * 0.25,
                  ease: 'easeInOut',
                  delay: item * 0.12
                }}
                className="absolute inset-y-0 w-1/2 rounded-full bg-white"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
          <Sparkles className="h-3.5 w-3.5" />
          crafting premium copy
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AiPromptAssist({
  kind,
  label,
  context,
  onApply,
  className
}: AiPromptAssistProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [openDock, setOpenDock] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState(`AI siap membantu untuk ${label}.`);
  const [errorText, setErrorText] = useState('');
  const title = useMemo(() => `Generate ${label}`, [label]);

  useEffect(() => {
    if (!modalOpen) return;

    const baseSuggestions =
      LOCAL_SUGGESTIONS[kind] ?? LOCAL_SUGGESTIONS.default;

    const parsed = shuffle(baseSuggestions).slice(0, 4);
    setSuggestions(parsed);
    setErrorText('');

    if (!prompt.trim() && parsed[0]) {
      setPrompt(parsed[0]);
    }
  }, [modalOpen, kind, prompt]);

  const generate = async () => {
    try {
      setOpenDock(true);
      setMinimized(false);
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

      if (!response.ok || !data.text) {
        throw new Error(
          data.error || `Generate ${label.toLowerCase()} gagal.`
        );
      }

      onApply(data.text.trim());
      setPhase('done');
      setMessage(`${label} selesai dibuat dan langsung diisikan ke field.`);

      setTimeout(() => {
        setModalOpen(false);
      }, 800);
    } catch (error) {
      const nextError =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat generate.';
      setPhase('error');
      setErrorText(nextError);
      setMessage(nextError);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={
          className ??
          'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/72 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white'
        }
      >
        <Sparkles className="h-3.5 w-3.5" />
        AI
      </button>

      <AnimatePresence>
        {modalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[92] flex items-center justify-center bg-black/70 px-4 backdrop-blur-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/[0.95] p-6 shadow-glass"
            >
              <AnimatePresence>
                {phase === 'running' ? <GeneratingOverlay label={label} /> : null}
              </AnimatePresence>

              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">KOGRAPH | AI Prompt Builder</p>
                  <h3 className="mt-2 text-2xl tracking-[-0.05em] text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/[0.56]">
                    Tulis arahanmu, lalu AI akan generate field secara otomatis.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={phase === 'running'}
                  className="rounded-full border border-white/10 p-3 text-white/65 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-3 flex items-center gap-2 text-white/78">
                    <WandSparkles className="h-4 w-4" />
                    <p className="text-sm">Saran prompt otomatis</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setPrompt(suggestion)}
                        disabled={phase === 'running'}
                        className="rounded-full border border-white/10 px-3 py-2 text-left text-xs text-white/75 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  disabled={phase === 'running'}
                  placeholder={`Contoh: Buat ${label.toLowerCase()} yang lebih premium, singkat, dan menonjolkan visual rhythm.`}
                  className="input-shell min-h-[180px] disabled:cursor-not-allowed disabled:opacity-70"
                />

                {errorText ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                    {errorText}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={generate}
                    disabled={phase === 'running' || !prompt.trim()}
                    className="rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {phase === 'running' ? `Generating ${label}...` : `Generate ${label}`}
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    disabled={phase === 'running'}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/75 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {openDock ? (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-24 right-4 z-[88]"
          >
            {minimized ? (
              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white shadow-glass backdrop-blur-xl"
              >
                <WandSparkles className="h-4 w-4" />
                {phase === 'running' ? `Generating ${label}...` : label}
              </button>
            ) : (
              <div className="w-[340px] rounded-[1.5rem] border border-white/10 bg-black/[0.86] p-5 shadow-glass backdrop-blur-2xl">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">Generation Center</p>
                    <h3 className="mt-2 text-lg tracking-[-0.04em] text-white">
                      {label}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMinimized(true)}
                      className="rounded-full border border-white/10 p-2 text-white/70 transition hover:border-white/20 hover:text-white"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpenDock(false)}
                      className="rounded-full border border-white/10 p-2 text-white/70 transition hover:border-white/20 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3">
                    {phase === 'running' ? (
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : null}
                    {phase === 'done' ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : null}
                    {phase === 'error' ? (
                      <XCircle className="h-5 w-5 text-white" />
                    ) : null}
                    {phase === 'idle' ? (
                      <WandSparkles className="h-5 w-5" />
                    ) : null}

                    <div>
                      <p className="text-sm text-white/[0.85]">{message}</p>
                      <p className="mt-1 text-xs leading-5 text-white/[0.45]">
                        {phase === 'running'
                          ? 'Sedang menyusun hasil terbaik untukmu.'
                          : phase === 'done'
                          ? 'Hasil sudah masuk otomatis ke field yang kamu pilih, kamu bisa close untuk popup ini yakk.'
                          : phase === 'error'
                          ? 'Terjadi kesalahan saat generate. Coba lagi nanti.'
                          : 'Klik tombol AI di field mana saja untuk mulai.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}