import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CustomCursor } from '@/components/custom-cursor';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Portfolio Hafiz Al Fariz',
  description: 'Portfolio online Hafiz Al Fariz dengan tampilan neobrutalism, karya visual, project asset, dan pengalaman UX yang lebih berani, jelas, serta mudah dinavigasi.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <CustomCursor />
        {children}
        <div className="pointer-events-none fixed bottom-5 right-5 z-[70] hidden rounded-full border-[3px] border-[#111] bg-[#d7ff31] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#111] shadow-[5px_5px_0_#111] md:block">
          <p>© {new Date().getFullYear()} Hafiz Al Fariz</p>
        </div>
      </body>
    </html>
  );
}
