// src/hooks/useLeaderboard.ts
import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Jugador {
  id: string;
  nombre: string;
  avatar: string;
  puntajeTotal: number;        // ← NUEVO: ranking principal
  estrellasTotales: number;    // ← sigue guardado pero secundario
  nivelesCompletados: number;
  ultimaActualizacion: any;
}

export function useLeaderboard() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('puntajeTotal', 'desc'),   // ← CAMBIO: ordenar por puntaje
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Jugador[];
      setJugadores(data);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const actualizarPuntaje = useCallback(
    async (
      jugadorId: string,
      nombre: string,
      avatar: string,
      estrellas: number,
      niveles: number,
      puntaje: number   // ← NUEVO parámetro
    ) => {
      const ref = doc(db, 'leaderboard', jugadorId);
      await setDoc(
        ref,
        {
          nombre,
          avatar,
          puntajeTotal: puntaje,        // ← NUEVO
          estrellasTotales: estrellas,  // ← sigue guardado
          nivelesCompletados: niveles,
          ultimaActualizacion: serverTimestamp(),
        },
        { merge: true }
      );
    },
    []
  );

  return { jugadores, cargando, actualizarPuntaje };
}