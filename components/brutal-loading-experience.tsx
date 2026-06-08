'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import type { Mesh } from 'three';

type LoaderState = 'booting' | 'revealing' | 'done';

function BrutalLoaderMesh({ progress }: { progress: number }) {
  const block = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (block.current) {
      block.current.rotation.x = time * 0.72;
      block.current.rotation.y = time * 0.92;
      block.current.position.y = Math.sin(time * 1.6) * 0.16;
      const scale = 1 + progress / 520;
      block.current.scale.setScalar(scale);
    }
    if (ring.current) {
      ring.current.rotation.x = Math.PI / 2.7;
      ring.current.rotation.z = -time * 0.9;
      ring.current.scale.setScalar(1.04 + Math.sin(time * 2) * 0.035);
    }
  });

  return (
    <>
      <ambientLight intensity={2.2} />
      <directionalLight position={[4, 5, 6]} intensity={4.4} />
      <pointLight position={[-4, -2, 4]} intensity={3.2} color="#DAA144" />
      <mesh ref={ring} position={[0, 0, -0.18]}>
        <torusGeometry args={[1.48, 0.08, 16, 72]} />
        <meshStandardMaterial color="#111827" roughness={0.58} metalness={0.12} />
      </mesh>
      <mesh ref={block} castShadow receiveShadow>
        <boxGeometry args={[1.24, 1.24, 1.24]} />
        <meshStandardMaterial color="#DD614C" roughness={0.46} metalness={0.08} />
      </mesh>
      <mesh position={[1.32, -1.08, 0.12]} rotation={[0.2, 0.1, -0.16]}>
        <boxGeometry args={[0.58, 0.58, 0.58]} />
        <meshStandardMaterial color="#DAA144" roughness={0.5} metalness={0.06} />
      </mesh>
      <mesh position={[-1.34, 1.02, 0.02]} rotation={[0.35, 0.4, 0.22]}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.42} metalness={0.06} />
      </mesh>
    </>
  );
}

function ProgressNumber({ value }: { value: number }) {
  return (
    <span aria-live="polite" className="font-mono-ui text-2xl font-black tabular-nums tracking-[-0.03em] text-[var(--text)] md:text-4xl">
      {Math.round(value).toString().padStart(2, '0')}%
    </span>
  );
}

export function BrutalLoadingExperience({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LoaderState>('booting');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let current = 0;
    const startedAt = performance.now();
    const duration = 2450;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const target = Math.min(100, 7 + (elapsed / duration) * 98);
      current = current + (target - current) * 0.09;
      setProgress(Math.min(100, current));

      if (elapsed < duration || current < 99.4) {
        frame = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        window.setTimeout(() => setState('revealing'), 320);
        window.setTimeout(() => setState('done'), 1280);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const isLoading = state === 'booting';

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="portfolio-loader"
            className="loader-screen"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-115%', transition: { duration: 0.92, ease: [0.76, 0, 0.24, 1] } }}
            aria-label="Loading portfolio experience"
            role="status"
          >
            <div aria-hidden="true" className="loader-grid" />
            <motion.div
              className="loader-card"
              initial={{ opacity: 0, y: 28, rotate: -1.2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="loader-copy">
                <p className="section-label">React Three Fiber Loader</p>
                <h2>Hafiz Al Fariz</h2>
                <p>Building brutal portfolio scene, assets, dashboard panels, and motion-ready landing transition.</p>
              </div>

              <div className="loader-stage" aria-hidden="true">
                <Canvas camera={{ position: [0, 0, 4.8], fov: 43 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
                  <Suspense fallback={null}>
                    <BrutalLoaderMesh progress={progress} />
                  </Suspense>
                </Canvas>
              </div>

              <div className="loader-meter">
                <div className="flex items-end justify-between gap-4">
                  <span className="font-mono-ui text-xs font-black uppercase tracking-[0.22em] text-[var(--muted)]">Loading UI</span>
                  <ProgressNumber value={progress} />
                </div>
                <div className="loader-progress" aria-hidden="true">
                  <motion.div style={{ width: `${progress}%` }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="page-rise"
        initial={{ opacity: 0, y: 110, scale: 0.985 }}
        animate={state === 'done' || state === 'revealing' ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 110, scale: 0.985 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
