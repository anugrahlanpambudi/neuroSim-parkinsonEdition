'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, Activity, CheckCircle2, Info } from 'lucide-react';

interface MotorWeaknessProps {
  onComplete?: () => void;
}

export const MotorWeakness: React.FC<MotorWeaknessProps> = ({ onComplete }) => {
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const startTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 2500);
  };

  const resetTest = () => {
    setIsTesting(false);
    setCompleted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
              Pemeriksaan Defisit Piramidal / Hemiparesis
            </span>
            <span className="text-xs text-slate-500 font-mono">Pronator Drift Test</span>
          </div>
          <p className="text-xs text-slate-300">
            Instruksi: Pasien mengangkat kedua lengan lurus ke depan, telapak tangan menengadah (supinasi), mata tertutup
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {!isTesting ? (
            <button
              onClick={startTest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Mulai Uji Drift (Tutup Mata)</span>
            </button>
          ) : (
            <button
              onClick={resetTest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Uji</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-around px-8 select-none shadow-inner">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Realtime Status Alert - Top Bar */}
        <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
          {!isTesting && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-300 font-mono shadow-md">
              Kedua lengan terangkat simetris, telapak tangan supinasi penuh...
            </span>
          )}
          {isTesting && !completed && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono animate-pulse shadow-md">
              Mata tertutup: Pasien mempertahankan posisi selama 5 detik...
            </span>
          )}
          {completed && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold flex items-center gap-1.5 animate-pulse shadow-md">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Pronator Drift (+) Lengan Kanan Pronasi & Turun (Hemiparesis Dextra 3/5 - 4/5)!
            </span>
          )}
        </div>

        {/* Left Arm (Sinistra) - Normal 5/5, Steady */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono text-emerald-400 font-bold mb-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Lengan Kiri (Sinistra) • Normal 5/5</span>
          </div>

          <motion.div
            animate={{
              y: isTesting ? [-0.8, 0.8, -0.8] : 0,
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="armNormGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf9062" />
                  <stop offset="100%" stopColor="#e3a778" />
                </linearGradient>
              </defs>
              {/* Forearm */}
              <rect x="42" y="55" width="36" height="110" rx="8" fill="url(#armNormGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Supinated Palm facing up */}
              <ellipse cx="60" cy="50" rx="28" ry="18" fill="url(#armNormGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Fingers in full supination */}
              <circle cx="45" cy="40" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="55" cy="35" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="65" cy="35" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="75" cy="40" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="36" cy="52" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Supinasi Utuh (Stabil)
            </span>
          </motion.div>
        </div>

        {/* Center Comparison Divider */}
        <div className="h-48 w-px bg-slate-800 flex flex-col items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 font-mono">
            VS
          </div>
        </div>

        {/* Right Arm (Dextra) - Paretic 3/5 - 4/5, Pronates and Drifts Down */}
        <div className="flex flex-col items-center">
          <div className={`text-xs font-mono font-bold mb-2 flex items-center gap-1 ${
            completed ? 'text-rose-400' : 'text-slate-300'
          }`}>
            <span>Lengan Kanan (Dextra) • {completed ? 'Paresis 3/5 - 4/5' : 'Dievaluasi'}</span>
          </div>

          <motion.div
            animate={{
              y: isTesting ? [0, 15, 38, 55] : 0,
              rotate: isTesting ? [0, -18, -42, -65] : 0,
            }}
            transition={{
              duration: 2.4,
              ease: "easeOut",
            }}
            className="relative flex flex-col items-center"
          >
            <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="armPareGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf9062" />
                  <stop offset="100%" stopColor="#e3a778" />
                </linearGradient>
              </defs>
              {/* Forearm */}
              <rect x="42" y="55" width="36" height="110" rx="8" fill="url(#armPareGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Palm (Rotating towards pronation) */}
              <ellipse cx="60" cy="50" rx="28" ry="18" fill="url(#armPareGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Fingers */}
              <circle cx="45" cy="40" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="55" cy="35" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="65" cy="35" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="75" cy="40" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <circle cx="84" cy="52" r="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
            </svg>
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
              completed
                ? 'text-rose-400 bg-rose-500/20 border-rose-500/40 animate-pulse'
                : 'text-slate-400 bg-slate-800 border-slate-700'
            }`}>
              {completed ? 'Pronasi & Turun 15 cm' : 'Posisi Awal'}
            </span>
          </motion.div>
        </div>

        {/* Bottom Kinematic Gauge */}
        <div className="absolute bottom-2 left-4 right-4 h-10 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center px-4 justify-between text-xs font-mono">
          <span className="text-slate-400">Indikator Jalur Piramidal:</span>
          <span className={completed ? 'text-rose-400 font-bold' : 'text-slate-400'}>
            {completed
              ? 'Pronator Drift Positif (+) = Lesi Traktus Kortikospinalis Kontralateral (Stroke Vaskular)'
              : 'Menunggu hasil pengamatan uji supinasi-pronasi...'}
          </span>
        </div>
      </div>

      {/* Clinical Notes Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Korelasi Klinis Pronator Drift (Tanda Kunci Defisit Vaskular / Hemiparesis)
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Pada sindrom Parkinson sekunder akibat stroke lakunar vaskular (Vascular Parkinsonism), sering ditemukan tanda piramidal fokal yang asimetris. Uji <em>pronator drift</em> mengevaluasi kelemahan motorik halus: otot supinator lengan lebih lemah dibanding pronator saat jaras kortikospinalis terganggu, sehingga lengan yang paretic akan berputar ke arah dalam (pronasi) dan merosot jatuh ke bawah.
          </p>
        </div>
      </div>
    </div>
  );
};
