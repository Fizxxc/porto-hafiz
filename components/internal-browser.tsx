'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Minimize2, X } from 'lucide-react';
import { useState } from 'react';

type Props = {
  url: string;
  label?: string;
};

export function InternalBrowser({ url, label = 'Open Internal Browser' }: Props) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setMinimized(false);
        }}
        className="btn-secondary px-6 py-3 text-sm"
      >
        {label}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className={`fixed z-[92] ${minimized ? 'bottom-4 right-4 h-[76px] w-[min(92vw,340px)]' : 'inset-3 md:inset-8'}`}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[var(--secondary)]" />
                  <span className="h-3 w-3 rounded-full bg-[var(--warning)]" />
                  <span className="h-3 w-3 rounded-full bg-[var(--primary)]" />
                </div>

                <p className="font-mono-ui truncate text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Internal Browser</p>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setMinimized((value) => !value)} className="btn-secondary min-h-10 px-3 py-2" aria-label="Minimize internal browser">
                    <Minimize2 className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setOpen(false)} className="btn-secondary min-h-10 px-3 py-2" aria-label="Close internal browser">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!minimized ? (
                <div className="flex-1 bg-white">
                  <iframe src={url} className="h-full w-full" title="Internal Browser" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads" />
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-between gap-3 px-4 text-sm font-bold text-[var(--text)]">
                  <span className="truncate">Browser minimized · portfolio tetap terbuka</span>
                  <button type="button" onClick={() => setMinimized(false)} className="btn-primary min-h-10 px-3 py-2 text-xs">
                    Restore
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
