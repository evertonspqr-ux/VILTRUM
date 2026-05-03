'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ViltrumLogo from './ViltrumLogo';
import GlitchText from './GlitchText';
import TextReveal from './TextReveal';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';

export default function HeroViltrum() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[800px] flex flex-col justify-center items-start overflow-hidden px-6 md:px-24 bg-background">

      <div className="absolute inset-0 bg-space-black z-0" />
      <motion.div className="absolute -inset-[12%] z-0" style={{ y: bgY }}>
        <img
          src="/assets/hero-bg.png"
          alt="Viltrum Army"
          className="w-full h-full object-cover object-center opacity-80"
        />
      </motion.div>
      <div className="absolute inset-0 scanlines opacity-50 z-[1]" />
      <div className="absolute inset-0 bg-noise opacity-50 z-[1]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-[2]"
      >
        <ViltrumLogo className="w-full h-full text-imperial-white opacity-80" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-[5]" />

      {/* HUD com typewriter */}
      <div className="absolute top-24 right-8 font-mono text-xs text-alert-red flex flex-col items-end gap-2 pointer-events-none hidden md:flex z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-alert-red animate-pulse" />
          <span className="bg-alert-red/10 px-3 py-1 border border-alert-red/30 tracking-widest backdrop-blur-sm">
            <TypewriterText text="STATUS: RECRUTAMENTO ATIVO" delay={800} speed={38} />
          </span>
        </div>
        <span className="bg-surface-elevated/40 px-3 py-1 border border-steel-gray/20 tracking-widest text-steel-gray">
          <TypewriterText text="PLANETA-ALVO: TERRA" delay={1800} speed={42} />
        </span>
        <span className="bg-surface-elevated/40 px-3 py-1 border border-steel-gray/20 tracking-widest text-steel-gray">
          <TypewriterText text="AUTORIDADE: GRANDE REGENTE" delay={2700} speed={38} />
        </span>
        <span className="bg-surface-elevated/40 px-3 py-1 border border-steel-gray/20 tracking-widest text-steel-gray">
          <TypewriterText text="PROTOCOLO: CONQUISTA" delay={3600} speed={42} />
        </span>
        <span className="text-imperial-white px-3 py-1 border border-imperial-white/20 bg-imperial-white/5 tracking-widest">
          <GlitchText text="SINAL: VILTRUM ONLINE" intensity="medium" />
        </span>
      </div>

      <div className="absolute bottom-6 left-8 font-mono text-xs text-uniform-blue tracking-widest hidden lg:block z-0 opacity-30 pointer-events-none">
        <div className="w-16 h-[2px] bg-uniform-blue mb-2" />
        VILTRUM_ARCHIVE // SYS_v9.4
      </div>

      {/* Conteúdo principal com parallax sutil */}
      <motion.div className="relative z-20 max-w-4xl pt-20" style={{ y: contentY }}>
        <div className="overflow-hidden mb-8">
          <motion.p
            className="text-blood-red font-mono text-sm md:text-base tracking-[0.4em] font-bold"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlitchText text="ARQUIVO IMPERIAL // SETOR TERRA" intensity="low" />
          </motion.p>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.85] mb-6 uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
          <span className="text-imperial-white block">
            <TextReveal text="O IMPÉRIO" delay={0.4} stagger={0.12} />
          </span>
          <span className="text-imperial-white block">
            <TextReveal text="PRECISA DE" delay={0.7} stagger={0.12} />
          </span>
          <span className="text-blood-red block">
            <TextReveal text="VOCÊ" delay={1.0} stagger={0.18} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
        >
          <h2 className="text-2xl md:text-4xl text-silver font-display font-bold tracking-wide mb-8 uppercase max-w-3xl border-l-4 border-blood-red pl-6 py-2 bg-gradient-to-r from-blood-red/10 to-transparent">
            Viltrum não solicita.<br />Viltrum convoca.
          </h2>
        </motion.div>

        <motion.p
          className="text-base md:text-lg text-steel-gray max-w-xl mb-12 leading-relaxed font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          A Terra foi marcada para assimilação. A força será medida. A lealdade será exigida. Apenas os dignos sobreviverão à ordem imperial.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <MagneticButton strength={0.35}>
            <button
              onClick={() => document.getElementById('alistamento')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-blood-red text-imperial-white font-display text-xl font-bold tracking-widest uppercase hover:bg-alert-red transition-colors duration-300 shadow-[0_0_20px_rgba(176,0,0,0.4)]"
            >
              Iniciar Alistamento
            </button>
          </MagneticButton>
          <MagneticButton strength={0.3}>
            <button
              onClick={() => document.getElementById('doutrina')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border border-steel-gray/40 bg-space-black/50 backdrop-blur-md text-imperial-white font-display text-xl font-bold tracking-widest uppercase hover:border-imperial-white hover:bg-imperial-white/5 transition-colors duration-300"
            >
              Acessar Arquivo Viltrumita
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
