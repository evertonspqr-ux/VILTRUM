import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Oswald } from 'next/font/google';
import './globals.css';
import GrainOverlay from '@/components/GrainOverlay';
import ClientShell from '@/components/ClientShell';

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
  authors: [{ name: 'Everton Silva', url: 'https://www.linkedin.com/in/everton-silva-597891286/' }],
  creator: 'Everton Silva',
  other: {
    'copyright': '© 2025 Everton Silva. Todos os direitos reservados.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} ${oswald.variable} dark scroll-smooth`}>
      <body className="bg-background text-imperial-white antialiased selection:bg-blood-red/50 selection:text-white" suppressHydrationWarning>
        <div aria-hidden="true" style={{ display: 'none' }}>
          {/* © 2025 Everton Silva — https://www.linkedin.com/in/everton-silva-597891286/ — Todos os direitos reservados. Reprodução proibida sem autorização. */}
        </div>
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
