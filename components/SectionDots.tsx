'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SECTIONS = [
  { id: '',             label: 'INÍCIO' },
  { id: 'doutrina',    label: 'DOUTRINA' },
  { id: 'comando',     label: 'COMANDO' },
  { id: 'linha-do-tempo', label: 'HISTÓRIA' },
  { id: 'scourge',     label: 'SCOURGE' },
  { id: 'alistamento', label: 'ALISTAR' },
];

export default function SectionDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const trigger = window.scrollY + window.innerHeight * 0.35;
      let next = 0;
      SECTIONS.forEach((section, i) => {
        const el = section.id
          ? document.getElementById(section.id)
          : (document.querySelector('section') as HTMLElement | null);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (trigger >= top) next = i;
      });
      setActive(next);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollTo = (id: string) => {
    const lenis = (window as any).__lenis;
    if (!id) {
      lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    lenis ? lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-end">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id || 'hero'}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label={section.label}
        >
          <span className="font-mono text-[9px] tracking-widest text-steel-gray/0 group-hover:text-steel-gray/60 transition-all duration-200 whitespace-nowrap opacity-0 group-hover:opacity-100">
            {section.label}
          </span>
          <motion.div
            animate={active === i
              ? { width: 8, height: 8, backgroundColor: 'var(--color-blood-red)', borderColor: 'var(--color-blood-red)' }
              : { width: 6, height: 6, backgroundColor: 'transparent', borderColor: 'rgba(184,190,200,0.3)' }
            }
            transition={{ duration: 0.2 }}
            className="rounded-full border shrink-0 group-hover:border-steel-gray/60 transition-colors"
          />
        </button>
      ))}
    </div>
  );
}
