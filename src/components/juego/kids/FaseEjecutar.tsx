// src/components/juego/FaseEjecutar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw, Sparkles, Hand } from 'lucide-react';

interface Props {
  config: {
    tipo: 'repartir' | 'contar' | 'agrupar';
    elementosTotal: number;
    grupos: number;
    emojiElemento: string;
    emojiContenedor: string;
  };
  onCompletar: () => void;
}

interface Elemento {
  id: string;
  emoji: string;
  grupoId: string | null;
}

export default function FaseEjecutar({ config, onCompletar }: Props) {
  const { elementosTotal, grupos, emojiElemento, emojiContenedor } = config;

  const [elementos, setElementos] = useState<Elemento[]>(
    Array.from({ length: elementosTotal }, (_, i) => ({
      id: `elem-${i}`,
      emoji: emojiElemento,
      grupoId: null,
    }))
  );

  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const capacidadPorGrupo = elementosTotal / grupos;

  const handleElementoClick = (id: string) => {
    const elem = elementos.find((e) => e.id === id);
    if (!elem || elem.grupoId !== null) return; // Ya está ubicado
    setSeleccionado((prev) => (prev === id ? null : id));
  };

  const handleGrupoClick = (grupoIndex: number) => {
    if (!seleccionado) return;

    const grupoId = `grupo-${grupoIndex}`;
    const elementosEnGrupo = elementos.filter((e) => e.grupoId === grupoId).length;

    if (elementosEnGrupo >= capacidadPorGrupo) {
      // Grupo lleno: shake visual (lo manejamos con animación)
      return;
    }

    setElementos((prev) =>
      prev.map((e) => (e.id === seleccionado ? { ...e, grupoId } : e))
    );
    setSeleccionado(null);
  };

  const handleReset = () => {
    setElementos(
      Array.from({ length: elementosTotal }, (_, i) => ({
        id: `elem-${i}`,
        emoji: emojiElemento,
        grupoId: null,
      }))
    );
    setSeleccionado(null);
  };

  const elementosRestantes = elementos.filter((e) => e.grupoId === null).length;
  const todosUbicados = elementosRestantes === 0;
  const repartoCorrecto = todosUbicados && Array.from({ length: grupos }).every(
    (_, i) => elementos.filter((e) => e.grupoId === `grupo-${i}`).length === capacidadPorGrupo
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Instrucción */}
      <div className="bg-indigo-50 rounded-xl p-3 mb-4 text-center border border-indigo-200">
        <p className="text-indigo-700 font-bold text-sm flex items-center justify-center gap-2">
          <Hand className="w-4 h-4" />
          {seleccionado
            ? '¡Ahora toca un plato para colocarlo!'
            : `Toca un ${emojiElemento} para seleccionarlo, luego toca un ${emojiContenedor}`}
        </p>
      </div>

      {/* Elementos disponibles */}
      <div className="bg-amber-50 rounded-2xl p-4 mb-6 border-2 border-amber-200">
        <p className="text-center text-amber-700 font-semibold mb-3 text-sm">
          {elementosRestantes > 0
            ? `${elementosRestantes} por colocar`
            : '¡Todos colocados! 🎉'}
        </p>

        <div className="flex flex-wrap justify-center gap-3 min-h-[70px]">
          {elementos
            .filter((e) => e.grupoId === null)
            .map((elemento) => {
              const isSelected = seleccionado === elemento.id;
              return (
                <motion.button
                  key={elemento.id}
                  onClick={() => handleElementoClick(elemento.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    isSelected
                      ? {
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(251, 191, 36, 0)',
                            '0 0 0 8px rgba(251, 191, 36, 0.5)',
                            '0 0 0 0 rgba(251, 191, 36, 0)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: isSelected ? Infinity : 0 }}
                  className={`text-4xl p-3 rounded-xl border-2 transition-all select-none ${
                    isSelected
                      ? 'bg-amber-200 border-amber-500 shadow-lg'
                      : 'bg-white border-amber-300 hover:border-amber-500'
                  }`}
                >
                  {elemento.emoji}
                </motion.button>
              );
            })}
        </div>
      </div>

      {/* Grupos (platos) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: grupos }, (_, i) => {
          const grupoId = `grupo-${i}`;
          const elementosEnGrupo = elementos.filter((e) => e.grupoId === grupoId);
          const estaLleno = elementosEnGrupo.length >= capacidadPorGrupo;
          const puedeRecibir = seleccionado !== null && !estaLleno;

          return (
            <motion.button
              key={grupoId}
              onClick={() => handleGrupoClick(i)}
              whileHover={puedeRecibir ? { scale: 1.05 } : {}}
              whileTap={puedeRecibir ? { scale: 0.95 } : {}}
              disabled={!puedeRecibir}
              animate={
                puedeRecibir
                  ? {
                      boxShadow: [
                        '0 0 0 0 rgba(99, 102, 241, 0)',
                        '0 0 0 10px rgba(99, 102, 241, 0.3)',
                        '0 0 0 0 rgba(99, 102, 241, 0)',
                      ],
                    }
                  : estaLleno
                  ? { boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.4)' }
                  : {}
              }
              transition={{ duration: 1.5, repeat: puedeRecibir ? Infinity : 0 }}
              className={`bg-white rounded-2xl p-4 border-2 min-h-[130px] flex flex-col items-center transition-all ${
                puedeRecibir
                  ? 'border-indigo-400 cursor-pointer'
                  : estaLleno
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-200 cursor-default'
              }`}
            >
              <div className="text-4xl mb-2">{emojiContenedor}</div>
              <div className="text-xs font-bold text-gray-400 mb-2">
                {elementosEnGrupo.length} / {capacidadPorGrupo}
              </div>

              <div className="flex flex-wrap justify-center gap-1 w-full">
                {elementosEnGrupo.map((elem) => (
                  <motion.span
                    key={elem.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                  >
                    {elem.emoji}
                  </motion.span>
                ))}
              </div>

              {estaLleno && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback final */}
      <AnimatePresence>
        {todosUbicados && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center space-y-4"
          >
            {repartoCorrecto ? (
              <>
                <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-4">
                  <p className="text-green-700 font-bold text-lg flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    ¡Reparto perfecto! Cada uno recibió {capacidadPorGrupo} {emojiElemento}
                    <Sparkles className="w-5 h-5" />
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onCompletar}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg"
                >
                  <Check className="w-5 h-5" />
                  ¡Continuar!
                </motion.button>
              </>
            ) : (
              <>
                <div className="bg-red-100 border-2 border-red-300 rounded-2xl p-4">
                  <p className="text-red-700 font-bold text-lg">
                    Ups... Algunos {emojiContenedor} tienen más o menos {emojiElemento} que otros
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-amber-500 text-white font-bold text-lg px-6 py-3 rounded-2xl shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reintentar
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}