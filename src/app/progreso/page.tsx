// src/app/progreso/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Lock, ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { niveles } from '@/data/niveles';
import { useProgreso } from '@/hooks/useProgreso';

export default function ProgresoPage() {
  const router = useRouter();
  const { nivelesCompletados, reiniciarProgreso } = useProgreso();

  const maxNivelDesbloqueado = Math.max(1, ...nivelesCompletados.map((n) => n.id)) + 1;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Volver</span>
          </button>

          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="font-bold text-indigo-700 text-lg">Mi Aventura</h1>
          </div>

          <button
            onClick={reiniciarProgreso}
            className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-5xl mb-3">🗺️</p>
          <h2 className="text-3xl font-extrabold text-indigo-700 text-shadow">
            Mapa de Misiones
          </h2>
          <p className="text-gray-500 font-semibold mt-1">
            Completa cada nivel para desbloquear el siguiente
          </p>
        </motion.div>

        {/* Grid de niveles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {niveles.map((nivel, index) => {
            const nivelProgreso = nivelesCompletados.find((n) => n.id === nivel.id);
            const estaDesbloqueado = nivel.id <= maxNivelDesbloqueado;
            const estaCompletado = !!nivelProgreso;
            const estrellas = nivelProgreso?.estrellas ?? 0;

            return (
              <motion.button
                key={nivel.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={estaDesbloqueado ? { scale: 1.05, y: -5 } : {}}
                whileTap={estaDesbloqueado ? { scale: 0.95 } : {}}
                onClick={() => estaDesbloqueado && router.push(`/niveles/${nivel.id}`)}
                disabled={!estaDesbloqueado}
                className={`relative p-6 rounded-3xl border-2 text-center transition-all ${
                  estaCompletado
                    ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-lg shadow-green-100 cursor-pointer'
                    : estaDesbloqueado
                    ? 'bg-white border-indigo-200 shadow-md hover:shadow-lg hover:border-indigo-300 cursor-pointer'
                    : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Número de nivel */}
                <div
                  className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    estaCompletado
                      ? 'bg-green-500 text-white'
                      : estaDesbloqueado
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  {estaDesbloqueado ? index + 1 : <Lock className="w-4 h-4" />}
                </div>

                {/* Emoji del nivel */}
                <motion.div
                  animate={
                    estaDesbloqueado && !estaCompletado
                      ? { y: [0, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-2"
                >
                  {nivel.emoji}
                </motion.div>

                {/* Título */}
                <p
                  className={`font-bold text-sm ${
                    estaDesbloqueado ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {nivel.titulo}
                </p>

                {/* Estrellas */}
                <div className="flex justify-center gap-1 mt-2">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= estrellas
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Badge de completado */}
                {estaCompletado && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-amber-400 text-white rounded-full p-1"
                  >
                    <Trophy className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Stats */}
        {nivelesCompletados.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-white rounded-2xl p-4 border-2 border-indigo-100 flex items-center gap-6"
          >
            <div className="text-center">
              <p className="text-2xl font-extrabold text-indigo-600">
                {nivelesCompletados.length}
              </p>
              <p className="text-xs text-gray-500 font-semibold">Niveles</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-amber-500">
                {nivelesCompletados.reduce((acc, n) => acc + n.estrellas, 0)}
              </p>
              <p className="text-xs text-gray-500 font-semibold">Estrellas</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-green-500">
                {Math.round(
                  (nivelesCompletados.length / niveles.length) * 100
                )}
                %
              </p>
              <p className="text-xs text-gray-500 font-semibold">Completado</p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}