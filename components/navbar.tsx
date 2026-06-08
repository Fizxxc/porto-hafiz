'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const items = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#works', label: 'Works' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-4">
      <motion.nav
        initial={{ opacity: 0, y: -28, rotate: -0.7 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 0.58,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.15,
        }}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 border-2 border-[var(--line-strong)] bg-[var(--surface)] px-3 py-3 shadow-[var(--shadow-card)]"
      >
        <Link
          href="#top"
          onClick={closeMenu}
          className="group flex min-h-11 min-w-0 items-center gap-3 border-2 border-[var(--line-strong)] bg-[var(--surface-2)] px-3 py-2 shadow-[3px_3px_0_var(--line-strong)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--line-strong)]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[var(--line-strong)] bg-[var(--primary)] text-sm font-black leading-none text-white shadow-[2px_2px_0_var(--line-strong)]">
            HF
          </span>

          <span className="hidden truncate font-mono-ui text-xs font-black uppercase tracking-[0.18em] text-[var(--text)] sm:inline">
            Hafiz Al Fariz
          </span>
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

        <Link
          href="#contact"
          className="btn-primary hidden px-4 py-2 text-xs lg:inline-flex"
        >
          Let&apos;s Talk
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          className="btn-secondary flex min-h-11 min-w-11 items-center justify-center p-3 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 grid w-full max-w-6xl gap-2 border-2 border-[var(--line-strong)] bg-[var(--surface)] p-3 shadow-[var(--shadow-card)] md:hidden"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-between border-2 border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-3 font-mono-ui text-xs font-black uppercase tracking-[0.16em] text-[var(--text)] shadow-[3px_3px_0_var(--line-strong)] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}

            <Link
              href="#contact"
              onClick={closeMenu}
              className="btn-primary mt-1 min-h-12 justify-center text-xs"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}