'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#works', label: 'Works' },
  { href: '#contact', label: 'Contact' }
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -28, rotate: -0.7 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-3 z-50 mx-auto flex w-[calc(100%-1rem)] max-w-6xl items-center justify-between gap-3 border-2 border-[var(--line-strong)] bg-[var(--surface)] px-3 py-3 shadow-[var(--shadow-card)] md:top-5 md:px-4"
    >
      <Link href="#top" className="group flex min-h-11 items-center gap-3 border-2 border-[var(--line-strong)] bg-[var(--surface-2)] px-3 py-2 shadow-[3px_3px_0_var(--line-strong)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--line-strong)]">
        <span className="flex h-9 w-9 items-center justify-center border-2 border-[var(--line-strong)] bg-[var(--primary)] text-sm font-black leading-none text-white shadow-[2px_2px_0_var(--line-strong)]">HF</span>
        <span className="hidden font-mono-ui text-xs font-black uppercase tracking-[0.18em] text-[var(--text)] sm:inline">Hafiz Al Fariz</span>
      </Link>

      <div className="hidden items-center gap-2 md:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="min-h-11 border-2 border-transparent px-4 py-2 font-mono-ui text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[var(--line-strong)] hover:bg-[var(--secondary)] hover:text-[#111827]"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link href="#contact" className="btn-primary hidden px-4 py-2 text-xs lg:inline-flex">
        Let&apos;s Talk
        <ArrowUpRight className="h-4 w-4" />
      </Link>

      <Link href="#works" className="btn-secondary p-3 md:hidden" aria-label="Open works section">
        <Menu className="h-5 w-5" />
      </Link>
    </motion.nav>
  );
}
