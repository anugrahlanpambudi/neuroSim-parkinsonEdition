'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Clock, AlertCircle, CheckCircle2, Activity, Info } from 'lucide-react';

export const ReemergentTremor: React.FC = () => {
  // States: 'idle' | 'holding' (latency ~2500ms) | 'tremor'
  const [phase, setPhase] = useState<'idle' | 'holding' | 'tremor'>('idle');
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  const startTest = () => {
    setPhase('holding');
    setElapsedMs(0);
  };

  const resetTest = () => {
    setPhase('idle');
    setElapsedMs(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    if (phase === 'holding') {
      const stepMs = 50;
      const totalMs = 2400; // 2.4s latency period
      interval = setInterval(() => {
        setElapsedMs((prev) => prev + stepMs);
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

  const latencySeconds = (elapsedMs / 1000).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
              Evaluasi Re-Emergent Tremor (Uji Postural Berjeda)
            </span>
            <span className="text-xs text-slate-500 font-mono">Sensitivitas Diagnostik Tinggi</span>
          </div>
          <p className="text-xs text-slate-300">
            Instruksi: Pasien mengangkat dan merentangkan kedua lengan horizontal melawan gravitasi
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {phase === 'idle' ? (
            <button
              onClick={startTest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Instruksikan Pasien Rentangkan Tangan</span>
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

      {/* Main Simulation Area */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center select-none shadow-inner">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Latency Timer HUD - Top Bar */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-xs shadow-md">
            <Clock className={`w-3.5 h-3.5 ${phase === 'holding' ? 'text-amber-400 animate-spin' : 'text-teal-400'}`} />
            <span className="font-mono text-slate-300">
              {phase === 'idle' && 'Posisi lengan rileks. Klik tombol di atas untuk menguji.'}
              {phase === 'holding' && `Periode Laten: ${latencySeconds}s (Tangan stabil tanpa getaran...)`}
              {phase === 'tremor' && 'Periode Laten Selesai (2.4s): Tremor 4.8 Hz Re-emerges!'}
            </span>
          </div>

          {phase === 'holding' && (
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-amber-500/30">
              <span className="text-[11px] font-mono text-amber-300">Menghitung Jeda:</span>
              <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className="bg-amber-400 h-full transition-all duration-75"
                  style={{ width: `${Math.min((elapsedMs / 2400) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {phase === 'tremor' && (
            <div className="flex items-center gap-1.5 text-rose-300 text-xs font-mono font-bold bg-rose-500/20 px-3 py-1.5 rounded-xl border border-rose-500/40 animate-pulse shadow-md">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Re-Emergent Tremor (+) 4.8 Hz</span>
            </div>
          )}
        </div>

        {/* Anatomically Rendered Outstretched Arm with Latency / Tremor Kinematics */}
        <div className="relative flex items-center justify-center w-full mt-3">
          {/* Patient Shoulder Profile */}
          <div className="absolute -left-4 w-28 h-48 bg-gradient-to-r from-slate-900 to-slate-850 rounded-r-3xl border-r border-slate-750 shadow-2xl flex items-center justify-center">
            <span className="text-[10px] text-slate-500 uppercase font-mono -rotate-90 tracking-widest">
              Bahu Pasien
            </span>
          </div>

          {/* Outstretched Forearm & Hand Vector */}
          <motion.div
            animate={
              phase === 'tremor'
                ? {
                    y: [-4, 4, -3, 3, -4],
                    rotate: [-1.8, 1.8, -1.2, 1.5, -1.8],
                  }
                : phase === 'holding'
                ? {
                    y: [-0.4, 0.4, -0.4],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: phase === 'tremor' ? 0.21 : 1.5, // 4.8 Hz tremor vs steady breathing holding
              ease: 'easeInOut',
            }}
            className="relative flex items-center ml-20"
          >
            <svg width="340" height="120" viewBox="0 0 340 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="armSkinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c78657" />
                  <stop offset="50%" stopColor="#e3a778" />
                  <stop offset="100%" stopColor="#cf9062" />
                </linearGradient>
                <linearGradient id="sleeveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <linearGradient id="nailGradH" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#edd4c2" />
                  <stop offset="100%" stopColor="#faebe0" />
                </linearGradient>
              </defs>

              {/* Sleeve */}
              <path
                d="M 10 40 L 45 42 L 45 78 L 10 80 Z"
                fill="url(#sleeveGrad)"
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Forearm (Radius / Ulna) */}
              <path
                d="M 45 42 C 70 43 120 45 180 47 C 190 47 195 49 205 52 L 205 70 C 195 72 190 73 180 74 C 120 75 70 77 45 78 Z"
                fill="url(#armSkinGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />
              {/* Radial Styloid Process */}
              <circle cx="202" cy="51" r="3" fill="#b37346" opacity="0.4" />
              <circle cx="202" cy="71" r="3" fill="#b37346" opacity="0.4" />

              {/* Extended Hand & Outstretched Fingers in Supination/Mid-pronation */}
              <path
                d="M 205 52 C 215 50 230 48 245 48 L 295 48 C 302 48 308 51 305 56 C 302 60 295 60 288 60 L 250 60 C 248 64 252 66 265 66 L 290 66 C 296 66 300 68 298 72 C 295 75 288 75 280 75 L 245 75 C 235 75 220 73 205 70 Z"
                fill="url(#armSkinGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />

              {/* Fingernail accent */}
              <ellipse cx="298" cy="52" rx="3.5" ry="2" fill="url(#nailGradH)" stroke="#965c36" strokeWidth="0.6" />
              <ellipse cx="292" cy="69" rx="3.5" ry="2" fill="url(#nailGradH)" stroke="#965c36" strokeWidth="0.6" />

              {/* Thumb extending upward */}
              <path
                d="M 215 51 C 218 42 225 36 235 34 C 240 33 244 36 242 40 C 239 45 232 48 226 50 Z"
                fill="url(#armSkinGrad)"
                stroke="#965c36"
                strokeWidth="1.2"
              />
              <ellipse cx="237" cy="36" rx="2.5" ry="1.5" fill="url(#nailGradH)" stroke="#965c36" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </div>

        {/* Phase Indicator Footer */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs px-3.5 py-2 bg-slate-950/90 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">Kriteria Diagnostik:</span>
            {phase === 'tremor' ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Terbukti Periode Laten 2.4 Detik = Patognomonik Parkinson (Menyingkirkan Essential Tremor)</span>
              </span>
            ) : phase === 'holding' ? (
              <span className="text-amber-400 font-mono">
                Pasien mempertahankan posisi... mengamati ada/tidaknya jeda latensi...
              </span>
            ) : (
              <span className="text-slate-400">
                Tekan tombol untuk memulai pengujian jeda postural.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Clinical Correlation Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Mekanisme Neurofisiologis Re-emergent Tremor:
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Pada penyakit Parkinson, saat pasien merentangkan tangan, aktivitas postural motor kortikal sempat menekan osilator subkortikal basal ganglia sehingga tremor berhenti sesaat. Namun, setelah periode laten 2–5 detik, sirkuit talamokortikal kembali tersinkronisasi dan tremor muncul kembali dengan frekuensi identik resting tremor (4–6 Hz). Pada <em>Essential Tremor</em>, getaran muncul seketika tanpa ada masa laten (0 detik).
          </p>
        </div>
      </div>
    </div>
  );
};
