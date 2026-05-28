// src/types/juego.ts

export type Fase = 'comprender' | 'planificar' | 'ejecutar' | 'revisar';

export interface DatoInteractivo {
  id: string;
  label: string;
  emoji: string;
  descubierto: boolean;
  posicion: { x: number; y: number }; // % dentro de la escena
}

export interface Herramienta {
  id: string;
  nombre: string;
  emoji: string;
  esCorrecta: boolean;
  pista: string;
}

export interface Nivel {
  id: number;
  titulo: string;
  emoji: string;
  descripcion: string;
  color: string;
  fases: {
    comprender: {
      escena: string; // descripción textual de la escena
      datos: DatoInteractivo[];
      dialogoPolya: string;
    };
    planificar: {
      herramientas: Herramienta[];
      dialogoPolya: string;
    };
    ejecutar: {
      tipo: 'repartir' | 'contar' | 'agrupar';
      elementosTotal: number;
      grupos: number;
      emojiElemento: string;
      emojiContenedor: string;
      dialogoPolya: string;
    };
    revisar: {
      preguntas: {
        texto: string;
        respuestaCorrecta: boolean;
        feedback: string;
      }[];
      dialogoPolya: string;
    };
  };
}