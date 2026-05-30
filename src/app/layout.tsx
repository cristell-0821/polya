// src/app/layout.tsx
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

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
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>

          <footer className="absolute bottom-4 left-0 right-0">
            <p className="flex items-center justify-center gap-1 text-xs text-slate-500">
              Desarrollado por

              <a
                href="https://www.instagram.com/cristell_nicole?igsh=aG50N3JwdGNvOG4z&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                @cristell_nicole
                <Image
                  src="/ig.svg"
                  alt="Instagram"
                  width={16}
                  height={16}
                  className="text-indigo-400"
                />
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}