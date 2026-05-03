'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

export default function AnimatedCounter({
  target,
  duration = 2000,
  className = '',
}: {
  target: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState('—');

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);

    if (isNaN(num) || num === 0) {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplay(target.slice(0, i));
        if (i >= target.length) clearInterval(iv);
      }, duration / Math.max(target.length, 1));
      return () => clearInterval(iv);
    }

    const start = performance.now();
    const frame = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const curr = Math.round(ease * num);
      setDisplay(p < 1 ? curr.toLocaleString('pt-BR') : target);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView]);

  return <span ref={ref} className={className}>{display}</span>;
}
