'use client';

import { motion } from 'motion/react';
import { Shield, Skull, Globe, Target } from 'lucide-react';
import ViltrumLogo from './ViltrumLogo';
import SectionReveal from './SectionReveal';

const doctrines = [
  {
    title: "FORÇA",
    desc: "Fraqueza não é tolerada. Fraqueza é removida.",
    icon: Shield,
    accent: "group-hover:text-blood-red group-hover:drop-shadow-[0_0_10px_rgba(176,0,0,0.8)]"
  },
  {
    title: "PUREZA",
    desc: "A linhagem é preservada pela seleção dos mais fortes.",
    icon: Skull,
    accent: "group-hover:text-imperial-white group-hover:drop-shadow-[0_0_10px_rgba(245,245,245,0.8)]"
  },
  {
    title: "EXPANSÃO",
    desc: "Cada planeta habitado é uma fronteira esperando comando.",
    icon: Globe,
    accent: "group-hover:text-uniform-blue group-hover:drop-shadow-[0_0_10px_rgba(170,184,207,0.8)]"
  },
  {
    title: "OBEDIÊNCIA",
    desc: "O império não debate. O império executa.",
    icon: Target,
    accent: "group-hover:text-alert-red group-hover:drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]"
  }
];

export default function ImperialDoctrine() {
  return (
    <section id="doutrina" className="py-32 px-6 md:px-24 bg-space-black relative z-10 border-t border-purple-shadow/50">
      <div className="absolute inset-0 bg-[url('/assets/blood-texture.png')] mix-blend-multiply opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal variant="wipe-left" className="mb-20 text-center md:text-left">
          <h2 className="text-sm font-mono text-alert-red tracking-[0.4em] mb-4 font-bold">DIRETRIZES PRIMÁRIAS //</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold text-imperial-white tracking-tighter uppercase drop-shadow-md">
            Doutrina Viltrumita
          </h3>
          <p className="mt-6 text-xl text-steel-gray max-w-2xl">
            A civilização inferior chama de tirania. Viltrum chama de ordem.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctrines.map((doc, i) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="group relative p-8 bg-[linear-gradient(to_bottom,rgba(21,17,31,0.5),rgba(8,10,13,0.9))] border border-steel-gray/20 overflow-hidden hover:border-blood-red/50 hover:shadow-[0_0_40px_rgba(176,0,0,0.2),inset_0_0_40px_rgba(176,0,0,0.04)] transition-all duration-500"
              >
                {/* Glow effect on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blood-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Viltrum Logo Placeholder in background */}
                <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                   <ViltrumLogo className="w-48 h-48 text-imperial-white" />
                </div>

                <Icon className={`w-10 h-10 mb-6 text-steel-gray transition-all duration-300 ${doc.accent}`} />
                
                <h4 className="text-2xl font-display font-bold tracking-tight text-imperial-white mb-4 uppercase">{doc.title}</h4>
                <p className="text-base text-steel-gray/90 leading-relaxed">{doc.desc}</p>
                
                {/* Decorative tech lines */}
                <div className="absolute bottom-4 right-4 flex gap-1 opacity-30">
                  <div className="w-1.5 h-1.5 bg-silver" />
                  <div className="w-4 h-1.5 bg-silver" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
