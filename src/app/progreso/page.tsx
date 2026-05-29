// src/app/progreso/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Lock, CheckCircle, Star, RotateCcw } from 'lucide-react';
import { nivelesUni } from '@/data/niveles-universidad';
import { useProgreso } from '@/hooks/useProgreso';

export default function ProgresoPage() {
  const router = useRouter();
  const { nivelesCompletados, reiniciarProgreso } = useProgreso();

  const maxIdCompletado = nivelesCompletados.length > 0
    ? Math.max(...nivelesCompletados.map((n) => n.id))
    : 0;

  const handleReiniciar = () => {
    if (confirm('¿Seguro que quieres reiniciar todo tu progreso?')) {
      reiniciarProgreso();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver</span>
          </button>
          <h1 className="text-2xl font-bold">Progreso</h1>
          <button
            onClick={handleReiniciar}
            className="flex items-center gap-1 text-slate-500 hover:text-red-400 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>

        {/* Stats */}
        {nivelesCompletados.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6 flex items-center justify-around"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-400">{nivelesCompletados.length}</p>
              <p className="text-xs text-slate-400">Niveles</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">
                {nivelesCompletados.reduce((acc, n) => acc + n.estrellas, 0)}
              </p>
              <p className="text-xs text-slate-400">Estrellas</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {Math.max(...nivelesCompletados.map((n) => n.puntajeMaximo), 0)}
              </p>
              <p className="text-xs text-slate-400">Mejor puntaje</p>
            </div>
          </motion.div>
        )}

        {/* Grid de niveles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nivelesUni.map((nivel) => {
            const nivelProg = nivelesCompletados.find((n) => n.id === nivel.id);
            const estaDesbloqueado = nivel.id <= maxIdCompletado + 1;
            const estaCompletado = !!nivelProg;
            const estrellas = nivelProg?.estrellas ?? 0;
            const puntaje = nivelProg?.puntajeMaximo ?? 0;

            return (
              <motion.button
                key={nivel.id}
                whileHover={estaDesbloqueado ? { scale: 1.02 } : {}}
                whileTap={estaDesbloqueado ? { scale: 0.98 } : {}}
                onClick={() => estaDesbloqueado && router.push(`/niveles/${nivel.id}`)}
                disabled={!estaDesbloqueado}
                className={`relative p-6 rounded-xl border text-left transition-all ${
                  estaCompletado
                    ? 'bg-slate-800 border-green-700/50'
                    : estaDesbloqueado
                    ? 'bg-slate-800 border-slate-600 hover:border-indigo-500'
                    : 'bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Badge de estado */}
                <div className="absolute top-3 right-3">
                  {estaCompletado ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : estaDesbloqueado ? (
                    <div className="w-5 h-5 rounded-full bg-indigo-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="text-3xl mb-3">{nivel.emoji}</div>
                <h3 className="font-bold text-white mb-1">{nivel.titulo}</h3>
                <p className="text-xs text-slate-400 mb-3">{nivel.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {nivel.dificultad}
                  </span>
                  {estaCompletado && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-amber-400">{puntaje}</span>
                    </div>
                  )}
                </div>

                {/* Estrellas */}
                {estaCompletado && (
                  <div className="flex gap-1 mt-3">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full ${
                          s <= estrellas ? 'bg-amber-400' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}