'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Play, Pause, Zap } from 'lucide-react';

export const RestingTremor: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-inner">
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Pemeriksaan Resting Tremor</span>
          <p className="text-xs text-slate-400">Posisi: Tangan diletakkan rileks di atas paha (Resting state, 4-6 Hz)</p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Jeda Simulasi' : 'Putar Simulasi'}</span>
        </button>
      </div>

      {/* Visual Stage */}
      <div className="relative w-full h-72 bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Background Grid & Medical ECG / Frequency waveform */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Realtime Frequency Wave indicator */}
        <div className="absolute top-3 left-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-teal-500/30 text-[11px] text-teal-300">
          <Zap className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span>Frekuensi: <strong>4.8 Hz</strong> (Pill-Rolling)</span>
        </div>

        {/* Patient Thigh / Lap Representation */}
        <div className="absolute bottom-4 w-72 h-36 bg-blue-950/60 rounded-t-3xl border-t-2 border-slate-700/40 flex items-center justify-center">
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Paha Pasien (Rileks)</span>
        </div>

        {/* Resting Tremor Motion Container */}
        {isPlaying ? (
          <motion.div
            animate={{ x: [-3, 3], rotate: [-1, 1] }}
            transition={{ repeat: Infinity, duration: 0.18, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center cursor-pointer select-none"
          >
            {/* Hand & Forearm Illustration */}
            <div className="relative">
              {/* Forearm */}
              <div className="w-16 h-28 bg-gradient-to-b from-amber-200/90 to-amber-300/80 rounded-t-xl mx-auto shadow-md border border-amber-400/20" />
              
              {/* Hand Palm */}
              <div className="relative w-28 h-24 bg-gradient-to-b from-amber-300/90 to-amber-200/90 rounded-2xl -mt-2 shadow-xl border border-amber-400/30 flex items-center justify-center">
                {/* Thumb pill-rolling motion */}
                <motion.div
                  animate={{ x: [0, 4, -2, 0], y: [0, -3, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.18, ease: "easeInOut" }}
                  className="absolute -left-3 top-6 w-8 h-14 bg-amber-300/90 rounded-full border border-amber-400/40 shadow-sm"
                  title="Ibu jari (Pill-rolling motion)"
                />
                
                {/* Fingers (Index & Middle curling around thumb) */}
                <motion.div
                  animate={{ x: [0, -3, 2, 0], y: [0, 2, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.18, ease: "easeInOut" }}
                  className="absolute -right-2 top-2 flex flex-col gap-1.5"
                >
                  <div className="w-12 h-4 bg-amber-300 rounded-full border border-amber-400/30" />
                  <div className="w-14 h-4 bg-amber-300 rounded-full border border-amber-400/30" />
                  <div className="w-13 h-4 bg-amber-300 rounded-full border border-amber-400/30" />
                  <div className="w-10 h-3.5 bg-amber-300 rounded-full border border-amber-400/30" />
                </motion.div>

                {/* Pill-rolling symbolic visual helper */}
                <div className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-[10px] text-amber-300 font-mono">
                  Pill-Rolling
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-28 bg-amber-200/90 rounded-t-xl mx-auto border border-amber-400/20" />
            <div className="relative w-28 h-24 bg-amber-300/90 rounded-2xl -mt-2 shadow-md border border-amber-400/30 flex items-center justify-center">
              <span className="text-[10px] text-slate-600 font-mono">TERJEDA</span>
            </div>
          </div>
        )}

        {/* Live Tremor Oscillogram graph */}
        <div className="absolute bottom-2 left-4 right-4 h-10 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center px-3 gap-2">
          <Activity className="w-4 h-4 text-teal-400 shrink-0" />
          <div className="flex-1 flex items-center justify-around h-6 overflow-hidden">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [4, 18, 6, 22, 4] } : { height: 4 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.35,
                  delay: (i % 6) * 0.05,
                  ease: "easeInOut",
                }}
                className="w-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full"
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-teal-300 shrink-0">4.8 Hz Sinusoidal</span>
        </div>
      </div>

      {/* Clinical Interpretation Note */}
      <div className="w-full mt-3 p-3 bg-teal-950/30 border border-teal-500/20 rounded-xl text-xs text-slate-300 leading-relaxed">
        <strong className="text-teal-300">Temuan Resting Tremor:</strong> Tremor kasar (frekuensi 4-6 Hz) tampak jelas saat tangan istirahat di atas paha. Memiliki karakteristik klasik <em>&quot;pill-rolling tremor&quot;</em> yang asimetris (dominan tangan kiri).
      </div>
    </div>
  );
};
