'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, QrCode } from 'lucide-react';
import { recruitmentPaths } from '../data/recruitment';

export default function RecruitmentViltrum() {
  const [copied, setCopied] = useState(false);
  const [denied, setDenied] = useState(false);
  const pixKey = "8af4c526-fe03-413c-90fe-d33f07797256";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPath = () => {
    setDenied(true);
    setTimeout(() => {
      document.getElementById('pix-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    setTimeout(() => setDenied(false), 4000);
  };

  return (
    <section id="alistamento" className="py-32 px-6 md:px-24 bg-space-black relative z-10 border-t border-purple-shadow/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood-red/50 to-transparent" />
      
      {/* Alerta de Acesso Negado */}
      {denied && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-alert-red border-2 border-white text-white font-mono font-bold tracking-widest text-sm md:text-xl text-center shadow-[0_0_30px_rgba(229,9,20,0.8)] animate-pulse w-[90%] md:w-auto">
          ACESSO NEGADO: PAGUE A TAXA DE ALISTAMENTO PRIMEIRO
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-sm font-mono text-blood-red tracking-[0.4em] mb-4 font-bold border border-blood-red/30 inline-block px-4 py-1 bg-blood-red/5">
            CHAMADO OBRIGATÓRIO //
          </h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold text-imperial-white tracking-tighter uppercase drop-shadow-md mt-6">
            Você foi <span className="text-blood-red">convocado</span>
          </h3>
          <p className="mt-6 text-xl text-steel-gray max-w-2xl mx-auto">
            O Império não precisa de promessas. Precisa de força, obediência e resultado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recruitmentPaths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className={`relative flex flex-col p-8 border ${path.borderColor} bg-[linear-gradient(to_bottom,rgba(21,17,31,0.3),rgba(8,10,13,0.8))] group transition-all duration-300 ${path.bgColor} backdrop-blur-md overflow-hidden shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]`}
              >
                {/* Background Texture */}
                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

                <div className="relative z-10 flex-col flex h-full">
                  <Icon className={`w-12 h-12 mb-6 ${path.color} transition-transform duration-500 group-hover:scale-125`} />
                  
                  <h4 className="text-3xl font-display font-bold text-imperial-white uppercase mb-2 group-hover:text-white transition-colors">{path.title}</h4>
                  <p className="text-sm font-mono text-steel-gray/80 mb-6 pb-6 border-b border-steel-gray/20">
                    {path.subtitle}
                  </p>
                  
                  <p className="text-base text-steel-gray leading-relaxed mb-8 flex-1">
                    {path.description}
                  </p>

                  <div className="mb-8">
                     <p className="text-xs font-mono text-imperial-white/50 mb-3 tracking-widest">REQUISITOS MÍNIMOS:</p>
                     <ul className="space-y-2">
                       {path.requirements.map((req, idx) => (
                         <li key={idx} className="flex items-start gap-2 text-sm text-steel-gray font-mono">
                           <span className={path.color}>+</span> {req}
                         </li>
                       ))}
                     </ul>
                  </div>
                  
                  <motion.button 
                    onClick={handleSelectPath}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 uppercase font-display font-bold tracking-widest border border-current ${path.color} bg-transparent hover:bg-current hover:text-background transition-colors duration-300 relative overflow-hidden`}
                  >
                    <span className="relative z-10">Selecionar Caminho</span>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Seção PIX - Contribuição Obrigatória */}
        <div id="pix-section" className="mt-24 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 border border-blood-red/40 bg-blood-red/5 backdrop-blur-md relative overflow-hidden"
          >
            {/* Efeitos de fundo da caixa de PIX */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blood-red/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              {/* Fake QR Code */}
              <div className="w-32 h-32 flex-shrink-0 bg-background border border-blood-red/30 flex items-center justify-center relative p-2 group shadow-[0_0_15px_rgba(176,0,0,0.2)]">
                <QrCode className="w-16 h-16 text-blood-red/50 group-hover:text-blood-red transition-colors" />
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(176,0,0,0.1)_50%)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none" />
                <div className="absolute -inset-1 border border-blood-red/20 opacity-50" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-display text-2xl md:text-3xl font-bold text-imperial-white uppercase mb-2 drop-shadow-md">
                  Taxa de Alistamento
                </h4>
                <p className="text-sm font-mono text-steel-gray mb-6 leading-relaxed">
                  Mostre sua lealdade ao Império. Contribuições são direcionadas para o fundo de guerra Viltrumita. O Grande Regente reconhece o seu sacrifício.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 px-4 py-3 bg-background border border-steel-gray/20 font-mono text-sm text-steel-gray flex items-center justify-between overflow-hidden">
                    <span className="truncate mr-4">{pixKey}</span>
                  </div>
                  <button 
                    onClick={handleCopyPix}
                    className="px-6 py-3 bg-blood-red hover:bg-alert-red transition-colors font-display font-bold text-imperial-white tracking-widest uppercase flex items-center justify-center gap-2 group min-w-[160px] shadow-[0_0_10px_rgba(176,0,0,0.4)] hover:shadow-[0_0_20px_rgba(229,9,20,0.6)]"
                  >
                    {copied ? (
                      <><Check className="w-4 h-4" /> Copiado</>
                    ) : (
                      <><Copy className="w-4 h-4 group-hover:scale-110 transition-transform" /> Copiar Chave</>
                    )}
                  </button>
                </div>
                <p className="text-[10px] font-mono text-steel-gray/50 mt-3 tracking-widest uppercase">
                  Titular: FUNDO IMPERIAL // INSTITUIÇÃO: BANCO DE VILTRUM
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
