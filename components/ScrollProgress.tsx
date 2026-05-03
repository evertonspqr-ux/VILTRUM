'use client';
import { useScroll, motion, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-blood-red z-[9999] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}
