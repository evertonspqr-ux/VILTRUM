'use client';

import { Shield } from 'lucide-react';
import ViltrumLogo from './ViltrumLogo';

export default function FooterViltrum() {
  return (
    <footer className="bg-background py-12 px-6 md:px-24 border-t border-space-black relative z-10">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex items-center gap-4 border border-steel-gray/20 p-4 bg-space-black">
          <div className="w-10 h-10 bg-white/5 flex items-center justify-center p-2">
             <ViltrumLogo className="w-full h-full text-steel-gray" />
          </div>
          <div>
            <h5 className="font-display font-bold text-xl text-imperial-white uppercase tracking-wider">Viltrum Empire</h5>
            <p className="font-mono text-[10px] text-steel-gray/60 tracking-widest uppercase">Arquivo Imperial de Recrutamento</p>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs text-steel-gray/50 max-w-sm ml-auto">
            Fan project não comercial inspirado em Invincible.<br />
            Sem afiliação oficial com a Skybound Entertainment ou Amazon Studios.
          </p>
        </div>
      </div>
    </footer>
  );
}
