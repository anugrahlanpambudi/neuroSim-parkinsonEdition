'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FingerTapping } from './FingerTapping';
import { Footprints, Hand, CheckCircle2, Play, RotateCcw, AlertCircle, Info } from 'lucide-react';
import { useCaseStore } from '../../store/caseStore';

interface AkinesiaTestProps {
  caseId?: number;
}

export const AkinesiaTest: React.FC<AkinesiaTestProps> = ({ caseId: propCaseId }) => {
  const storeCaseId = useCaseStore((s) => s.currentCaseId);
  const caseId = propCaseId || storeCaseId || 1;

  const [activeTab, setActiveTab] = useState<'finger' | 'toe'>('finger');
  const [toeTapIndex, setToeTapIndex] = useState<number>(0);
  const [toeRunning, setToeRunning] = useState<boolean>(false);

  // Toe tapping amplitudes and slowing durations
  const toeDurations = caseId === 2
    ? [240, 310, 420, 560, 720] // Severe lower body bradykinesia in vascular parkinsonism
    : [260, 320, 400, 500, 620];
  const toeAmplitudes = caseId === 2
    ? [1.0, 0.75, 0.52, 0.35, 0.20] // Marked decrement in lower body
    : [1.0, 0.85, 0.70, 0.55, 0.40];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (toeRunning && toeTapIndex < toeAmplitudes.length) {
      timeout = setTimeout(() => {
        setToeTapIndex((prev) => prev + 1);
      }, toeDurations[toeTapIndex] || 500);
    } else if (toeTapIndex >= toeAmplitudes.length) {
      setToeRunning(false);
    }
    return () => clearTimeout(timeout);
  }, [toeRunning, toeTapIndex, toeAmplitudes.length, toeDurations]);

  const startToeTap = () => {
    setToeTapIndex(0);
    setToeRunning(true);
  };

  return (
    <div className="flex flex-col p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
              Evaluasi Bradikinesia / Akinesia
            </span>
            <span className="text-xs text-slate-500 font-mono">Syarat Mutlak Sindrom Parkinson</span>
          </div>
          <p className="text-xs text-slate-300">
            Evaluasi perlambatan kecepatan (slowness) dan penyusutan amplitudo progresif pada gerakan berulang
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('finger')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
              activeTab === 'finger' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>Finger Tapping (Jari)</span>
          </button>
          <button
            onClick={() => setActiveTab('toe')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
              activeTab === 'toe' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Toe Tapping (Ujung Kaki)</span>
          </button>
        </div>
      </div>

      {activeTab === 'finger' ? (
        <FingerTapping caseId={caseId} />
      ) : (
        <div className="flex flex-col items-center w-full">
          {/* Sub-bar */}
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs text-slate-300 font-semibold font-mono">
              MDS-UPDRS Butir 3.7: Uji Ketukan Ujung Kaki (Heel Planted, Forefoot Tap)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={startToeTap}
                disabled={toeRunning}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl shadow-md transition-all ${
                  toeRunning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{toeRunning ? `Ketukan #${toeTapIndex + 1}...` : 'Mulai Toe Tapping'}</span>
              </button>
              <button
                onClick={() => { setToeRunning(false); setToeTapIndex(0); }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Visual Foot Canvas */}
          <div className="relative w-full h-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner select-none">
            {/* Examination Floor */}
            <div className="absolute bottom-12 left-10 right-10 h-1.5 bg-slate-750 rounded-full" />
            <div className="absolute bottom-4 left-10 text-[10px] text-slate-500 font-mono tracking-wider uppercase">
              Permukaan Lantai Poli Saraf (Tumit Tetap Menempel di Lantai)
            </div>

            {/* Metric overlay */}
            <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
              <span className="text-xs px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-300 font-mono shadow-md">
                Ketukan: <strong className="text-teal-400">{Math.min(toeTapIndex, 5)}/5</strong>
              </span>
              <span className="text-xs px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-300 font-mono shadow-md">
                Amplitudo: <strong className="text-amber-400">{Math.round((toeAmplitudes[toeTapIndex] || 0.4) * 100)}%</strong>
              </span>
            </div>

            {/* Anatomical Lower Leg & Foot Vector */}
            <div className="relative flex items-end ml-16 mb-2">
              <svg width="260" height="180" viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="legSkinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c78657" />
                    <stop offset="50%" stopColor="#e3a778" />
                    <stop offset="100%" stopColor="#cf9062" />
                  </linearGradient>
                  <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Lower Leg (Tibia / Fibula in Trouser) */}
                <path
                  d="M 50 10 L 85 12 L 80 115 L 45 115 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                {/* Ankle joint & Achilles tendon */}
                <path
                  d="M 45 115 C 42 125 45 135 48 140 L 78 140 C 82 135 83 125 80 115 Z"
                  fill="url(#legSkinGrad)"
                  stroke="#965c36"
                  strokeWidth="1.2"
                />

                {/* Heel (Firmly planted at bottom anchor: x=48, y=145) */}
                <circle cx="58" cy="148" r="14" fill="url(#shoeGrad)" stroke="#64748b" strokeWidth="1.2" />

                {/* Dynamic Rotating Forefoot / Shoe Sole (Tapping upwards around heel anchor) */}
                <motion.g
                  animate={{
                    rotate: toeRunning ? [0, -26 * (toeAmplitudes[toeTapIndex] || 0.4), 0] : 0,
                  }}
                  transition={{
                    duration: (toeDurations[toeTapIndex] || 400) / 1000,
                    ease: "easeInOut",
                  }}
                  style={{ originX: '58px', originY: '148px' }}
                >
                  {/* Foot / Shoe */}
                  <path
                    d="M 58 140 C 90 138 140 138 185 142 C 195 143 205 146 205 153 C 205 158 195 160 180 160 L 58 160 Z"
                    fill="url(#shoeGrad)"
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  {/* Shoe sole */}
                  <rect x="58" y="156" width="146" height="5" rx="2" fill="#e2e8f0" opacity="0.9" />
                  <text x="110" y="152" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    TAP
                  </text>
                </motion.g>
              </svg>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="absolute bottom-2 left-4 right-4 h-10 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center px-4 justify-between text-xs font-mono">
              <span className="text-slate-400">Pola Gerakan Tungkai:</span>
              <span className="text-teal-300 font-semibold">
                {caseId === 2
                  ? 'Lower Body Bradykinesia: Perlambatan nyata pada tungkai (Shuffling / Magnetic)'
                  : 'Bradikinesia Tungkai (+) Penurunan amplitudo bertahap'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Clinical Finding Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Tanda Kardinal Utama: Bradikinesia (Kriteria Mutlak Sindrom Parkinson)
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Diagnosis sindrom Parkinson <strong>mewajibkan adanya bradikinesia</strong> yang ditandai oleh <em>fatigue</em> dan <em>decrement</em> progresif (gerakan makin lama makin mengecil dan melambat) saat melakukan gerakan repetitif teratur seperti mengetukkan jari tangan (finger tapping), membuka-menutup tangan, atau mengetukkan kaki (toe tapping).
          </p>
        </div>
      </div>
    </div>
  );
};
