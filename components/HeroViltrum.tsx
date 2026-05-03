'use client';

import { motion } from 'motion/react';
import ViltrumLogo from './ViltrumLogo';
import GlitchText from './GlitchText';

export default function HeroViltrum() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-center items-start overflow-hidden px-6 md:px-24 bg-background">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-space-black z-0" />
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero-bg.png" 
          alt="Viltrum Army" 
          className="w-full h-full object-cover object-center opacity-80"
        />
      </div>
      <div className="absolute inset-0 scanlines opacity-50 z-[1]" />
      <div className="absolute inset-0 bg-noise opacity-50 z-[1]" />

      {/* Giant Background Logo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-[2]"
      >
        <ViltrumLogo className="w-full h-full text-imperial-white opacity-80" />
      </motion.div>

      {/* Shadow Vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-[5]" />

      {/* Technical HUD Elements */}
      <div className="absolute top-24 right-8 font-mono text-xs text-alert-red flex flex-col items-end gap-2 pointer-events-none hidden md:flex z-20">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-alert-red animate-pulse" />
           <span className="bg-alert-red/10 px-3 py-1 border border-alert-red/30 tracking-widest backdrop-blur-sm">STATUS: RECRUTAMENTO ATIVO</span>
        </div>
        <span className="bg-surface-elevated/40 px-3 py-1 border border-steel-gray/20 tracking-widest text-steel-gray">PLANETA-ALVO: TERRA</span>
        <span className="bg-surface-elevated/40 px-3 py-1 border border-steel-gray/20 tracking-widest text-steel-gray">AUTORIDADE: GRANDE REGENTE</span>
        <span className="bg-surface-elevated/40 px-3 py-1 border border-steel-gray/20 tracking-widest text-steel-gray">PROTOCOLO: CONQUISTA</span>
        <span className="text-imperial-white px-3 py-1 border border-imperial-white/20 bg-imperial-white/5 tracking-widest">
          <GlitchText text="SINAL: VILTRUM ONLINE" intensity="medium" />
        </span>
      </div>

      <div className="absolute bottom-6 left-8 font-mono text-xs text-uniform-blue tracking-widest hidden lg:block z-0 opacity-30 pointer-events-none">
        <div className="w-16 h-[2px] bg-uniform-blue mb-2" />
        VILTRUM_ARCHIVE // SYS_v9.4
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.p
            className="text-blood-red font-mono text-sm md:text-base tracking-[0.4em] mb-8 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <GlitchText text="ARQUIVO IMPERIAL // SETOR TERRA" intensity="low" />
          </motion.p>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-imperial-white tracking-tighter leading-[0.85] mb-6 uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            O IMPÉRIO <br />PRECISA DE <br className="md:hidden" /><span className="text-blood-red">VOCÊ</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl text-silver font-display font-bold tracking-wide mb-8 uppercase max-w-3xl border-l-4 border-blood-red pl-6 py-2 bg-gradient-to-r from-blood-red/10 to-transparent">
            Viltrum não solicita.<br />Viltrum convoca.
          </h2>
          
          <p className="text-base md:text-lg text-steel-gray max-w-xl mb-12 leading-relaxed font-sans">
            A Terra foi marcada para assimilação. A força será medida. A lealdade será exigida. Apenas os dignos sobreviverão à ordem imperial.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <motion.button 
              onClick={() => document.getElementById('alistamento')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-blood-red text-imperial-white font-display text-xl font-bold tracking-widest uppercase hover:bg-alert-red transition-colors duration-300 relative overflow-hidden shadow-[0_0_20px_rgba(176,0,0,0.4)]"
            >
              <span className="relative z-10 drop-shadow-md">Iniciar Alistamento</span>
            </motion.button>
            <motion.button 
              onClick={() => document.getElementById('doutrina')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border border-steel-gray/40 bg-space-black/50 backdrop-blur-md text-imperial-white font-display text-xl font-bold tracking-widest uppercase hover:border-imperial-white hover:bg-imperial-white/5 transition-colors duration-300"
            >
              Acessar Arquivo Viltrumita
            </motion.button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
