'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Play, Zap, Move3d, Crosshair, Target, Info } from 'lucide-react';

interface HolmesTremorProps {
  onComplete?: () => void;
}

export const HolmesTremor: React.FC<HolmesTremorProps> = ({ onComplete }) => {
  const [activeMode, setActiveMode] = useState<'rest' | 'postural' | 'action'>('rest');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
              Evaluasi Holmes Tremor (Rubral / Midbrain Tremor)
            </span>
            <span className="text-xs text-slate-500 font-mono">Frekuensi Lambat 2–4 Hz</span>
          </div>
          <p className="text-xs text-slate-300">
            Karakteristik: Amplitudo Kasar/Besar (&gt;3 cm), Muncul saat Istirahat + Postural (Wing-Beating) + Intensi (Aksi)
          </p>
        </div>

        {/* 3 Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-0.5 rounded-xl border border-slate-700 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveMode('rest')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeMode === 'rest'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Resting
          </button>
          <button
            onClick={() => setActiveMode('postural')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeMode === 'postural'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Wing-Beating (Postural)
          </button>
          <button
            onClick={() => setActiveMode('action')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeMode === 'action'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Finger-Nose (Aksi)
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Realtime Metrics HUD - Top Left */}
        <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-xs text-teal-300 shadow-md">
          <Zap className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
          <span className="font-mono">
            Frekuensi: <strong className="text-white">3.2 Hz</strong> (Slow Low-Frequency Rhythm)
          </span>
        </div>

        {/* Amplitude Metric HUD - Top Right */}
        <div className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-mono shadow-md">
          <Move3d className="w-3.5 h-3.5" />
          <span>Amplitudo: <strong>Kasar / Sangat Besar (&gt;3.5 cm)</strong></span>
        </div>

        {/* Action Target for Finger-Nose Test */}
        {activeMode === 'action' && (
          <div className="absolute top-14 flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-mono animate-pulse z-20">
            <Target className="w-3.5 h-3.5" />
            <span>Target Hidung Pemeriksa: Tremor Semakin Kasar Saat Mendekati Target (Intention Dysmetria)!</span>
          </div>
        )}

        {/* Anatomical Vector Limb Oscillation */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={
              activeMode === 'rest'
                ? {
                    x: [-16, 16, -12, 14, -16],
                    y: [-10, 10, -8, 8, -10],
                    rotate: [-6, 7, -5, 6, -6],
                  }
                : activeMode === 'postural'
                ? {
                    // Wing-beating coarse vertical/horizontal flap
                    x: [-28, 28, -20, 24, -28],
                    y: [-22, 22, -18, 20, -22],
                    rotate: [-14, 15, -10, 12, -14],
                  }
                : {
                    // Action intention explosion
                    x: [-38, 36, -30, 32, -38],
                    y: [-28, 30, -24, 26, -28],
                    rotate: [-18, 20, -15, 17, -18],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 0.33, // ~3.1 Hz
              ease: 'easeInOut',
            }}
            className="relative flex flex-col items-center"
          >
            <svg width="180" height="190" viewBox="0 0 180 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="holmesSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf9062" />
                  <stop offset="100%" stopColor="#e3a778" />
                </linearGradient>
              </defs>

              {/* Forearm */}
              <rect x="70" y="80" width="40" height="100" rx="10" fill="url(#holmesSkinGrad)" stroke="#965c36" strokeWidth="1.5" />

              {/* Palm */}
              <ellipse cx="90" cy="65" rx="34" ry="24" fill="url(#holmesSkinGrad)" stroke="#965c36" strokeWidth="1.5" />

              {/* Extended Index Finger for Finger-Nose */}
              <rect x="85" y="15" width="12" height="50" rx="6" fill="#edd4c2" stroke="#965c36" strokeWidth="1" />
              <ellipse cx="91" cy="22" rx="3" ry="2" fill="#fff" opacity="0.6" />

              {/* Other Curled Fingers */}
              <rect x="100" y="30" width="10" height="35" rx="5" fill="#cf9062" stroke="#965c36" strokeWidth="1" />
              <rect x="112" y="38" width="10" height="30" rx="5" fill="#cf9062" stroke="#965c36" strokeWidth="1" />
              <rect x="68" y="45" width="18" height="10" rx="5" fill="#cf9062" stroke="#965c36" strokeWidth="1" transform="rotate(-30 68 45)" />

              {/* Intention Vector Rings */}
              {activeMode === 'action' && (
                <circle cx="91" cy="18" r="12" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" fill="none" className="animate-ping" />
              )}
            </svg>
            <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-500/20 px-3 py-0.5 rounded-full border border-rose-500/40 -mt-2 shadow-md">
              Amplitudo Kasar 3.5 cm ({activeMode.toUpperCase()})
            </span>
          </motion.div>
        </div>

        {/* Realtime Waveform Strip - Bottom */}
        <div className="absolute bottom-2 left-4 right-4 h-12 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center px-4 gap-3 shadow-lg">
          <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px] shrink-0">
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Gelombang Lambat & Luas:</span>
          </div>

          <div className="flex-1 flex items-center justify-around h-7 overflow-hidden">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [6, 26, 10, 28, 6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.65,
                  delay: (i % 5) * 0.12,
                }}
                className="w-1.5 bg-gradient-to-t from-rose-600 to-amber-500 rounded-full"
              />
            ))}
          </div>

          <div className="text-[10px] text-rose-300 font-mono shrink-0 font-bold">
            3.2 Hz • 420 µV (High Energy)
          </div>
        </div>
      </div>

      {/* Clinical Notes Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Patofisiologi Holmes Tremor (Lesi Jaras Dentato-Rubro-Talamo-Kortikal):
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Holmes tremor (rubral tremor) memiliki trias unik: kombinasi tremor istirahat, postural (wing-beating), dan intensi dengan amplitudo sangat kasar dan frekuensi lambat (&lt;4.5 Hz). Berbeda dengan tremor fisiologis maupun tremor esensial murni, sering dikaitkan dengan lesi batang otak (mesensefalon), jaras rubro-olivari, atau bentuk atipikal pada onset juvenile seperti Wilson disease.
          </p>
        </div>
      </div>
    </div>
  );
};
