'use client';

import { motion } from 'motion/react';
import { Target, Activity, Users, Orbit } from 'lucide-react';
import HologramGlobe from './HologramGlobe';
import SectionReveal from './SectionReveal';


export default function ConquestDashboard() {
  return (
    <section id="comando" className="py-32 px-6 md:px-24 bg-background relative z-10 border-t border-purple-shadow/50">
      <div className="max-w-7xl mx-auto">
        <SectionReveal variant="wipe-right" className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono text-uniform-blue tracking-[0.4em] mb-4 font-bold flex items-center gap-2">
              <Orbit className="w-4 h-4" /> MONITORAMENTO ATIVO //
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold text-imperial-white tracking-tighter uppercase drop-shadow-md">
              Painel de Conquista
            </h3>
          </div>
          <div className="text-xs font-mono text-steel-gray tracking-widest px-4 py-2 border border-steel-gray/40 bg-space-black/50">
            ACESSO: AUTORIDADE ESTRATÉGICA
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { label: "PLANETAS CONQUISTADOS", val: "13.480", trend: "+45", color: "text-steel-gray" },
            { label: "SISTEMAS MONITORADOS", val: "912", trend: "ESTÁVEL", color: "text-uniform-blue" },
            { label: "AMEAÇA DA COALITION", val: "CRÍTICA", trend: "ESCALANDO", color: "text-alert-red" },
            { label: "SINAL IMPERIAL", val: "ONLINE", trend: "FORTE", color: "text-scourge-green" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-space-black border border-steel-gray/20 relative shadow-md hover:shadow-xl hover:border-steel-gray/50 transition-all duration-300 z-10 hover:z-20 cursor-default"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-[url('/assets/blood-texture.png')] opacity-10 mix-blend-screen" />
              <p className="font-mono text-[10px] text-steel-gray/80 tracking-[0.2em] mb-2">{stat.label}</p>
              <p className={`font-display font-bold text-4xl mb-4 ${stat.color}`}>{stat.val}</p>
              <div className="flex justify-between items-center text-xs font-mono border-t border-steel-gray/10 pt-2">
                <span className="text-steel-gray/50">STATUS TENDÊNCIA</span>
                <span className={stat.color}>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div 
             className="lg:col-span-2 p-8 bg-space-black border border-steel-gray/20 relative overflow-hidden"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
             <h4 className="font-display font-bold text-2xl uppercase text-imperial-white mb-6 flex items-center gap-3">
               <Target className="text-blood-red" />
               Foco Estratégico: Terra
             </h4>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <div className="flex justify-between font-mono text-sm mb-2">
                     <span className="text-steel-gray">PREPARAÇÃO</span>
                     <span className="text-alert-red">84%</span>
                   </div>
                   <div className="w-full h-2 bg-background border border-steel-gray/20 mb-6">
                     <div className="h-full bg-alert-red w-[84%] animate-pulse" />
                   </div>

                   <div className="flex justify-between font-mono text-sm mb-2">
                     <span className="text-steel-gray">COMPATIBILIDADE</span>
                     <span className="text-scourge-green">99%</span>
                   </div>
                   <div className="w-full h-2 bg-background border border-steel-gray/20 mb-6">
                     <div className="h-full bg-scourge-green w-[99%]" />
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="p-4 border border-alert-red/30 bg-alert-red/5">
                     <p className="font-mono text-[10px] text-alert-red tracking-widest mb-1">PROTOCOLO ATUAL</p>
                     <p className="font-display font-bold text-xl text-imperial-white uppercase">Pré-Anexação</p>
                   </div>
                   <div className="p-4 border border-uniform-blue/30 bg-uniform-blue/5">
                     <p className="font-mono text-[10px] text-uniform-blue tracking-widest mb-1">AGENTE RESPONSÁVEL</p>
                     <p className="font-display font-bold text-xl text-imperial-white uppercase">Nolan Grayson</p>
                   </div>
                </div>
             </div>
          </motion.div>

          <motion.div 
             className="p-8 bg-space-black border border-steel-gray/20 relative flex flex-col items-center justify-center text-center"
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
             <div className="w-40 h-40 flex items-center justify-center relative mb-6">
               <HologramGlobe />
             </div>
             
             <h4 className="font-mono text-sm tracking-[0.2em] text-steel-gray mb-2">SOBREVIVENTES</h4>
             <p className="font-display font-black text-6xl text-imperial-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">37</p>
             <p className="text-xs text-steel-gray mt-4 max-w-[200px]">A linhagem deve ser preservada a todo custo operacional.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
