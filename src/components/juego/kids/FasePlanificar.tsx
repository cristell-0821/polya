// src/components/juego/FasePlanificar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Herramienta } from '@/types/juego';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';

interface Props {
  herramientas: Herramienta[];
  herramientaElegida: string | null;
  onElegir: (id: string) => void;
  onCompletar: () => void;
}

export default function FasePlanificar({
  herramientas,
  herramientaElegida,
  onElegir,
  onCompletar,
}: Props) {
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [esCorrecta, setEsCorrecta] = useState(false);
  const [intentoPrevio, setIntentoPrevio] = useState<string | null>(null);

  const herramientaSeleccionada = herramientas.find((h) => h.id === herramientaElegida);
  const yaElegioCorrecta = herramientaSeleccionada?.esCorrecta ?? false;

  const handleElegir = (herramienta: Herramienta) => {
    if (yaElegioCorrecta) return; // Ya ganó, no permitir más clicks

    onElegir(herramienta.id);
    setMostrarFeedback(true);
    setEsCorrecta(herramienta.esCorrecta);

    if (!herramienta.esCorrecta) {
      setIntentoPrevio(herramienta.id);
      // Ocultar feedback de error después de un tiempo para reintentar
      setTimeout(() => {
        setMostrarFeedback(false);
      }, 2500);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Área de herramientas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {herramientas.map((herramienta) => {
          const isSelected = herramientaElegida === herramienta.id;
          const isError = intentoPrevio === herramienta.id && !herramienta.esCorrecta;
          const isSuccess = isSelected && herramienta.esCorrecta;
          const isDisabled = yaElegioCorrecta && !isSelected;

          return (
            <motion.button
              key={herramienta.id}
              onClick={() => handleElegir(herramienta)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.05, y: -5 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              animate={
                isError
                  ? { x: [-10, 10, -10, 10, 0] }
                  : isSuccess
                  ? { scale: [1, 1.1, 1] }
                  : {}
              }
              className={`relative p-6 rounded-2xl border-2 text-center transition-all ${
                isSuccess
                  ? 'bg-green-100 border-green-400 shadow-lg shadow-green-200'
                  : isError
                  ? 'bg-red-50 border-red-300'
                  : isSelected
                  ? 'bg-indigo-100 border-indigo-400'
                  : isDisabled
                  ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                  : 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-lg cursor-pointer'
              }`}
            >
              <div className="text-5xl mb-3">{herramienta.emoji}</div>
              <p className="font-bold text-gray-700">{herramienta.nombre}</p>

              {/* Indicadores de estado */}
              {isSuccess && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
              {isError && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-5 h-5" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Cofre mágico (zona de destino visual) */}
      <motion.div
        animate={
          yaElegioCorrecta
            ? { boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }
            : { boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' }
        }
        className={`mx-auto max-w-md p-6 rounded-3xl border-2 text-center transition-colors ${
          yaElegioCorrecta
            ? 'bg-green-50 border-green-300'
            : 'bg-indigo-50 border-indigo-200'
        }`}
      >
        <div className="text-4xl mb-2">{yaElegioCorrecta ? '🎁' : '📦'}</div>
        <p className="font-bold text-lg text-indigo-700">
          {yaElegioCorrecta
            ? '¡Herramienta mágica seleccionada!'
            : 'Elige una herramienta y colócala aquí'}
        </p>
        {herramientaSeleccionada && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-3 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm"
          >
            <span className="text-2xl">{herramientaSeleccionada.emoji}</span>
            <span className="font-semibold text-gray-700">
              {herramientaSeleccionada.nombre}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Feedback de Pólya */}
      <AnimatePresence>
        {mostrarFeedback && herramientaSeleccionada && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-6 p-4 rounded-2xl text-center ${
              esCorrecta
                ? 'bg-green-100 border border-green-300'
                : 'bg-amber-100 border border-amber-300'
            }`}
          >
            <p
              className={`font-semibold text-lg ${
                esCorrecta ? 'text-green-700' : 'text-amber-700'
              }`}
            >
              {esCorrecta
                ? '¡Correcto! Esa es la herramienta perfecta 🎉'
                : herramientaSeleccionada.pista}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón para avanzar */}
      <AnimatePresence>
        {yaElegioCorrecta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCompletar}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Sparkles className="w-5 h-5" />
              ¡A resolver!
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}