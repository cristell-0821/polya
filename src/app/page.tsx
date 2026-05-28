// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, BookOpen, Trophy } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 left-10 text-6xl"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-20 right-20 text-5xl"
        >
          🦉
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-20 text-5xl"
        >
          🎈
        </motion.div>
      </div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-2xl"
      >
        {/* Personaje Pólya */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl mb-6 inline-block"
        >
          🦉
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 text-shadow mb-4">
          ¡Pólya al Rescate!
        </h1>

        <p className="text-xl md:text-2xl text-indigo-500 font-semibold mb-2">
          Aprende a resolver problemas paso a paso
        </p>

        <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
          Acompaña al búho Pólya en una aventura mágica donde cada problema
          tiene una solución si sigues los 4 pasos secretos ✨
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/niveles/1')}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xl font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Play className="w-6 h-6 fill-white" />
            ¡Empezar Aventura!
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/progreso')}
            className="flex items-center justify-center gap-3 bg-white text-indigo-600 text-xl font-bold px-8 py-4 rounded-2xl shadow-lg border-2 border-indigo-100 hover:border-indigo-300 transition-colors"
          >
            <Trophy className="w-6 h-6" />
            Mi Progreso
          </motion.button>
        </div>

        {/* Indicador de método */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center gap-6 text-sm font-semibold text-gray-500"
        >
          <span className="flex items-center gap-1">🔍 Entender</span>
          <span className="flex items-center gap-1">🗺️ Planificar</span>
          <span className="flex items-center gap-1">⚡ Hacer</span>
          <span className="flex items-center gap-1">✅ Revisar</span>
        </motion.div>
      </motion.div>
    </main>
  );
}