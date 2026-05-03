'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin } from 'lucide-react';
import ViltrumLogo from './ViltrumLogo';
import GlitchText from './GlitchText';

export default function OathOverlay({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'flash' | 'loading' | 'done'>('flash');
  const [progress, setProgress] = useState(0);
  const [imperialId] = useState(() => Math.random().toString(16).slice(2, 8).toUpperCase());

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('loading'), 400);
    const t2 = setTimeout(() => setPhase('done'), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return;
    const start = performance.now();
    const loadDuration = 2400;
    const frame = (now: number) => {
      const p = Math.min((now - start) / loadDuration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [phase]);

  return (
    <motion.div
      className="fixed inset-0 z-[99998] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            key="flash"
            className="absolute inset-0 bg-blood-red z-10"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-background/96 backdrop-blur-sm" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-blood-red pointer-events-none" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-blood-red pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-blood-red pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-blood-red pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl px-8 w-full">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.div
                className="w-20 h-20 mx-auto opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <ViltrumLogo className="w-full h-full text-blood-red" />
              </motion.div>
              <p className="font-mono text-xs text-blood-red tracking-[0.4em] uppercase">
                Ativando Protocolo de Lealdade...
              </p>
              <div className="w-full h-[2px] bg-steel-gray/10 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blood-red transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="font-mono text-xs text-steel-gray/50">{Math.round(progress * 100)}% PROCESSADO</p>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <motion.div
                className="w-24 h-24 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <ViltrumLogo className="w-full h-full text-blood-red opacity-70" />
              </motion.div>

              <div>
                <p className="font-mono text-xs text-blood-red tracking-[0.4em] mb-3">// ARQUIVO IMPERIAL ATUALIZADO</p>
                <h2 className="text-4xl md:text-6xl font-display font-black text-imperial-white uppercase tracking-tight">
                  <GlitchText text="LEALDADE CONFIRMADA" intensity="medium" />
                </h2>
              </div>

              <div className="border border-blood-red/30 bg-blood-red/5 p-6 text-left font-mono text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-steel-gray/50">ID IMPERIAL</span>
                  <span className="text-imperial-white">V-TERRA-{imperialId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-gray/50">STATUS</span>
                  <span className="text-scourge-green">● ATIVO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-gray/50">MISSÃO</span>
                  <span className="text-imperial-white">AGUARDANDO ORDENS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-gray/50">PLANETA</span>
                  <span className="text-imperial-white">TERRA / SOL-3</span>
                </div>
              </div>

              <p className="text-steel-gray/50 text-xs font-mono max-w-sm mx-auto leading-relaxed">
                O Império registrou sua lealdade. Aguarde convocação pelos canais imperiais oficiais.
              </p>

              <a
                href="https://www.linkedin.com/in/everton-silva-597891286/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-blood-red/40 text-blood-red/70 hover:text-blood-red hover:border-blood-red hover:shadow-[0_0_20px_rgba(176,0,0,0.3)] font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-300"
              >
                <Linkedin className="w-3.5 h-3.5" />
                CANAL IMPERIAL OFICIAL
              </a>

              <button
                onClick={onClose}
                className="px-10 py-3 border border-steel-gray/30 text-steel-gray/50 font-mono text-xs tracking-[0.3em] uppercase hover:border-imperial-white hover:text-imperial-white transition-all duration-300"
              >
                DISPENSADO // FECHAR
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
