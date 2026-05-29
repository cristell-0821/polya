// src/components/juego/universidad/Timer.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

interface Props {
  segundos: number;
  onTiempoAgotado: () => void;
  colorAdvertencia?: number; // segundos para cambiar a rojo
}

export default function Timer({ segundos, onTiempoAgotado, colorAdvertencia = 10 }: Props) {
  const [tiempoRestante, setTiempoRestante] = useState(segundos);
  const esCritico = tiempoRestante <= colorAdvertencia;

  useEffect(() => {
    if (tiempoRestante <= 0) {
      onTiempoAgotado();
      return;
    }
    const interval = setInterval(() => setTiempoRestante((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [tiempoRestante, onTiempoAgotado]);

  const minutos = Math.floor(tiempoRestante / 60);
  const segs = tiempoRestante % 60;

  return (
    <motion.div
      animate={esCritico ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.5, repeat: Infinity }}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg ${
        esCritico
          ? 'bg-red-100 text-red-600 border-2 border-red-300'
          : 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200'
      }`}
    >
      {esCritico ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
      <span>
        {minutos}:{segs.toString().padStart(2, '0')}
      </span>
    </motion.div>
  );
}