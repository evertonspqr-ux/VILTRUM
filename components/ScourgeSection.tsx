'use client';

import { motion } from 'motion/react';
import { Skull, AlertTriangle, ShieldAlert, HeartCrack, Globe } from 'lucide-react';
import ScourgeVirus3D from './ScourgeVirus3D';
import GlitchText from './GlitchText';

export default function ScourgeSection() {
  return (
    <section id="scourge" className="py-32 px-6 md:px-24 bg-space-black relative z-10 border-t-4 border-scourge-green/30 overflow-hidden">
      {/* Biohazard Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,255,106,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-noise opacity-30 z-0" />
      
      {/* Glitch lines */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-scourge-green/20 animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-0 w-full h-[2px] bg-scourge-green/10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="flex-1 w-full text-center lg:text-left">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-scourge-green/10 border border-scourge-green/50 text-scourge-green font-mono text-xs tracking-widest mb-6 animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <GlitchText text="BIOHAZARD DETECTED" intensity="medium" />
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-imperial-white uppercase mb-4 tracking-tighter drop-shadow-[0_0_10px_rgba(99,255,106,0.2)]">
                <GlitchText text="Scourge Virus" intensity="low" />
              </h2>
              <p className="text-2xl text-scourge-green/80 font-display font-bold uppercase tracking-wide mb-8">
                <GlitchText text="O dia em que Viltrum sangrou." intensity="low" />
              </p>
              
              <p className="text-xl text-steel-gray leading-relaxed mb-10 max-w-2xl border-l-2 border-scourge-green/30 pl-6 mx-auto lg:mx-0">
                O império não caiu por falta de força. Caiu porque até a força pode ser infectada. Uma arma projetada não para ferir o corpo, mas para desfazer a primazia genética que levamos eras para aperfeiçoar.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="p-4 border border-scourge-green/20 bg-background/50 backdrop-blur">
                   <p className="font-mono text-xs text-scourge-green/60 mb-1">POPULAÇÃO ANTERIOR</p>
                   <p className="font-mono text-xl text-imperial-white truncate">BILHÕES</p>
                </div>
                <div className="p-4 border border-scourge-green/60 bg-scourge-green/5 backdrop-blur shadow-[0_0_15px_rgba(99,255,106,0.1)]">
                   <p className="font-mono text-xs text-scourge-green mb-1 animate-pulse">CONTAGEM DE SOBREVIVENTES</p>
                   <p className="font-display font-black text-4xl text-alert-red">37</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full relative">
             {/* Vírus 3D renderizado no fundo */}
             <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen scale-150 md:scale-[2.0] translate-x-10">
               <ScourgeVirus3D />
             </div>
             
             <motion.div 
               className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                {[
                  { title: "TRANSMISSÃO", icon: Globe, val: "Aérea / Contato" },
                  { title: "INFECÇÃO", icon: ShieldAlert, val: "Falha Imunológica" },
                  { title: "COLAPSO", icon: HeartCrack, val: "Falência Múltipla" },
                  { title: "TAXA DE LETALIDADE", icon: Skull, val: "99.9%" }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 border border-steel-gray/20 bg-background relative overflow-hidden group">
                     {/* Glitch hover */}
                     <div className="absolute inset-0 bg-scourge-green/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                     <item.icon className="w-8 h-8 text-scourge-green/50 mb-4 group-hover:text-scourge-green transition-colors" />
                     <p className="font-mono text-xs text-steel-gray tracking-widest mb-1 z-10 relative">{item.title}</p>
                     <p className="font-display font-bold text-xl text-imperial-white uppercase z-10 relative">{item.val}</p>
                  </div>
                ))}
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
