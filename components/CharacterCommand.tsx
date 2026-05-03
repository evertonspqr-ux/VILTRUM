'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { characters } from '../data/characters';
import SectionReveal from './SectionReveal';

function TiltCard({ char, index }: { char: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-space-black border border-steel-gray/20 hover:border-steel-gray/60 transition-colors duration-300 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 hover:z-50"
    >
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} 
        className="w-full h-full"
      >
        {/* Image Section */}
        <div className="relative h-80 w-full overflow-hidden bg-gradient-to-t from-background to-space-black">
          <img 
            src={char.image} 
            alt={char.name}
            className={`w-full h-full object-cover filter grayscale-[50%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100 ${
              ['anissa', 'conquest'].includes(char.id) ? 'object-center' : 'object-top'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('bg-[url("/assets/stars-bg.png")]');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="absolute inset-0 bg-uniform-blue mix-blend-color opacity-30 group-hover:opacity-0 transition-opacity duration-500" />
          
          <div style={{ transform: "translateZ(50px)" }} className="absolute top-4 left-4 font-mono text-[10px] text-imperial-white/50 bg-black/50 px-2 py-1 border border-white/10 backdrop-blur-sm shadow-md group-hover:bg-blood-red/20 group-hover:text-imperial-white transition-colors duration-300">
            ID: V-{char.id.toUpperCase().substring(0, 4)}
          </div>
        </div>

        {/* Data Section */}
        <div className="p-6 relative z-10 bg-space-black">
          <h4 style={{ transform: "translateZ(40px)" }} className="text-3xl font-display font-bold text-imperial-white uppercase mb-1 drop-shadow-md">{char.name}</h4>
          <p style={{ transform: "translateZ(20px)" }} className="text-sm font-mono text-steel-gray tracking-wider mb-4 border-b border-steel-gray/20 pb-4">
            {char.role}
          </p>
          
          <div style={{ transform: "translateZ(10px)" }} className="space-y-3 mb-6 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-steel-gray/60">LEALDADE:</span>
              <span className="text-imperial-white">{char.loyalty}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-steel-gray/60">STATUS:</span>
              <span className={`px-2 py-0.5 border ${char.color}`}>
                {char.status}
              </span>
            </div>
          </div>

          <div style={{ transform: "translateZ(30px)" }} className="bg-background border-l-2 border-blood-red/50 p-4 relative shadow-lg">
            <p className="text-sm text-steel-gray/90 italic font-serif">&quot;{char.quote}&quot;</p>
          </div>
        </div>
      </div>
      
      {/* Hover Borders */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-uniform-blue/30 transition-colors pointer-events-none" />
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
        </SectionReveal>

        <div style={{ perspective: "1500px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char, i) => (
            <TiltCard key={char.id} char={char} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
