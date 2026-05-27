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
        className="brutal-button bg-[#7df9ff] px-6 py-3 text-sm"
      >
        {label}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className={`fixed z-[92] ${minimized ? 'bottom-5 right-5 h-[72px] w-[320px]' : 'inset-4 md:inset-8'}`}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border-[3px] border-[#111] bg-[#fffdf2] shadow-[12px_12px_0_#111]">
              <div className="flex items-center justify-between gap-4 border-b-[3px] border-[#111] bg-[#d7ff31] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full border-2 border-[#111] bg-[#ff5ca8]" />
                  <span className="h-3 w-3 rounded-full border-2 border-[#111] bg-[#ffb000]" />
                  <span className="h-3 w-3 rounded-full border-2 border-[#111] bg-[#7df9ff]" />
                </div>

                <p className="truncate text-sm font-black uppercase tracking-[0.14em] text-[#111]">Internal Browser</p>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setMinimized((value) => !value)} className="rounded-full border-2 border-[#111] bg-white p-2 text-[#111] shadow-[3px_3px_0_#111] transition hover:-translate-y-0.5">
                    <Minimize2 className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setOpen(false)} className="rounded-full border-2 border-[#111] bg-[#ff5ca8] p-2 text-[#111] shadow-[3px_3px_0_#111] transition hover:-translate-y-0.5">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!minimized ? (
                <div className="flex-1 bg-white">
                  <iframe src={url} className="h-full w-full" title="Internal Browser" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads" />
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-between px-4 text-sm font-bold text-[#111]">
                  <span>Browser minimized · portfolio tetap terbuka</span>
                  <button type="button" onClick={() => setMinimized(false)} className="rounded-full border-2 border-[#111] bg-[#7df9ff] px-3 py-1.5 text-xs font-black text-[#111] shadow-[3px_3px_0_#111]">
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
