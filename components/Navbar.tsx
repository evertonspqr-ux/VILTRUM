'use client';

import { useState, useEffect } from 'react';
import ViltrumLogo from './ViltrumLogo';
import GlitchText from './GlitchText';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-steel-gray/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 opacity-90">
            <ViltrumLogo className="w-full h-full text-imperial-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-widest uppercase text-imperial-white hidden sm:block">Viltrum</span>
        </div>

        <ul className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-widest text-steel-gray">
          <li><a href="#doutrina" className="hover:text-imperial-white transition-colors"><GlitchText text="DOUTRINA" trigger="hover" /></a></li>
          <li><a href="#comando" className="hover:text-imperial-white transition-colors"><GlitchText text="COMANDO" trigger="hover" /></a></li>
          <li><a href="#linha-do-tempo" className="hover:text-imperial-white transition-colors"><GlitchText text="LINHA DO TEMPO" trigger="hover" /></a></li>
          <li><a href="#scourge" className="hover:text-scourge-green transition-colors"><GlitchText text="SCOURGE" trigger="hover" /></a></li>
        </ul>

        <MagneticButton strength={0.5}>
          <a href="#alistamento" className="block px-5 py-2 border border-blood-red text-blood-red hover:bg-blood-red hover:text-white font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all">
            Alistar
          </a>
        </MagneticButton>
      </div>
    </nav>
  );
}
