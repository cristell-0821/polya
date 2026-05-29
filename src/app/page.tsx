'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Trophy, BarChart3, GraduationCap } from 'lucide-react';
import { useProgreso } from '@/hooks/useProgreso';
import { nivelesUni } from '@/data/niveles-universidad';

export default function HomePage() {
  const router = useRouter();
  const { nivelesCompletados } = useProgreso();

  const maxIdCompletado = nivelesCompletados.length > 0 
    ? Math.max(...nivelesCompletados.map((n) => n.id)) 
    : 0;
  
  const siguienteNivel = maxIdCompletado + 1;
  const totalNiveles = nivelesUni.length;
  const todosCompletados = maxIdCompletado >= totalNiveles;
  const hayProgreso = nivelesCompletados.length > 0;

  const handleEmpezar = () => {
    if (todosCompletados) {
      router.push('/progreso');
    } else {
      router.push(`/niveles/${siguienteNivel}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <GraduationCap className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Método Pólya
        </h1>
        <p className="text-xl text-slate-400 mb-2">
          Resolución estructurada de problemas
        </p>
        <p className="text-sm text-slate-500 mb-8">
          Comprender → Planificar → Ejecutar → Revisar
        </p>

        {hayProgreso && !todosCompletados && (
          <div className="mb-4 bg-slate-800 rounded-lg px-4 py-2 border border-slate-700 inline-block">
            <p className="text-indigo-400 text-sm font-medium">
              Continuando: Nivel {siguienteNivel} de {totalNiveles}
            </p>
          </div>
        )}

        {todosCompletados && (
          <div className="mb-4 bg-green-900/30 rounded-lg px-4 py-2 border border-green-700 inline-block">
            <p className="text-green-400 text-sm font-medium">
              🏆 Todos los niveles completados
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmpezar}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl"
          >
            <Play className="w-5 h-5 fill-white" />
            {todosCompletados ? 'Ver Progreso' : hayProgreso ? 'Continuar' : 'Iniciar'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/leaderboard')}
            className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-4 rounded-xl"
          >
            <Trophy className="w-5 h-5" />
            Ranking
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/progreso')}
            className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-4 rounded-xl"
          >
            <BarChart3 className="w-5 h-5" />
            Progreso
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}