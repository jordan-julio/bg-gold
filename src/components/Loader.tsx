// components/Loader.tsx
import React from 'react';
import styles from './Loader.module.css';

export type LoaderType = 'circle' | 'triangle' | 'rect';

interface LoaderProps {
  /** shape of the loader */
  type?: LoaderType;
  /** override the animation duration (e.g. "2s") */
  duration?: string;
}

export default function Loader({
  type = 'rect',
  duration = '3s',
}: LoaderProps) {
  // pick the SVG and viewBox per type
  let svgElement: React.ReactNode;
  let viewBox: string;

  switch (type) {
    case 'circle':
      viewBox = '0 0 80 80';
      svgElement = <circle cx="40" cy="40" r="32" />;
      break;
    case 'triangle':
      viewBox = '0 0 86 80';
      svgElement = <polygon points="43 8 79 72 7 72" />;
      break;
    case 'rect':
    default:
      viewBox = '0 0 80 80';
      svgElement = <rect x="8" y="8" width="64" height="64" />;
      break;
  }

  // mix the duration variable into the inline style
  const cssVars = {
    '--duration': duration,
  } as React.CSSProperties;

  return (
    <div
      className={`${styles.loader} ${
        type === 'triangle' ? styles.triangle : ''
      }`}
      style={cssVars}
    >
      <svg viewBox={viewBox}>{svgElement}</svg>
    </div>
  );
}
