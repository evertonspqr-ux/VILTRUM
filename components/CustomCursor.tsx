'use client';

import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'link' | 'button' | 'text';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return setState('default');

      const tag = el.tagName.toLowerCase();
      const role = el.getAttribute('role');
      const isLink = tag === 'a' || !!el.closest('a');
      const isBtn = tag === 'button' || role === 'button' || !!el.closest('button');
      const isText = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'li'].includes(tag);

      if (isBtn) setState('button');
      else if (isLink) setState('link');
      else if (isText) setState('text');
      else setState('default');
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Loop suave para o anel (lag intencional)
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ringSize = {
    default: 'w-8 h-8',
    link: 'w-12 h-12',
    button: 'w-14 h-14',
    text: 'w-6 h-6',
  }[state];

  const ringColor = {
    default: 'border-imperial-white/60',
    link: 'border-blood-red',
    button: 'border-alert-red',
    text: 'border-steel-gray/40',
  }[state];

  const dotColor = {
    default: 'bg-imperial-white',
    link: 'bg-blood-red',
    button: 'bg-alert-red',
    text: 'bg-steel-gray',
  }[state];

  if (!mounted) return null;

  return (
    <>
      {/* Ponto central — segue direto */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] transition-colors duration-150 ${dotColor} ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      {/* Anel externo — segue com lag */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[99998] transition-[width,height,border-color] duration-200 ${ringSize} ${ringColor} ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
