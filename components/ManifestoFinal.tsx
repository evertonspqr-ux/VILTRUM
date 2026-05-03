'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import SectionReveal from './SectionReveal';
import MagneticButton from './MagneticButton';
import OathOverlay from './OathOverlay';

const ImperialSeal3D = dynamic(() => import('./ImperialSeal3D'), { ssr: false });

export default function ManifestoFinal() {
  const [oathActive, setOathActive] = useState(false);

  return (
    <section className="relative py-40 px-6 md:px-24 bg-background overflow-hidden border-t-8 border-blood-red flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <img src="/assets/stars-bg.png" className="w-full h-full object-cover opacity-30 mix-blend-screen" alt="" onError={(e) => e.currentTarget.style.display = 'none'} />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* 3D Imperial Seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] opacity-30 pointer-events-none z-[1]">
        <ImperialSeal3D />
      </div>

      {/* Spotlight radial from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(176,0,0,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm font-mono tracking-[0.5em] text-blood-red font-bold"
        >
          VILTRUM NÃO CAI. VILTRUM RETORNA.
        </motion.h2>

        <SectionReveal variant="slide-up" delay={0.2}>
          <h3 className="text-4xl md:text-6xl lg:text-8xl font-display font-black text-imperial-white uppercase tracking-tighter leading-[1.1] mb-8">
            &quot;Nós não governamos porque somos muitos.<br className="hidden md:block" />
            Governamos porque <span className="text-blood-red">somos fortes</span>.&quot;
          </h3>
        </SectionReveal>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-steel-gray max-w-3xl mx-auto leading-relaxed border-l-2 border-r-2 border-blood-red/30 px-8"
        >
          O mundo natal pode cair. A linhagem pode sangrar. Mas enquanto restar um viltrumita, o Império continuará respirando.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-12"
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={() => setOathActive(true)}
              className="px-12 py-6 bg-blood-red text-imperial-white font-display text-2xl font-black tracking-[0.2em] uppercase hover:bg-alert-red hover:shadow-[0_0_40px_rgba(229,9,20,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Jurar Lealdade ao Império
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      <AnimatePresence>
        {oathActive && <OathOverlay onClose={() => setOathActive(false)} />}
      </AnimatePresence>
    </section>
  );
}
