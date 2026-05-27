'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { damping: 26, stiffness: 320, mass: 0.55 });
  const ringY = useSpring(cursorY, { damping: 26, stiffness: 320, mass: 0.55 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#111] bg-[#ff5ca8] md:block"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#111] bg-[#d7ff31]/30 md:block"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
