'use client';

import { motion } from 'motion/react';
import { timelineEvents } from '../data/timeline';

export default function Timeline() {
  return (
    <section className="py-32 px-6 md:px-24 bg-background relative z-10">
      <div className="max-w-5xl mx-auto relative">
        <div className="mb-24 text-center">
          <h2 className="text-xs font-mono text-cyan-accent tracking-[0.3em] mb-4">REGISTRO HISTÓRICO //</h2>
          <h3 className="text-4xl md:text-5xl font-black text-imperial-white tracking-tighter uppercase">Linha do Tempo do Domínio</h3>
        </div>

        {/* Vertical Line */}
        <div className="absolute top-[200px] bottom-0 left-[24px] md:left-1/2 w-[1px] bg-border/50 -translate-x-1/2" />

        <div className="flex flex-col gap-16 md:gap-24">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={event.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Center Node */}
                <div className="absolute left-[24px] md:left-1/2 h-4 w-4 rounded-full bg-background border-2 border-cyan-accent -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

                {/* Content Card */}
                <div className="ml-[60px] md:ml-0 w-full md:w-[45%]">
                  <div className="p-6 md:p-8 border border-border/50 bg-surface-elevated/40 backdrop-blur-sm relative group hover:bg-surface-elevated/60 transition-colors">
                    {/* Phase Number */}
                    <div className="absolute -top-4 -left-4 md:-top-5 md:-left-5 text-4xl md:text-5xl font-black text-border opacity-30 select-none font-mono group-hover:text-cyan-accent/20 transition-colors">
                      {event.phase}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-[9px] font-mono tracking-widest px-2 py-1 border ${event.statusColor}`}>
                          {event.status}
                        </span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-imperial-white tracking-tight uppercase mb-3 text-balance">
                        {event.title}
                      </h4>
                      <p className="text-sm md:text-base text-muted/80 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
