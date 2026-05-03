'use client';
import { useState, useEffect } from 'react';

export default function TypewriterText({
  text,
  delay = 0,
  speed = 45,
  className = '',
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse opacity-70">▌</span>}
    </span>
  );
}
