// src/components/juego/FaseRevisar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

interface Pregunta {
  texto: string;
  respuestaCorrecta: boolean;
  feedback: string;
}

interface Props {
  preguntas: Pregunta[];
  onCompletar: () => void;
}

export default function FaseRevisar({ preguntas, onCompletar }: Props) {
  const [respuestas, setRespuestas] = useState<Record<number, boolean | null>>({});
  const [mostrandoFeedback, setMostrandoFeedback] = useState<number | null>(null);
  const [preguntaActual, setPreguntaActual] = useState(0);

  const handleResponder = (index: number, respuesta: boolean) => {
    if (respuestas[index] !== undefined) return; // Ya respondió

    const esCorrecta = respuesta === preguntas[index].respuestaCorrecta;
    setRespuestas((prev) => ({ ...prev, [index]: esCorrecta }));
    setMostrandoFeedback(index);

    // Auto-avanzar después de mostrar feedback
    setTimeout(() => {
      setMostrandoFeedback(null);
      if (index < preguntas.length - 1) {
        setPreguntaActual(index + 1);
      }
    }, 2000);
  };

  const todasRespondidas = Object.keys(respuestas).length === preguntas.length;
  const todasCorrectas = Object.values(respuestas).every((r) => r === true);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Lista de preguntas */}
      <div className="space-y-4">
        {preguntas.map((pregunta, index) => {
          const yaRespondida = respuestas[index] !== undefined;
          const esCorrecta = respuestas[index];
          const isActive = index === preguntaActual;
          const isPast = index < preguntaActual;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive || isPast ? 1 : 0.4,
                y: 0,
                scale: isActive ? 1 : isPast ? 0.98 : 0.95,
              }}
              className={`bg-white rounded-2xl p-6 border-2 transition-all ${
                yaRespondida
                  ? esCorrecta
                    ? 'border-green-300 bg-green-50'
                    : 'border-red-300 bg-red-50'
                  : isActive
                  ? 'border-indigo-300 shadow-lg'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">
                  {yaRespondida ? (esCorrecta ? '✅' : '❌') : '❓'}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-700 mb-4">
                    {pregunta.texto}
                  </p>

                  {/* Botones Sí/No */}
                  {!yaRespondida && isActive && (
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResponder(index, true)}
                        className="flex-1 bg-green-100 hover:bg-green-200 border-2 border-green-300 text-green-700 font-bold py-3 px-6 rounded-xl transition-colors"
                      >
                        👍 Sí
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResponder(index, false)}
                        className="flex-1 bg-red-100 hover:bg-red-200 border-2 border-red-300 text-red-700 font-bold py-3 px-6 rounded-xl transition-colors"
                      >
                        👎 No
                      </motion.button>
                    </div>
                  )}

                  {/* Feedback */}
                  <AnimatePresence>
                    {mostrandoFeedback === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mt-3 p-3 rounded-xl font-semibold ${
                          esCorrecta
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {pregunta.feedback}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mostrar respuesta pasada */}
                  {isPast && mostrandoFeedback !== index && (
                    <p
                      className={`mt-2 text-sm font-semibold ${
                        esCorrecta ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {esCorrecta ? '✓ Correcto' : '✗ Revisado'} — {pregunta.feedback}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Resultado final */}
      <AnimatePresence>
        {todasRespondidas && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center space-y-4"
          >
            <div
              className={`p-6 rounded-3xl border-2 ${
                todasCorrectas
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300'
                  : 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-300'
              }`}
            >
              <div className="text-5xl mb-3">
                {todasCorrectas ? '🎉🏆🎉' : '👏🌟👏'}
              </div>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
                {todasCorrectas
                  ? '¡Revisión perfecta!'
                  : '¡Buen intento de revisión!'}
              </h3>
              <p className="text-gray-600 font-semibold">
                {todasCorrectas
                  ? 'Pólya está muy orgulloso de ti. ¡Sigues los 4 pasos como un experto!'
                  : 'Lo importante es revisar. ¡La práctica hace al maestro!'}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCompletar}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Sparkles className="w-5 h-5" />
              {todasCorrectas ? '¡Nivel completado!' : 'Continuar igual'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}