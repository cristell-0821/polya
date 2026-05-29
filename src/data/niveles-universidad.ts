// src/data/niveles-universidad.ts
import { NivelUniversidad } from '@/types/juego';

export const nivelesUni: NivelUniversidad[] = [
  // ========== NIVEL 1: CINE (Multiplicación directa) ==========
  {
    id: 1,
    titulo: 'El Cine',
    emoji: '🎬',
    descripcion: 'Calcula el total para entrar al cine',
    dificultad: 'Fácil',
    tiempoLimiteSegundos: 60,

    fases: {
      comprender: {
        enunciado: `Una entrada al cine cuesta S/ 12. Si van 3 amigos al cine, ¿cuánto dinero necesitan en total?`,
        datosRelevantes: [
          { id: 'precio', label: 'Entrada: S/ 12', esRelevante: true },
          { id: 'amigos', label: '3 amigos', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'Las palomitas cuestan S/ 8', esRelevante: false },
          { id: 'dist2', label: 'La película dura 2 horas', esRelevante: false },
        ],
        dialogoPolya: 'Identifica los datos necesarios. Solo necesitas el precio y la cantidad de amigos.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'multiplicar',
            nombre: 'Multiplicar precio × cantidad',
            emoji: '✖️',
            esCorrecta: true,
            pistaCorrecta: '¡Exacto! Multiplicación directa.',
            penalizacionError: 0,
          },
          {
            id: 'sumar',
            nombre: 'Sumar 12 + 12 + 12 + 12',
            emoji: '➕',
            esCorrecta: false,
            pistaCorrecta: 'Funciona pero es más lento. La multiplicación es más eficiente.',
            penalizacionError: 2,
          },
          {
            id: 'dividir',
            nombre: 'Dividir 12 ÷ 3',
            emoji: '➗',
            esCorrecta: false,
            pistaCorrecta: 'Dividir no tiene sentido aquí. Necesitas el total, no repartir.',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: '¿Qué operación necesitas para saber el total?',
        tiempoLimiteSegundos: 15,
      },

      ejecutar: {
        tipo: 'input_simple',
        respuestaCorrecta: { x: 36 },
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'Ingresa el total de dinero necesario.',
        tiempoLimiteSegundos: 30,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: Si 1 entrada cuesta S/ 12, ¿cuánto cuestan 3?',
          'Pista 2: 12 × 3 = ? Piensa: 10×3 = 30, 2×3 = 6, 30+6 = 36',
          'Pista 3: La respuesta es 36. ¡12 × 3 = 36!',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '3 entradas × S/ 12 = S/ 36',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '¿Y si fueran 4 amigos? Sería 12 × 4 = S/ 48',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿S/ 30 sería suficiente para 3 amigos?',
            esCorrecto: false,
            explicacion: 'No, 30 ÷ 3 = 10. Cada entrada cuesta S/ 12, no S/ 10. Faltarían S/ 6.',
          },
        ],
        dialogoPolya: 'Verifica que el cálculo sea correcto. ¿El total tiene sentido?',
      },
    },
  },

  // ========== NIVEL 2: CHOCOLATES (Combinación simple) ==========
  {
    id: 2,
    titulo: 'Los Chocolates',
    emoji: '🍫',
    descripcion: 'Descubre cuántos chocolates compraste',
    dificultad: 'Fácil',
    tiempoLimiteSegundos: 75,

    fases: {
      comprender: {
        enunciado: `Cada chocolate grande cuesta S/ 3 y cada chocolate pequeño cuesta S/ 2. Compraste exactamente 3 chocolates y gastaste S/ 7. ¿Cuántos chocolates grandes y pequeños compraste?`,
        datosRelevantes: [
          { id: 'grande', label: 'Grande: S/ 3', esRelevante: true },
          { id: 'pequeno', label: 'Pequeño: S/ 2', esRelevante: true },
          { id: 'totalChoc', label: 'Total chocolates: 3', esRelevante: true },
          { id: 'gasto', label: 'Gasto total: S/ 7', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'Hay 5 sabores disponibles', esRelevante: false },
          { id: 'dist2', label: 'La tienda cierra a las 9pm', esRelevante: false },
        ],
        dialogoPolya: 'Necesitas encontrar una combinación de 3 chocolates que sume S/ 7.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'probar',
            nombre: 'Probar combinaciones posibles',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Sí! Solo hay pocas combinaciones: piénsalas...',
            penalizacionError: 0,
          },
          {
            id: 'ecuaciones',
            nombre: 'Sistema de ecuaciones',
            emoji: '📐',
            esCorrecta: false,
            pistaCorrecta: 'x + y = 3, 3x + 2y = 7. Funciona pero es lento para números tan pequeños.',
            penalizacionError: 2,
          },
          {
            id: 'adivinar',
            nombre: 'Adivinar al azar',
            emoji: '🎲',
            esCorrecta: false,
            pistaCorrecta: 'No hay que adivinar. Con 3 chocolates, solo hay 4 combinaciones posibles.',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: 'Con solo 3 chocolates, ¿es mejor probar o hacer ecuaciones?',
        tiempoLimiteSegundos: 20,
      },

      ejecutar: {
        tipo: 'input_doble',
        respuestaCorrecta: { x: 1, y: 2 }, // 1 grande, 2 pequeños
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = chocolates grandes (S/ 3), y = chocolates pequeños (S/ 2). Deben sumar 3 chocolates y S/ 7.',
        tiempoLimiteSegundos: 30,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: Si compras 2 grandes: 2×3 = S/ 6. Te queda S/ 1 para el tercero. ¿Hay chocolate de S/ 1?',
          'Pista 2: Si compras 1 grande: S/ 3. Te quedan S/ 4 para 2 chocolates. 4÷2 = 2 pequeños.',
          'Pista 3: 1 grande + 2 pequeños = 3 chocolates. 3 + 2 + 2 = S/ 7. ¡Correcto!',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '1 grande + 2 pequeños = 3 chocolates ✓',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '1×3 + 2×2 = 3 + 4 = S/ 7 ✓',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿2 grandes y 1 pequeño también funciona? 2×3 + 1×2 = S/ 8',
            esCorrecto: false,
            explicacion: 'S/ 8 no es S/ 7. Esa combinación gasta de más.',
          },
        ],
        dialogoPolya: 'Revisa que la combinación cumpla AMBAS condiciones: 3 chocolates Y S/ 7.',
      },
    },
  },

  // ========== NIVEL 3: PIZZA (División con resto) ==========
  {
    id: 3,
    titulo: 'La Pizza',
    emoji: '🍕',
    descripcion: 'Reparte las rebanadas entre amigos',
    dificultad: 'Fácil',
    tiempoLimiteSegundos: 75,

    fases: {
      comprender: {
        enunciado: `Una pizza tiene 8 rebanadas. Si hay 3 amigos y quieren que todos coman la misma cantidad, ¿cuántas rebanadas le tocan a cada uno? ¿Sobran rebanadas?`,
        datosRelevantes: [
          { id: 'rebanadas', label: '8 rebanadas', esRelevante: true },
          { id: 'amigos', label: '3 amigos', esRelevante: true },
          { id: 'igual', label: 'Misma cantidad cada uno', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'La pizza cuesta S/ 25', esRelevante: false },
          { id: 'dist2', label: 'Hay 2 tipos de pizza', esRelevante: false },
        ],
        dialogoPolya: 'Necesitas repartir 8 rebanadas entre 3 amigos de forma equitativa.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'dividir',
            nombre: 'Dividir 8 ÷ 3',
            emoji: '➗',
            esCorrecta: true,
            pistaCorrecta: '¡Exacto!',
            penalizacionError: 0,
          },
          {
            id: 'multiplicar',
            nombre: 'Multiplicar 8 × 3',
            emoji: '✖️',
            esCorrecta: false,
            pistaCorrecta: 'Multiplicar da 24, que no tiene sentido. Necesitas REPARTIR, no multiplicar.',
            penalizacionError: 2,
          },
          {
            id: 'restar',
            nombre: 'Restar 8 - 3',
            emoji: '➖',
            esCorrecta: false,
            pistaCorrecta: '8 - 3 = 5, pero eso no dice cuántas le tocan a cada uno.',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: '¿Qué operación te dice cuánto le toca a cada uno cuando repartes?',
        tiempoLimiteSegundos: 15,
      },

      ejecutar: {
        tipo: 'input_doble',
        respuestaCorrecta: { x: 2, y: 2 }, // 2 cada uno, sobran 2
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = rebanadas por persona, y = rebanadas sobrantes',
        tiempoLimiteSegundos: 30,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: Si le das 1 a cada uno, has dado 3. Te quedan 5. ¿Puedes dar otra vuelta?',
          'Pista 2: Si le das 2 a cada uno: 2+2+2 = 6. Te quedan 8-6 = 2 rebanadas.',
          'Pista 3: No puedes dar 3 a cada uno porque 3×3 = 9 > 8. La respuesta es 2 cada uno, sobran 2.',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '3 amigos × 2 rebanadas = 6 rebanadas repartidas',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '8 - 6 = 2 rebanadas sobrantes',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿Le podríamos dar las 2 sobrantes a uno solo?',
            esCorrecto: false,
            explicacion: 'No, porque el problema dice que todos deben comer la MISMA cantidad.',
          },
        ],
        dialogoPolya: 'Verifica que todos coman igual y que las cuentas cuadren.',
      },
    },
  },

  // ========== NIVEL 4: BUS ESCOLAR (Comparación) ==========
  {
    id: 4,
    titulo: 'El Bus Escolar',
    emoji: '🚌',
    descripcion: 'Calcula si todos los alumnos caben en los buses',
    dificultad: 'Fácil',
    tiempoLimiteSegundos: 90,

    fases: {
      comprender: {
        enunciado: `Hay 45 alumnos para un paseo. Cada bus caben 15 alumnos. Ya llegaron 2 buses. ¿Falta algún bus? ¿Cuántos alumnos faltarían por subir?`,
        datosRelevantes: [
          { id: 'alumnos', label: '45 alumnos', esRelevante: true },
          { id: 'capacidad', label: '15 alumnos por bus', esRelevante: true },
          { id: 'buses', label: '2 buses llegaron', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'El viaje dura 2 horas', esRelevante: false },
          { id: 'dist2', label: 'Hay 3 profesores', esRelevante: false },
        ],
        dialogoPolya: 'Calcula cuántos alumnos caben en 2 buses y compara con el total.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'multiplicar_restar',
            nombre: 'Multiplicar capacidad, luego restar',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Sí!',
            penalizacionError: 0,
          },
          {
            id: 'dividir',
            nombre: 'Dividir 45 ÷ 15',
            emoji: '➗',
            esCorrecta: false,
            pistaCorrecta: '45÷15=3 buses en total. Pero la pregunta es si FALTA bus con 2 buses ya aquí.',
            penalizacionError: 2,
          },
          {
            id: 'sumar',
            nombre: 'Sumar 45 + 15 + 2',
            emoji: '➕',
            esCorrecta: false,
            pistaCorrecta: 'Sumar todo no tiene sentido. Necesitas comparar capacidad con alumnos.',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: '¿Cómo sabes si los 2 buses son suficientes para 45 alumnos?',
        tiempoLimiteSegundos: 20,
      },

      ejecutar: {
        tipo: 'input_doble',
        respuestaCorrecta: { x: 1, y: 15 }, // Falta 1 bus, 15 alumnos sin subir
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = buses que faltan, y = alumnos que no caben en los 2 buses',
        tiempoLimiteSegundos: 35,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: 2 buses × 15 = 30 alumnos. ¿45 caben en 30?',
          'Pista 2: 45 - 30 = 15 alumnos sin bus. ¿Cuántos buses más necesitas para 15 alumnos?',
          'Pista 3: Falta 1 bus. 15 alumnos no tienen asiento en los 2 primeros buses.',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '2 buses × 15 = 30 alumnos. 45 - 30 = 15 faltan',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '15 alumnos ÷ 15 por bus = 1 bus más necesario',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿Con 3 buses sobrarían asientos? 3×15 = 45, exactos',
            esCorrecto: true,
          },
        ],
        dialogoPolya: 'Verifica que los cálculos sean coherentes. ¿3 buses son exactos?',
      },
    },
  },

  // ========== NIVEL 5: VIDEOJUEGO (Multiplicación + límite) ==========
  {
    id: 5,
    titulo: 'El Videojuego',
    emoji: '🎮',
    descripcion: 'Alcanza el puntaje necesario para pasar de nivel',
    dificultad: 'Medio',
    tiempoLimiteSegundos: 90,

    fases: {
      comprender: {
        enunciado: `En un videojuego, cada enemigo derrotado da 50 puntos. Necesitas 400 puntos para pasar de nivel. Ya derrotaste 5 enemigos. ¿Cuántos enemigos más necesitas derrotar?`,
        datosRelevantes: [
          { id: 'puntos', label: '50 puntos por enemigo', esRelevante: true },
          { id: 'meta', label: 'Meta: 400 puntos', esRelevante: true },
          { id: 'derrotados', label: 'Ya derrotaste: 5', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'Hay 20 niveles en total', esRelevante: false },
          { id: 'dist2', label: 'Cada nivel dura 5 minutos', esRelevante: false },
        ],
        dialogoPolya: 'Calcula cuántos puntos tienes y cuántos te faltan. Luego convierte a enemigos.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'dos_pasos',
            nombre: 'Calcular puntos actuales, luego los que faltan',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Sí!',
            penalizacionError: 0,
          },
          {
            id: 'dividir_directo',
            nombre: 'Dividir 400 ÷ 50',
            emoji: '➗',
            esCorrecta: false,
            pistaCorrecta: '400÷50=8 enemigos en total. Pero ya derrotaste 5, necesitas 8-5=3 más.',
            penalizacionError: 2,
          },
          {
            id: 'restar',
            nombre: 'Restar 400 - 5',
            emoji: '➖',
            esCorrecta: false,
            pistaCorrecta: '400-5=395 no tiene sentido. No puedes restar enemigos de puntos.',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: 'Necesitas dos pasos: ¿cuántos puntos tienes? ¿Cuántos te faltan?',
        tiempoLimiteSegundos: 20,
      },

      ejecutar: {
        tipo: 'input_simple',
        respuestaCorrecta: { x: 3 }, // 3 enemigos más
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = enemigos adicionales que necesitas derrotar',
        tiempoLimiteSegundos: 35,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: 5 enemigos × 50 = 250 puntos. ¿Cuántos puntos te faltan de 400?',
          'Pista 2: 400 - 250 = 150 puntos faltan. ¿Cuántos enemigos son 150 puntos?',
          'Pista 3: 150 ÷ 50 = 3. Necesitas derrotar 3 enemigos más.',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '5+3 = 8 enemigos totales. 8 × 50 = 400 puntos ✓',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '¿Si derrotas 2 más (7 total)? 7×50 = 350 < 400. No alcanza',
            esCorrecto: false,
            explicacion: '350 puntos no llegan a 400. No pasarías de nivel.',
          },
          {
            id: 'paso3',
            descripcion: '¿Si derrotas 4 más (9 total)? 9×50 = 450 > 400. Sí pasas, pero son más de los necesarios',
            esCorrecto: true,
          },
        ],
        dialogoPolya: 'Verifica que 3 enemigos más sean exactos para llegar a 400.',
      },
    },
  },

  // ========== NIVEL 6: PLAN DE DATOS (Suma con límite) ==========
  {
    id: 6,
    titulo: 'El Plan de Datos',
    emoji: '📱',
    descripcion: 'No te pases de tu límite de datos',
    dificultad: 'Medio',
    tiempoLimiteSegundos: 90,

    fases: {
      comprender: {
        enunciado: `Tienes un plan de 10 GB de datos. Esta semana usaste 2.5 GB el lunes, 3 GB el miércoles y 1.5 GB el viernes. ¿Cuántos GB te quedan para el fin de semana?`,
        datosRelevantes: [
          { id: 'limite', label: 'Límite: 10 GB', esRelevante: true },
          { id: 'lunes', label: 'Lunes: 2.5 GB', esRelevante: true },
          { id: 'miercoles', label: 'Miércoles: 3 GB', esRelevante: true },
          { id: 'viernes', label: 'Viernes: 1.5 GB', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'El plan cuesta S/ 39.90', esRelevante: false },
          { id: 'dist2', label: 'La velocidad es 4G', esRelevante: false },
        ],
        dialogoPolya: 'Suma lo que ya usaste y réstalo del límite total.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'sumar_restar',
            nombre: 'Sumar uso, luego restar del límite',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Sí!',
            penalizacionError: 0,
          },
          {
            id: 'multiplicar',
            nombre: 'Multiplicar los días',
            emoji: '✖️',
            esCorrecta: false,
            pistaCorrecta: 'Multiplicar días no tiene sentido. Necesitas sumar los GB usados.',
            penalizacionError: 2,
          },
          {
            id: 'promedio',
            nombre: 'Sacar promedio de uso',
            emoji: '📊',
            esCorrecta: false,
            pistaCorrecta: 'El promedio no te dice cuánto te queda. Necesitas el total usado.',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: '¿Qué necesitas calcular primero: lo usado o lo que queda?',
        tiempoLimiteSegundos: 20,
      },

      ejecutar: {
        tipo: 'input_simple',
        respuestaCorrecta: { x: 3 }, // 3 GB disponibles
        tolerancia: 0.01,
        intentosMaximos: 3,
        dialogoPolya: 'x = GB disponibles para el fin de semana',
        tiempoLimiteSegundos: 35,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: 2.5 + 3 = 5.5. 5.5 + 1.5 = ? Suma los tres días.',
          'Pista 2: 2.5 + 3 + 1.5 = 7 GB usados. ¿Cuánto es 10 - 7?',
          'Pista 3: Te quedan 3 GB para el fin de semana.',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '2.5 + 3 + 1.5 = 7 GB usados',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '10 - 7 = 3 GB disponibles',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿Si uso 4 GB el sábado, me paso del límite?',
            esCorrecto: false,
            explicacion: 'Sí, 7+4 = 11 GB > 10 GB. Te pasarías por 1 GB.',
          },
        ],
        dialogoPolya: 'Verifica que 3 GB sean correctos. ¿Qué pasa si usas más?',
      },
    },
  },

  // ========== NIVEL 7: ÚTILES ESCOLARES (Combinación con restricciones) ==========
  {
    id: 7,
    titulo: 'La Tienda de Útiles',
    emoji: '📚',
    descripcion: 'Compra exactamente lo que necesitas sin pasarte',
    dificultad: 'Medio',
    tiempoLimiteSegundos: 120,

    fases: {
      comprender: {
        enunciado: `Tienes S/ 50 soles para comprar útiles escolares. Cada cuaderno cuesta S/ 8 y cada carpeta cuesta S/ 5. Necesitas comprar exactamente 7 artículos en total (cuadernos + carpetas). ¿Cuántos cuadernos y carpetas puedes comprar gastando TODO el dinero?`,
        datosRelevantes: [
          { id: 'presupuesto', label: 'Presupuesto: S/ 50', esRelevante: true },
          { id: 'cuaderno', label: 'Cuaderno: S/ 8', esRelevante: true },
          { id: 'carpeta', label: 'Carpeta: S/ 5', esRelevante: true },
          { id: 'total', label: 'Total artículos: 7', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'Hay descuento por mayor', esRelevante: false },
          { id: 'dist2', label: 'La tienda acepta tarjeta', esRelevante: false },
        ],
        dialogoPolya: 'Necesitas encontrar una combinación de 7 artículos que sume exactamente S/ 50.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'probar',
            nombre: 'Probar combinaciones sistemáticamente',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Exacto!',
            penalizacionError: 0,
          },
          {
            id: 'ecuaciones',
            nombre: 'Sistema de ecuaciones',
            emoji: '📐',
            esCorrecta: false,
            pistaCorrecta: 'x+y=7, 8x+5y=50. Funciona pero es más lento que probar con números pequeños.',
            penalizacionError: 2,
          },
          {
            id: 'adivinar',
            nombre: 'Adivinar al azar',
            emoji: '🎲',
            esCorrecta: false,
            pistaCorrecta: 'No adivines. Prueba empezando con el artículo más caro (cuadernos).',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: 'Con 7 artículos, ¿es mejor probar combinaciones o hacer ecuaciones?',
        tiempoLimiteSegundos: 25,
      },

      ejecutar: {
        tipo: 'input_doble',
        respuestaCorrecta: { x: 5, y: 2 }, // 5 cuadernos, 2 carpetas
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = cuadernos (S/ 8), y = carpetas (S/ 5). Deben sumar 7 artículos y S/ 50 exactos.',
        tiempoLimiteSegundos: 50,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: Si compras 6 cuadernos: 6×8 = 48. Te quedan S/ 2 para 1 carpeta. ¿Hay carpeta de S/ 2?',
          'Pista 2: Si compras 5 cuadernos: 5×8 = 40. Te quedan S/ 10 para 2 carpetas. 10÷5 = 2.',
          'Pista 3: 5 cuadernos + 2 carpetas = 7 artículos. 40+10 = S/ 50. ¡Correcto!',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '5 + 2 = 7 artículos ✓',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '5×8 + 2×5 = 40 + 10 = S/ 50 ✓',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿4 cuadernos y 3 carpetas? 4×8 + 3×5 = 32+15 = S/ 47. ¡Faltan S/ 3!',
            esCorrecto: false,
            explicacion: 'S/ 47 no usa TODO el presupuesto. El problema pide gastar los S/ 50 exactos.',
          },
        ],
        dialogoPolya: 'Verifica que la combinación use exactamente S/ 50 y sean 7 artículos.',
      },
    },
  },

  // ========== NIVEL 8: LA GRANJA (División con restricción) ==========
  {
    id: 8,
    titulo: 'La Granja',
    emoji: '🐔',
    descripcion: 'Reparte las gallinas en corrales iguales',
    dificultad: 'Difícil',
    tiempoLimiteSegundos: 120,

    fases: {
      comprender: {
        enunciado: `Tienes 26 gallinas y 4 corrales. Quieres poner el mismo número de gallinas en cada corral, pero necesitas dejar 2 gallinas fuera para que cuiden los huevos. ¿Cuántas gallinas van en cada corral?`,
        datosRelevantes: [
          { id: 'gallinas', label: '26 gallinas', esRelevante: true },
          { id: 'corrales', label: '4 corrales', esRelevante: true },
          { id: 'fuera', label: '2 gallinas fuera', esRelevante: true },
          { id: 'igual', label: 'Misma cantidad en cada corral', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'Cada corral mide 5 metros', esRelevante: false },
          { id: 'dist2', label: 'Las gallinas ponen 6 huevos al día', esRelevante: false },
        ],
        dialogoPolya: 'Primero quita las gallinas que se quedan fuera, luego reparte el resto.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'restar_dividir',
            nombre: 'Restar las de fuera, luego dividir',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Así es!',
            penalizacionError: 0,
          },
          {
            id: 'dividir_directo',
            nombre: 'Dividir 26 ÷ 4 directamente',
            emoji: '➗',
            esCorrecta: false,
            pistaCorrecta: '26 ÷ 4 = 6.5, no es exacto. Olvidas que 2 gallinas se quedan fuera.',
            penalizacionError: 2,
          },
          {
            id: 'multiplicar',
            nombre: 'Multiplicar 4 × 2',
            emoji: '✖️',
            esCorrecta: false,
            pistaCorrecta: '4 corrales × 2 gallinas = 8, no tiene sentido. Resta las de fuera primero.',
            penalizacionError: 3,
          },
        ],
        dialogoPolya: '¿En qué orden haces las operaciones? ¿Restas primero o divides primero?',
        tiempoLimiteSegundos: 25,
      },

      ejecutar: {
        tipo: 'input_simple',
        respuestaCorrecta: { x: 6 },
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = gallinas en cada corral',
        tiempoLimiteSegundos: 50,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: Si hay 26 gallinas y 2 se quedan fuera, ¿cuántas entran a los corrales?',
          'Pista 2: 26 - 2 = 24 gallinas para repartir. ¿24 ÷ 4 corrales?',
          'Pista 3: 24 ÷ 4 = 6. Cada corral tiene 6 gallinas.',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '26 - 2 = 24 gallinas para los corrales',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '24 ÷ 4 = 6 gallinas por corral',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿Si pongo 5 en cada corral? 4×5 = 20. 20+2 = 22 ≠ 26. Faltan gallinas',
            esCorrecto: false,
            explicacion: '5 por corral solo usa 20 gallinas más 2 fuera = 22. No son 26.',
          },
        ],
        dialogoPolya: 'Verifica que todas las gallinas estén contadas: corrales + fuera = 26.',
      },
    },
  },

  // ========== NIVEL 9: LA FÁBRICA (Optimización - nivel medio-difícil) ==========
  {
    id: 9,
    titulo: 'La Fábrica',
    emoji: '🏭',
    descripcion: 'Maximiza la producción con recursos limitados',
    dificultad: 'Difícil',
    tiempoLimiteSegundos: 150,

    fases: {
      comprender: {
        enunciado: `Una fábrica produce mesas y sillas. Cada mesa necesita 2 horas de trabajo y vende S/ 150. Cada silla necesita 1 hora y vende S/ 80. Solo tienes 8 horas disponibles hoy. ¿Cuántas mesas y sillas debes hacer para ganar el máximo dinero?`,
        datosRelevantes: [
          { id: 'mesa', label: 'Mesa: 2h, S/ 150', esRelevante: true },
          { id: 'silla', label: 'Silla: 1h, S/ 80', esRelevante: true },
          { id: 'horas', label: '8 horas disponibles', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'La madera cuesta S/ 500', esRelevante: false },
          { id: 'dist2', label: 'Hay 3 trabajadores', esRelevante: false },
        ],
        dialogoPolya: 'Necesitas comparar: ¿es mejor hacer mesas caras pero lentas, o sillas baratas pero rápidas?',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'comparar',
            nombre: 'Comparar ganancia por hora',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Correcto! ',
            penalizacionError: 0,
          },
          {
            id: 'max_mesas',
            nombre: 'Hacer solo mesas',
            emoji: '🪑',
            esCorrecta: false,
            pistaCorrecta: '4 mesas = 8h, ganas 4×150 = S/ 600. Pero las sillas dan más por hora.',
            penalizacionError: 3,
          },
          {
            id: 'mitad',
            nombre: 'Mitad mesas, mitad sillas',
            emoji: '⚖️',
            esCorrecta: false,
            pistaCorrecta: '2 mesas (4h) + 4 sillas (4h) = 8h. Ganas 300+320 = S/ 620. Pero 8 sillas = S/ 640 es mejor.',
            penalizacionError: 2,
          },
        ],
        dialogoPolya: '¿Qué produce más dinero POR HORA? Compara antes de decidir.',
        tiempoLimiteSegundos: 30,
      },

      ejecutar: {
        tipo: 'input_doble',
        respuestaCorrecta: { x: 0, y: 8 }, // 0 mesas, 8 sillas
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = mesas, y = sillas. Maximiza ganancia en 8 horas.',
        tiempoLimiteSegundos: 60,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: Mesa: S/ 150 / 2h = S/ 75 por hora. Silla: S/ 80 / 1h = S/ 80 por hora.',
          'Pista 2: Las sillas generan más por hora. ¿Cuántas sillas en 8 horas?',
          'Pista 3: 8 sillas × S/ 80 = S/ 640. Es la mejor opción.',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '8 sillas = 8h, ganancia = 8×80 = S/ 640',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '4 mesas = 8h, ganancia = 4×150 = S/ 600 < 640',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿2 mesas + 4 sillas = 8h? Ganancia = 300+320 = S/ 620 < 640',
            esCorrecto: false,
            explicacion: 'S/ 620 es menos que S/ 640. No es la máxima ganancia posible.',
          },
        ],
        dialogoPolya: 'Verifica que ninguna otra combinación dé más de S/ 640.',
      },
    },
  },

  // ========== NIVEL 10: EL CAMIÓN (Problema de transporte) ==========
  {
    id: 10,
    titulo: 'El Camión de Carga',
    emoji: '🚛',
    descripcion: 'Transporta la máxima carga sin pasar el límite',
    dificultad: 'Difícil',
    tiempoLimiteSegundos: 150,

    fases: {
      comprender: {
        enunciado: `Un camión puede cargar máximo 1000 kg. Debes transportar cajas de dos tipos: cajas grandes de 30 kg y cajas pequeñas de 20 kg. Necesitas llevar exactamente 40 cajas en total. ¿Cuántas cajas grandes y pequeñas puedes cargar para estar lo más cerca posible de 1000 kg sin pasarte?`,
        datosRelevantes: [
          { id: 'limite', label: 'Límite: 1000 kg', esRelevante: true },
          { id: 'grande', label: 'Grande: 30 kg', esRelevante: true },
          { id: 'pequena', label: 'Pequeña: 20 kg', esRelevante: true },
          { id: 'total', label: 'Total cajas: 40', esRelevante: true },
        ],
        distractores: [
          { id: 'dist1', label: 'El camión consume 50L por viaje', esRelevante: false },
          { id: 'dist2', label: 'El viaje dura 3 horas', esRelevante: false },
        ],
        dialogoPolya: 'Necesitas 40 cajas que sumen lo más cerca de 1000 kg sin pasarte.',
        penalizacionDistractor: 1,
      },

      planificar: {
        herramientas: [
          {
            id: 'probar',
            nombre: 'Probar valores cercanos',
            emoji: '🎯',
            esCorrecta: true,
            pistaCorrecta: '¡Exacto!',
            penalizacionError: 0,
          },
          {
            id: 'max_grandes',
            nombre: 'Maximizar cajas grandes',
            emoji: '📦',
            esCorrecta: false,
            pistaCorrecta: '33 grandes = 990 kg, pero 33+7=40 cajas. 990 < 1000, pero ¿hay mejor combinación?',
            penalizacionError: 3,
          },
          {
            id: 'ecuaciones',
            nombre: 'Sistema de ecuaciones',
            emoji: '📐',
            esCorrecta: false,
            pistaCorrecta: 'x+y=40, 30x+20y=1000. Funciona: y=40-x, 30x+800-20x=1000, 10x=200, x=20. Pero probar es más rápido.',
            penalizacionError: 2,
          },
        ],
        dialogoPolya: '¿Qué combinación de 40 cajas se acerca más a 1000 kg?',
        tiempoLimiteSegundos: 30,
      },

      ejecutar: {
        tipo: 'input_doble',
        respuestaCorrecta: { x: 20, y: 20 }, // 20 grandes, 20 pequeñas
        tolerancia: 0,
        intentosMaximos: 3,
        dialogoPolya: 'x = cajas grandes (30 kg), y = cajas pequeñas (20 kg). Deben sumar 40 cajas y acercarse a 1000 kg.',
        tiempoLimiteSegundos: 60,
        penalizacionIntentoFallido: 3,
        pistaProgresiva: [
          'Pista 1: Si pones 10 grandes (300 kg), necesitas 30 pequeñas (600 kg). Total 900 kg. ¿Puedes acercarte más?',
          'Pista 2: Prueba 20 grandes: 20×30 = 600 kg. Te quedan 20 cajas pequeñas: 20×20 = 400 kg.',
          'Pista 3: 600 + 400 = 1000 kg exactos. ¡20 grandes + 20 pequeñas = 40 cajas, 1000 kg!',
        ],
      },

      revisar: {
        pasos: [
          {
            id: 'paso1',
            descripcion: '20 + 20 = 40 cajas ✓',
            esCorrecto: true,
          },
          {
            id: 'paso2',
            descripcion: '20×30 + 20×20 = 600 + 400 = 1000 kg ✓',
            esCorrecto: true,
          },
          {
            id: 'paso3',
            descripcion: '¿21 grandes y 19 pequeñas? 21×30 + 19×20 = 630+380 = 1010 kg. ¡Se pasa!',
            esCorrecto: false,
            explicacion: '1010 kg > 1000 kg. El camión no puede cargar más del límite.',
          },
        ],
        dialogoPolya: 'Verifica que 1000 kg sea exacto y que no haya combinación mejor sin pasarse.',
      },
    },
  },
];

export function getNivelUni(id: number): NivelUniversidad | undefined {
  return nivelesUni.find((n) => n.id === id);
}