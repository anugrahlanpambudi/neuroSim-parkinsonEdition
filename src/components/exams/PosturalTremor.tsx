'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Activity, Zap, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useCaseStore } from '../../store/caseStore';

interface PosturalTremorProps {
  caseId?: number;
  onComplete?: () => void;
}

export const PosturalTremor: React.FC<PosturalTremorProps> = ({ caseId: propCaseId }) => {
  const storeCaseId = useCaseStore((s) => s.currentCaseId);
  const caseId = propCaseId || storeCaseId || 2;

  const isAsterixisCase = caseId === 3; // Case 3: Uremic Encephalopathy Asterixis
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
              {isAsterixisCase ? 'Evaluasi Flapping Tremor (Asterixis Metabolik)' : 'Evaluasi Tremor Postural Simetris'}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {isAsterixisCase ? 'Negative Myoclonus (1–2 Hz)' : 'Frekuensi Cepat 8–10 Hz'}
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {isAsterixisCase
              ? 'Instruksi: Pasien merentangkan kedua tangan ke depan dengan dorsofleksi pergelangan tangan dan jari-jari meregang'
              : 'Posisi: Kedua tangan merentang lurus ke depan melawan gravitasi tanpa jeda latensi'}
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all shadow-md shrink-0 self-start sm:self-auto ${
            isPlaying
              ? 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
              : 'bg-teal-600 hover:bg-teal-500 border-teal-500 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Jeda Simulasi' : 'Putar Simulasi'}</span>
        </button>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-around px-8 select-none shadow-inner">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Realtime Metrics HUD - Top Left */}
        <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-xs shadow-md">
          {isAsterixisCase ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="font-mono text-rose-300">
                Pola: <strong>Asterixis / Flapping Drop (Henti Tonus Ekstensor Mendadak)</strong>
              </span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span className="font-mono text-teal-300">
                Frekuensi: <strong>8–10 Hz</strong> (Fine Bilateral Postural Tremor)
              </span>
            </>
          )}
        </div>

        {/* Symmetry Badge - Top Right */}
        <div className="absolute top-3 right-4 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono shadow-md">
          <span>Karakteristik: <strong>{isAsterixisCase ? 'Bilateral Ensefalopati Uremik' : 'Simetris Tanpa Jeda Laten'}</strong></span>
        </div>

        {/* Left Hand Vector (Sinistra) */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono text-slate-300 mb-2 font-semibold">
            Tangan Kiri (Sinistra)
          </div>

          <motion.div
            animate={
              isPlaying
                ? isAsterixisCase
                  ? {
                      // Sudden downward drop (negative myoclonus) and quick snap back up
                      rotate: [0, -18, 0, 0, -22, 0, 0],
                      y: [0, 16, 0, 0, 20, 0, 0],
                    }
                  : {
                      y: [-1.8, 1.8, -1.2, 1.2, -1.8],
                      x: [-0.8, 0.8, -0.8],
                    }
                : { y: 0, x: 0, rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: isAsterixisCase ? 1.8 : 0.11, // Asterixis intermittent drop vs 9 Hz tremor
              ease: isAsterixisCase ? "easeInOut" : "linear",
            }}
            className="relative flex flex-col items-center"
          >
            <svg width="110" height="170" viewBox="0 0 110 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="handLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf9062" />
                  <stop offset="100%" stopColor="#e3a778" />
                </linearGradient>
              </defs>
              {/* Forearm */}
              <rect x="38" y="70" width="34" height="95" rx="8" fill="url(#handLeftGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Palm */}
              <ellipse cx="55" cy="58" rx="26" ry="18" fill="url(#handLeftGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Spread Outstretched Fingers */}
              <rect x="30" y="24" width="8" height="34" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <rect x="42" y="16" width="8" height="40" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <rect x="54" y="14" width="8" height="42" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <rect x="66" y="18" width="8" height="38" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              {/* Thumb Abducted */}
              <rect x="76" y="42" width="22" height="7" rx="3.5" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" transform="rotate(-25 76 42)" />
            </svg>
            <span className={`text-[10px] font-mono font-bold mt-1 px-2.5 py-0.5 rounded-full border ${
              isAsterixisCase ? 'text-rose-300 bg-rose-500/15 border-rose-500/30' : 'text-teal-300 bg-teal-500/15 border-teal-500/30'
            }`}>
              {isAsterixisCase ? 'Flapping Drop (+)' : 'Getaran Halus 9 Hz'}
            </span>
          </motion.div>
        </div>

        {/* Center Divider / Axis */}
        <div className="h-44 w-px bg-slate-800 flex flex-col items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 font-mono">
            VS
          </div>
        </div>

        {/* Right Hand Vector (Dextra) */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono text-slate-300 mb-2 font-semibold">
            Tangan Kanan (Dextra)
          </div>

          <motion.div
            animate={
              isPlaying
                ? isAsterixisCase
                  ? {
                      rotate: [0, -20, 0, 0, -16, 0, 0],
                      y: [0, 18, 0, 0, 14, 0, 0],
                    }
                  : {
                      y: [1.8, -1.8, 1.2, -1.2, 1.8],
                      x: [0.8, -0.8, 0.8],
                    }
                : { y: 0, x: 0, rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: isAsterixisCase ? 1.9 : 0.11,
              delay: isAsterixisCase ? 0.3 : 0, // Slight physiological asynchrony in asterixis
              ease: isAsterixisCase ? "easeInOut" : "linear",
            }}
            className="relative flex flex-col items-center"
          >
            <svg width="110" height="170" viewBox="0 0 110 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="handRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf9062" />
                  <stop offset="100%" stopColor="#e3a778" />
                </linearGradient>
              </defs>
              {/* Forearm */}
              <rect x="38" y="70" width="34" height="95" rx="8" fill="url(#handRightGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Palm */}
              <ellipse cx="55" cy="58" rx="26" ry="18" fill="url(#handRightGrad)" stroke="#965c36" strokeWidth="1.5" />
              {/* Spread Outstretched Fingers */}
              <rect x="30" y="24" width="8" height="34" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <rect x="42" y="16" width="8" height="40" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <rect x="54" y="14" width="8" height="42" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              <rect x="66" y="18" width="8" height="38" rx="4" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" />
              {/* Thumb Abducted (Opposite side for right hand) */}
              <rect x="12" y="42" width="22" height="7" rx="3.5" fill="#edd4c2" stroke="#965c36" strokeWidth="0.8" transform="rotate(25 12 42)" />
            </svg>
            <span className={`text-[10px] font-mono font-bold mt-1 px-2.5 py-0.5 rounded-full border ${
              isAsterixisCase ? 'text-rose-300 bg-rose-500/15 border-rose-500/30' : 'text-teal-300 bg-teal-500/15 border-teal-500/30'
            }`}>
              {isAsterixisCase ? 'Flapping Drop (+)' : 'Getaran Halus 9 Hz'}
            </span>
          </motion.div>
        </div>

        {/* Bottom Kinematic Ribbon */}
        <div className="absolute bottom-2 left-4 right-4 h-10 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center px-4 justify-between text-xs font-mono">
          <span className="text-slate-400">Analisis Gerak:</span>
          <span className={isAsterixisCase ? 'text-rose-400 font-bold' : 'text-teal-300'}>
            {isAsterixisCase
              ? 'Asterixis Positif (+) Terlihat Episode Negative Myoclonus Sesuai Ensefalopati Uremik Dekompensata'
              : 'Tremor Postural Simetris (+) Tanpa Periode Laten'}
          </span>
        </div>
      </div>

      {/* Clinical Notes Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            {isAsterixisCase ? 'Mekanisme Klinis Asterixis (Flapping Tremor):' : 'Karakteristik Tremor Postural:'}
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {isAsterixisCase ? (
              <>
                Asterixis <strong>bukanlah tremor sejati</strong> melainkan <em>negative myoclonus</em>, yaitu hilangnya tonus otot postural ekstensor pergelangan tangan secara intermiten dan involunter selama 50–200 milidetik, yang segera diikuti sentakan pemulihan cepat. Merupakan penanda ensefalopati metabolik berat (uremik, hepatik, atau hiperkapnia).
              </>
            ) : (
              <>
                Tremor postural dengan frekuensi cepat (8–10 Hz) yang muncul segera saat tangan diangkat melawan gravitasi tanpa adanya periode laten. Sering dijumpai sebagai <em>enhanced physiological tremor</em> sekunder akibat aktivasi simpatis, vaskulopati, atau efek medikasi.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
