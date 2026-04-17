import type { Metadata } from 'next';
import { Cormorant_Garamond, JetBrains_Mono, DM_Sans, Exo_2 } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ardha Putra — Senior Full Stack Developer',
  description: 'Senior Full Stack Developer based in Bali, Indonesia. 8+ years building scalable digital products across FinTech, Travel, Hospitality, and Logistics.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Node.js', 'Bali', 'Indonesia'],
  openGraph: {
    title: 'Ardha Putra — Senior Full Stack Developer',
    description: '8+ years engineering scalable digital products across multiple industries.',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',         
    apple: '/logo.png',      
    shortcut: '/logo.png',     
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jetbrains.variable} ${dmSans.variable} ${exo2.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}