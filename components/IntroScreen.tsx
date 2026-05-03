'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ViltrumLogo from './ViltrumLogo';

const LINES = [
  'INICIALIZANDO SISTEMA IMPERIAL...',
  'VERIFICANDO CREDENCIAIS DE ACESSO...',
  'CARREGANDO ARQUIVO DE RECRUTAMENTO...',
  'CONEXÃO ESTABELECIDA: VILTRUM PRIME',
  'PROTOCOLO DE CONQUISTA: ATIVO',
  'ACESSO CONCEDIDO.',
];

export default function IntroScreen() {
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('viltrum_intro')) return;
    setVisible(true);
    document.body.style.overflow = 'hidden';

    const lineInterval = setInterval(() => {
      setLineIndex(i => {
        if (i >= LINES.length - 1) { clearInterval(lineInterval); return i; }
        return i + 1;
      });
    }, 380);

    const start = performance.now();
    const duration = 2600;
    const frame = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        setDone(true);
        setTimeout(() => {
          document.body.style.overflow = '';
          setVisible(false);
          sessionStorage.setItem('viltrum_intro', '1');
        }, 700);
      }
    };
    requestAnimationFrame(frame);

    return () => { clearInterval(lineInterval); document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999999] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="scanlines absolute inset-0 opacity-30 pointer-events-none" />
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-blood-red/50" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-blood-red/50" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-blood-red/50" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-blood-red/50" />

          <div className="w-full max-w-lg px-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto"
            >
              <ViltrumLogo className="w-full h-full text-blood-red" />
            </motion.div>

            <div className="font-mono text-xs space-y-2 min-h-[120px]">
              {LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-3 ${i === lineIndex ? 'text-imperial-white' : 'text-steel-gray/40'}`}
                >
                  <span className="text-blood-red/60 shrink-0">&gt;</span>
                  <span>{line}</span>
                  {i === lineIndex && !done && (
                    <span className="animate-pulse text-blood-red">▌</span>
                  )}
                  {(i < lineIndex || done) && (
                    <span className="text-scourge-green text-[10px] ml-auto shrink-0">OK</span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="w-full h-[2px] bg-steel-gray/10">
                <div
                  className="h-full bg-blood-red"
                  style={{ width: `${progress * 100}%`, transition: 'none' }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-steel-gray/40">
                <span>CARREGANDO ARQUIVO IMPERIAL</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
