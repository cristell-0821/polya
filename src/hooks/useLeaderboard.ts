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
  estrellasTotales: number;
  nivelesCompletados: number;
  ultimaActualizacion: any;
}

export function useLeaderboard() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('estrellasTotales', 'desc'),
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
    async (jugadorId: string, nombre: string, avatar: string, estrellas: number, niveles: number) => {
      const ref = doc(db, 'leaderboard', jugadorId);
      await setDoc(
        ref,
        {
          nombre,
          avatar,
          estrellasTotales: estrellas,
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