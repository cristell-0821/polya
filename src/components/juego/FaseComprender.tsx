// src/components/juego/FaseComprender.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
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
      const timer = setTimeout(onCompletar, 1500);
      return () => clearTimeout(timer);
    }
  }, [todosDescubiertos, onCompletar]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Escena interactiva */}
      <div className="relative bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl p-8 min-h-[300px] border-2 border-amber-200 overflow-hidden">
        <p className="text-center text-amber-700 font-semibold mb-4">
          ¡Toca los elementos importantes! 👆
        </p>

        <div className="relative w-full h-[220px]">
          {datos.map((dato) => {
            const isDescubierto = descubiertos.has(dato.id);

            return (
              <motion.button
                key={dato.id}
                onClick={() => !isDescubierto && onDescubrir(dato.id)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={!isDescubierto ? { scale: 1.2 } : {}}
                whileTap={!isDescubierto ? { scale: 0.9 } : {}}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${dato.posicion.x}%`,
                  top: `${dato.posicion.y}%`,
                }}
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
                  className={`text-5xl p-3 rounded-2xl transition-all ${
                    isDescubierto
                      ? 'bg-green-100 border-2 border-green-300'
                      : 'bg-white/80 border-2 border-amber-300 cursor-pointer hover:bg-white'
                  }`}
                >
                  {dato.emoji}
                </motion.div>

                {/* Label al descubrir */}
                <AnimatePresence>
                  {isDescubierto && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    >
                      <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        {dato.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Estado de descubrimiento */}
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

      {/* Mensaje cuando completa */}
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
    </div>
  );
}