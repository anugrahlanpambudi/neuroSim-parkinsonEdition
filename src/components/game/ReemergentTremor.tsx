'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ReemergentTremor: React.FC = () => {
  // States: 'idle' | 'holding' (latency ~2000ms) | 'tremor'
  const [phase, setPhase] = useState<'idle' | 'holding' | 'tremor'>('idle');
  const [progress, setProgress] = useState<number>(0);

  const startTest = () => {
    setPhase('holding');
    setProgress(0);
  };

  const resetTest = () => {
    setPhase('idle');
    setProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    if (phase === 'holding') {
      const stepMs = 50;
      const totalMs = 2000;
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (stepMs / totalMs) * 100;
          return next >= 100 ? 100 : next;
        });
      }, stepMs);

      timer = setTimeout(() => {
        setPhase('tremor');
      }, totalMs);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-inner">
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Pemeriksaan Postural & Re-Emergent Tremor</span>
          <p className="text-xs text-slate-400">Instruksi: Pasien merentangkan kedua tangan lurus ke depan sejajar bahu</p>
        </div>
        <div className="flex items-center gap-2">
          {phase === 'idle' ? (
            <button
              onClick={startTest}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Instruksikan Angkat Tangan</span>
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

      {/* Main Simulation Area */}
      <div className="relative w-full h-72 bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center">
        {/* Latency Timer Banner */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">
              {phase === 'idle' && 'Menunggu instruksi dokter...'}
              {phase === 'holding' && 'Fase 1: Tangan terangkat stabil (Latency ~2.000 ms)'}
              {phase === 'tremor' && 'Fase 2: Re-Emergent Tremor Muncul Kembali!'}
            </span>
          </div>

          {phase === 'holding' && (
            <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-amber-400 h-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {phase === 'tremor' && (
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              Re-Emergent (+)
            </div>
          )}
        </div>

        {/* Visual Arm Extended Forward Representation */}
        <div className="relative flex items-center justify-center w-full mt-4">
          {/* Patient Torso Profile */}
          <div className="absolute -left-6 w-24 h-44 bg-slate-800 rounded-r-3xl border border-slate-700/60 shadow-lg flex items-center justify-center">
            <span className="text-[10px] text-slate-500 font-mono -rotate-90">Bahu Pasien</span>
          </div>

          {/* Arm Assembly */}
          <div className="relative flex items-center ml-12">
            {/* Upper Arm */}
            <div className="w-32 h-10 bg-gradient-to-r from-amber-200 to-amber-300 rounded-l-md border-y border-amber-400/30" />
            
            {/* Elbow joint */}
            <div className="w-6 h-12 bg-amber-300 rounded-full border border-amber-400/40 -mx-2 z-10" />

            {/* Forearm & Hand */}
            {phase === 'tremor' ? (
              <motion.div
                animate={{ y: [-4, 4], rotate: [-1.5, 1.5] }}
                transition={{ repeat: Infinity, duration: 0.18, ease: "easeInOut" }}
                className="flex items-center"
              >
                {/* Forearm */}
                <div className="w-36 h-9 bg-gradient-to-r from-amber-300 to-amber-200 rounded-r-sm border-y border-amber-400/30" />
                {/* Extended Hand with fingers horizontal */}
                <div className="relative w-20 h-10 bg-amber-200 rounded-r-2xl border border-amber-400/30 flex items-center px-2 shadow-lg">
                  <div className="w-14 h-2 bg-amber-300 rounded-full mb-1 border border-amber-400/20" />
                  <motion.div
                    animate={{ rotate: [-2, 2] }}
                    transition={{ repeat: Infinity, duration: 0.18 }}
                    className="absolute right-1 text-[10px] text-rose-500 font-bold"
                  >
                    〰️
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center">
                {/* Forearm (steady during idle and latency holding) */}
                <div className="w-36 h-9 bg-gradient-to-r from-amber-300 to-amber-200 rounded-r-sm border-y border-amber-400/30" />
                {/* Hand horizontal */}
                <div className="relative w-20 h-10 bg-amber-200 rounded-r-2xl border border-amber-400/30 flex items-center px-2">
                  <div className="w-14 h-2 bg-amber-300 rounded-full mb-1 border border-amber-400/20" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic status pill */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs px-3 py-1.5 bg-slate-900/90 rounded-lg border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Diagnosis Banding Tremor:</span>
            {phase === 'tremor' ? (
              <span className="text-teal-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                Terdapat Periode Laten (~2s) = Sesuai Tremor Parkinson (Bukan Essential Tremor)
              </span>
            ) : (
              <span className="text-slate-500">Klik tombol di atas untuk memulai uji postural.</span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-3 p-3 bg-teal-950/30 border border-teal-500/20 rounded-xl text-xs text-slate-300 leading-relaxed">
        <strong className="text-teal-300">Poin Kunci Re-emergent Tremor:</strong> Pada penyakit Parkinson, saat pasien diminta mempertahankan posisi tangan lurus ke depan, tremor sempat berhenti total selama 1-3 detik (masa laten), kemudian <em>muncul kembali (re-emergent)</em> dengan frekuensi yang sama dengan resting tremor. Hal ini membedakannya dari Essential Tremor yang langsung muncul tanpa periode laten.
      </div>
    </div>
  );
};
