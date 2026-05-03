'use client';

import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'link' | 'button' | 'text';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  size: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const lastParticlePos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.cursor = 'none';

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
      window.addEventListener('resize', onResize);
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const dx = e.clientX - lastParticlePos.current.x;
      const dy = e.clientY - lastParticlePos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 10) {
        lastParticlePos.current = { x: e.clientX, y: e.clientY };
        particles.current.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 0.8,
          life: 1,
          size: Math.random() * 2.5 + 1,
        });
        if (particles.current.length > 25) particles.current.shift();
      }

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

      // Draw particles on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.current = particles.current.filter(p => p.life > 0.01);
          for (const p of particles.current) {
            p.life -= 0.045;
            p.x += p.vx;
            p.y += p.vy;
            const alpha = p.life * 0.55;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(176, 0, 0, ${alpha})`;
            ctx.fill();
          }
        }
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

  const ringSize = { default: 'w-8 h-8', link: 'w-12 h-12', button: 'w-14 h-14', text: 'w-6 h-6' }[state];
  const ringColor = { default: 'border-imperial-white/60', link: 'border-blood-red', button: 'border-alert-red', text: 'border-steel-gray/40' }[state];
  const dotColor = { default: 'bg-imperial-white', link: 'bg-blood-red', button: 'bg-alert-red', text: 'bg-steel-gray' }[state];

  if (!mounted) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99997]"
        style={{ width: '100vw', height: '100vh' }}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] transition-colors duration-150 ${dotColor} ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[99998] transition-[width,height,border-color] duration-200 ${ringSize} ${ringColor} ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
