'use client';

import React, { useEffect, useRef, useState } from 'react';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#░▒▓█▄▌▐▀$%@&';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'auto' | 'hover';
}

export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
  intensity = 'low',
  trigger = 'auto',
}: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  const intervalMs = { low: 6000, medium: 3500, high: 1800 }[intensity];
  const durationFrames = { low: 6, medium: 10, high: 16 }[intensity];

  const runGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    frameRef.current = 0;

    intervalRef.current = setInterval(() => {
      frameRef.current++;
      const progress = frameRef.current / durationFrames;

      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (Math.random() < 0.3 * (1 - progress))
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            return char;
          })
          .join('')
      );

      if (frameRef.current >= durationFrames) {
        clearInterval(intervalRef.current!);
        setDisplayed(text);
        setIsGlitching(false);
      }
    }, 50);
  };

  useEffect(() => {
    if (trigger !== 'auto') return;

    const schedule = () => {
      const jitter = Math.random() * intervalMs * 0.4;
      timeoutRef.current = setTimeout(() => {
        runGlitch();
        schedule();
      }, intervalMs + jitter);
    };

    // Dispara pela primeira vez com delay aleatório para não sincronizar todos
    timeoutRef.current = setTimeout(() => {
      runGlitch();
      schedule();
    }, Math.random() * intervalMs);

    return () => {
      clearTimeout(timeoutRef.current!);
      clearInterval(intervalRef.current!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  const hoverProps =
    trigger === 'hover'
      ? { onMouseEnter: runGlitch }
      : {};

  return (
    // @ts-expect-error dynamic tag
    <Tag className={className} {...hoverProps}>
      {displayed}
    </Tag>
  );
}
