import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Oswald } from 'next/font/google';
import './globals.css';
import GrainOverlay from '@/components/GrainOverlay';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import CustomCursor from '@/components/CustomCursor';
import AmbientAudio from '@/components/AmbientAudio';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'VILTRUM EMPIRE — RECRUITMENT ARCHIVE',
  description: 'Arquivo de recrutamento oficial do Império Viltrumita. O império precisa de você.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} ${oswald.variable} dark scroll-smooth`}>
      <body className="bg-background text-imperial-white antialiased selection:bg-blood-red/50 selection:text-white" suppressHydrationWarning>
        <GrainOverlay />
        <CustomCursor />
        <AmbientAudio />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
