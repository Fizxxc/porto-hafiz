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
          className={`fixed z-[90] ${minimized ? 'bottom-6 right-6 w-[320px]' : 'bottom-6 left-1/2 w-[min(92vw,560px)] -translate-x-1/2'}`}
        >
          <div className="overflow-hidden rounded-2xl border-[3px] border-[#111] bg-[#fffdf2] shadow-[10px_10px_0_#111]">
            <div className="flex items-center justify-between gap-4 border-b-[3px] border-[#111] bg-[#7df9ff] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#111] bg-[#d7ff31] shadow-[4px_4px_0_#111]">
                  <motion.div animate={phase === 'downloading' ? { rotate: 360 } : { rotate: 0 }} transition={phase === 'downloading' ? { duration: 1.2, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}>
                    {phase === 'done' ? <CheckCircle2 className="h-5 w-5 text-[#111]" /> : <DownloadCloud className="h-5 w-5 text-[#111]" />}
                  </motion.div>
                </div>
                <div>
                  <p className="text-sm font-black tracking-[-0.02em] text-[#111]">
                    {phase === 'downloading' ? 'Preparing protected download' : 'Protected download ready'}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#111]/70">
                    {phase === 'downloading'
                      ? 'Watermark, metadata author, dan file packaging sedang dibuat.'
                      : 'File berhasil diproses. Browser akan melanjutkan download secara otomatis.'}
                  </p>
                </div>
              </div>

              <button type="button" onClick={() => setMinimized((value) => !value)} className="rounded-full border-[3px] border-[#111] bg-white p-2 text-[#111] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5">
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            {!minimized ? (
              <div className="space-y-3 px-5 py-4">
                <div className="h-3 overflow-hidden rounded-full border-[3px] border-[#111] bg-white">
                  <motion.div
                    className="h-full rounded-full bg-[#ff5ca8]"
                    initial={{ width: '8%' }}
                    animate={{ width: phase === 'done' ? '100%' : ['10%', '62%', '84%'] }}
                    transition={phase === 'done' ? { duration: 0.45 } : { duration: 1.6, repeat: Infinity, repeatType: 'reverse' }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-[#111]/60">
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
