// src/hooks/useProgreso.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NivelCompletado {
  id: number;
  estrellas: number; // 0-3
  puntajeMaximo: number; // NUEVO: guardar mejor puntaje
  fecha: string;
}

interface ProgresoState {
  nivelesCompletados: NivelCompletado[];
  completarNivel: (id: number, estrellas: number, puntaje?: number) => void;
  reiniciarProgreso: () => void;
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
          // Solo actualizar si mejora estrellas O puntaje
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
    }),
    {
      name: 'polya-progreso-uni',
    }
  )
);