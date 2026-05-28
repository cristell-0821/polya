// src/app/leaderboard/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Trophy, ArrowLeft, Star, Crown } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const MEDALLAS = ['🥇', '🥈', '🥉'];

export default function LeaderboardPage() {
  const router = useRouter();
  const { jugadores, cargando } = useLeaderboard();

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-extrabold text-indigo-700">Salón de la Fama</h1>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {cargando ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-4xl inline-block"
            >
              ⭐
            </motion.div>
            <p className="mt-4 text-gray-500 font-semibold">Cargando héroes...</p>
          </div>
        ) : jugadores.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-300">
            <p className="text-6xl mb-4">🌱</p>
            <p className="text-gray-500 font-bold text-lg">Aún no hay jugadores</p>
            <p className="text-gray-400">¡Sé el primero en completar un nivel!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jugadores.map((jugador, index) => (
              <motion.div
                key={jugador.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${
                  index === 0
                    ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-300 shadow-lg'
                    : index === 1
                    ? 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300'
                    : index === 2
                    ? 'bg-gradient-to-r from-orange-100 to-amber-50 border-orange-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Posición */}
                <div className="w-10 text-center">
                  {index < 3 ? (
                    <span className="text-2xl">{MEDALLAS[index]}</span>
                  ) : (
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="text-4xl">{jugador.avatar}</div>

                {/* Nombre */}
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-lg">
                    {jugador.nombre}
                    {index === 0 && <Crown className="inline w-4 h-4 text-amber-500 ml-1" />}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold">
                    {jugador.nivelesCompletados} niveles completados
                  </p>
                </div>

                {/* Estrellas */}
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-extrabold text-amber-700 text-lg">
                    {jugador.estrellasTotales}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}