'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const RetropulsionTest: React.FC = () => {
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [stepPhase, setStepPhase] = useState<number>(0); // 0 = ready, 1 = pulled, 2 = step 1, 3 = step 2, 4 = step 3, 5 = unstable caught

  const executePullTest = () => {
    setIsPulling(true);
    setStepPhase(1);

    setTimeout(() => setStepPhase(2), 400); // step 1 back
    setTimeout(() => setStepPhase(3), 850); // step 2 back
    setTimeout(() => setStepPhase(4), 1350); // step 3 back
    setTimeout(() => {
      setStepPhase(5); // unstable backward tilt caught by doctor
      setIsPulling(false);
    }, 1850);
  };

  const resetTest = () => {
    setStepPhase(0);
    setIsPulling(false);
  };

  // Backward offsets (X axis in pixels)
  const backwardOffsets = [0, -15, -45, -85, -135, -145];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-inner">
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Pemeriksaan Instabilitas Postural (Pull Test)</span>
          <p className="text-xs text-slate-400">Dokter berdiri di belakang pasien, memberi tarikan mendadak ke belakang pada kedua bahu</p>
        </div>
        <div className="flex items-center gap-2">
          {stepPhase === 0 ? (
            <button
              onClick={executePullTest}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Lakukan Pull Test (Tarik Bahu)</span>
            </button>
          ) : (
            <button
              onClick={resetTest}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Uji</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Pull Test Simulation Stage */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Floor grid */}
        <div className="absolute bottom-12 left-6 right-6 h-1 bg-slate-700/80 rounded" />
        <div className="absolute bottom-6 left-8 flex items-center gap-6 text-[10px] text-slate-500 font-mono">
          <span>Langkah 4</span>
          <span>Langkah 3</span>
          <span>Langkah 2</span>
          <span>Langkah 1</span>
          <span>Posisi Awal</span>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-3 left-4 flex items-center gap-2">
          {stepPhase === 0 && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
              Pasien berdiri tegak. Dokter bersiap di belakang.
            </span>
          )}
          {stepPhase === 1 && (
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 animate-pulse">
              Tarikan mendadak ke belakang diberikan pada bahu pasien!
            </span>
          )}
          {stepPhase >= 2 && stepPhase < 5 && (
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono">
              Pasien melangkah mundur: Langkah ke-{stepPhase - 1} (Goyah / Unstable)
            </span>
          )}
          {stepPhase === 5 && (
            <span className="text-xs px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              Retropulsi (+) Pasien mundur 3-4 langkah & ditangkap dokter!
            </span>
          )}
        </div>

        {/* Actors Container: Doctor behind Patient */}
        <div className="relative flex items-center justify-center w-full">
          {/* Doctor Silhouette Behind */}
          <div className="absolute left-1/2 -ml-28 bottom-2 flex flex-col items-center z-10 opacity-90">
            {/* Doctor Head */}
            <div className="w-10 h-10 rounded-full bg-slate-400 border-2 border-slate-300 shadow" />
            {/* Doctor Coat */}
            <div className="w-16 h-36 bg-slate-100 rounded-t-2xl shadow-lg border border-slate-300 flex flex-col items-center pt-2">
              <span className="text-[9px] font-bold text-slate-800">DOKTER</span>
              <div className="w-1 h-20 bg-slate-400 mt-2" />
            </div>
            {/* Doctor Hands extended to catch */}
            <div className="absolute top-16 -right-6 flex flex-col gap-2">
              <div className="w-12 h-3.5 bg-cyan-600 rounded-full border border-cyan-400 shadow-sm" />
              <div className="w-12 h-3.5 bg-cyan-600 rounded-full border border-cyan-400 shadow-sm" />
            </div>
          </div>

          {/* Patient Figure (Animated backward retropulsion) */}
          <motion.div
            animate={{
              x: backwardOffsets[stepPhase],
              rotate: stepPhase >= 4 ? -8 : stepPhase === 1 ? -4 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
            }}
            className="relative flex flex-col items-center z-20"
          >
            {/* Patient Head */}
            <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-amber-300 shadow" />
            
            {/* Patient Body / Gown */}
            <div className="relative w-16 h-32 bg-teal-800 rounded-t-xl border border-teal-600/50 shadow flex flex-col items-center pt-2">
              <span className="text-[9px] text-teal-100 font-mono">Pasien</span>
              {/* Shoulders where doctor's force applied */}
              {stepPhase === 1 && (
                <div className="absolute -top-1 w-20 h-4 border-2 border-dashed border-amber-400 rounded-full animate-ping" />
              )}
            </div>

            {/* Patient Legs stepping back */}
            <div className="flex gap-2 -mt-1">
              <motion.div
                animate={stepPhase % 2 === 1 ? { rotate: [-10, 15, 0] } : {}}
                transition={{ duration: 0.3 }}
                className="w-4 h-16 bg-slate-700 rounded-b-md border border-slate-600"
              />
              <motion.div
                animate={stepPhase % 2 === 0 ? { rotate: [15, -10, 0] } : {}}
                transition={{ duration: 0.3 }}
                className="w-4 h-16 bg-slate-700 rounded-b-md border border-slate-600"
              />
            </div>
          </motion.div>
        </div>

        {/* Retropulsion metric */}
        <div className="absolute bottom-2 right-4 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-800">
          Respons Fisiologis Normal: 1-2 langkah pemulihan
        </div>
      </div>

      {/* Clinical Result */}
      <div className="w-full mt-3 p-3 bg-teal-950/30 border border-teal-500/20 rounded-xl text-xs text-slate-300 leading-relaxed flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
        <div>
          <strong className="text-teal-300">Hasil Uji Postural:</strong> Retropulsion Test Positif - Instabilitas postural (+). Pasien membutuhkan lebih dari 2 langkah korektif (mundur 3-4 langkah tidak terkontrol) dan hampir jatuh jika tidak ditangkap oleh pemeriksa. Refleks postural terganggu secara signifikan.
        </div>
      </div>
    </div>
  );
};
