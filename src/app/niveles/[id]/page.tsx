// src/app/niveles/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getNivel } from '@/data/niveles';
import { Fase } from '@/types/juego';
import PersonajePolya from '@/components/juego/PersonajePolya';
import FaseComprender from '@/components/juego/FaseComprender';
import FasePlanificar from '@/components/juego/FasePlanificar';
import FaseEjecutar from '@/components/juego/FaseEjecutar';
import FaseRevisar from '@/components/juego/FaseRevisar';
import BarraProgreso from '@/components/ui/BarraProgreso';
import { useProgreso } from '@/hooks/useProgreso';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const FASES_ORDEN: Fase[] = ['comprender', 'planificar', 'ejecutar', 'revisar'];

export default function NivelPage() {
  const params = useParams();
  const router = useRouter();
  const nivelId = Number(params.id);
  const nivel = getNivel(nivelId);

  const { completarNivel, nivelesCompletados: progresoLocal } = useProgreso();
  const { actualizarPuntaje } = useLeaderboard();

  const [faseActual, setFaseActual] = useState<Fase>('comprender');
  const [faseIndex, setFaseIndex] = useState(0);
  const [fasesCompletadas, setFasesCompletadas] = useState<Set<Fase>>(new Set());

  const [datosDescubiertos, setDatosDescubiertos] = useState<Set<string>>(new Set());
  const [herramientaElegida, setHerramientaElegida] = useState<string | null>(null);
  const [ejecucionCorrecta, setEjecucionCorrecta] = useState(false);
  const [revisionCorrecta, setRevisionCorrecta] = useState(false);

  const calcularEstrellas = () => {
    let estrellas = 1;
    if (ejecucionCorrecta) estrellas++;
    if (revisionCorrecta) estrellas++;
    return Math.min(estrellas, 3);
  };

  if (!nivel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h1 className="text-2xl font-bold text-gray-700">Nivel no encontrado</h1>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-indigo-600 font-semibold hover:underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const avanzarFase = useCallback(() => {
    setFasesCompletadas((prev) => new Set(prev).add(faseActual));
    const nextIndex = faseIndex + 1;

    if (nextIndex < FASES_ORDEN.length) {
      setFaseIndex(nextIndex);
      setFaseActual(FASES_ORDEN[nextIndex]);
      return;
    }

    // ========== NIVEL COMPLETADO ==========
    const estrellasEsteNivel = calcularEstrellas();

    // 1. Guardar progreso local
    completarNivel(nivelId, estrellasEsteNivel);

    // 2. Verificar que el niño se "registró" con apodo
    const jugadorRaw = localStorage.getItem('polya_jugador');
    if (!jugadorRaw) {
      router.push('/login');
      return;
    }

    const jugador = JSON.parse(jugadorRaw);

    // 3. Calcular totales para el leaderboard
    const nivelExistente = progresoLocal.find((n) => n.id === nivelId);

    let estrellasTotales = progresoLocal.reduce((acc, n) => acc + n.estrellas, 0);
    let totalNiveles = progresoLocal.length;

    if (!nivelExistente) {
      // Nivel nuevo: sumar todo
      estrellasTotales += estrellasEsteNivel;
      totalNiveles += 1;
    } else if (estrellasEsteNivel > nivelExistente.estrellas) {
      // Mejoró su marca: restar las viejas, sumar las nuevas
      estrellasTotales = estrellasTotales - nivelExistente.estrellas + estrellasEsteNivel;
    }

    // 4. Enviar a Firebase (firestore)
    actualizarPuntaje(
      jugador.id,
      jugador.nombre,
      jugador.avatar,
      estrellasTotales,
      totalNiveles
    );

    // 5. Ir al mapa de progreso
    router.push('/progreso');
  }, [
    faseActual,
    faseIndex,
    router,
    nivelId,
    completarNivel,
    progresoLocal,
    actualizarPuntaje,
    ejecucionCorrecta,
    revisionCorrecta,
  ]);

  const faseData = nivel.fases[faseActual];

  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Salir</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl">{nivel.emoji}</span>
            <h1 className="font-bold text-indigo-700 text-lg hidden sm:block">
              {nivel.titulo}
            </h1>
          </div>

          <div className="text-sm font-semibold text-gray-500">
            Fase {faseIndex + 1} de {FASES_ORDEN.length}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <BarraProgreso
          fases={FASES_ORDEN}
          faseActual={faseActual}
          completadas={fasesCompletadas}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-4xl mx-auto w-full">
        <PersonajePolya mensaje={faseData.dialogoPolya} />

        <AnimatePresence mode="wait">
          <motion.div
            key={faseActual}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {faseActual === 'comprender' && (
              <FaseComprender
                datos={nivel.fases.comprender.datos}
                descubiertos={datosDescubiertos}
                onDescubrir={(id) =>
                  setDatosDescubiertos((prev) => new Set(prev).add(id))
                }
                onCompletar={avanzarFase}
              />
            )}

            {faseActual === 'planificar' && (
              <FasePlanificar
                herramientas={nivel.fases.planificar.herramientas}
                herramientaElegida={herramientaElegida}
                onElegir={setHerramientaElegida}
                onCompletar={avanzarFase}
              />
            )}

            {faseActual === 'ejecutar' && (
              <FaseEjecutar
                config={nivel.fases.ejecutar}
                onCompletar={() => {
                  setEjecucionCorrecta(true);
                  avanzarFase();
                }}
              />
            )}

            {faseActual === 'revisar' && (
              <FaseRevisar
                preguntas={nivel.fases.revisar.preguntas}
                onCompletar={() => {
                  setRevisionCorrecta(true);
                  avanzarFase();
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}