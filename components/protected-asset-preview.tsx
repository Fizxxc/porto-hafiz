'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, Maximize2, Minus, Plus, Shield, X } from 'lucide-react';
import { type MouseEvent, useEffect, useMemo, useState } from 'react';
import type { GalleryItem } from '@/types';
import { isImageAsset } from '@/lib/utils';

type ProtectedAssetPreviewProps = {
  slug: string;
  title: string;
  items: GalleryItem[];
};

function useSecurityReporter(projectSlug: string) {
  return async (eventType: string, metadata?: Record<string, unknown>) => {
    try {
      await fetch('/api/security/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, projectSlug, metadata })
      });
    } catch {
      // best effort
    }
  };
}

export function ProtectedAssetPreview({ slug, title, items }: ProtectedAssetPreviewProps) {
  const imageItems = useMemo(() => items.filter((item) => isImageAsset(item.url)), [items]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [notice, setNotice] = useState('');
  const report = useSecurityReporter(slug);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = async (event: KeyboardEvent) => {
      if (event.key === 'PrintScreen') {
        event.preventDefault();
        setNotice('Protected preview aktif. Screenshot tidak bisa dijamin diblokir di semua device, jadi watermark selalu ditampilkan.');
        await report('printscreen_key', { key: event.key, title });
      }

      if ((event.ctrlKey || event.metaKey) && ['s', 'u', 'p'].includes(event.key.toLowerCase())) {
        event.preventDefault();
        setNotice('Aksi ini dibatasi pada protected preview.');
        await report('shortcut_blocked', { key: event.key.toLowerCase(), title });
      }

      if (event.key === 'F12' || ((event.ctrlKey || event.metaKey) && event.shiftKey && ['i', 'j', 'c'].includes(event.key.toLowerCase()))) {
        event.preventDefault();
        setNotice('Developer tools shortcut terdeteksi dan dilog ke admin.');
        await report('devtools_shortcut', { key: event.key.toLowerCase(), title });
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, report, title]);

  if (!imageItems.length) return null;

  const active = imageItems[index] ?? imageItems[0];
  const previewUrl = `/api/projects/${slug}/preview?src=${encodeURIComponent(active.url)}`;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setIndex(0);
          setZoom(1);
          setNotice('');
        }}
        className="brutal-button bg-[var(--surface-2)] px-6 py-3 text-sm"
      >
        <Eye className="h-4 w-4" />
        Preview Asset
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[94] overflow-hidden bg-[var(--page)]"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="neo-orb soft -left-20 top-12 h-72 w-72 rounded-full bg-[var(--surface-2)]" />
              <div className="neo-orb soft -right-24 bottom-10 h-80 w-80 rounded-full bg-[var(--surface-3)]" />
              <div className="halftone absolute right-10 top-24 h-36 w-36 opacity-30" />
            </div>

            <div className="relative z-10 flex h-full flex-col px-4 py-4 md:px-8 md:py-6">
              <div className="neo-window brutal-panel mx-auto w-full max-w-7xl bg-[var(--surface)]">
                <div className="neo-window-bar">
                  <div>
                    <p className="section-label bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))]">Protected Asset Viewer</p>
                    <h3 className="mt-3 text-xl font-black tracking-[-0.05em] text-[var(--text)]">{title}</h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{active.label}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <button type="button" onClick={() => setZoom((value) => Math.max(0.75, Number((value - 0.2).toFixed(2))))} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface)] p-3 text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5" aria-label="Zoom out">
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-2 text-sm font-black text-[var(--text)] shadow-[var(--shadow-card)]">{Math.round(zoom * 100)}%</div>
                    <button type="button" onClick={() => setZoom((value) => Math.min(3, Number((value + 0.2).toFixed(2))))} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface)] p-3 text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5" aria-label="Zoom in">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => setZoom(1)} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))] px-4 py-3 text-sm font-black text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5">
                      <Maximize2 className="mr-2 inline h-4 w-4" />Reset
                    </button>
                    <button type="button" onClick={() => setOpen(false)} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface-3)] p-3 text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5" aria-label="Close preview">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-4 grid w-full max-w-7xl flex-1 gap-4 overflow-hidden lg:grid-cols-[1fr_320px]">
                <div
                  onContextMenu={async (event: MouseEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    setNotice('Klik kanan diblokir pada protected preview dan sudah tercatat di admin log.');
                    await report('context_menu_blocked', { label: active.label, url: active.url });
                  }}
                  className="relative overflow-hidden rounded-2xl border-[3px] border-[var(--line-strong)] bg-[var(--surface)] shadow-[var(--shadow-soft)]"
                >
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b-[3px] border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))] px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text)]">Watermarked Preview</p>
                    <p className="hidden text-xs font-black uppercase tracking-[0.2em] text-[var(--muted)] sm:block">Hafiz Al Fariz</p>
                  </div>

                  <div className="h-full w-full overflow-auto px-5 pb-6 pt-20">
                    <div className="relative mx-auto flex min-h-full min-w-fit items-center justify-center" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
                      <div className="relative overflow-hidden rounded-2xl border-[3px] border-[var(--line-strong)] bg-slate-950 shadow-[var(--shadow-card)]">
                        <Image
                          src={previewUrl}
                          alt={active.label}
                          width={1600}
                          height={1200}
                          unoptimized
                          draggable={false}
                          className="h-auto max-w-[min(80vw,1100px)] select-none object-contain"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_28%,transparent_68%,rgba(255,255,255,0.10))]" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {notice ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="absolute bottom-5 left-5 right-5 rounded-2xl border-[3px] border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--secondary)_10%,var(--surface))] p-4 shadow-[var(--shadow-card)]"
                      >
                        <div className="flex items-start gap-3">
                          <Shield className="mt-0.5 h-4 w-4 text-[var(--text)]" />
                          <p className="text-sm font-black leading-6 text-[var(--text)]">{notice}</p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="space-y-4 rounded-2xl border-[3px] border-[var(--line-strong)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
                  <div>
                    <p className="section-label bg-[var(--surface-2)]">Asset List</p>
                    <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">
                      Preview memakai watermark generated preview dan QR support yang tertanam agar tampilan tetap aman saat dilihat publik.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {imageItems.map((item: GalleryItem, itemIndex: number) => (
                      <button
                        key={`${item.url}-${itemIndex}`}
                        type="button"
                        onClick={() => {
                          setIndex(itemIndex);
                          setZoom(1);
                          setNotice('');
                        }}
                        className={`w-full rounded-2xl border-[3px] px-4 py-4 text-left text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 ${
                          itemIndex === index ? 'border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))]' : 'border-[var(--line-strong)] bg-[var(--surface)] hover:bg-[var(--surface-2)]'
                        }`}
                      >
                        <p className="text-sm font-black tracking-[-0.02em] text-[var(--text)]">{item.label}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Watermarked preview</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
