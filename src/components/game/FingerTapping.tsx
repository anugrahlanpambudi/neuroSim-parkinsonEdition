'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';
import { useCaseStore } from '../../store/caseStore';

interface FingerTappingProps {
  caseId?: number;
}

export const FingerTapping: React.FC<FingerTappingProps> = ({ caseId: propCaseId }) => {
  const storeCaseId = useCaseStore((s) => s.currentCaseId);
  const caseId = propCaseId || storeCaseId || 1;

  const [tapIndex, setTapIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Bradykinesia amplitude decrements:
  // Case 1 (Parkinson): Classic progressive decrement from 100% to 35% with slowing
  // Case 2 (Vascular): Upper limb is relatively spared (minimal decrement 100% -> 85%)
  // Case 4 (Post-encephalitic): Severe bradykinesia from the beginning (60% -> 25%)
  const getAmplitudes = () => {
    if (caseId === 2) return [1.0, 0.95, 0.92, 0.90, 0.88, 0.85];
    if (caseId === 4) return [0.65, 0.55, 0.45, 0.38, 0.30, 0.22];
    // Default Case 1 / Case 5
    return [1.0, 0.88, 0.74, 0.58, 0.44, 0.30];
  };

  const getDurations = () => {
    if (caseId === 2) return [200, 210, 220, 230, 235, 240];
    if (caseId === 4) return [380, 440, 500, 580, 650, 720];
    return [220, 270, 330, 400, 480, 580];
  };

  const amplitudes = getAmplitudes();
  const durations = getDurations();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isRunning && tapIndex < amplitudes.length) {
      timeout = setTimeout(() => {
        setTapIndex((prev) => prev + 1);
      }, durations[tapIndex] || 400);
    } else if (tapIndex >= amplitudes.length) {
      setIsRunning(false);
    }
    return () => clearTimeout(timeout);
  }, [isRunning, tapIndex, amplitudes.length, durations]);

  const startSequence = () => {
    setTapIndex(0);
    setIsRunning(true);
  };

  const currentAmp = tapIndex < amplitudes.length ? amplitudes[tapIndex] : amplitudes[amplitudes.length - 1];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Sub-bar */}
      <div className="w-full flex items-center justify-between mb-3">
        <span className="text-xs text-slate-300 font-semibold font-mono">
          MDS-UPDRS Butir 3.4: Uji Ketukan Jari Telunjuk-Ibu Jari
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={startSequence}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl shadow-md transition-all ${
              isRunning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? `Ketukan #${tapIndex + 1} / 6...` : 'Mulai Uji Ketukan (10 Detik)'}</span>
          </button>
          <button
            onClick={() => { setIsRunning(false); setTapIndex(0); }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner select-none">
        {/* Metric Overlay HUD */}
        <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
          <div className="text-[11px] px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-300 font-mono shadow-md">
            Ketukan: <strong className="text-teal-400">{Math.min(tapIndex, 6)}/6</strong>
          </div>
          <div className="text-[11px] px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-300 font-mono shadow-md">
            Amplitudo: <strong className={currentAmp < 0.5 ? 'text-rose-400' : 'text-amber-400'}>
              {Math.round(currentAmp * 100)}%
            </strong>
          </div>
          {currentAmp < 0.5 && isRunning && (
            <div className="text-[10px] px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono animate-pulse">
              Dekremen Amplitudo (Fatigue / Slowness)
            </div>
          )}
        </div>

        {/* Anatomical Vector Hand (Lateral / Oblique View) */}
        <div className="relative flex items-center justify-center">
          <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="fingerSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e3a778" />
                <stop offset="60%" stopColor="#cf9062" />
                <stop offset="100%" stopColor="#b37346" />
              </linearGradient>
              <linearGradient id="fingerNailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#edd4c2" />
                <stop offset="100%" stopColor="#faebe0" />
              </linearGradient>
            </defs>

            {/* Forearm & Wrist Anchor */}
            <path
              d="M 20 120 C 50 115 80 112 110 110 L 110 150 C 80 150 50 152 20 155 Z"
              fill="url(#fingerSkinGrad)"
              stroke="#965c36"
              strokeWidth="1.5"
            />

            {/* Hand Palm (Thenar & Hypothenar Masses) */}
            <path
              d="M 110 110 C 130 108 150 115 165 130 C 170 145 155 160 135 158 L 110 150 Z"
              fill="url(#fingerSkinGrad)"
              stroke="#965c36"
              strokeWidth="1.5"
            />

            {/* Curled Middle, Ring, Little Fingers (Fixed Base) */}
            <path
              d="M 155 135 C 170 138 185 142 195 152 C 190 162 175 160 160 152 Z"
              fill="#b37346"
              stroke="#965c36"
              strokeWidth="1.2"
            />
            <path
              d="M 148 142 C 160 146 172 150 180 158 C 175 165 162 163 150 156 Z"
              fill="#a26338"
              stroke="#965c36"
              strokeWidth="1.2"
            />

            {/* Lower Thumb Fixed Pad (Opposition Anchor) */}
            <g>
              <path
                d="M 130 115 C 145 110 165 105 185 112 C 195 116 195 125 185 128 C 168 132 150 125 135 122 Z"
                fill="url(#fingerSkinGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />
              {/* Thumb nail */}
              <ellipse cx="188" cy="118" rx="4" ry="2.5" fill="url(#fingerNailGrad)" stroke="#965c36" strokeWidth="0.6" />
              {/* Target Pad Ring on Thumb */}
              <circle cx="180" cy="114" r="5" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="2 2" />
            </g>

            {/* Dynamic Articulated Index Finger Tapping Up & Down */}
            <motion.g
              animate={{
                // Tap down towards (180, 114) thumb pad then swing wide up by amplitude
                rotate: isRunning ? [0, 32 * currentAmp, 0] : 0,
                y: isRunning ? [0, 18 * currentAmp, 0] : 0,
              }}
              transition={{
                duration: (durations[tapIndex] || 300) / 1000,
                ease: 'easeInOut',
              }}
              style={{ originX: '135px', originY: '110px' }}
            >
              {/* Index Metacarpal to Proximal Phalanx */}
              <path
                d="M 130 108 C 145 92 165 75 180 62 C 190 55 200 62 195 72 C 182 85 165 98 145 110 Z"
                fill="url(#fingerSkinGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />
              {/* Index Distal Phalanx & Tip */}
              <path
                d="M 180 62 C 190 54 204 46 215 48 C 222 50 220 58 212 65 C 202 72 192 78 185 75 Z"
                fill="url(#fingerSkinGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />
              {/* Index Fingernail */}
              <ellipse cx="215" cy="52" rx="4" ry="2.2" fill="url(#fingerNailGrad)" stroke="#965c36" strokeWidth="0.6" />
            </motion.g>
          </svg>
        </div>

        {/* Amplitude Decay Sequence Graph - Bottom Strip */}
        <div className="absolute bottom-2 left-4 right-4 h-12 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center px-4 gap-4 shadow-lg">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-teal-400 shrink-0">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Profil Ketukan:</span>
          </div>

          <div className="flex-1 flex items-end justify-between h-7 px-2">
            {amplitudes.map((amp, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 rounded-t transition-all duration-300 ${
                    i === tapIndex && isRunning
                      ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                      : i < tapIndex
                      ? 'bg-teal-500'
                      : 'bg-slate-800'
                  }`}
                  style={{ height: `${amp * 22}px` }}
                />
                <span className="text-[9px] font-mono text-slate-500">#{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 font-mono shrink-0">
            {caseId === 2 ? 'Amplitudo Lengan Relatif Stabil' : 'Fenomena Dekremen (+) Progressif'}
          </div>
        </div>
      </div>
    </div>
  );
};
