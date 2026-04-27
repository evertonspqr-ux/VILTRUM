'use client';

import { motion } from 'motion/react';
import { archiveData } from '../data/archive';
import { Database } from 'lucide-react';

export default function Archive() {
  return (
    <section className="py-32 px-6 md:px-24 bg-surface relative z-10 border-t border-border/50 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="text-xs font-mono text-cyan-accent tracking-[0.3em] mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" /> REPOSITÓRIO //
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-imperial-white tracking-tighter uppercase">Arquivo de Guerra</h3>
          </div>
          <div className="text-xs font-mono text-muted tracking-widest px-3 py-1 border border-border/50 bg-background/50">
            NÍVEL DE ACESSO: RECRUTA
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archiveData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer perspective-[1000px]"
            >
              <div className="h-full p-6 border border-border bg-background relative overflow-hidden transition-all duration-500 hover:border-cyan-accent/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] group-hover:-translate-y-2">
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-muted/30 group-hover:border-cyan-accent/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-muted/30 group-hover:border-cyan-accent/50 transition-colors" />

                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-mono text-cyan-accent/70 tracking-widest">{item.code}</span>
                  <span className="text-[9px] font-mono text-muted uppercase tracking-widest border border-border px-2 flex items-center gap-1 group-hover:text-imperial-white transition-colors">
                    <span className="w-1 h-1 bg-cyan-accent/50 rounded-full" />
                    {item.status}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-imperial-white tracking-tight uppercase mb-3">{item.title}</h4>
                <p className="text-sm text-muted/80">{item.description}</p>
                
                {/* Scanning line effect on hover */}
                <div className="absolute left-0 top-0 w-full h-[1px] bg-cyan-accent/50 opacity-0 group-hover:animate-scan" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
