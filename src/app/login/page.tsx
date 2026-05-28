// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AVATARES = ['🦉', '🦁', '🦄', '🐼', '🐸', '🐯', '🐨', '🦊'];

export default function LoginPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [avatar, setAvatar] = useState('🦉');

  const handleEntrar = () => {
    if (!nombre.trim()) return;
    
    // Guardar en localStorage (sesión simple)
    const jugador = {
      id: `jugador_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      nombre: nombre.trim(),
      avatar,
    };
    localStorage.setItem('polya_jugador', JSON.stringify(jugador));
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-100 max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-2xl font-extrabold text-indigo-700 mb-2">
          ¡Únete a la aventura!
        </h1>
        <p className="text-gray-500 mb-6">Los mejores resolutores aparecen en el tablero</p>

        {/* Input de nombre */}
        <div className="mb-6">
          <label className="block text-left text-sm font-bold text-gray-600 mb-2">
            Tu apodo (nombre)
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Matías, Lucía, ElPro..."
            maxLength={15}
            className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg font-semibold text-gray-700"
            onKeyDown={(e) => e.key === 'Enter' && handleEntrar()}
          />
        </div>

        {/* Selector de avatar */}
        <div className="mb-8">
          <label className="block text-left text-sm font-bold text-gray-600 mb-2">
            Elige tu avatar
          </label>
          <div className="flex justify-center gap-3 flex-wrap">
            {AVATARES.map((a) => (
              <motion.button
                key={a}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAvatar(a)}
                className={`text-3xl p-2 rounded-xl border-2 transition-all ${
                  avatar === a
                    ? 'border-indigo-500 bg-indigo-100 scale-110'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                {a}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEntrar}
          disabled={!nombre.trim()}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg px-6 py-3 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ¡Empezar!
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </main>
  );
}