'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState<'bean' | 'text' | 'exit'>('bean');

  useEffect(() => {
    // Stage 1: Cocoa bean logo animation (0ms to 900ms)
    const textTimer = setTimeout(() => {
      setStage('text');
    }, 900);

    // Stage 2: Morph/Transition to COCOA wordmark (900ms to 1800ms)
    const exitTimer = setTimeout(() => {
      setStage('exit');
    }, 1800);

    // Stage 3: Complete loading (fade out finished at 2200ms)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2B1810]"
        >
          {/* Logo container with micro-glow */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Ambient Background Gold Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-48 h-48 rounded-full bg-[#C69C6D] blur-3xl pointer-events-none"
            />

            <AnimatePresence mode="wait">
              {stage === 'bean' && (
                <motion.div
                  key="bean"
                  initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 20, y: -10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-24 h-24 flex items-center justify-center text-[#C69C6D]"
                >
                  {/* Premium Handcrafted Cocoa Bean SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full drop-shadow-[0_4px_10px_rgba(198,156,109,0.3)]"
                  >
                    {/* Outer bean contour */}
                    <motion.path
                      d="M20,50 C15,35 30,15 50,20 C70,25 85,40 80,60 C75,80 55,85 35,80 C25,75 22,60 20,50 Z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    {/* Inner texture lines */}
                    <motion.path
                      d="M30,38 C42,42 58,35 70,45"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                    />
                    <motion.path
                      d="M25,50 C38,55 52,48 75,58"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                    />
                    <motion.path
                      d="M32,62 C45,67 55,60 68,70"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>
              )}

              {stage === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  {/* COCOA Wordmark with expanding character tracking */}
                  <motion.h1
                    initial={{ letterSpacing: '0.1em' }}
                    animate={{ letterSpacing: '0.4em' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="font-playfair text-5xl md:text-7xl font-bold tracking-widest text-[#FFF8F0] pr-[-0.4em] drop-shadow-[0_2px_15px_rgba(255,248,240,0.15)]"
                  >
                    COCOA
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-cormorant italic text-[#C69C6D] text-lg md:text-xl tracking-wider mt-3"
                  >
                    Where Chocolate Flows & Stories Brew
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
