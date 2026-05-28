// src/data/niveles.ts
import { Nivel } from '@/types/juego';

export const niveles: Nivel[] = [
  // ========== NIVEL 1: REPARTIR ==========
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
          { id: 'pasteles', label: '12 pasteles', emoji: '🧁', descubierto: false, posicion: { x: 30, y: 40 } },
          { id: 'ninos', label: '4 amigos', emoji: '🧒', descubierto: false, posicion: { x: 70, y: 40 } },
          { id: 'platos', label: '4 platos', emoji: '🍽️', descubierto: false, posicion: { x: 50, y: 70 } },
        ],
        dialogoPolya: '¡Hola! Mira esta escena. Toca los elementos que crees que son importantes para resolver el problema.',
      },
      planificar: {
        herramientas: [
          { id: 'sumar', nombre: 'Sumar todo', emoji: '➕', esCorrecta: false, pista: '¿Sumar pasteles y amigos tiene sentido aquí? Piensa en repartir...' },
          { id: 'dividir', nombre: 'Hacer grupos iguales', emoji: '➗', esCorrecta: true, pista: '¡Exacto! Necesitas dividir los pasteles entre los amigos.' },
          { id: 'multiplicar', nombre: 'Multiplicar pasteles', emoji: '✖️', esCorrecta: false, pista: '¿Multiplicar pasteles? Eso haría más pasteles, ¡no los repartiría!' },
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
          { texto: '¿Cada amigo recibió pasteles?', respuestaCorrecta: true, feedback: '¡Correcto! Cada uno tiene 3 pasteles.' },
          { texto: '¿Sobró algún pastel?', respuestaCorrecta: false, feedback: '¡Bien! No sobró ningún pastel, 12 ÷ 4 = 3 exactos.' },
          { texto: '¿La repartición fue justa?', respuestaCorrecta: true, feedback: '¡Exacto! Todos recibieron la misma cantidad.' },
        ],
        dialogoPolya: 'Verifiquemos juntos. Responde con sinceridad, ¡no hay respuestas malas!',
      },
    },
  },

  // ========== NIVEL 2: TIEMPO / PLANIFICACIÓN ==========
  {
    id: 2,
    titulo: 'El Viaje Escolar',
    emoji: '🚌',
    descripcion: 'Organiza el tiempo para llegar al zoológico',
    color: 'from-sky-400 to-blue-500',
    fases: {
      comprender: {
        escena: 'El bus sale a las 8:00 AM y el zoológico cierra a las 2:00 PM',
        datos: [
          { id: 'salida', label: 'Salida: 8:00 AM', emoji: '🕗', descubierto: false, posicion: { x: 25, y: 35 } },
          { id: 'llegada', label: 'Llegada: 2:00 PM', emoji: '🕑', descubierto: false, posicion: { x: 75, y: 35 } },
          { id: 'duracion', label: 'Viaje: 3 horas', emoji: '⏱️', descubierto: false, posicion: { x: 50, y: 70 } },
        ],
        dialogoPolya: 'Necesitamos saber cuánto tiempo tenemos en el zoológico. ¡Toca los datos importantes!',
      },
      planificar: {
        herramientas: [
          { id: 'sumar', nombre: 'Sumar horas', emoji: '➕', esCorrecta: false, pista: 'Sumar 8 + 2 no te dice el tiempo disponible...' },
          { id: 'restar', nombre: 'Restar el viaje', emoji: '➖', esCorrecta: true, pista: '¡Sí! Restamos el tiempo de viaje al tiempo total disponible.' },
          { id: 'multiplicar', nombre: 'Multiplicar horas', emoji: '✖️', esCorrecta: false, pista: 'Multiplicar horas no tiene sentido aquí.' },
        ],
        dialogoPolya: '¿Qué operación necesitamos para saber el tiempo que pasaremos en el zoológico?',
      },
      ejecutar: {
        tipo: 'contar',
        elementosTotal: 6, // 6 horas disponibles, 3 de viaje = 3 en el zoo (simplificado para niños)
        grupos: 2,
        emojiElemento: '⏳',
        emojiContenedor: '📦',
        dialogoPolya: '¡Separa las horas del viaje de las horas en el zoológico! Arrastra los relojes de arena.',
      },
      revisar: {
        preguntas: [
          { texto: '¿Tuvimos tiempo suficiente?', respuestaCorrecta: true, feedback: '¡Sí! Llegamos con tiempo de sobra.' },
          { texto: '¿El bus salió tarde?', respuestaCorrecta: false, feedback: 'No, salió puntual a las 8:00 AM.' },
          { texto: '¿Restar fue la operación correcta?', respuestaCorrecta: true, feedback: '¡Exacto! 6 horas totales - 3 de viaje = 3 horas en el zoo.' },
        ],
        dialogoPolya: 'Revisemos si planificamos bien el viaje. ¿Todo salió como esperábamos?',
      },
    },
  },

  // ========== NIVEL 3: GEOMETRÍA / BLOQUES ==========
  {
    id: 3,
    titulo: 'La Torre Mágica',
    emoji: '🏗️',
    descripcion: 'Construye una torre estable con bloques de colores',
    color: 'from-amber-400 to-orange-500',
    fases: {
      comprender: {
        escena: 'Hay bloques rojos y azules. Los rojos pesan más que los azules.',
        datos: [
          { id: 'rojos', label: '6 bloques rojos (pesados)', emoji: '🟥', descubierto: false, posicion: { x: 30, y: 40 } },
          { id: 'azules', label: '6 bloques azules (ligeros)', emoji: '🟦', descubierto: false, posicion: { x: 70, y: 40 } },
          { id: 'altura', label: 'Meta: 12 bloques de altura', emoji: '📏', descubierto: false, posicion: { x: 50, y: 75 } },
        ],
        dialogoPolya: 'Para una torre estable, ¿dónde van los bloques más pesados? ¡Descubre los datos!',
      },
      planificar: {
        herramientas: [
          { id: 'arriba', nombre: 'Pesados arriba', emoji: '⬆️', esCorrecta: false, pista: 'Si pones lo pesado arriba, la torre se cae...' },
          { id: 'abajo', nombre: 'Pesados abajo, ligeros arriba', emoji: '⬇️', esCorrecta: true, pista: '¡Correcto! La base fuerte sostiene la torre.' },
          { id: 'mezclar', nombre: 'Mezclar todos', emoji: '🔄', esCorrecta: false, pista: 'Mezclar al azar no es un buen plan para una torre estable.' },
        ],
        dialogoPolya: '¿Cuál es el plan perfecto para que nuestra torre no se derrumbe?',
      },
      ejecutar: {
        tipo: 'agrupar',
        elementosTotal: 12,
        grupos: 2, // Base (rojos) y Cima (azules)
        emojiElemento: '🧱',
        emojiContenedor: '📦',
        dialogoPolya: '¡Construye la torre! Los rojos van en la base, los azules arriba.',
      },
      revisar: {
        preguntas: [
          { texto: '¿La torre está estable?', respuestaCorrecta: true, feedback: '¡Sí! Los pesados abajo hacen una base perfecta.' },
          { texto: '¿Se cayó algún bloque?', respuestaCorrecta: false, feedback: 'No se cayó nada, ¡buen trabajo!' },
          { texto: '¿Usamos todos los bloques?', respuestaCorrecta: true, feedback: '¡Exacto! 6 + 6 = 12 bloques en total.' },
        ],
        dialogoPolya: '¿Nuestra torre aguantará el viento? ¡Revisemos juntos!',
      },
    },
  },

  // ========== NIVEL 4: FRACCIONES / AGRUPAR ==========
  {
    id: 4,
    titulo: 'La Canasta de Frutas',
    emoji: '🍎',
    descripcion: 'Reparte frutas en canastas de igual tamaño',
    color: 'from-green-400 to-emerald-500',
    fases: {
      comprender: {
        escena: 'Hay 15 frutas y 3 canastas vacías para llenar',
        datos: [
          { id: 'frutas', label: '15 frutas', emoji: '🍎', descubierto: false, posicion: { x: 30, y: 40 } },
          { id: 'canastas', label: '3 canastas', emoji: '🧺', descubierto: false, posicion: { x: 70, y: 40 } },
          { id: 'regla', label: 'Misma cantidad en cada una', emoji: '⚖️', descubierto: false, posicion: { x: 50, y: 75 } },
        ],
        dialogoPolya: 'Necesitamos repartir las frutas de forma justa. ¡Toca lo importante!',
      },
      planificar: {
        herramientas: [
          { id: 'contar', nombre: 'Contar una por una', emoji: '🔢', esCorrecta: false, pista: 'Contar una por una funciona pero es muy lento...' },
          { id: 'dividir', nombre: 'Dividir en 3 grupos', emoji: '➗', esCorrecta: true, pista: '¡Sí! 15 ÷ 3 nos da exactamente 5 frutas por canasta.' },
          { id: 'adivinar', nombre: 'Adivinar', emoji: '🎲', esCorrecta: false, pista: 'Adivinar no es un buen plan. ¡Necesitamos matemáticas!' },
        ],
        dialogoPolya: '¿Cómo haremos para que cada canasta tenga la misma cantidad?',
      },
      ejecutar: {
        tipo: 'repartir',
        elementosTotal: 15,
        grupos: 3,
        emojiElemento: '🍎',
        emojiContenedor: '🧺',
        dialogoPolya: '¡Arrastra las frutas a las canastas! Recuerda: 5 en cada una.',
      },
      revisar: {
        preguntas: [
          { texto: '¿Cada canasta tiene 5 frutas?', respuestaCorrecta: true, feedback: '¡Perfecto! 15 ÷ 3 = 5.' },
          { texto: '¿Sobró alguna fruta?', respuestaCorrecta: false, feedback: 'No sobró ninguna, la división fue exacta.' },
          { texto: '¿Todas las canastas pesan lo mismo?', respuestaCorrecta: true, feedback: '¡Sí! Porque tienen la misma cantidad de frutas.' },
        ],
        dialogoPolya: 'Revisemos si el reparto fue justo. ¡Cuenta si hay 5 en cada canasta!',
      },
    },
  },

  // ========== NIVEL 5: LÓGICA / RUTAS ==========
  {
    id: 5,
    titulo: 'El Camino al Parque',
    emoji: '🗺️',
    descripcion: 'Encuentra la ruta más corta para llegar al parque',
    color: 'from-purple-400 to-violet-500',
    fases: {
      comprender: {
        escena: 'Hay 3 caminos: uno largo con flores, uno corto con piedras, y uno mediano',
        datos: [
          { id: 'corto', label: 'Camino corto: 5 min', emoji: '🏃', descubierto: false, posicion: { x: 20, y: 40 } },
          { id: 'mediano', label: 'Camino mediano: 10 min', emoji: '🚶', descubierto: false, posicion: { x: 50, y: 40 } },
          { id: 'largo', label: 'Camino largo: 20 min', emoji: '🐢', descubierto: false, posicion: { x: 80, y: 40 } },
        ],
        dialogoPolya: 'Queremos llegar rápido al parque. ¡Toca los datos que necesitas!',
      },
      planificar: {
        herramientas: [
          { id: 'largo', nombre: 'Elegir el camino largo', emoji: '🌸', esCorrecta: false, pista: 'El camino largo tiene flores pero tarda 20 minutos...' },
          { id: 'comparar', nombre: 'Comparar y elegir el más corto', emoji: '⚖️', esCorrecta: true, pista: '¡Exacto! Comparamos los tiempos y elegimos el de 5 minutos.' },
          { id: 'dado', nombre: 'Tirar un dado', emoji: '🎲', esCorrecta: false, pista: '¡No! Eso sería suerte, no un plan.' },
        ],
        dialogoPolya: '¿Qué estrategia usaremos para llegar primero al parque?',
      },
      ejecutar: {
        tipo: 'contar',
        elementosTotal: 5, // 5 minutos = 5 "pasos"
        grupos: 1,
        emojiElemento: '👣',
        emojiContenedor: '🏁',
        dialogoPolya: '¡Sigue los pasos del camino corto! Llega al final en 5 pasos.',
      },
      revisar: {
        preguntas: [
          { texto: '¿Llegamos en el menor tiempo?', respuestaCorrecta: true, feedback: '¡Sí! 5 minutos es el tiempo más corto.' },
          { texto: '¿El camino mediano era mejor?', respuestaCorrecta: false, feedback: 'No, el mediano tardaba 10 minutos, el doble.' },
          { texto: '¿Comparar los caminos nos ayudó?', respuestaCorrecta: true, feedback: '¡Claro que sí! Comparar es una gran estrategia.' },
        ],
        dialogoPolya: '¿Fue buena idea planificar antes de salir? ¡Revisemos!',
      },
    },
  },

  // ========== NIVEL 6: EL ACUARIO ==========
  {
    id: 6,
    titulo: 'El Acuario Feliz',
    emoji: '🐠',
    descripcion: 'Ayuda a separar los peces por colores',
    color: 'from-cyan-400 to-teal-500',
    fases: {
      comprender: {
        escena: 'Hay peces rojos y azules nadando en el agua',
        datos: [
          { id: 'rojos', label: '8 peces rojos', emoji: '🔴', descubierto: false, posicion: { x: 25, y: 40 } },
          { id: 'azules', label: '4 peces azules', emoji: '🔵', descubierto: false, posicion: { x: 75, y: 40 } },
          { id: 'peceras', label: '2 peceras', emoji: '🫧', descubierto: false, posicion: { x: 50, y: 75 } },
        ],
        dialogoPolya: '¡Los peces necesitan orden! Descubre los datos importantes.',
      },
      planificar: {
        herramientas: [
          { id: 'mezclar', nombre: 'Mezclar peces', emoji: '🌪️', esCorrecta: false, pista: 'Eso causaría desorden en las peceras...' },
          { id: 'clasificar', nombre: 'Separar por colores', emoji: '🎨', esCorrecta: true, pista: '¡Correcto! Así cada pez tendrá su lugar.' },
          { id: 'ignorar', nombre: 'Ignorar colores', emoji: '❌', esCorrecta: false, pista: 'Los colores sí son importantes aquí.' },
        ],
        dialogoPolya: '¿Cómo organizaremos a los peces?',
      },
      ejecutar: {
        tipo: 'agrupar',
        elementosTotal: 12,
        grupos: 2,
        emojiElemento: '🐠',
        emojiContenedor: '🫧',
        dialogoPolya: '¡Arrastra los peces a la pecera correcta!',
      },
      revisar: {
        preguntas: [
          { texto: '¿Los peces quedaron ordenados?', respuestaCorrecta: true, feedback: '¡Perfecto!' },
          { texto: '¿Todos los peces están mezclados?', respuestaCorrecta: false, feedback: 'No, ahora están separados por color.' },
          { texto: '¿Clasificar ayudó?', respuestaCorrecta: true, feedback: '¡Sí! Fue una gran estrategia.' },
        ],
        dialogoPolya: 'Revisemos si el acuario quedó organizado.',
      },
    },
  },

  // ========== NIVEL 7: EL TREN ==========
  {
    id: 7,
    titulo: 'El Tren de los Números',
    emoji: '🚂',
    descripcion: 'Completa los vagones con la cantidad correcta',
    color: 'from-red-400 to-orange-500',
    fases: {
      comprender: {
        escena: 'Cada vagón debe llevar 2 pasajeros',
        datos: [
          { id: 'pasajeros', label: '10 pasajeros', emoji: '🧍', descubierto: false, posicion: { x: 30, y: 40 } },
          { id: 'vagones', label: '5 vagones', emoji: '🚃', descubierto: false, posicion: { x: 70, y: 40 } },
          { id: 'regla', label: '2 por vagón', emoji: '📋', descubierto: false, posicion: { x: 50, y: 75 } },
        ],
        dialogoPolya: '¡Ayuda a organizar a los pasajeros!',
      },
      planificar: {
        herramientas: [
          { id: 'dividir', nombre: 'Repartir pasajeros', emoji: '➗', esCorrecta: true, pista: '¡Exacto!' },
          { id: 'apilar', nombre: 'Poner todos juntos', emoji: '📦', esCorrecta: false, pista: 'Eso llenaría demasiado un vagón...' },
          { id: 'quitar', nombre: 'Quitar pasajeros', emoji: '➖', esCorrecta: false, pista: 'No necesitamos quitar a nadie.' },
        ],
        dialogoPolya: '¿Qué haremos para llenar el tren correctamente?',
      },
      ejecutar: {
        tipo: 'repartir',
        elementosTotal: 10,
        grupos: 5,
        emojiElemento: '🧍',
        emojiContenedor: '🚃',
        dialogoPolya: '¡Sube los pasajeros al tren!',
      },
      revisar: {
        preguntas: [
          { texto: '¿Cada vagón tiene 2 pasajeros?', respuestaCorrecta: true, feedback: '¡Excelente!' },
          { texto: '¿Sobró alguien?', respuestaCorrecta: false, feedback: 'Todos subieron al tren.' },
          { texto: '¿El tren está equilibrado?', respuestaCorrecta: true, feedback: '¡Sí!' },
        ],
        dialogoPolya: 'Verifiquemos que el tren esté listo para salir.',
      },
    },
  },

  // ========== NIVEL 8: EL HUERTO ==========
  {
    id: 8,
    titulo: 'El Huerto Gigante',
    emoji: '🌱',
    descripcion: 'Riega las plantas que necesitan agua',
    color: 'from-lime-400 to-green-500',
    fases: {
      comprender: {
        escena: 'Algunas plantas están secas y otras felices',
        datos: [
          { id: 'secas', label: '5 plantas secas', emoji: '🥀', descubierto: false, posicion: { x: 30, y: 40 } },
          { id: 'agua', label: '5 gotas de agua', emoji: '💧', descubierto: false, posicion: { x: 70, y: 40 } },
          { id: 'meta', label: 'Salvar las plantas', emoji: '🌻', descubierto: false, posicion: { x: 50, y: 75 } },
        ],
        dialogoPolya: '¿Qué necesita el huerto para estar feliz?',
      },
      planificar: {
        herramientas: [
          { id: 'regar', nombre: 'Regar plantas secas', emoji: '💧', esCorrecta: true, pista: '¡Muy bien!' },
          { id: 'esperar', nombre: 'Esperar lluvia', emoji: '☁️', esCorrecta: false, pista: '¡Tomaría demasiado tiempo!' },
          { id: 'arrancar', nombre: 'Quitar plantas', emoji: '❌', esCorrecta: false, pista: 'No queremos perder plantas.' },
        ],
        dialogoPolya: '¿Cómo ayudaremos al huerto?',
      },
      ejecutar: {
        tipo: 'agrupar',
        elementosTotal: 5,
        grupos: 1,
        emojiElemento: '💧',
        emojiContenedor: '🥀',
        dialogoPolya: '¡Arrastra agua hacia las plantas secas!',
      },
      revisar: {
        preguntas: [
          { texto: '¿Las plantas están felices?', respuestaCorrecta: true, feedback: '¡Sí!' },
          { texto: '¿Faltó agua?', respuestaCorrecta: false, feedback: 'Todas recibieron agua.' },
          { texto: '¿El plan funcionó?', respuestaCorrecta: true, feedback: '¡Excelente trabajo!' },
        ],
        dialogoPolya: '¡Miremos cómo quedó el huerto!',
      },
    },
  },

  // ========== NIVEL 9: LOS GLOBOS==========
  {
    id: 9,
    titulo: 'La Fiesta de Globos',
    emoji: '🎈',
    descripcion: 'Agrupa los globos por color',
    color: 'from-fuchsia-400 to-pink-500',
    fases: {
      comprender: {
        escena: 'Hay globos de muchos colores flotando',
        datos: [
          { id: 'rojos', label: '4 globos rojos', emoji: '🔴', descubierto: false, posicion: { x: 25, y: 40 } },
          { id: 'azules', label: '4 globos azules', emoji: '🔵', descubierto: false, posicion: { x: 50, y: 40 } },
          { id: 'verdes', label: '4 globos verdes', emoji: '🟢', descubierto: false, posicion: { x: 75, y: 40 } },
        ],
        dialogoPolya: '¡Ordenemos los globos antes de la fiesta!',
      },
      planificar: {
        herramientas: [
          { id: 'clasificar', nombre: 'Agrupar colores', emoji: '🎨', esCorrecta: true, pista: '¡Correcto!' },
          { id: 'reventar', nombre: 'Reventar globos', emoji: '💥', esCorrecta: false, pista: '¡Noooo!' },
          { id: 'mezclar', nombre: 'Mezclar todos', emoji: '🌪️', esCorrecta: false, pista: 'Eso sería desordenado.' },
        ],
        dialogoPolya: '¿Qué estrategia usaremos?',
      },
      ejecutar: {
        tipo: 'agrupar',
        elementosTotal: 12,
        grupos: 3,
        emojiElemento: '🎈',
        emojiContenedor: '📦',
        dialogoPolya: '¡Agrupa los globos por colores!',
      },
      revisar: {
        preguntas: [
          { texto: '¿Cada color quedó junto?', respuestaCorrecta: true, feedback: '¡Sí!' },
          { texto: '¿Los globos están desordenados?', respuestaCorrecta: false, feedback: 'No, quedaron muy ordenados.' },
          { texto: '¿Clasificar ayudó?', respuestaCorrecta: true, feedback: '¡Claro!' },
        ],
        dialogoPolya: '¡La fiesta ya está lista!',
      },
    },
  },

  // ========== NIVEL 10: LOS ROBOTS ==========
  {
    id: 10,
    titulo: 'La Fábrica de Robots',
    emoji: '🤖',
    descripcion: 'Carga energía suficiente para todos los robots',
    color: 'from-slate-400 to-gray-600',
    fases: {
      comprender: {
        escena: 'Cada robot necesita una batería para funcionar',
        datos: [
          { id: 'robots', label: '6 robots', emoji: '🤖', descubierto: false, posicion: { x: 30, y: 40 } },
          { id: 'baterias', label: '6 baterías', emoji: '🔋', descubierto: false, posicion: { x: 70, y: 40 } },
          { id: 'meta', label: 'Encender todos', emoji: '⚡', descubierto: false, posicion: { x: 50, y: 75 } },
        ],
        dialogoPolya: '¡Los robots necesitan energía!',
      },
      planificar: {
        herramientas: [
          { id: 'conectar', nombre: 'Dar una batería a cada robot', emoji: '🔌', esCorrecta: true, pista: '¡Muy bien!' },
          { id: 'guardar', nombre: 'Guardar baterías', emoji: '📦', esCorrecta: false, pista: 'Así los robots no funcionarían.' },
          { id: 'duplicar', nombre: 'Duplicar robots', emoji: '➕', esCorrecta: false, pista: 'Eso necesitaría más baterías.' },
        ],
        dialogoPolya: '¿Cómo encenderemos los robots?',
      },
      ejecutar: {
        tipo: 'repartir',
        elementosTotal: 6,
        grupos: 6,
        emojiElemento: '🔋',
        emojiContenedor: '🤖',
        dialogoPolya: '¡Arrastra una batería a cada robot!',
      },
      revisar: {
        preguntas: [
          { texto: '¿Todos los robots tienen energía?', respuestaCorrecta: true, feedback: '¡Sí!' },
          { texto: '¿Sobró alguna batería?', respuestaCorrecta: false, feedback: 'Usaste todas perfectamente.' },
          { texto: '¿Cada robot recibió una batería?', respuestaCorrecta: true, feedback: '¡Excelente trabajo!' },
        ],
        dialogoPolya: '¡La fábrica funciona perfectamente!',
      },
    },
  }
  
];

export function getNivel(id: number): Nivel | undefined {
  return niveles.find((n) => n.id === id);
}