'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AmbientAudio() {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  useEffect(() => { setMounted(true); }, []);

  const buildAmbient = (ctx: AudioContext) => {
    const nodes: AudioNode[] = [];
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    // Drone base — onda de baixa frequência
    const buildOsc = (freq: number, type: OscillatorType, gainVal: number, detune = 0) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = detune;
      gain.gain.value = gainVal;
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      nodes.push(osc, gain);
      return osc;
    };

    // Camada 1: drone grave
    buildOsc(55, 'sine', 0.6);
    buildOsc(55.4, 'sine', 0.4);   // batimento sutil

    // Camada 2: harmônico médio
    buildOsc(110, 'triangle', 0.2);
    buildOsc(220, 'triangle', 0.08);

    // Camada 3: pad de alta frequência filtrado (som de "interface")
    const pad = ctx.createOscillator();
    const padGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    pad.type = 'sawtooth';
    pad.frequency.value = 440;
    padGain.gain.value = 0.04;
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 4;
    pad.connect(filter);
    filter.connect(padGain);
    padGain.connect(master);
    pad.start();
    nodes.push(pad, padGain, filter);

    // Camada 4: ruído branco filtrado (respiração do nave)
    const bufSize = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buf;
    noiseSource.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 200;
    noiseFilter.Q.value = 0.8;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.03;
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noiseSource.start();
    nodes.push(noiseSource, noiseFilter, noiseGain);

    // LFO que modula o filtro do pad lentamente (pulsação)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.12;
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    nodes.push(lfo, lfoGain, master);

    return nodes;
  };

  const toggle = async () => {
    if (!active) {
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext();
      }
      if (ctxRef.current.state === 'suspended') {
        await ctxRef.current.resume();
      }
      nodesRef.current = buildAmbient(ctxRef.current);
      setActive(true);
    } else {
      // Fade out e desconecta
      const ctx = ctxRef.current!;
      const master = nodesRef.current[nodesRef.current.length - 1] as GainNode;
      if (master && 'gain' in master) {
        (master as GainNode).gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      }
      setTimeout(() => {
        nodesRef.current.forEach((n) => {
          try { (n as OscillatorNode).stop?.(); } catch {}
          try { n.disconnect(); } catch {}
        });
        nodesRef.current = [];
      }, 1300);
      setActive(false);
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggle}
      title={active ? 'Desativar áudio imperial' : 'Ativar áudio imperial'}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className={`fixed bottom-6 right-6 z-[9990] w-10 h-10 border font-mono text-[9px] tracking-widest flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
        active
          ? 'border-blood-red text-blood-red bg-blood-red/10 shadow-[0_0_12px_rgba(176,0,0,0.4)]'
          : 'border-steel-gray/40 text-steel-gray/60 hover:border-imperial-white/60 hover:text-imperial-white bg-background/80'
      }`}
    >
      <AnimatePresence mode="wait">
        {active ? (
          <motion.span
            key="on"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex flex-col items-center gap-0.5"
          >
            {/* Barras animadas indicando som ativo */}
            <span className="flex items-end gap-[2px] h-4">
              {[1, 3, 2, 4, 2].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] bg-blood-red inline-block"
                  animate={{ scaleY: [h * 0.3, h * 0.8, h * 0.2, h * 1, h * 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                  style={{ height: `${h * 3}px`, transformOrigin: 'bottom' }}
                />
              ))}
            </span>
            <span>SOM</span>
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex flex-col items-center gap-0.5"
          >
            <span className="text-base leading-none">♪</span>
            <span>SOM</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
