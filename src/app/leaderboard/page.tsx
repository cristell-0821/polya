// src/app/leaderboard/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Trophy, ArrowLeft, Medal, TrendingUp, RotateCcw, AlertTriangle } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const MEDALLAS = ['🥇', '🥈', '🥉'];

export default function LeaderboardPage() {
  const router = useRouter();
  const { jugadores, cargando, reiniciarCompetencia } = useLeaderboard();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reiniciando, setReiniciando] = useState(false);

  const handleReiniciar = async () => {
    setReiniciando(true);
    try {
      await reiniciarCompetencia();
      setMostrarModal(false);
      // Recargar la página para ver el leaderboard vacío
      window.location.reload();
    } catch (error) {
      console.error('Error al reiniciar:', error);
      alert('Error al reiniciar. Intenta de nuevo.');
    } finally {
      setReiniciando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver</span>
          </button>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl font-bold">Ranking Global</h1>
          </div>
          {/* 🆕 BOTÓN REINICIAR */}
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>

        {/* 🆕 MODAL DE CONFIRMACIÓN */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 max-w-sm w-full"
            >
              <div className="text-center mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-white">¿Reiniciar competencia?</h2>
                <p className="text-slate-400 text-sm mt-2">
                  Se eliminarán <strong>TODOS</strong> los jugadores y puntajes. 
                  Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReiniciar}
                  disabled={reiniciando}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 disabled:opacity-50"
                >
                  {reiniciando ? 'Reiniciando...' : 'Sí, reiniciar'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Resto del leaderboard igual... */}
        {cargando ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-slate-400">Cargando...</p>
          </div>
        ) : jugadores.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-4xl mb-4">📊</p>
            <p className="text-slate-400 font-medium">Aún no hay jugadores</p>
            <p className="text-slate-500 text-sm mt-1">Sé el primero en completar un nivel</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jugadores.map((jugador, index) => (
              <motion.div
                key={jugador.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  index === 0
                    ? 'bg-amber-900/30 border-amber-700/50'
                    : index === 1
                    ? 'bg-slate-700/50 border-slate-600'
                    : index === 2
                    ? 'bg-orange-900/20 border-orange-700/50'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="w-10 text-center flex-shrink-0">
                  {index < 3 ? (
                    <span className="text-2xl">{MEDALLAS[index]}</span>
                  ) : (
                    <span className="text-lg font-bold text-slate-500">#{index + 1}</span>
                  )}
                </div>
                <div className="text-3xl">{jugador.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">
                    {jugador.nombre}
                    {index === 0 && <span className="text-amber-400 ml-1">👑</span>}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {jugador.nivelesCompletados} niveles
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-indigo-900/30 px-3 py-1.5 rounded-lg border border-indigo-700/30">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-indigo-400">{jugador.puntajeTotal}</span>
                  <span className="text-xs text-indigo-500/70">pts</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}