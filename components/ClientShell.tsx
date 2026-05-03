'use client';

import dynamic from 'next/dynamic';
import SmoothScrollProvider from './SmoothScrollProvider';
import ScrollProgress from './ScrollProgress';
import SectionDots from './SectionDots';

const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const AmbientAudio = dynamic(() => import('./AmbientAudio'), { ssr: false });
const IntroScreen = dynamic(() => import('./IntroScreen'), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroScreen />
      <ScrollProgress />
      <SectionDots />
      <CustomCursor />
      <AmbientAudio />
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </>
  );
}
