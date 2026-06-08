'use client';

import { Download } from 'lucide-react';

type Props = {
  href: string;
};

export function DownloadLink({ href }: Props) {
  return (
    <a href={href} onClick={() => window.dispatchEvent(new Event('hafiz-download-start'))} className="btn-primary px-6 py-3 text-sm">
      <Download className="h-4 w-4" />
      Download Assets / Sharelink
    </a>
  );
}
