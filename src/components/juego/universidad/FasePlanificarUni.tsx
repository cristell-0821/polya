// src/components/juego/universidad/FasePlanificarUni.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Check, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import { HerramientaUni } from '@/types/juego';
import Timer from './Timer';

interface Props {
  herramientas: HerramientaUni[];
  dialogoPolya: string;
  tiempoLimiteSegundos: number;
  onCompletar: (puntaje: number, errores: number) => void;
}

export default function FasePlanificarUni({
  herramientas,
  dialogoPolya,
  tiempoLimiteSegundos,
  onCompletar,
}: Props) {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState(false);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  const [puntaje, setPuntaje] = useState(25);
  const [errores, setErrores] = useState(0);

  const handleTiempoAgotado = () => {
    if (confirmado) return;
    setTiempoAgotado(true);
    setPuntaje(0);
    setErrores(1);
    setConfirmado(true);
    onCompletar(0, 1);
  };

  const handleSeleccionar = (id: string) => {
    if (confirmado || tiempoAgotado) return;
    setSeleccionado(id);
  };

  const handleConfirmar = () => {
    if (!seleccionado || confirmado) return;

    const herramienta = herramientas.find((h) => h.id === seleccionado);
    if (!herramienta) return;

    setConfirmado(true);

    if (herramienta.esCorrecta) {
      // Correcto: bonus por rapidez (implementado en el padre)
      setPuntaje(25);
      setErrores(0);
      onCompletar(25, 0);
    } else {
      // Incorrecto: penalización
      const penalizacion = herramienta.penalizacionError;
      const nuevoPuntaje = Math.max(0, 25 - penalizacion);
      setPuntaje(nuevoPuntaje);
      setErrores(1);
      onCompletar(nuevoPuntaje, 1);
    }
  };

  const herramientaSeleccionada = herramientas.find((h) => h.id === seleccionado);
  const esCorrecta = herramientaSeleccionada?.esCorrecta ?? false;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Timer */}
      {!confirmado && !tiempoAgotado && (
        <div className="flex justify-center mb-4">
          <Timer
            segundos={tiempoLimiteSegundos}
            onTiempoAgotado={handleTiempoAgotado}
            colorAdvertencia={10}
          />
        </div>
      )}

      {/* Pólya */}
      <div className="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-200">
        <p className="text-indigo-700 text-sm font-semibold">🦉 {dialogoPolya}</p>
      </div>

      {/* Opciones */}
      <div className="space-y-3 mb-6">
        {herramientas.map((herramienta) => {
          const isSelected = seleccionado === herramienta.id;
          const mostrarFeedback = confirmado || tiempoAgotado;
          const isCorrecta = herramienta.esCorrecta;

          return (
            <motion.button
              key={herramienta.id}
              onClick={() => handleSeleccionar(herramienta.id)}
              disabled={confirmado || tiempoAgotado}
              whileHover={!confirmado && !tiempoAgotado ? { scale: 1.02 } : {}}
              whileTap={!confirmado && !tiempoAgotado ? { scale: 0.98 } : {}}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                mostrarFeedback
                  ? isSelected && isCorrecta
                    ? 'bg-green-100 border-green-400'
                    : isSelected && !isCorrecta
                    ? 'bg-red-100 border-red-400'
                    : isCorrecta
                    ? 'bg-green-50 border-green-300 opacity-70'
                    : 'bg-gray-50 border-gray-200 opacity-50'
                  : isSelected
                  ? 'bg-indigo-50 border-indigo-400 shadow-md'
                  : 'bg-white border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="text-2xl flex-shrink-0 mt-0.5">{herramienta.emoji}</div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{herramienta.nombre}</span>
                  {mostrarFeedback && isCorrecta && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {mostrarFeedback && isSelected && !isCorrecta && (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>

                {/* Feedback detallado */}
                <AnimatePresence>
                  {mostrarFeedback && (isSelected || isCorrecta) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-2 text-sm leading-relaxed"
                    >
                      <p
                        className={
                          isCorrecta
                            ? 'text-green-700 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {isCorrecta ? '✓ ' : '✗ '}
                        {herramienta.pistaCorrecta}
                      </p>
                      {!isCorrecta && isSelected && (
                        <p className="text-red-500 font-bold mt-1">
                          -{herramienta.penalizacionError} puntos
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Botón confirmar o resultado */}
      {!confirmado && !tiempoAgotado ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirmar}
          disabled={!seleccionado}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Lock className="w-5 h-5" />
          Confirmar elección (1 intento)
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 rounded-xl border-2"
          style={{
            backgroundColor: esCorrecta || (tiempoAgotado && !seleccionado) ? '#dcfce7' : '#fee2e2',
            borderColor: esCorrecta || (tiempoAgotado && !seleccionado) ? '#86efac' : '#fca5a5',
          }}
        >
          {tiempoAgotado && !seleccionado ? (
            <p className="text-red-600 font-bold text-lg flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              ¡Tiempo agotado! 0 puntos
            </p>
          ) : esCorrecta ? (
            <p className="text-green-600 font-bold text-lg flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              ¡Método correcto! +{puntaje} puntos
            </p>
          ) : (
            <p className="text-red-600 font-bold text-lg flex items-center justify-center gap-2">
              <X className="w-5 h-5" />
              Método incorrecto. {puntaje} puntos
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}