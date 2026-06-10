// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Trophy, BarChart3, GraduationCap } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useProgreso } from '@/hooks/useProgreso';
import { nivelesUni } from '@/data/niveles-universidad';

export default function HomePage() {
  const router = useRouter();
  const { nivelesCompletados, reiniciarProgreso } = useProgreso();

  // 🆕 Detectar reinicio de competencia
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'reinicio'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const ultimoReinicioLocal = parseInt(localStorage.getItem('polya_ultimo_reinicio') || '0');
        
        if (data.timestamp > ultimoReinicioLocal) {
          console.log('🧹 Detectado reinicio en Home. Limpiando...');
          
          reiniciarProgreso();
          localStorage.removeItem('polya_jugador');
          localStorage.setItem('polya_ultimo_reinicio', data.timestamp.toString());
          
          // Forzar recarga para limpiar todo
          window.location.reload();
        }
      }
    });

    return () => unsubscribe();
  }, [reiniciarProgreso]);


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
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-slate-900 text-white">
  
    {/* Fondo animado */}
    <div className="absolute inset-0 z-0">
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      
      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orbes de luz */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/30 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-5%] right-[15%] w-[400px] h-[400px] rounded-full bg-violet-600/25 blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/8 blur-[90px] animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Símbolos matemáticos flotantes */}
      {[
        { symbol: '∑', top: '8%',   left: '5%',  size: '4rem',  delay: '0s',    dur: '18s' },
        { symbol: '√', top: '12%',  left: '85%', size: '3.5rem', delay: '2s',   dur: '22s' },
        { symbol: 'π', top: '68%',  left: '6%',  size: '4.5rem', delay: '1s',   dur: '20s' },
        { symbol: '∞', top: '75%',  left: '82%', size: '3.8rem', delay: '3s',   dur: '16s' },
        { symbol: '∫', top: '40%',  left: '90%', size: '4rem',   delay: '0.5s', dur: '24s' },
        { symbol: '≈', top: '55%',  left: '2%',  size: '3.2rem', delay: '4s',   dur: '19s' },
        { symbol: 'Δ', top: '22%',  left: '75%', size: '3rem',   delay: '2.5s', dur: '21s' },
        { symbol: '?', top: '85%',  left: '48%', size: '3.5rem', delay: '1.5s', dur: '17s' },
        { symbol: 'x²',top: '30%',  left: '10%', size: '2.8rem', delay: '3.5s', dur: '23s' },
        { symbol: '∂', top: '50%',  left: '50%', size: '3rem',   delay: '2s',   dur: '25s' },
        { symbol: '∈', top: '18%',  left: '40%', size: '2.5rem', delay: '1s',   dur: '20s' },
        { symbol: '∀', top: '90%',  left: '20%', size: '3.2rem', delay: '0s',   dur: '22s' },
      ].map(({ symbol, top, left, size, delay, dur }, i) => (
        <span
          key={i}
          className="absolute font-bold select-none pointer-events-none"
          style={{
            top, left, fontSize: size,
            color: 'rgba(129, 140, 248, 0.25)',
            animation: `floatY ${dur} ease-in-out infinite`,
            animationDelay: delay,
          }}
        >
          {symbol}
        </span>
      ))}

      {/* Líneas decorativas diagonales */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={`${i * 25}%`} y1="0%"
            x2={`${i * 25 + 15}%`} y2="100%"
            stroke="#818cf8" strokeWidth="1"
          />
        ))}
      </svg>
    </div>

    {/* Animación CSS */}
    <style>{`
      @keyframes floatY {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33%       { transform: translateY(-18px) rotate(3deg); }
        66%       { transform: translateY(10px) rotate(-2deg); }
      }
    `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-2xl"
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

          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/leaderboard')}
            className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-4 rounded-xl"
          >
            <Trophy className="w-5 h-5" />
            Ranking
          </motion.button> */}

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