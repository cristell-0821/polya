// src/components/juego/universidad/FaseEjecutarUniDoble.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Lightbulb, Clock } from 'lucide-react';
import Timer from './Timer';

interface Props {
  respuestaCorrecta: { x: number; y: number };
  tolerancia: number;
  intentosMaximos: number;
  dialogoPolya: string;
  tiempoLimiteSegundos: number;
  penalizacionIntentoFallido: number;
  pistaProgresiva: string[];
  onCompletar: (puntaje: number, errores: number, acierto: boolean) => void;
}

export default function FaseEjecutarUniDoble({
  respuestaCorrecta,
  tolerancia,
  intentosMaximos,
  dialogoPolya,
  tiempoLimiteSegundos,
  penalizacionIntentoFallido,
  pistaProgresiva,
  onCompletar,
}: Props) {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  const [puntaje, setPuntaje] = useState(25);
  const [errores, setErrores] = useState(0);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [historialIntentos, setHistorialIntentos] = useState<string[]>([]);

  const handleTiempoAgotado = () => {
    if (finalizado) return;
    setTiempoAgotado(true);
    setFinalizado(true);
    setPuntaje(0);
    setErrores(intentosMaximos);
    onCompletar(0, intentosMaximos, false);
  };

  const verificarRespuesta = () => {
    if (finalizado || tiempoAgotado) return;

    const valX = parseFloat(x);
    const valY = parseFloat(y);
    if (isNaN(valX) || isNaN(valY)) return;

    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);

    const diffX = Math.abs(valX - respuestaCorrecta.x);
    const diffY = Math.abs(valY - respuestaCorrecta.y);
    const esCorrecto = diffX <= tolerancia && diffY <= tolerancia;

    const intentoStr = `Intento ${nuevoIntento}: x=${valX}, y=${valY}`;
    setHistorialIntentos((prev) => [...prev, intentoStr]);

    if (esCorrecto) {
      setFinalizado(true);
      const penalizacionTotal = (nuevoIntento - 1) * penalizacionIntentoFallido;
      const puntajeFinal = Math.max(0, 25 - penalizacionTotal);
      setPuntaje(puntajeFinal);
      setErrores(nuevoIntento - 1);
      onCompletar(puntajeFinal, nuevoIntento - 1, true);
    } else if (nuevoIntento >= intentosMaximos) {
      setFinalizado(true);
      const penalizacionTotal = nuevoIntento * penalizacionIntentoFallido;
      setPuntaje(Math.max(0, 25 - penalizacionTotal));
      setErrores(nuevoIntento);
      onCompletar(Math.max(0, 25 - penalizacionTotal), nuevoIntento, false);
    } else {
      setPuntaje((prev) => Math.max(0, prev - penalizacionIntentoFallido));
      setErrores(nuevoIntento);
      setMostrarPista(true);
      setX('');
      setY('');
    }
  };

  const pistaActual = pistaProgresiva[Math.min(intentos - 1, pistaProgresiva.length - 1)];
  const quedanIntentos = intentosMaximos - intentos;
  const inputsValidos = x.trim() !== '' && y.trim() !== '';

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!finalizado && !tiempoAgotado && (
        <div className="flex justify-center mb-4">
          <Timer
            segundos={tiempoLimiteSegundos}
            onTiempoAgotado={handleTiempoAgotado}
            colorAdvertencia={15}
          />
        </div>
      )}

      <div className="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-200">
        <p className="text-indigo-700 text-sm font-semibold">🦉 {dialogoPolya}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: intentosMaximos }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i < intentos ? 'bg-red-400' : 'bg-green-400'}`}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-gray-500">
          {finalizado || tiempoAgotado ? 'Finalizado' : `${quedanIntentos} intentos restantes`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-600 mb-1">x</label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            disabled={finalizado || tiempoAgotado}
            placeholder="0"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg font-bold text-center disabled:bg-gray-100"
            onKeyDown={(e) => e.key === 'Enter' && inputsValidos && verificarRespuesta()}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-600 mb-1">y</label>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            disabled={finalizado || tiempoAgotado}
            placeholder="0"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg font-bold text-center disabled:bg-gray-100"
            onKeyDown={(e) => e.key === 'Enter' && inputsValidos && verificarRespuesta()}
          />
        </div>
      </div>

      {!finalizado && !tiempoAgotado && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={verificarRespuesta}
          disabled={!inputsValidos}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          <Check className="w-5 h-5" />
          Verificar respuesta
        </motion.button>
      )}

      <AnimatePresence>
        {mostrarPista && !finalizado && !tiempoAgotado && pistaActual && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-4"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-700 font-bold text-sm mb-1">
                  Pista tras intento {intentos}:
                </p>
                <p className="text-amber-600 text-sm">{pistaActual}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {historialIntentos.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-200">
          <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Historial</p>
          {historialIntentos.map((intento, i) => (
            <p key={i} className="text-sm text-gray-500 font-mono">{intento}</p>
          ))}
        </div>
      )}

      <AnimatePresence>
        {finalizado && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-2xl border-2 text-center ${
              puntaje > 0 ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
            }`}
          >
            {puntaje > 0 ? (
              <>
                <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-green-700 font-bold text-xl">
                  ¡Respuesta correcta! x={respuestaCorrecta.x}, y={respuestaCorrecta.y}
                </p>
                <p className="text-green-600 font-semibold mt-1">
                  +{puntaje} puntos ({intentos} {intentos === 1 ? 'intento' : 'intentos'})
                </p>
              </>
            ) : (
              <>
                <X className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-700 font-bold text-xl">Sin intentos restantes</p>
                <p className="text-red-600 text-sm mt-1">
                  Respuesta correcta: x={respuestaCorrecta.x}, y={respuestaCorrecta.y}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tiempoAgotado && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl border-2 bg-red-100 border-red-300 text-center mt-4"
          >
            <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-700 font-bold text-xl">¡Tiempo agotado!</p>
            <p className="text-red-600 text-sm mt-1">
              Respuesta correcta: x={respuestaCorrecta.x}, y={respuestaCorrecta.y}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}