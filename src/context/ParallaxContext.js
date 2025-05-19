'use client';
import { createContext, useContext, useEffect, useState, useRef } from 'react';

// Provides raw scroll offset to descendants
const ParallaxContext = createContext(0);

export function ParallaxProvider({ children }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <ParallaxContext.Provider value={offset}>
      {children}
    </ParallaxContext.Provider>
  );
}

// Hook returns a clamped delta from initial mount, scaled by factor
export function useParallax(factor = 0.5, maxFactor = 0.5) {
  const offset = useContext(ParallaxContext);
  const initial = useRef<Number | null>(null);

  // Set initial scroll on first render in effect to ensure window defined
  useEffect(() => {
    if (initial.current === null) {
      initial.current = offset;
    }
  }, [initial, offset]);

  const start = initial.current ?? 0;
  const delta = offset - start;

  // raw translation (can be positive or negative)
  const rawTranslate = delta * factor;

  // determine maxTranslate safely only in browser
  const maxTranslate = typeof window !== 'undefined'
    ? window.innerHeight * maxFactor
    : 0;

  // clamp value between -maxTranslate and +maxTranslate
  const clamped = Math.max(-maxTranslate, Math.min(rawTranslate, maxTranslate));

  return clamped;
}