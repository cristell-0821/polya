// src/types/juego.ts

export type Fase = 'comprender' | 'planificar' | 'ejecutar' | 'revisar';

// ========== TIPOS COMPARTIDOS ==========

export interface DatoInteractivo {
  id: string;
  label: string;
  esRelevante: boolean; // true = dato útil, false = distractor
}

export interface HerramientaUni {
  id: string;
  nombre: string;
  emoji: string;
  esCorrecta: boolean;
  pistaCorrecta: string; // Explicación de por qué es o no es correcta
  penalizacionError: number; // Puntos que resta si eliges mal
}

// ========== NIVEL UNIVERSITARIO ==========

export interface NivelUniversidad {
  id: number;
  titulo: string;
  emoji: string;
  descripcion: string;
  dificultad: 'Fácil' | 'Medio' | 'Difícil';
  tiempoLimiteSegundos: number; // Tiempo total del nivel

  fases: {
    comprender: {
      enunciado: string; // Texto largo del problema
      datosRelevantes: DatoInteractivo[];
      distractores: DatoInteractivo[]; // Datos falsos que restan puntos
      dialogoPolya: string;
      penalizacionDistractor: number;
    };

    planificar: {
      herramientas: HerramientaUni[];
      dialogoPolya: string;
      tiempoLimiteSegundos: number; // Timer específico de esta fase
    };

    ejecutar: {
      tipo: 'input_simple' | 'input_doble'; 
      respuestaCorrecta: {
        x: number;
        y?: number;
      };
      tolerancia: number; // 0 = exacto, 0.01 = ±0.01, etc.
      intentosMaximos: number;
      dialogoPolya: string;
      tiempoLimiteSegundos: number;
      penalizacionIntentoFallido: number;
      pistaProgresiva: string[]; // Pistas que se revelan tras intentos fallidos
    };

    revisar: {
      pasos: {
        id: string;
        descripcion: string;
        esCorrecto: boolean;
        explicacion?: string; // Solo si esCorrecto = false (explica el error)
      }[];
      dialogoPolya: string;
    };
  };
}

// ========== PUNTAJE ==========

export interface ResultadoNivel {
  puntajeBase: number;
  bonusTiempo: number;
  penalizacionErrores: number;
  penalizacionTiempo: number;
  streakBonus: number;
  puntajeFinal: number;
  estrellas: 0 | 1 | 2 | 3;
  tiempoUsadoSegundos: number;
  erroresCometidos: number;
}