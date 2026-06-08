'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, DownloadCloud, Minimize2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DownloadDock() {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'downloading' | 'done'>('idle');

  useEffect(() => {
    const onStart = () => {
      setVisible(true);
      setMinimized(false);
      setPhase('downloading');
      window.setTimeout(() => setPhase('done'), 2800);
      window.setTimeout(() => setMinimized(true), 5200);
    };

    window.addEventListener('hafiz-download-start', onStart);
    return () => window.removeEventListener('hafiz-download-start', onStart);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className={`fixed z-[90] ${minimized ? 'bottom-4 right-4 w-[min(92vw,340px)]' : 'bottom-4 left-1/2 w-[min(92vw,560px)] -translate-x-1/2 md:bottom-6'}`}
        >
          <div className="overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-soft)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--surface-2)] px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-[0_12px_28px_rgba(200,0,223,0.26)]">
                  <motion.div animate={phase === 'downloading' ? { rotate: 360 } : { rotate: 0 }} transition={phase === 'downloading' ? { duration: 1.2, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}>
                    {phase === 'done' ? <CheckCircle2 className="h-5 w-5" /> : <DownloadCloud className="h-5 w-5" />}
                  </motion.div>
                </div>
                <div>
                  <p className="text-sm font-extrabold tracking-[-0.02em] text-[var(--text)]">
                    {phase === 'downloading' ? 'Preparing protected download' : 'Protected download ready'}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)]">
                    {phase === 'downloading'
                      ? 'Watermark, metadata author, dan file packaging sedang dibuat.'
                      : 'File berhasil diproses. Browser akan melanjutkan download otomatis.'}
                  </p>
                </div>
              </div>

              <button type="button" onClick={() => setMinimized((value) => !value)} className="btn-secondary min-h-10 px-3 py-2" aria-label="Minimize download dock">
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            {!minimized ? (
              <div className="space-y-3 px-5 py-4">
                <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                    initial={{ width: '8%' }}
                    animate={{ width: phase === 'done' ? '100%' : ['10%', '62%', '84%'] }}
                    transition={phase === 'done' ? { duration: 0.45 } : { duration: 1.6, repeat: Infinity, repeatType: 'reverse' }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono-ui text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span>portfolio transfer</span>
                  <span>{phase === 'done' ? '100%' : 'processing'}</span>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
