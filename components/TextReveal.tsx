'use client';

import { motion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: 'word' | 'char';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  mode = 'word',
}: TextRevealProps) {
  const units = mode === 'char' ? text.split('') : text.split(' ');

  return (
    <span className={`inline-flex flex-wrap ${mode === 'word' ? 'gap-x-[0.25em]' : ''}`}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block" style={{ overflow: 'clip', overflowClipMargin: '0.3em' }}>
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit === ' ' ? ' ' : unit}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
