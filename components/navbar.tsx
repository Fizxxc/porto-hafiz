'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
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
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-[1.2rem] border-[3px] border-[#111] bg-[#fffdf2] px-3 py-3 shadow-[10px_10px_0_#111] md:px-4"
    >
      <Link href="#top" className="flex items-center gap-3 rounded-full border-[3px] border-[#111] bg-white px-3 py-2 shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#111] bg-[#d7ff31] text-lg font-black leading-none text-[#111]">HF</span>
        <span className="hidden text-xs font-black uppercase tracking-[0.22em] text-[#111] sm:inline">Hafiz Al Fariz</span>
      </Link>

      <div className="hidden items-center gap-2 md:flex">
        {items.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${index === 0 ? 'bg-[#d7ff31]' : index === 1 ? 'bg-[#7df9ff]' : index === 2 ? 'bg-[#ffb000]' : 'bg-[#ff5ca8]'} rounded-full border-2 border-[#111] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#111] transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#111]`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link href="#contact" className="hidden rounded-full border-[3px] border-[#111] bg-[#ffb000] px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#111] shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 lg:inline-flex">
        Let&apos;s Talk
      </Link>

      <Link href="#works" className="inline-flex rounded-full border-[3px] border-[#111] bg-[#7df9ff] p-3 text-[#111] shadow-[4px_4px_0_#111] md:hidden" aria-label="Open works section">
        <Menu className="h-5 w-5" />
      </Link>
    </motion.nav>
  );
}
