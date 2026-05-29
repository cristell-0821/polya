// src/components/juego/FaseComprender.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DatoInteractivo } from '@/types/juego';
import { Sparkles } from 'lucide-react';

interface Props {
  datos: DatoInteractivo[];
  descubiertos: Set<string>;
  onDescubrir: (id: string) => void;
  onCompletar: () => void;
}

export default function FaseComprender({
  datos,
  descubiertos,
  onDescubrir,
  onCompletar,
}: Props) {
  const todosDescubiertos = datos.every((d) => descubiertos.has(d.id));

  useEffect(() => {
    if (todosDescubiertos) {
      const timer = setTimeout(onCompletar, 3000);
      return () => clearTimeout(timer);
    }
  }, [todosDescubiertos, onCompletar]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Escena */}
      <div className="relative bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-200">
        <p className="text-center text-amber-700 font-semibold mb-6">
          ¡Toca los elementos importantes! 👆
        </p>

        {/* MÓVIL: columna vertical / DESKTOP: posiciones relativas en fila */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-end sm:gap-8 sm:min-h-[180px]">
          {datos.map((dato) => {
            const isDescubierto = descubiertos.has(dato.id);

            return (
              <motion.button
                key={dato.id}
                onClick={() => !isDescubierto && onDescubrir(dato.id)}
                whileHover={!isDescubierto ? { scale: 1.1 } : {}}
                whileTap={!isDescubierto ? { scale: 0.95 } : {}}
                className="relative flex flex-col items-center gap-2 mb-4 sm:mb-0"
              >
                <motion.div
                  animate={
                    !isDescubierto
                      ? {
                          boxShadow: [
                            '0 0 0 0 rgba(251, 191, 36, 0)',
                            '0 0 0 12px rgba(251, 191, 36, 0.3)',
                            '0 0 0 0 rgba(251, 191, 36, 0)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`text-5xl p-4 rounded-2xl border-2 transition-all ${
                    isDescubierto
                      ? 'bg-green-100 border-green-300'
                      : 'bg-white/80 border-amber-300 cursor-pointer hover:bg-white'
                  }`}
                >
                  {dato.emoji}
                </motion.div>

                {/* Label siempre visible debajo, no flotante */}
                <AnimatePresence>
                  {isDescubierto && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap"
                    >
                      {dato.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isDescubierto && (
                  <span className="text-xs text-amber-400 font-semibold animate-pulse">
                    ¡Tócame!
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Indicadores de progreso */}
      <div className="mt-6 flex justify-center gap-2">
        {datos.map((dato) => (
          <div
            key={dato.id}
            className={`w-3 h-3 rounded-full transition-colors ${
              descubiertos.has(dato.id) ? 'bg-green-400' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Mensaje de completado */}
      <AnimatePresence>
        {todosDescubiertos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-green-600 font-bold text-lg flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              ¡Excelente! Ya entendimos el problema
              <Sparkles className="w-5 h-5" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}