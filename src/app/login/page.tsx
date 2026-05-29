'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';

const AVATARES = ['🎓', '🧠', '⚡', '🔬', '📐', '🧮', '💻', '🎯'];

export default function LoginPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [avatar, setAvatar] = useState('🎓');

  const handleEntrar = () => {
    if (!nombre.trim()) return;
    
    const jugador = {
      id: `jugador_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      nombre: nombre.trim(),
      avatar,
    };
    localStorage.setItem('polya_jugador', JSON.stringify(jugador));
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-2xl p-8 border border-slate-700 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <GraduationCap className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-white">Pólya Method</h1>
          <p className="text-slate-400 text-sm mt-1">Resolución de problemas avanzada</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nombre o apodo
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Ana, Carlos, Profe..."
            maxLength={20}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-indigo-500 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleEntrar()}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Avatar
          </label>
          <div className="flex justify-center gap-2 flex-wrap">
            {AVATARES.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                  avatar === a
                    ? 'border-indigo-500 bg-indigo-500/20'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEntrar}
          disabled={!nombre.trim()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5" />
          Ingresar
        </motion.button>
      </motion.div>
    </main>
  );
}