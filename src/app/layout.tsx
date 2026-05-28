// src/app/layout.tsx
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Pólya al Rescate - Aprende a Resolver Problemas',
  description: 'Juego educativo basado en el método de George Pólya',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} font-sans min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-amber-50`}
      >
        {children}
      </body>
    </html>
  );
}