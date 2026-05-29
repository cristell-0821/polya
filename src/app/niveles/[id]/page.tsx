// src/app/niveles/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Trophy, AlertTriangle } from 'lucide-react';
import { getNivelUni } from '@/data/niveles-universidad';
import { Fase, ResultadoNivel } from '@/types/juego';
import PersonajePolya from '@/components/juego/PersonajePolya';
import FaseComprenderUni from '@/components/juego/universidad/FaseComprenderUni';
import FasePlanificarUni from '@/components/juego/universidad/FasePlanificarUni';
import FaseRevisarUni from '@/components/juego/universidad/FaseRevisarUni';
import BarraProgreso from '@/components/ui/BarraProgreso';
import Timer from '@/components/juego/universidad/Timer';
import { useProgreso } from '@/hooks/useProgreso';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import FaseEjecutarUniSimple from '@/components/juego/universidad/FaseEjecutarUniSimple';
import FaseEjecutarUniDoble from '@/components/juego/universidad/FaseEjecutarUniDoble';

const FASES_ORDEN: Fase[] = ['comprender', 'planificar', 'ejecutar', 'revisar'];

const FASE_LABELS: Record<Fase, { label: string; emoji: string }> = {
  comprender: { label: 'Entender', emoji: '🔍' },
  planificar: { label: 'Planificar', emoji: '🗺️' },
  ejecutar: { label: 'Resolver', emoji: '⚡' },
  revisar: { label: 'Verificar', emoji: '✅' },
};

export default function NivelPage() {
  const params = useParams();
  const router = useRouter();
  const nivelId = Number(params.id);
  const nivel = getNivelUni(nivelId);

  const { completarNivel, nivelesCompletados: progresoLocal } = useProgreso();
  const { actualizarPuntaje } = useLeaderboard();

  const [faseActual, setFaseActual] = useState<Fase>('comprender');
  const [faseIndex, setFaseIndex] = useState(0);
  const [fasesCompletadas, setFasesCompletadas] = useState<Set<Fase>>(new Set());

  // Puntaje acumulado por fase
  const [puntajesFase, setPuntajesFase] = useState<Record<Fase, number>>({
    comprender: 0,
    planificar: 0,
    ejecutar: 0,
    revisar: 0,
  });
  const [erroresFase, setErroresFase] = useState<Record<Fase, number>>({
    comprender: 0,
    planificar: 0,
    ejecutar: 0,
    revisar: 0,
  });

  // Timer global del nivel
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [timerActivo, setTimerActivo] = useState(false);

  useEffect(() => {
    if (!nivel) return;
    setTiempoRestante(nivel.tiempoLimiteSegundos);
  }, [nivel]);

  useEffect(() => {
    if (!timerActivo || tiempoRestante <= 0) return;

    const interval = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTiempoGlobalAgotado();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActivo, tiempoRestante]);

  // Iniciar timer al entrar a la primera fase
  useEffect(() => {
    if (faseActual === 'comprender' && tiempoRestante > 0) {
      setTimerActivo(true);
    }
  }, [faseActual, tiempoRestante]);

  const handleTiempoGlobalAgotado = () => {
    setTimerActivo(false);
    // Calcular puntaje con penalización por tiempo excedido
    const puntajeTotal = Object.values(puntajesFase).reduce((a, b) => a + b, 0);
    const erroresTotal = Object.values(erroresFase).reduce((a, b) => a + b, 0);
    finalizarNivel(puntajeTotal, erroresTotal, true);
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

  const finalizarNivel = (
    puntajeTotal: number,
    erroresTotal: number,
    tiempoAgotado: boolean = false
  ) => {
    setTimerActivo(false);

    // Calcular resultado final
    const tiempoUsado = nivel.tiempoLimiteSegundos - tiempoRestante;
    const bonusTiempo = tiempoAgotado ? 0 : Math.max(0, tiempoRestante * 2);
    const penalizacionTiempo = tiempoAgotado ? 200 : 0;
    const penalizacionErrores = erroresTotal * 50;

    const puntajeFinal = Math.max(
      0,
      puntajeTotal + bonusTiempo - penalizacionTiempo - penalizacionErrores
    );

    const estrellas =
      puntajeFinal >= 3500 ? 3 : puntajeFinal >= 2500 ? 2 : puntajeFinal >= 1500 ? 1 : 0;

    const resultado: ResultadoNivel = {
      puntajeBase: puntajeTotal,
      bonusTiempo,
      penalizacionErrores,
      penalizacionTiempo,
      streakBonus: 0, // Simplificado
      puntajeFinal,
      estrellas,
      tiempoUsadoSegundos: tiempoUsado,
      erroresCometidos: erroresTotal,
    };

    // Guardar progreso local
    completarNivel(nivelId, estrellas, puntajeFinal);

    // Enviar a leaderboard
    const jugadorRaw = localStorage.getItem('polya_jugador');
    if (jugadorRaw) {
      const jugador = JSON.parse(jugadorRaw);

      // En tu niveles/[id]/page.tsx, reemplaza esta parte:

      // Calcular totales acumulados
      const nivelExistente = progresoLocal.find((n) => n.id === nivelId);
      let estrellasTotales = progresoLocal.reduce((acc, n) => acc + n.estrellas, 0);
      let totalNiveles = progresoLocal.length;
      let puntajeAcumuladoTotal = progresoLocal.reduce((acc, n) => acc + n.puntajeMaximo, 0); // ← NUEVO

      if (!nivelExistente) {
        estrellasTotales += estrellas;
        totalNiveles += 1;
        puntajeAcumuladoTotal += puntajeFinal; // ← NUEVO: sumar puntaje del nivel actual
      } else if (estrellas > nivelExistente.estrellas || puntajeFinal > nivelExistente.puntajeMaximo) {
        // Si mejora, recalcular suma total
        estrellasTotales = progresoLocal.reduce((acc, n) => acc + n.estrellas, 0) - nivelExistente.estrellas + Math.max(estrellas, nivelExistente.estrellas);
        puntajeAcumuladoTotal = progresoLocal.reduce((acc, n) => acc + n.puntajeMaximo, 0) - nivelExistente.puntajeMaximo + Math.max(puntajeFinal, nivelExistente.puntajeMaximo); // ← NUEVO
      }

      actualizarPuntaje(
        jugador.id,
        jugador.nombre,
        jugador.avatar,
        estrellasTotales,
        totalNiveles,
        puntajeAcumuladoTotal  // ← NUEVO: puntaje acumulado de TODOS los niveles
      );
    }

    // Guardar resultado en sessionStorage para mostrar en pantalla de resultado
    sessionStorage.setItem('polya_ultimo_resultado', JSON.stringify(resultado));

    // Redirigir a pantalla de resultado
    router.push(`/resultado?nivel=${nivelId}`);
  };

  const avanzarFase = useCallback(
    (puntaje: number, errores: number) => {
      setPuntajesFase((prev) => ({ ...prev, [faseActual]: puntaje }));
      setErroresFase((prev) => ({ ...prev, [faseActual]: errores }));
      setFasesCompletadas((prev) => new Set(prev).add(faseActual));

      const nextIndex = faseIndex + 1;

      if (nextIndex < FASES_ORDEN.length) {
        setTimeout(() => {
          setFaseIndex(nextIndex);
          setFaseActual(FASES_ORDEN[nextIndex]);
        }, 2500);
      } else {
        const puntajeTotal =
          Object.values(puntajesFase).reduce((a, b) => a + b, 0) + puntaje;

        const erroresTotal =
          Object.values(erroresFase).reduce((a, b) => a + b, 0) + errores;

        finalizarNivel(puntajeTotal, erroresTotal);
      }
    },
    [faseActual, faseIndex, puntajesFase, erroresFase]
  );

  const faseData = nivel.fases[faseActual];
  const puntajeAcumulado = Object.values(puntajesFase).reduce((a, b) => a + b, 0);

  // Formatear tiempo
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  const esCritico = tiempoRestante <= 30;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
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
            <h1 className="font-bold text-gray-800 text-lg hidden sm:block">
              {nivel.titulo}
            </h1>
          </div>

          {/* Timer global + puntaje */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-sm ${
                esCritico
                  ? 'bg-red-100 text-red-600 border border-red-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>
                {minutos}:{segundos.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm border border-amber-300">
              <Trophy className="w-4 h-4" />
              <span>{puntajeAcumulado}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de progreso */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <BarraProgreso
          fases={FASES_ORDEN}
          faseActual={faseActual}
          completadas={fasesCompletadas}
        />
      </div>

      {/* Info del nivel */}
      <div className="max-w-4xl mx-auto w-full px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-semibold">
            Dificultad: {nivel.dificultad}
          </span>
          <span>
            Fase {faseIndex + 1} de {FASES_ORDEN.length}: {FASE_LABELS[faseActual].label}
          </span>
        </div>
      </div>

      {/* Área de juego */}
      <div className="flex-1 flex flex-col items-center px-4 py-6 max-w-4xl mx-auto w-full">
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
              <FaseComprenderUni
                enunciado={nivel.fases.comprender.enunciado}
                datosRelevantes={nivel.fases.comprender.datosRelevantes}
                distractores={nivel.fases.comprender.distractores}
                dialogoPolya={nivel.fases.comprender.dialogoPolya}
                penalizacionDistractor={nivel.fases.comprender.penalizacionDistractor}
                onCompletar={(puntaje, errores) => avanzarFase(puntaje, errores)}
              />
            )}

            {faseActual === 'planificar' && (
              <FasePlanificarUni
                herramientas={nivel.fases.planificar.herramientas}
                dialogoPolya={nivel.fases.planificar.dialogoPolya}
                tiempoLimiteSegundos={nivel.fases.planificar.tiempoLimiteSegundos}
                onCompletar={(puntaje, errores) => avanzarFase(puntaje, errores)}
              />
            )}

            {faseActual === 'ejecutar' && (
              <>
                {nivel.fases.ejecutar.tipo === 'input_simple' ? (
                  <FaseEjecutarUniSimple
                    respuestaCorrecta={{ x: nivel.fases.ejecutar.respuestaCorrecta.x }}
                    tolerancia={nivel.fases.ejecutar.tolerancia}
                    intentosMaximos={nivel.fases.ejecutar.intentosMaximos}
                    dialogoPolya={nivel.fases.ejecutar.dialogoPolya}
                    tiempoLimiteSegundos={nivel.fases.ejecutar.tiempoLimiteSegundos}
                    penalizacionIntentoFallido={nivel.fases.ejecutar.penalizacionIntentoFallido}
                    pistaProgresiva={nivel.fases.ejecutar.pistaProgresiva}
                    onCompletar={(puntaje, errores) => avanzarFase(puntaje, errores)}
                  />
                ) : (
                  <FaseEjecutarUniDoble
                    respuestaCorrecta={{
                      x: nivel.fases.ejecutar.respuestaCorrecta.x,
                      y: nivel.fases.ejecutar.respuestaCorrecta.y!,
                    }}
                    tolerancia={nivel.fases.ejecutar.tolerancia}
                    intentosMaximos={nivel.fases.ejecutar.intentosMaximos}
                    dialogoPolya={nivel.fases.ejecutar.dialogoPolya}
                    tiempoLimiteSegundos={nivel.fases.ejecutar.tiempoLimiteSegundos}
                    penalizacionIntentoFallido={nivel.fases.ejecutar.penalizacionIntentoFallido}
                    pistaProgresiva={nivel.fases.ejecutar.pistaProgresiva}
                    onCompletar={(puntaje, errores) => avanzarFase(puntaje, errores)}
                  />
                )}
              </>
            )}

            {faseActual === 'revisar' && (
              <FaseRevisarUni
                pasos={nivel.fases.revisar.pasos}
                dialogoPolya={nivel.fases.revisar.dialogoPolya}
                onCompletar={(puntaje, errores) => avanzarFase(puntaje, errores)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}