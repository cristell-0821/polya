// src/hooks/useProgreso.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NivelCompletado {
  id: number;
  estrellas: number;
  puntajeMaximo: number;
  fecha: string;
}

interface ProgresoState {
  nivelesCompletados: NivelCompletado[];
  completarNivel: (id: number, estrellas: number, puntaje?: number) => void;
  reiniciarProgreso: () => void;
  verificarYReiniciar: () => void; // 🆕
}

export const useProgreso = create<ProgresoState>()(
  persist(
    (set, get) => ({
      nivelesCompletados: [],

      completarNivel: (id, estrellas, puntaje = 0) => {
        const { nivelesCompletados } = get();
        const existente = nivelesCompletados.find((n) => n.id === id);

        let nuevosCompletados: NivelCompletado[];

        if (existente) {
          if (estrellas > existente.estrellas || puntaje > existente.puntajeMaximo) {
            nuevosCompletados = nivelesCompletados.map((n) =>
              n.id === id
                ? {
                    ...n,
                    estrellas: Math.max(estrellas, n.estrellas),
                    puntajeMaximo: Math.max(puntaje, n.puntajeMaximo),
                    fecha: new Date().toISOString(),
                  }
                : n
            );
          } else {
            return;
          }
        } else {
          nuevosCompletados = [
            ...nivelesCompletados,
            { id, estrellas, puntajeMaximo: puntaje, fecha: new Date().toISOString() },
          ];
        }

        set({ nivelesCompletados: nuevosCompletados });
      },

      reiniciarProgreso: () => {
        set({ nivelesCompletados: [] });
      },

      // 🆕 Verificar si hay reinicio y limpiar si es necesario
      verificarYReiniciar: () => {
        const reinicioRaw = localStorage.getItem('polya_ultimo_reinicio');
        const progresoRaw = localStorage.getItem('polya-progreso-uni');
        
        if (!reinicioRaw || !progresoRaw) return;

        const ultimoReinicio = parseInt(reinicioRaw);
        const progreso = JSON.parse(progresoRaw);
        const ultimaActualizacion = progreso?.state?.nivelesCompletados?.[0]?.fecha 
          ? new Date(progreso.state.nivelesCompletados[0].fecha).getTime()
          : 0;

        // Si el progreso es anterior al reinicio, limpiar
        if (ultimaActualizacion < ultimoReinicio) {
          console.log('🧹 Progreso anterior al reinicio. Limpiando...');
          set({ nivelesCompletados: [] });
          localStorage.removeItem('polya-progreso-uni');
        }
      },
    }),
    {
      name: 'polya-progreso-uni',
    }
  )
);