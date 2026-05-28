// src/hooks/useProgreso.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NivelCompletado {
  id: number;
  estrellas: number; // 1-3
  fecha: string;
}

interface ProgresoState {
  nivelesCompletados: NivelCompletado[];
  completarNivel: (id: number, estrellas: number) => void;
  reiniciarProgreso: () => void;
}

export const useProgreso = create<ProgresoState>()(
  persist(
    (set, get) => ({
      nivelesCompletados: [],

      completarNivel: (id, estrellas) => {
        const { nivelesCompletados } = get();
        const existente = nivelesCompletados.find((n) => n.id === id);

        let nuevosCompletados: NivelCompletado[];

        if (existente) {
          // Solo actualizar si las estrellas son mejores
          if (estrellas > existente.estrellas) {
            nuevosCompletados = nivelesCompletados.map((n) =>
              n.id === id
                ? { ...n, estrellas, fecha: new Date().toISOString() }
                : n
            );
          } else {
            return; // No peor, no guardar
          }
        } else {
          nuevosCompletados = [
            ...nivelesCompletados,
            { id, estrellas, fecha: new Date().toISOString() },
          ];
        }

        set({ nivelesCompletados: nuevosCompletados });
      },

      reiniciarProgreso: () => {
        set({ nivelesCompletados: [] });
      },
    }),
    {
      name: 'polya-progreso',
    }
  )
);