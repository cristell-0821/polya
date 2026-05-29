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
  deleteDoc,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Jugador {
  id: string;
  nombre: string;
  avatar: string;
  puntajeTotal: number;
  estrellasTotales: number;
  nivelesCompletados: number;
  ultimaActualizacion: any;
}

export function useLeaderboard() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(true);

  // Escuchar jugadores
  useEffect(() => {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('puntajeTotal', 'desc'),
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

  // Actualizar puntaje
  const actualizarPuntaje = useCallback(
    async (
      jugadorId: string,
      nombre: string,
      avatar: string,
      estrellas: number,
      niveles: number,
      puntaje: number
    ) => {
      const ref = doc(db, 'leaderboard', jugadorId);
      await setDoc(
        ref,
        {
          nombre,
          avatar,
          puntajeTotal: puntaje,
          estrellasTotales: estrellas,
          nivelesCompletados: niveles,
          ultimaActualizacion: serverTimestamp(),
        },
        { merge: true }
      );
    },
    []
  );

  // 🆕 REINICIAR COMPETENCIA
  const reiniciarCompetencia = useCallback(async () => {
    // 1. Borrar todos los jugadores del leaderboard
    const snapshot = await getDocs(collection(db, 'leaderboard'));
    const batch = writeBatch(db);
    
    snapshot.docs.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    
    await batch.commit();

    // 2. Guardar señal de reinicio con timestamp
    await setDoc(doc(db, 'config', 'reinicio'), {
      timestamp: Date.now(),
      activo: true,
    });

    return true;
  }, []);

  // 🆕 Verificar si hay reinicio reciente
  const verificarReinicio = useCallback(async () => {
    // No implementado aquí, lo hacemos en el componente
    return false;
  }, []);

  return { jugadores, cargando, actualizarPuntaje, reiniciarCompetencia };
}