'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 8;
const FPS = 10;
const SCALE = 2; // render at half resolution — 4x fewer pixels to compute

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frames: HTMLCanvasElement[] = [];

    const buildFrames = () => {
      const w = Math.ceil(window.innerWidth / SCALE);
      const h = Math.ceil(window.innerHeight / SCALE);
      canvas.width = w;
      canvas.height = h;

      frames = Array.from({ length: FRAME_COUNT }, () => {
        const off = document.createElement('canvas');
        off.width = w;
        off.height = h;
        const octx = off.getContext('2d')!;
        const imageData = octx.createImageData(w, h);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 18;
        }
        octx.putImageData(imageData, 0, 0);
        return off;
      });
    };

    buildFrames();

    let handleResize: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(handleResize);
      handleResize = setTimeout(buildFrames, 200);
    };
    window.addEventListener('resize', onResize);

    let frameIdx = 0;
    let lastTs = 0;
    const interval = 1000 / FPS;

    const draw = (ts: number) => {
      animRef.current = requestAnimationFrame(draw);
      if (ts - lastTs < interval) return;
      lastTs = ts;
      ctx.drawImage(frames[frameIdx % FRAME_COUNT], 0, 0);
      frameIdx++;
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-overlay opacity-40"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}
