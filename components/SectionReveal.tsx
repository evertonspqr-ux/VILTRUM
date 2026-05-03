'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'motion/react';

type RevealVariant = 'slide-up' | 'wipe-left' | 'wipe-right' | 'scale-in' | 'clip-top';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
}

const variants: Record<RevealVariant, Variants> = {
  'slide-up': {
    hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0, y: 40 },
    visible: { clipPath: 'inset(0% 0 0 0)', opacity: 1, y: 0 },
  },
  'wipe-left': {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
  },
  'wipe-right': {
    hidden: { clipPath: 'inset(0 0 0 100%)', opacity: 0 },
    visible: { clipPath: 'inset(0 0 0 0%)', opacity: 1 },
  },
  'scale-in': {
    hidden: { clipPath: 'inset(8% 8% 8% 8% round 4px)', opacity: 0, scale: 0.94 },
    visible: { clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1, scale: 1 },
  },
  'clip-top': {
    hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0 0% 0)', opacity: 1 },
  },
};

export default function SectionReveal({
  children,
  className = '',
  variant = 'slide-up',
  delay = 0,
  threshold = 0.15,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={variants[variant]}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
