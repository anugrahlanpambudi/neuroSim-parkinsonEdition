import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NeuroSim – Simulasi Kasus Parkinson | RSUD Poli Saraf',
  description:
    'Simulasi klinis interaktif berbasis kasus nyata penyakit Parkinson: anamnesis, pemeriksaan fisik neurologi, penunjang, diagnosis, dan tatalaksana. Untuk mahasiswa kedokteran & klinisi muda.',
  keywords: 'parkinson, simulasi klinis, neurologi, kedokteran, OSCE, tremor, bradikinesia',
  authors: [{ name: 'NeuroSim Team' }],
  openGraph: {
    title: 'NeuroSim – Simulasi Kasus Parkinson',
    description: 'Belajar neurologi melalui simulasi kasus klinis interaktif.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="bg-slate-950 text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
