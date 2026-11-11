'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, ShieldCheck, Activity, Info } from 'lucide-react';

interface ArmDropTestProps {
  onComplete?: () => void;
}

export const ArmDropTest: React.FC<ArmDropTestProps> = ({ onComplete }) => {
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const startDrop = () => {
    setIsDropping(true);
    setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 1800);
  };

  const reset = () => {
    setIsDropping(false);
    setCompleted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
              Uji Jatuh Lengan Pasif (Arm Drop Test)
            </span>
            <span className="text-xs text-slate-500 font-mono">Evaluasi Lateralisasi / Paresis Pasien Koma</span>
          </div>
          <p className="text-xs text-slate-300">
            Dokter mengangkat kedua lengan pasien 30 cm di atas kasur periksa, lalu melepaskannya secara serempak
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {!isDropping ? (
            <button
              onClick={startDrop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Lepaskan Kedua Lengan (Drop)</span>
            </button>
          ) : (
            <button
              onClick={reset}
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

        {/* Hospital Examination Mattress */}
        <div className="absolute bottom-6 left-12 right-12 h-16 bg-slate-850 rounded-2xl border-t-2 border-slate-700 shadow-2xl flex items-center justify-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
            Kasur Ranap Neurologi (Permukaan Pendaratan Pasif)
          </span>
        </div>

        {/* Realtime Status HUD - Top Bar */}
        <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
          {!isDropping && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-300 font-mono shadow-md">
              Kedua lengan disangga dokter pada ketinggian 30 cm di atas kasur...
            </span>
          )}
          {isDropping && !completed && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono animate-pulse shadow-md">
              Dilepaskan serempak... Mengamati akselerasi gravitasi dan lateralisasi...
            </span>
          )}
          {completed && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Jatuh Simetris Bersamaan: Tanpa Lateralisasi Piramidal (Koma / Flaksid Metabolik)
            </span>
          )}
        </div>

        {/* Left Arm Vector (Sinistra) */}
        <div className="flex flex-col items-center z-10">
          <div className="text-xs font-mono text-slate-300 mb-2 font-semibold">
            Lengan Kiri (Sinistra)
          </div>

          <motion.div
            animate={
              isDropping
                ? {
                    y: [0, 68, 62, 65],
                    rotate: [0, 4, 2, 3],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.65, ease: 'easeIn' }}
            className="relative flex flex-col items-center"
          >
            <svg width="100" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="armDropLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf9062" />
                  <stop offset="100%" stopColor="#e3a778" />
                </linearGradient>
              </defs>
              <rect x="35" y="30" width="30" height="90" rx="8" fill="url(#armDropLeftGrad)" stroke="#965c36" strokeWidth="1.5" />
              <ellipse cx="50" cy="25" rx="18" ry="12" fill="url(#armDropLeftGrad)" stroke="#965c36" strokeWidth="1.2" />
              <circle cx="50" cy="18" r="3.5" fill="#edd4c2" />
            </svg>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-800 -mt-2">
              Jatuh Pasif (Simetris)
            </span>
          </motion.div>
        </div>

        {/* Center Divider / Axis */}
        <div className="h-44 w-px bg-slate-800 flex flex-col items-center justify-center z-10">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 font-mono">
            VS
          </div>
        </div>

        {/* Right Arm Vector (Dextra) */}
        <div className="flex flex-col items-center z-10">
          <div className="text-xs font-mono text-slate-300 mb-2 font-semibold">
            Lengan Kanan (Dextra)
          </div>

          <motion.div
            animate={
              isDropping
                ? {
                    y: [0, 68, 62, 65],
                    rotate: [0, -4, -2, -3],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.65, ease: 'easeIn' }}
            className="relative flex flex-col items-center"
          >
            <svg width="100" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="armDropRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf9062" />
                  <stop offset="100%" stopColor="#e3a778" />
                </linearGradient>
              </defs>
              <rect x="35" y="30" width="30" height="90" rx="8" fill="url(#armDropRightGrad)" stroke="#965c36" strokeWidth="1.5" />
              <ellipse cx="50" cy="25" rx="18" ry="12" fill="url(#armDropRightGrad)" stroke="#965c36" strokeWidth="1.2" />
              <circle cx="50" cy="18" r="3.5" fill="#edd4c2" />
            </svg>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-800 -mt-2">
              Jatuh Pasif (Simetris)
            </span>
          </motion.div>
        </div>

        {/* Bottom Kinematic Gauge */}
        <div className="absolute bottom-2 left-4 right-4 h-10 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center px-4 justify-between text-xs font-mono">
          <span className="text-slate-400">Kesimpulan Uji Jatuh Bebas:</span>
          <span className="text-emerald-400 font-semibold">
            {completed
              ? 'Sinkron Sempurna: Menyingkirkan Stroke Infark / Hemiparesis Struktural Akut'
              : 'Menunggu pelepasan kedua lengan...'}
          </span>
        </div>
      </div>

      {/* Clinical Notes Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Korelasi Klinis Arm Drop Test pada Pasien Somnolen / Koma:
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Pada pasien dengan penurunan kesadaran (GCS somnolen), arm drop test sangat berguna untuk membedakan <strong>ensefalopati metabolik difus</strong> (seperti uremia pada Case 3) dari <strong>stroke fokal struktural</strong>. Pada ensefalopati metabolik, kedua lengan jatuh bersamaan secara pasif dengan kecepatan yang sama (tanpa lateralisasi). Sebaliknya, pada hemiparesis akut, lengan yang lumpuh jatuh lebih cepat dan lemas dibanding sisi sehat.
          </p>
        </div>
      </div>
    </div>
  );
};
