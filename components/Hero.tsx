'use client';

import { motion } from 'motion/react';
import ImperialEmblem3D from './ImperialEmblem3D';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-start overflow-hidden px-6 md:px-24">
      {/* 3D Background */}
      <ImperialEmblem3D />

      {/* Grid overlay for HUD effect */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/grid-me.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/90 mix-blend-multiply pointer-events-none" />

      {/* HUD Elements */}
      <div className="absolute top-24 right-8 font-mono text-[10px] text-cyan-accent/80 flex flex-col items-end gap-1 pointer-events-none hidden md:flex">
        <span className="bg-cyan-accent/10 px-2 py-0.5 border border-cyan-accent/20">STATUS: RECRUTAMENTO ATIVO</span>
        <span className="bg-cyan-accent/10 px-2 py-0.5 border border-cyan-accent/20">SETOR: FRONTEIRA EXTERNA</span>
        <span className="bg-cyan-accent/10 px-2 py-0.5 border border-cyan-accent/20">PROTOCOLO: DOMINION-01</span>
        <span className="bg-green-accent/10 text-green-accent px-2 py-0.5 border border-green-accent/20">SINAL IMPERIAL: ONLINE</span>
      </div>

      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-muted tracking-widest hidden md:block">
        <div className="w-12 h-[1px] bg-muted mb-2" />
        NEXUS_COORD: 84.992.11
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.p 
            className="text-cyan-accent font-mono text-xs md:text-sm tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            TRANSMISSÃO INTERCEPTADA //
          </motion.p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-imperial-white tracking-tighter leading-[0.9] mb-6 uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            O IMPÉRIO <br className="hidden md:block"/>PRECISA DE VOCÊ
          </h1>
          
          <p className="text-lg md:text-2xl text-muted font-medium tracking-tight mb-8 max-w-2xl border-l-2 border-cyan-accent/50 pl-4">
            A ordem não se mantém sozinha. A expansão exige força, disciplina e lealdade.
          </p>
          
          <p className="text-sm md:text-base text-muted/80 max-w-xl mb-12 leading-relaxed">
            Entre no arquivo de uma civilização que nasceu da ordem, conquistou pela força, caiu pela própria biologia e renasceu através da vontade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-imperial-white text-background font-bold tracking-widest uppercase hover:bg-cyan-accent hover:text-background transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">Alistar-se</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
            <button className="px-8 py-4 border border-border bg-surface/50 backdrop-blur-sm text-imperial-white font-bold tracking-widest uppercase hover:border-cyan-accent/50 hover:bg-cyan-accent/5 transition-all duration-300">
              Acessar Arquivo Imperial
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-muted">Rolar</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-muted to-transparent" />
      </motion.div>
    </section>
  );
}
