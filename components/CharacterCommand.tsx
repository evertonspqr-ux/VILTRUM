'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { characters } from '../data/characters';
import SectionReveal from './SectionReveal';
import ViltrumLogo from './ViltrumLogo';

function FlipCard({ char, index }: { char: any; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative cursor-pointer group"
      style={{ perspective: '1200px', height: '480px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* FRENTE */}
        <div
          style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
          className="bg-space-black border border-steel-gray/20 hover:border-steel-gray/50 transition-colors duration-300 overflow-hidden"
        >
          <div className="relative w-full h-full">
            <img
              src={char.image}
              alt={char.name}
              className={`w-full h-full object-cover filter grayscale-[40%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-75 group-hover:opacity-100 ${
                ['anissa', 'conquest'].includes(char.id) ? 'object-center' : 'object-top'
              }`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/20 to-transparent" />

            <div className="absolute top-4 left-4 font-mono text-[10px] text-imperial-white/60 bg-black/60 px-2 py-1 border border-white/10 backdrop-blur-sm">
              ID: V-{char.id.toUpperCase().substring(0, 4)}
            </div>

            <div className="absolute top-4 right-4 font-mono text-[9px] text-steel-gray/60 bg-black/60 px-2 py-1 border border-steel-gray/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              VER FICHA →
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-2xl font-display font-bold text-imperial-white uppercase tracking-tight drop-shadow-lg">{char.name}</h4>
              <p className="text-xs font-mono text-steel-gray/80 tracking-widest mt-1">{char.role}</p>
            </div>
          </div>
        </div>

        {/* VERSO */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
          className="bg-space-black border border-blood-red/40 p-8 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blood-red/5 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="w-7 h-7 opacity-15">
                <ViltrumLogo className="w-full h-full text-imperial-white" />
              </div>
              <span className="font-mono text-[9px] text-blood-red tracking-[0.3em]">ARQUIVO CLASSIFICADO</span>
            </div>

            <div className={`inline-block border px-2 py-0.5 font-mono text-[10px] mb-4 ${char.color}`}>
              {char.status}
            </div>

            <h4 className="text-2xl font-display font-bold text-imperial-white uppercase tracking-tight mb-1 leading-tight">{char.name}</h4>
            <p className="text-xs font-mono text-steel-gray/60 tracking-wider mb-6">{char.role}</p>

            <div className="space-y-3 font-mono text-xs border-t border-steel-gray/10 pt-4">
              <div className="flex justify-between gap-4">
                <span className="text-steel-gray/50 shrink-0">LEALDADE</span>
                <span className="text-imperial-white text-right">{char.loyalty}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-steel-gray/50 shrink-0">STATUS</span>
                <span className={char.color.split(' ')[1]}>{char.status}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border-l-2 border-blood-red/50 pl-4 mb-6">
              <p className="text-sm text-steel-gray/80 italic leading-relaxed">&quot;{char.quote}&quot;</p>
            </div>
            <button
              className="font-mono text-[9px] text-steel-gray/40 tracking-[0.3em] hover:text-steel-gray/70 transition-colors w-full text-center"
              onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
            >
              ← VOLTAR
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CharacterCommand() {
  return (
    <section id="comando" className="py-32 px-6 md:px-24 bg-background relative z-10 border-t border-purple-shadow/50">
      <div className="max-w-7xl mx-auto">
        <SectionReveal variant="scale-in" className="mb-20 text-center md:text-left">
          <h2 className="text-sm font-mono text-uniform-blue tracking-[0.4em] mb-4 font-bold">HIERARQUIA ESTRATÉGICA //</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold text-imperial-white tracking-tighter uppercase drop-shadow-md">
            Comando Imperial
          </h3>
          <div className="mt-6 w-24 h-1 bg-uniform-blue opacity-50 md:mx-0 mx-auto" />
          <p className="mt-4 font-mono text-[10px] text-steel-gray/40 tracking-[0.3em]">CLIQUE NOS CARDS PARA VER A FICHA COMPLETA</p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char, i) => (
            <FlipCard key={char.id} char={char} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
