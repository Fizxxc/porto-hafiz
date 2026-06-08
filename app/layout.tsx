import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CustomCursor } from '@/components/custom-cursor';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Portfolio Hafiz Al Fariz',
  description:
    'Portfolio online Hafiz Al Fariz dengan UI brutalism, React Three Fiber loading, transisi landing page, karya visual, project asset, dan dashboard admin responsive untuk HP maupun desktop.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body className="cursor-none">
        <CustomCursor />

        {children}

        <div className="pointer-events-none fixed bottom-4 right-4 z-[70] hidden border-2 border-[var(--line-strong)] bg-[var(--surface)] px-4 py-2 font-mono-ui text-[10px] font-black uppercase tracking-[0.18em] text-[var(--text)] shadow-[var(--shadow-small)] md:block">
          <p>© {new Date().getFullYear()} Hafiz Al Fariz</p>
        </div>
      </body>
    </html>
  );
}