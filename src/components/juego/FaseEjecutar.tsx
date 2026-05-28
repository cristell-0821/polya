// src/components/juego/FaseEjecutar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Check, Sparkles } from 'lucide-react';

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
  ubicado: boolean;
  grupoId: string | null;
}

export default function FaseEjecutar({ config, onCompletar }: Props) {
  const { elementosTotal, grupos, emojiElemento, emojiContenedor } = config;

  const [elementos, setElementos] = useState<Elemento[]>(
    Array.from({ length: elementosTotal }, (_, i) => ({
      id: `elem-${i}`,
      emoji: emojiElemento,
      ubicado: false,
      grupoId: null,
    }))
  );

  const [gruposState, setGruposState] = useState<Record<string, string[]>>(
    Object.fromEntries(
      Array.from({ length: grupos }, (_, i) => [`grupo-${i}`, []])
    )
  );

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const elementosRestantes = elementos.filter((e) => !e.ubicado).length;
  const repartoCorrecto = Object.values(gruposState).every(
    (grupo) => grupo.length === elementosTotal / grupos
  );
  const todosUbicados = elementosRestantes === 0;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const elementoId = active.id as string;
    const grupoId = over.id as string;

    if (!grupoId.startsWith('grupo-')) return;

    const elemento = elementos.find((e) => e.id === elementoId);
    if (!elemento || elemento.ubicado) return;

    // Verificar que no exceda la capacidad del grupo
    const capacidadPorGrupo = elementosTotal / grupos;
    if (gruposState[grupoId].length >= capacidadPorGrupo) return;

    // Actualizar estado
    setElementos((prev) =>
      prev.map((e) =>
        e.id === elementoId ? { ...e, ubicado: true, grupoId } : e
      )
    );

    setGruposState((prev) => ({
      ...prev,
      [grupoId]: [...prev[grupoId], elementoId],
    }));
  };

  const handleReset = () => {
    setElementos(
      Array.from({ length: elementosTotal }, (_, i) => ({
        id: `elem-${i}`,
        emoji: emojiElemento,
        ubicado: false,
        grupoId: null,
      }))
    );
    setGruposState(
      Object.fromEntries(
        Array.from({ length: grupos }, (_, i) => [`grupo-${i}`, []])
      )
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Zona de elementos disponibles */}
      <div className="bg-amber-50 rounded-2xl p-4 mb-6 border-2 border-amber-200">
        <p className="text-center text-amber-700 font-semibold mb-3">
          {elementosRestantes > 0
            ? `Arrastra los ${emojiElemento} a los ${emojiContenedor} (${elementosRestantes} restantes)`
            : '¡Todos repartidos! 🎉'}
        </p>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
            {elementos
              .filter((e) => !e.ubicado)
              .map((elemento) => (
                <DraggableElemento key={elemento.id} elemento={elemento} />
              ))}
          </div>

          {/* Grupos (platos/cubetas/etc) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {Array.from({ length: grupos }, (_, i) => {
              const grupoId = `grupo-${i}`;
              const elementosEnGrupo = gruposState[grupoId];
              const estaLleno = elementosEnGrupo.length === elementosTotal / grupos;

              return (
                <DroppableGrupo
                  key={grupoId}
                  id={grupoId}
                  emojiContenedor={emojiContenedor}
                  elementosEnGrupo={elementosEnGrupo}
                  elementos={elementos}
                  estaLleno={estaLleno}
                />
              );
            })}
          </div>
        </DndContext>
      </div>

      {/* Feedback y botones */}
      <AnimatePresence>
        {todosUbicados && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            {repartoCorrecto ? (
              <>
                <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-4">
                  <p className="text-green-700 font-bold text-xl flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    ¡Reparto perfecto! Cada uno recibió{' '}
                    {elementosTotal / grupos} {emojiElemento}
                    <Sparkles className="w-6 h-6" />
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
                    Ups... Algunos {emojiContenedor} tienen más o menos{' '}
                    {emojiElemento} que otros. ¡Intenta de nuevo!
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-amber-500 text-white font-bold text-lg px-6 py-3 rounded-2xl shadow-lg"
                >
                  🔄 Reintentar
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente de elemento arrastrable
function DraggableElemento({ elemento }: { elemento: Elemento }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: elemento.id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`text-4xl cursor-grab active:cursor-grabbing select-none p-2 bg-white rounded-xl shadow-sm border-2 border-amber-200 ${
        isDragging ? 'opacity-50 z-50' : ''
      }`}
    >
      {elemento.emoji}
    </motion.div>
  );
}

// Componente de zona de drop (grupo/plato)
function DroppableGrupo({
  id,
  emojiContenedor,
  elementosEnGrupo,
  elementos,
  estaLleno,
}: {
  id: string;
  emojiContenedor: string;
  elementosEnGrupo: string[];
  elementos: Elemento[];
  estaLleno: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      animate={{
        scale: isOver ? 1.05 : 1,
        borderColor: isOver ? '#6366f1' : estaLleno ? '#22c55e' : '#e5e7eb',
      }}
      className={`bg-white rounded-2xl p-4 border-2 min-h-[120px] flex flex-col items-center transition-colors ${
        estaLleno ? 'bg-green-50' : ''
      }`}
    >
      <div className="text-4xl mb-2">{emojiContenedor}</div>
      <div className="flex flex-wrap justify-center gap-1 flex-1 content-start">
        {elementosEnGrupo.map((elemId) => {
          const elem = elementos.find((e) => e.id === elemId);
          return elem ? (
            <motion.span
              key={elemId}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl"
            >
              {elem.emoji}
            </motion.span>
          ) : null;
        })}
      </div>
      {estaLleno && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-1"
        >
          <Check className="w-5 h-5 text-green-500" />
        </motion.div>
      )}
    </motion.div>
  );
}