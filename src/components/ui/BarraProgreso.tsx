// src/components/ui/BarraProgreso.tsx
'use client';

import { motion } from 'framer-motion';
import { Fase } from '@/types/juego';

const FASE_LABELS: Record<Fase, { label: string }> = {
  comprender: { label: 'COMPRENDER' },
  planificar: { label: 'PLANIFICAR' },
  ejecutar: { label: 'EJECUTAR' },
  revisar: { label: 'REVISAR' },
};

interface Props {
  fases: Fase[];
  faseActual: Fase;
  completadas: Set<Fase>;
}

export default function BarraProgreso({ fases, faseActual, completadas }: Props) {
  return (
    <div className="flex items-center gap-1">
      {fases.map((fase, index) => {
        const isActive = fase === faseActual;
        const isCompleted = completadas.has(fase);
        const isPast = fases.indexOf(faseActual) > index;

        return (
          <div key={fase} className="flex-1 flex items-center">
            <motion.div
              animate={{
                backgroundColor: isActive
                  ? '#4f46e5'
                  : isCompleted
                  ? '#22c55e'
                  : '#e5e7eb',
              }}
              className={`flex-1 py-2 rounded-lg text-center transition-colors ${
                isActive || isCompleted ? 'text-white' : 'text-gray-400'
              }`}
            >
              <span className="text-xs font-bold tracking-wider">
                {FASE_LABELS[fase].label}
              </span>
            </motion.div>

            {index < fases.length - 1 && (
              <div
                className={`w-2 h-0.5 mx-0.5 ${
                  isPast || isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}