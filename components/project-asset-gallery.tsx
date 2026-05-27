'use client';

import { useState } from 'react';
import { Download, Eye, ShieldAlert } from 'lucide-react';
import type { ProjectAsset } from '@/types';
import { AssetPreviewModal } from '@/components/asset-preview-modal';

type Props = {
  assets: ProjectAsset[];
  projectSlug: string;
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

export function ProjectAssetGallery({ assets, projectSlug }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!assets.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-white/55">
        Belum ada asset preview yang ditambahkan untuk project ini.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {assets.map((asset, index) => (
          <div
            key={asset.id}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            onContextMenu={(event) => {
              event.preventDefault();
              void logEvent({
                eventType: 'contextmenu',
                detail: 'blocked on asset card',
                projectSlug,
                assetId: asset.id,
                target: asset.label || asset.file_url
              });
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-black">
              <img
                src={`/api/project-assets/${asset.id}/preview`}
                alt={asset.label || `Asset ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl">
                Image {index + 1}
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-xs text-white/75 backdrop-blur-xl">
                <ShieldAlert className="h-3.5 w-3.5" />
                Protected Preview
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <h3 className="text-lg tracking-[-0.04em] text-white">
                  {asset.label || `Image ${index + 1}`}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  {asset.caption || 'Belum ada keterangan untuk asset ini.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setOpen(true);
                    void logEvent({
                      eventType: 'preview',
                      detail: 'open preview modal',
                      projectSlug,
                      assetId: asset.id,
                      target: asset.label || asset.file_url
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>

                <a
                  href={`/api/project-assets/${asset.id}/download`}
                  onClick={() =>
                    void logEvent({
                      eventType: 'download',
                      detail: 'download from gallery card',
                      projectSlug,
                      assetId: asset.id,
                      target: asset.label || asset.file_url
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-4 py-3 text-sm font-medium text-black transition hover:opacity-85"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AssetPreviewModal
        open={open}
        assets={assets}
        initialIndex={activeIndex}
        projectSlug={projectSlug}
        onClose={() => setOpen(false)}
      />
    </>
  );
}