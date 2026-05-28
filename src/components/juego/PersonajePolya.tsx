// src/components/juego/PersonajePolya.tsx
'use client';

import { motion } from 'framer-motion';

interface Props {
  mensaje: string;
}

export default function PersonajePolya({ mensaje }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4 mb-6 max-w-2xl w-full"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-5xl flex-shrink-0 select-none"
      >
        🦉
      </motion.div>

      <div className="relative bg-white rounded-2xl rounded-tl-sm p-4 shadow-md border border-indigo-100 flex-1">
        <p className="text-indigo-800 font-semibold text-lg leading-relaxed">
          {mensaje}
        </p>
        <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-b border-indigo-100 rotate-45" />
      </div>
    </motion.div>
  );
}