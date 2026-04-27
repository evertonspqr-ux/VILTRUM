'use client';

import { motion } from 'motion/react';
import { ShieldAlert, Crosshair, Globe, Dna } from 'lucide-react';

const doctrines = [
  {
    title: "FORÇA",
    desc: "A fraqueza não sustenta impérios.",
    icon: ShieldAlert,
    accent: "group-hover:text-red-alert"
  },
  {
    title: "ORDEM",
    desc: "Caos é matéria-prima. Ordem é arquitetura.",
    icon: Crosshair,
    accent: "group-hover:text-cyan-accent"
  },
  {
    title: "EXPANSÃO",
    desc: "Todo mundo isolado é uma fronteira esperando comando.",
    icon: Globe,
    accent: "group-hover:text-imperial-white"
  },
  {
    title: "SOBREVIVÊNCIA",
    desc: "Quando o império cai, a linhagem continua.",
    icon: Dna,
    accent: "group-hover:text-green-accent"
  }
];

export default function Doctrine() {
  return (
    <section className="py-32 px-6 md:px-24 bg-surface relative z-10 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xs font-mono text-cyan-accent tracking-[0.3em] mb-4">DIRETRIZES PRIMÁRIAS //</h2>
          <h3 className="text-4xl md:text-5xl font-black text-imperial-white tracking-tighter uppercase">Doutrina Imperial</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctrines.map((doc, i) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 border border-border bg-surface-elevated/30 backdrop-blur-md overflow-hidden hover:border-border/80 transition-colors"
              >
                {/* Glow effect on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Icon className={`w-8 h-8 mb-6 text-muted transition-colors duration-300 ${doc.accent}`} />
                
                <h4 className="text-xl font-bold tracking-tight text-imperial-white mb-2">{doc.title}</h4>
                <p className="text-sm text-muted/80">{doc.desc}</p>
                
                {/* Decorative tech lines */}
                <div className="absolute bottom-4 right-4 flex gap-1 opacity-20">
                  <div className="w-1 h-1 bg-imperial-white" />
                  <div className="w-3 h-1 bg-imperial-white" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
