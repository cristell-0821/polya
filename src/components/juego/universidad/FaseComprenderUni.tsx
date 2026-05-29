// src/components/juego/universidad/FaseComprenderUni.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { DatoInteractivo } from '@/types/juego';

interface Props {
  enunciado: string;
  datosRelevantes: DatoInteractivo[];
  distractores: DatoInteractivo[];
  dialogoPolya: string;
  penalizacionDistractor: number;
  onCompletar: (puntaje: number, errores: number) => void;
}

export default function FaseComprenderUni({
  enunciado,
  datosRelevantes,
  distractores,
  dialogoPolya,
  penalizacionDistractor,
  onCompletar,
}: Props) {
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());
  const [mostrarEnunciado, setMostrarEnunciado] = useState(true);
  const [finalizado, setFinalizado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [errores, setErrores] = useState(0);

  const todosLosItems = useMemo(() => {
    return [...datosRelevantes, ...distractores]
      .sort(() => Math.random() - 0.5);
  }, []);

  const toggleSeleccion = (id: string) => {
    if (finalizado) return;

    setSeleccionados((prev) => {
      const nuevo = new Set(prev);

      // Si ya está seleccionado → desmarcar
      if (nuevo.has(id)) {
        nuevo.delete(id);
        return nuevo;
      }

      // Limitar cantidad máxima
      if (nuevo.size >= datosRelevantes.length) {
        return nuevo;
      }

      // Agregar selección
      nuevo.add(id);
      return nuevo;
    });
  };

  const handleConfirmar = () => {
    const relevantesSeleccionados = datosRelevantes.filter((d) => seleccionados.has(d.id));
    const distractoresSeleccionados = distractores.filter((d) => seleccionados.has(d.id));
    const relevantesFaltantes = datosRelevantes.filter((d) => !seleccionados.has(d.id));

    const erroresCount =
      distractoresSeleccionados.length +
      relevantesFaltantes.length;

    const penalizacion =
      (distractoresSeleccionados.length * penalizacionDistractor) +
      (relevantesFaltantes.length * penalizacionDistractor);

    const puntajeFinal = Math.max(0, 25 - penalizacion);

    setPuntaje(puntajeFinal);
    setErrores(erroresCount);
    setFinalizado(true);
    onCompletar(puntajeFinal, erroresCount);
  };

  const todosRelevantesSeleccionados = datosRelevantes.every((d) => seleccionados.has(d.id));
  const haySeleccion = seleccionados.size > 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Enunciado colapsable */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 mb-4 overflow-hidden">
        <button
          onClick={() => setMostrarEnunciado(!mostrarEnunciado)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
        >
          <span className="font-bold text-gray-700 flex items-center gap-2">
            📄 Enunciado del problema
          </span>
          <motion.span
            animate={{ rotate: mostrarEnunciado ? 180 : 0 }}
            className="text-gray-400"
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {mostrarEnunciado && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4"
            >
              <p className="text-gray-600 leading-relaxed text-sm">{enunciado}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pólya */}
      <div className="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-200">
        <p className="text-indigo-700 text-sm font-semibold">🦉 {dialogoPolya}</p>
      </div>

      {/* Lista de items */}
      <div className="space-y-2 mb-6">
        <p className="text-sm font-bold text-gray-500 mb-2">
          Selecciona los datos necesarios ({datosRelevantes.length} correctos):
        </p>

        {todosLosItems.map((item) => {
          const isSelected = seleccionados.has(item.id);
          const isDistractor = !item.esRelevante;
          const mostrarFeedback = finalizado;

          return (
            <motion.button
              key={item.id}
              onClick={() => toggleSeleccion(item.id)}
              disabled={finalizado}
              whileHover={!finalizado ? { scale: 1.02 } : {}}
              whileTap={!finalizado ? { scale: 0.98 } : {}}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                mostrarFeedback
                  ? isSelected && isDistractor
                    ? 'bg-red-100 border-red-400'
                    : isSelected && !isDistractor
                    ? 'bg-green-100 border-green-400'
                    : !isSelected && !isDistractor
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-gray-50 border-gray-200 opacity-50'
                  : isSelected
                  ? 'bg-indigo-50 border-indigo-400'
                  : 'bg-white border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                  mostrarFeedback
                    ? isSelected && isDistractor
                      ? 'bg-red-500 border-red-500'
                      : isSelected && !isDistractor
                      ? 'bg-green-500 border-green-500'
                      : !isSelected && !isDistractor
                      ? 'bg-amber-400 border-amber-400'
                      : 'border-gray-300'
                    : isSelected
                    ? 'bg-indigo-500 border-indigo-500'
                    : 'border-gray-300'
                }`}
              >
                {mostrarFeedback ? (
                  isSelected && isDistractor ? (
                    <X className="w-4 h-4 text-white" />
                  ) : isSelected && !isDistractor ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : !isSelected && !isDistractor ? (
                    <AlertTriangle className="w-4 h-4 text-white" />
                  ) : null
                ) : isSelected ? (
                  <Check className="w-4 h-4 text-white" />
                ) : null}
              </div>

              <span className="text-sm font-medium text-gray-700">{item.label}</span>

              {mostrarFeedback && isSelected && isDistractor && (
                <span className="ml-auto text-xs font-bold text-red-600">
                  -{penalizacionDistractor} pts
                </span>
              )}
              {mostrarFeedback && !isSelected && !isDistractor && (
                <span className="ml-auto text-xs font-bold text-amber-600">
                  ¡Faltó!
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Botón confirmar */}
      {!finalizado ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirmar}
          disabled={!haySeleccion}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-5 h-5" />
          Confirmar selección
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border-2 text-center ${
            puntaje >= 20
              ? 'bg-green-100 border-green-300'
              : puntaje >= 12
              ? 'bg-amber-100 border-amber-300'
              : 'bg-red-100 border-red-300'
          }`}
        >
          <p className="font-bold text-lg flex items-center justify-center gap-2"
            style={{ color: puntaje >= 12 ? '#166534' : '#991b1b' }}>
            <Sparkles className="w-5 h-5" />
            {puntaje >= 20 ? '¡Perfecto!' : puntaje >= 12 ? 'Fase completada' : 'Sigue practicando'}
          </p>
          <p className="text-sm font-semibold mt-1"
            style={{ color: puntaje >= 12 ? '#15803d' : '#b91c1c' }}>
            +{puntaje} puntos | {errores} {errores === 1 ? 'error' : 'errores'}
          </p>
        </motion.div>
            )}
    </div>
  );
}