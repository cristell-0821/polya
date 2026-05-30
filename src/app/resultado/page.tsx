'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Trophy,
  Clock,
  AlertTriangle,
  Star,
  ArrowRight,
  RotateCcw,
  Home
} from 'lucide-react';

import { ResultadoNivel } from '@/types/juego';

function ResultadoContenido() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nivelId = searchParams.get('nivel');

  const [resultado, setResultado] = useState<ResultadoNivel | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('polya_ultimo_resultado');

    if (raw) {
      setResultado(JSON.parse(raw));
    }
  }, []);

  if (!resultado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando resultado...</p>
      </div>
    );
  }

  const {
    puntajeFinal,
    estrellas,
    tiempoUsadoSegundos,
    erroresCometidos,
    puntajeBase,
    bonusTiempo,
    penalizacionErrores,
    penalizacionTiempo
  } = resultado;

  const minutos = Math.floor(tiempoUsadoSegundos / 60);
  const segundos = tiempoUsadoSegundos % 60;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-amber-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-100 max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">
          {estrellas === 3 ? '🏆' : estrellas === 2 ? '🥈' : estrellas === 1 ? '🥉' : '📚'}
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          {estrellas === 3
            ? '¡Excelente!'
            : estrellas === 2
            ? '¡Muy bien!'
            : estrellas === 1
            ? '¡Aprobado!'
            : 'Sigue practicando'}
        </h1>

        <p className="text-gray-500 mb-6">
          Nivel {nivelId} completado
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className={`w-10 h-10 ${
                s <= estrellas
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 mb-6 text-white">
          <p className="text-sm font-semibold opacity-80">
            PUNTAJE FINAL
          </p>

          <p className="text-5xl font-extrabold">
            {puntajeFinal}
          </p>
        </div>

        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between p-2 bg-green-50 rounded-lg">
            <span className="text-green-700">Puntaje base</span>
            <span className="font-bold text-green-700">
              +{puntajeBase}
            </span>
          </div>

          {bonusTiempo > 0 && (
            <div className="flex justify-between p-2 bg-blue-50 rounded-lg">
              <span className="text-blue-700">Bonus por tiempo</span>
              <span className="font-bold text-blue-700">
                +{bonusTiempo}
              </span>
            </div>
          )}

          {/* ELIMINADO: penalización errores (ya descontada por fase) */}

          {penalizacionTiempo > 0 && (
            <div className="flex justify-between p-2 bg-red-50 rounded-lg">
              <span className="text-red-700">Penalización tiempo</span>
              <span className="font-bold text-red-700">
                -{penalizacionTiempo}
              </span>
            </div>
          )}

          {/* NUEVO: línea separadora visual */}
          <div className="border-t border-gray-200 my-2" />

          <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Tiempo usado
            </span>
            <span className="font-bold text-gray-700">
              {minutos}:{segundos.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Errores cometidos
            </span>
            <span className="font-bold text-gray-700">
              {erroresCometidos}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/leaderboard')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg"
          >
            <Trophy className="w-5 h-5" />
            Ver Salón de la Fama
          </motion.button> */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/progreso')}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
            Mi Progreso
          </motion.button>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/niveles/${nivelId}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200"
            >
              <Home className="w-4 h-4" />
              Inicio
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function ResultadoPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResultadoContenido />
    </Suspense>
  );
}