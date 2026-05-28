// src/components/ui/BarraProgreso.tsx
'use client';

import { motion } from 'framer-motion';
import { Fase } from '@/types/juego';

const FASE_LABELS: Record<Fase, { label: string; emoji: string }> = {
  comprender: { label: 'Entender', emoji: '🔍' },
  planificar: { label: 'Planificar', emoji: '🗺️' },
  ejecutar: { label: 'Hacer', emoji: '⚡' },
  revisar: { label: 'Revisar', emoji: '✅' },
};

interface Props {
  fases: Fase[];
  faseActual: Fase;
  completadas: Set<Fase>;
}

export default function BarraProgreso({ fases, faseActual, completadas }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      {fases.map((fase, index) => {
        const isActive = fase === faseActual;
        const isCompleted = completadas.has(fase);
        const isPast = fases.indexOf(faseActual) > index;

        return (
          <div key={fase} className="flex-1 flex items-center">
            <motion.div
              animate={{
                scale: isActive ? 1.05 : 1,
                backgroundColor: isActive
                  ? '#6366f1'
                  : isCompleted
                  ? '#22c55e'
                  : '#e5e7eb',
              }}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-sm font-bold transition-colors ${
                isActive || isCompleted ? 'text-white' : 'text-gray-400'
              }`}
            >
              <span>{FASE_LABELS[fase].emoji}</span>
              <span className="hidden sm:inline">{FASE_LABELS[fase].label}</span>
            </motion.div>

            {index < fases.length - 1 && (
              <div
                className={`w-4 h-0.5 mx-1 ${
                  isPast || isCompleted ? 'bg-green-400' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}