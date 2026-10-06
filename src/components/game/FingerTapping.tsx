'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';

export const FingerTapping: React.FC = () => {
  const [tapIndex, setTapIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Amplitudes decreasing from 1.0 to 0.5 in 6 taps as specified in prompt:
  // [1.0, 0.9, 0.8, 0.7, 0.6, 0.5]
  const amplitudes = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5];
  // Speeds progressively slowing down (higher interval)
  const durations = [220, 260, 310, 370, 440, 520];

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
  }, [isRunning, tapIndex]);

  const startSequence = () => {
    setTapIndex(0);
    setIsRunning(true);
  };

  const currentAmp = tapIndex < amplitudes.length ? amplitudes[tapIndex] : amplitudes[amplitudes.length - 1];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-3">
        <span className="text-xs text-slate-300 font-semibold">Uji Ketukan Jari (MDS-UPDRS Finger Tapping)</span>
        <div className="flex items-center gap-2">
          <button
            onClick={startSequence}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg shadow transition-all ${
              isRunning ? 'bg-slate-700 text-slate-400' : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? `Ketukan #${tapIndex + 1}...` : 'Mulai Tes Ketukan'}</span>
          </button>
          <button
            onClick={() => { setIsRunning(false); setTapIndex(0); }}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Metric overlay */}
        <div className="absolute top-2.5 left-3 flex items-center gap-2">
          <div className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
            Ketukan: <strong className="text-teal-400">{Math.min(tapIndex, 6)}/6</strong>
          </div>
          <div className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
            Amplitudo: <strong className="text-amber-400">{Math.round(currentAmp * 100)}%</strong>
          </div>
        </div>

        {/* Hand Illustration with Animated Tapping Thumb & Index */}
        <div className="relative flex items-center justify-center">
          {/* Palm Base */}
          <div className="relative w-28 h-28 bg-gradient-to-tr from-amber-300 to-amber-200 rounded-3xl border border-amber-400/40 shadow-xl flex items-center justify-center">
            {/* Thumb - fixed lower anchor */}
            <div className="absolute -left-4 bottom-2 w-10 h-16 bg-amber-300 rounded-full border border-amber-400/50 shadow-sm" />

            {/* Index Finger - Animated tapping against thumb */}
            <motion.div
              animate={{
                // Tap down towards thumb then open back to amplitude height
                y: isRunning ? [0, 24 * currentAmp, 0] : 0,
                rotate: isRunning ? [0, -18 * currentAmp, 0] : 0,
              }}
              transition={{
                duration: (durations[tapIndex] || 300) / 1000,
                ease: "easeInOut",
              }}
              className="absolute -top-12 left-4 w-7 h-20 bg-amber-200 rounded-full border border-amber-400/50 shadow-md origin-bottom flex items-center justify-center"
            >
              <div className="w-4 h-2 bg-amber-300 rounded-full" />
            </motion.div>

            {/* Middle, Ring, Little fingers curled */}
            <div className="absolute -top-6 right-6 w-6 h-12 bg-amber-300/80 rounded-full border border-amber-400/30" />
            <div className="absolute -top-3 right-1 w-6 h-10 bg-amber-300/80 rounded-full border border-amber-400/30" />
            
            <div className="text-[10px] text-amber-900/70 font-mono">Tangan Kiri</div>
          </div>
        </div>

        {/* Amplitude graph bar tracker */}
        <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Penurunan Amplitudo (Fatigue Effect):</span>
          </div>
          <div className="flex items-center gap-2">
            {amplitudes.map((amp, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`w-3 rounded-t-sm transition-all duration-200 ${
                    i < tapIndex ? 'bg-amber-400' : 'bg-slate-700'
                  }`}
                  style={{ height: `${amp * 20}px` }}
                />
                <span className="text-[9px] font-mono text-slate-400">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
