// src/components/juego/universidad/FaseRevisarUni.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, ArrowRight, Sparkles, Search } from 'lucide-react';

interface Paso {
  id: string;
  descripcion: string;
  esCorrecto: boolean;
  explicacion?: string; // Solo si esCorrecto = false
}

interface Props {
  pasos: Paso[];
  dialogoPolya: string;
  onCompletar: (puntaje: number, errores: number) => void;
}

export default function FaseRevisarUni({
  pasos,
  dialogoPolya,
  onCompletar,
}: Props) {
  const [evaluaciones, setEvaluaciones] = useState<Record<string, 'correcto' | 'incorrecto' | null>>({});
  const [mostrarFeedback, setMostrarFeedback] = useState<Record<string, boolean>>({});
  const [finalizado, setFinalizado] = useState(false);
  const [puntaje, setPuntaje] = useState(25);
  const [errores, setErrores] = useState(0);

  const handleEvaluar = (pasoId: string, evaluacion: 'correcto' | 'incorrecto') => {
    if (finalizado || mostrarFeedback[pasoId]) return;

    const paso = pasos.find((p) => p.id === pasoId);
    if (!paso) return;

    setEvaluaciones((prev) => ({ ...prev, [pasoId]: evaluacion }));
    setMostrarFeedback((prev) => ({ ...prev, [pasoId]: true }));

    // Verificar si la evaluación del alumno coincide con la realidad
    const evaluacionCorrecta = (evaluacion === 'correcto' && paso.esCorrecto) ||
                                (evaluacion === 'incorrecto' && !paso.esCorrecto);

    if (!evaluacionCorrecta) {
      setPuntaje((prev) => Math.max(0, prev - 5));
      setErrores((prev) => prev + 1);
    }

    // Verificar si todos los pasos han sido evaluados
    const nuevasEvaluaciones = { ...evaluaciones, [pasoId]: evaluacion };
    const todosEvaluados = pasos.every((p) => nuevasEvaluaciones[p.id] !== undefined);

    if (todosEvaluados) {
      const erroresTotales = pasos.filter((p) => {
        const ev = nuevasEvaluaciones[p.id];
        return (ev === 'correcto' && !p.esCorrecto) || (ev === 'incorrecto' && p.esCorrecto);
      }).length;

      const puntajeFinal = Math.max(0, 25 - erroresTotales * 5);
      setPuntaje(puntajeFinal);
      setErrores(erroresTotales);
      setFinalizado(true);

      setTimeout(() => {
        onCompletar(puntajeFinal, erroresTotales);
      }, 3500);
    }
  };

  const todosEvaluados = pasos.every((p) => evaluaciones[p.id] !== undefined);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Pólya */}
      <div className="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-200">
        <p className="text-indigo-700 text-sm font-semibold">🦉 {dialogoPolya}</p>
      </div>

      {/* Instrucción */}
      <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-200 flex items-start gap-2">
        <Search className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-amber-700 text-sm font-semibold">
          Analiza cada paso. ¿Es correcto o contiene un error? Si hay error, te explicaremos por qué.
        </p>
      </div>

      {/* Lista de pasos */}
      <div className="space-y-3 mb-6">
        {pasos.map((paso, index) => {
          const evaluacion = evaluaciones[paso.id];
          const feedbackVisible = mostrarFeedback[paso.id];
          const evaluacionCorrecta = evaluacion === 'correcto' && paso.esCorrecto ||
                                     evaluacion === 'incorrecto' && !paso.esCorrecto;

          return (
            <motion.div
              key={paso.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border-2 p-4 transition-all ${
                feedbackVisible
                  ? evaluacionCorrecta
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Número y descripción del paso */}
              <div className="flex items-start gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{paso.descripcion}</p>
              </div>

              {/* Botones de evaluación */}
              {!feedbackVisible ? (
                <div className="flex gap-2 ml-11">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEvaluar(paso.id, 'correcto')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 font-bold text-sm transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Correcto
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEvaluar(paso.id, 'incorrecto')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Tiene error
                  </motion.button>
                </div>
              ) : (
                <div className="ml-11">
                  {/* Feedback */}
                  <div className="flex items-center gap-2 mb-2">
                    {evaluacionCorrecta ? (
                      <>
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-green-700 font-bold text-sm">
                          ¡Evaluación correcta!
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5 text-red-500" />
                        <span className="text-red-700 font-bold text-sm">
                          Evaluación incorrecta
                        </span>
                      </>
                    )}
                  </div>

                  {/* Explicación del paso real */}
                  <div className={`p-3 rounded-lg text-sm ${
                    paso.esCorrecto ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <p className="font-semibold mb-1">
                      {paso.esCorrecto ? '✓ Este paso es correcto:' : '✗ Este paso contiene un error:'}
                    </p>
                    <p>{paso.explicacion || 'El paso está correctamente planteado y verificado.'}</p>
                  </div>

                  {/* Si el alumno se equivocó en su evaluación */}
                  {!evaluacionCorrecta && (
                    <div className="mt-2 p-2 bg-amber-100 rounded-lg text-sm text-amber-700">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Tu evaluación fue incorrecta. -100 puntos
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Resultado final */}
      <AnimatePresence>
        {finalizado && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-2xl border-2 text-center ${
              puntaje >= 800
                ? 'bg-green-100 border-green-300'
                : puntaje >= 500
                ? 'bg-amber-100 border-amber-300'
                : 'bg-red-100 border-red-300'
            }`}
          >
            <div className="text-4xl mb-2">
              {puntaje >= 800 ? '🏆' : puntaje >= 500 ? '👍' : '📚'}
            </div>
            <p className="text-xl font-bold mb-2" style={{ color: puntaje >= 500 ? '#166534' : '#991b1b' }}>
              {puntaje >= 800
                ? '¡Análisis perfecto!'
                : puntaje >= 500
                ? 'Buen análisis, pero hay detalles por mejorar'
                : 'Necesitas practicar más la revisión crítica'}
            </p>
            <p className="text-sm font-semibold" style={{ color: puntaje >= 500 ? '#15803d' : '#b91c1c' }}>
              {puntaje} puntos | {errores} {errores === 1 ? 'error' : 'errores'} de evaluación
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}