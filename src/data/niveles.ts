// src/data/niveles.ts
import { Nivel } from '@/types/juego';

export const niveles: Nivel[] = [
  {
    id: 1,
    titulo: 'El Cumpleaños Mágico',
    emoji: '🎂',
    descripcion: 'Ayuda a repartir los pasteles entre todos los amigos',
    color: 'from-pink-400 to-rose-500',
    fases: {
      comprender: {
        escena: 'Hay una mesa con pasteles y varios amigos esperando',
        datos: [
          {
            id: 'pasteles',
            label: '12 pasteles',
            emoji: '🧁',
            descubierto: false,
            posicion: { x: 30, y: 40 },
          },
          {
            id: 'ninos',
            label: '4 amigos',
            emoji: '🧒',
            descubierto: false,
            posicion: { x: 70, y: 40 },
          },
          {
            id: 'platos',
            label: '4 platos',
            emoji: '🍽️',
            descubierto: false,
            posicion: { x: 50, y: 70 },
          },
        ],
        dialogoPolya: '¡Hola! Mira esta escena. Toca los elementos que crees que son importantes para resolver el problema.',
      },
      planificar: {
        herramientas: [
          {
            id: 'sumar',
            nombre: 'Sumar todo',
            emoji: '➕',
            esCorrecta: false,
            pista: '¿Sumar pasteles y amigos tiene sentido aquí? Piensa en repartir...',
          },
          {
            id: 'dividir',
            nombre: 'Hacer grupos iguales',
            emoji: '➗',
            esCorrecta: true,
            pista: '¡Exacto! Necesitas dividir los pasteles entre los amigos.',
          },
          {
            id: 'multiplicar',
            nombre: 'Multiplicar pasteles',
            emoji: '✖️',
            esCorrecta: false,
            pista: '¿Multiplicar pasteles? Eso haría más pasteles, ¡no los repartiría!',
          },
        ],
        dialogoPolya: '¿Qué herramienta mágica necesitas para repartir los pasteles de forma justa?',
      },
      ejecutar: {
        tipo: 'repartir',
        elementosTotal: 12,
        grupos: 4,
        emojiElemento: '🧁',
        emojiContenedor: '🍽️',
        dialogoPolya: '¡Arrastra los pasteles a los platos! Cada amigo debe recibir la misma cantidad.',
      },
      revisar: {
        preguntas: [
          {
            texto: '¿Cada amigo recibió pasteles?',
            respuestaCorrecta: true,
            feedback: '¡Correcto! Cada uno tiene 3 pasteles.',
          },
          {
            texto: '¿Sobró algún pastel?',
            respuestaCorrecta: false,
            feedback: '¡Bien! No sobró ningún pastel, 12 ÷ 4 = 3 exactos.',
          },
          {
            texto: '¿La repartición fue justa?',
            respuestaCorrecta: true,
            feedback: '¡Exacto! Todos recibieron la misma cantidad.',
          },
        ],
        dialogoPolya: 'Verifiquemos juntos. Responde con sinceridad, ¡no hay respuestas malas!',
      },
    },
  },
];

export function getNivel(id: number): Nivel | undefined {
  return niveles.find((n) => n.id === id);
}