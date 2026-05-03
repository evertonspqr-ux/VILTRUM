'use client';

import { motion } from 'motion/react';
import { timelineEvents } from '../data/timeline';
import SectionReveal from './SectionReveal';

export default function TimelineViltrum() {
  return (
    <section id="linha-do-tempo" className="py-32 px-6 md:px-24 bg-space-black relative z-10 border-t border-purple-shadow/50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/blood-texture.png')] mix-blend-multiply opacity-5 pointer-events-none" />
      {/* Cinematic spotlight from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(176,0,0,0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionReveal variant="clip-top" className="mb-24 text-center">
          <h2 className="text-sm font-mono text-blood-red tracking-[0.4em] mb-4 font-bold">REGISTRO HISTÓRICO RESTRITO //</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold text-imperial-white tracking-tighter uppercase drop-shadow-md">
            Ascensão, Purificação e Queda
          </h3>
        </SectionReveal>

        {/* Central Vertical Line */}
        <div className="absolute top-[280px] bottom-10 left-[32px] md:left-1/2 w-[2px] bg-gradient-to-b from-blood-red via-steel-gray/40 to-transparent -translate-x-1/2 opacity-70" />
        {/* Glow blur duplicate */}
        <div className="absolute top-[280px] bottom-10 left-[32px] md:left-1/2 w-[6px] bg-gradient-to-b from-blood-red/50 via-blood-red/20 to-transparent -translate-x-1/2 opacity-50 blur-[3px]" />

        <div className="flex flex-col gap-16 md:gap-24">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={event.phase}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Center Node */}
                <div className="absolute left-[32px] md:left-1/2 w-4 h-4 rounded-none bg-blood-red border-2 border-blood-red/60 -translate-x-1/2 z-10 rotate-45 animate-[nodePulse_2.5s_ease-in-out_infinite]" />

                {/* Content Card */}
                <div className="ml-[70px] md:ml-0 w-full md:w-[45%]">
                  <div className="p-8 border border-steel-gray/20 bg-background/80 backdrop-blur-md relative group hover:border-blood-red/40 hover:shadow-[0_0_40px_rgba(176,0,0,0.12),inset_0_0_30px_rgba(176,0,0,0.04)] transition-all duration-500">
                    {/* Background Phase Number */}
                    <div className="absolute -top-6 -left-4 md:-top-8 md:-left-4 text-6xl md:text-8xl font-display font-black text-steel-gray opacity-5 select-none transition-opacity group-hover:opacity-10 pointer-events-none">
                      {event.phase}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <span className={`text-[10px] font-mono font-bold tracking-[0.2em] px-2 py-1 border ${event.statusColor}`}>
                          {event.status}
                        </span>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-display font-bold text-imperial-white tracking-tight uppercase mb-3 text-balance group-hover:text-blood-red transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-base text-steel-gray/80 leading-relaxed font-sans">
                        {event.description}
                      </p>
                    </div>
                    
                    {/* Tech Decor */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-transparent group-hover:border-steel-gray/40 transition-colors m-1" />
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
