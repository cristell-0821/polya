// src/components/juego/PersonajePolya.tsx
'use client';

import { motion } from 'framer-motion';

interface Props {
  mensaje: string;
}

export default function PersonajePolya({ mensaje }: Props) {
  return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 mb-4 max-w-2xl w-full"
      >
        <div className="text-3xl flex-shrink-0">🦉</div>
        <div className="relative bg-indigo-50 rounded-xl rounded-tl-sm p-3 border border-indigo-100 flex-1">
          <p className="text-indigo-800 text-sm font-medium leading-relaxed">
            {mensaje}
          </p>
          <div className="absolute -left-1.5 top-3 w-3 h-3 bg-indigo-50 border-l border-b border-indigo-100 rotate-45" />
        </div>
      </motion.div>
    );
  }