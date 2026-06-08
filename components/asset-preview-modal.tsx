'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Download, Minus, Plus, RotateCcw, Shield, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ProjectAsset } from '@/types';

type Props = {
  open: boolean;
  assets: ProjectAsset[];
  initialIndex: number;
  projectSlug: string;
  onClose: () => void;
};

async function logEvent(payload: {
  eventType: string;
  target?: string;
  detail?: string;
  projectSlug?: string;
  assetId?: string;
}) {
  try {
    await fetch('/api/security/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {}
}

export function AssetPreviewModal({ open, assets, initialIndex, projectSlug, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [notice, setNotice] = useState('');

  const activeAsset = assets[activeIndex];

  useEffect(() => {
    if (!open) return;
    setActiveIndex(initialIndex);
    setScale(1);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === '+') setScale((value) => Math.min(3, value + 0.2));
      if (event.key === '-') setScale((value) => Math.max(0.8, value - 0.2));
      if (event.key === '0') setScale(1);
      if (event.key === 'ArrowRight') setActiveIndex((value) => (value + 1) % assets.length);
      if (event.key === 'ArrowLeft') setActiveIndex((value) => (value - 1 + assets.length) % assets.length);
      if (event.key === 'PrintScreen') setNotice('Preview dilindungi watermark.');
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, assets.length]);

  const previewUrl = useMemo(() => {
    if (!activeAsset?.id) return '';
    return `/api/project-assets/${activeAsset.id}/preview`;
  }, [activeAsset]);

  if (!open || !activeAsset) return null;

  const handleBlockedAction = (eventType: string, detail: string) => {
    setNotice('Aksi dibatasi untuk melindungi karya.');
    void logEvent({
      eventType,
      detail,
      projectSlug,
      assetId: activeAsset.id,
      target: activeAsset.label || activeAsset.file_url
    });
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] overflow-hidden bg-[var(--page)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="neo-orb soft -left-24 top-16 h-72 w-72 rounded-full bg-[var(--surface-2)]" />
          <div className="neo-orb soft -right-24 bottom-12 h-80 w-80 rounded-full bg-[var(--surface-3)]" />
          <div className="halftone absolute right-10 top-24 h-36 w-36 opacity-35" />
        </div>

        <div className="relative z-10 flex h-full flex-col px-4 py-4 md:px-8 md:py-6">
          <div className="neo-window brutal-panel mx-auto w-full max-w-7xl bg-[var(--surface)]">
            <div className="neo-window-bar">
              <div>
                <p className="section-label bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))]">Protected Preview</p>
                <h3 className="mt-3 text-lg font-black tracking-[-0.04em] text-[var(--text)]">{activeAsset.label || `Image ${activeIndex + 1}`}</h3>
                {activeAsset.caption ? <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{activeAsset.caption}</p> : null}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <button type="button" onClick={() => setScale((value) => Math.max(0.8, value - 0.2))} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface)] p-3 text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5" aria-label="Zoom out">
                  <Minus className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setScale((value) => Math.min(3, value + 0.2))} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface)] p-3 text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5" aria-label="Zoom in">
                  <Plus className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setScale(1)} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))] p-3 text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5" aria-label="Reset zoom">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <a
                  href={`/api/project-assets/${activeAsset.id}/download`}
                  onClick={() =>
                    void logEvent({
                      eventType: 'download',
                      detail: 'download from preview modal',
                      projectSlug,
                      assetId: activeAsset.id,
                      target: activeAsset.label || activeAsset.file_url
                    })
                  }
                  className="brutal-button bg-[color-mix(in_srgb,var(--secondary)_10%,var(--surface))] px-4 py-3 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button type="button" onClick={onClose} className="rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface-3)] p-3 text-[var(--text)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5" aria-label="Close preview">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-4 flex w-full max-w-7xl flex-1 overflow-hidden rounded-2xl border-[3px] border-[var(--line-strong)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
            <div className="absolute left-4 top-4 z-20 rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface-2)] px-3 py-2 text-xs font-black text-[var(--text)] shadow-[var(--shadow-card)]">
              Zoom {(scale * 100).toFixed(0)}%
            </div>

            <div className="absolute bottom-4 left-4 z-20 max-w-[320px] rounded-2xl border-[3px] border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--secondary)_10%,var(--surface))] p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-4 w-4 text-[var(--text)]" />
                <div className="text-xs font-bold leading-6 text-[var(--text)]">Preview diberi watermark. Klik kanan, drag, dan aksi mencurigakan dicatat oleh sistem.</div>
              </div>

              {notice ? (
                <div className="mt-3 flex items-start gap-3 rounded-2xl border-[3px] border-[var(--line-strong)] bg-[var(--surface)] p-3 text-xs font-black text-[var(--text)]">
                  <AlertTriangle className="mt-0.5 h-4 w-4" />
                  <p>{notice}</p>
                </div>
              ) : null}
            </div>

            <div className="absolute bottom-4 right-4 z-20 rounded-2xl border-[3px] border-[var(--line-strong)] bg-[var(--surface)] p-3 shadow-[var(--shadow-card)]">
              <img src="/api/qr?value=https://saweria.co/Fizzx" alt="QR Support Developer" className="h-20 w-20 opacity-90" draggable={false} />
            </div>

            <div className="flex w-full items-center justify-center overflow-auto p-6 md:p-10">
              <div
                className="relative max-w-full"
                onContextMenu={(event) => {
                  event.preventDefault();
                  handleBlockedAction('contextmenu', 'blocked inside preview');
                }}
                onDragStart={(event) => {
                  event.preventDefault();
                  handleBlockedAction('dragstart', 'drag blocked inside preview');
                }}
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-transparent" />
                <img
                  src={previewUrl}
                  alt={activeAsset.label || `Asset ${activeIndex + 1}`}
                  draggable={false}
                  className="max-h-[78vh] w-auto max-w-none select-none rounded-2xl border-[3px] border-[var(--line-strong)] shadow-[var(--shadow-card)]"
                  style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 180ms ease' }}
                />
              </div>
            </div>

            {assets.length > 1 ? (
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border-[3px] border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2 shadow-[var(--shadow-card)]">
                {assets.map((asset, index) => (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      setScale(1);
                    }}
                    className={`h-3 w-3 rounded-full border-2 border-[var(--line-strong)] transition ${index === activeIndex ? 'bg-[var(--surface-3)]' : 'bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface))]'}`}
                    aria-label={asset.label || `Image ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
