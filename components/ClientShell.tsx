'use client';

import dynamic from 'next/dynamic';
import SmoothScrollProvider from './SmoothScrollProvider';

const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const AmbientAudio = dynamic(() => import('./AmbientAudio'), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <AmbientAudio />
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </>
  );
}
