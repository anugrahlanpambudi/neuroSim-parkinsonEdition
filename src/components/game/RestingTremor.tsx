'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Play, Pause, Zap, Info, ShieldCheck } from 'lucide-react';

export const RestingTremor: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
              Evaluasi Tremor Istirahat (Resting Tremor)
            </span>
            <span className="text-xs text-slate-500 font-mono">Frekuensi 4–6 Hz</span>
          </div>
          <p className="text-xs text-slate-300">
            Posisi: Lengan bawah dan tangan diletakkan rileks di atas paha pasien tanpa aktivitas volunter
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all shadow-md shrink-0 self-start sm:self-auto ${
            isPlaying
              ? 'bg-slate-800 hover:bg-slate-750 border-slate-750 text-slate-200'
              : 'bg-teal-600 hover:bg-teal-500 border-teal-500 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Jeda Simulasi' : 'Mulai Simulasi'}</span>
        </button>
      </div>

      {/* Visual Simulation Canvas */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
        {/* Subtle Medical Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Live Accelerometer Frequency Badge */}
        <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-teal-500/30 text-xs text-teal-300 shadow-md">
          <Zap className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span className="font-mono">
            Frekuensi: <strong className="text-white">4.8 Hz</strong> (Pill-Rolling Rhythm)
          </span>
        </div>

        {/* Clinical Sign Badge */}
        <div className="absolute top-3 right-4 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono shadow-md">
          <span>Karakteristik: <strong>Asimetris (Kiri &gt; Kanan)</strong></span>
        </div>

        {/* Examination Surface (Patient's Lap / Bed Couch) */}
        <div className="absolute bottom-6 w-96 h-28 bg-gradient-to-t from-slate-900 to-slate-850 rounded-t-3xl border-t border-slate-750/80 shadow-2xl flex items-end justify-center pb-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
            Permukaan Paha Pasien (Posisi Istirahat Total)
          </span>
        </div>

        {/* Anatomically Crafted Vector Hand with Pill-Rolling Animation */}
        <motion.div
          animate={isPlaying ? {
            x: [-2.5, 2.5, -1.8, 2.0, -2.5],
            y: [-1.2, 1.2, -0.8, 1.0, -1.2],
            rotate: [-1.8, 1.8, -1.2, 1.5, -1.8],
          } : { x: 0, y: 0, rotate: 0 }}
          transition={{
            repeat: Infinity,
            duration: 0.21, // ~4.8 Hz
            ease: "easeInOut"
          }}
          className="relative z-10 flex flex-col items-center cursor-default"
        >
          {/* Vector Anatomical Hand SVG */}
          <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e3a778" />
                <stop offset="60%" stopColor="#cf9062" />
                <stop offset="100%" stopColor="#b37346" />
              </linearGradient>
              <linearGradient id="forearmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c78657" />
                <stop offset="100%" stopColor="#e3a778" />
              </linearGradient>
              <linearGradient id="nailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#edd4c2" />
                <stop offset="100%" stopColor="#faebe0" />
              </linearGradient>
            </defs>

            {/* Forearm */}
            <path
              d="M 95 195 L 98 120 C 99 110 102 105 105 100 L 145 100 C 148 105 151 110 152 120 L 155 195 Z"
              fill="url(#forearmGrad)"
              stroke="#965c36"
              strokeWidth="1.5"
            />
            {/* Styloid process landmark */}
            <circle cx="101" cy="112" r="3.5" fill="#b37346" opacity="0.4" />
            <circle cx="149" cy="112" r="3.5" fill="#b37346" opacity="0.4" />

            {/* Palm & Carpal Base */}
            <path
              d="M 102 102 C 90 95 85 80 88 65 C 90 52 100 48 110 48 L 140 48 C 150 48 160 52 162 65 C 165 80 160 95 148 102 Z"
              fill="url(#skinGrad)"
              stroke="#965c36"
              strokeWidth="1.5"
            />
            {/* Palmar crease contours */}
            <path d="M 104 75 Q 120 85 146 72" stroke="#965c36" strokeWidth="1.2" opacity="0.5" fill="none" />
            <path d="M 112 60 Q 128 66 142 58" stroke="#965c36" strokeWidth="1" opacity="0.4" fill="none" />

            {/* Little Finger */}
            <path
              d="M 152 64 C 160 62 168 50 166 38 C 164 26 156 25 152 35 L 146 62 Z"
              fill="url(#skinGrad)"
              stroke="#965c36"
              strokeWidth="1.2"
            />
            {/* Ring Finger */}
            <path
              d="M 138 52 C 144 48 148 32 144 20 C 140 10 134 11 131 22 L 129 52 Z"
              fill="url(#skinGrad)"
              stroke="#965c36"
              strokeWidth="1.2"
            />
            {/* Middle Finger */}
            <path
              d="M 125 50 C 128 44 130 26 125 12 C 120 2 113 4 112 16 L 115 50 Z"
              fill="url(#skinGrad)"
              stroke="#965c36"
              strokeWidth="1.2"
            />

            {/* Dynamic Pill-Rolling Index Finger (Rhythmic flexion-extension) */}
            <g className="transition-transform duration-75">
              <path
                d="M 110 52 C 108 42 102 28 95 24 C 88 20 84 26 86 38 L 96 58 Z"
                fill="url(#skinGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />
              <ellipse cx="90" cy="27" rx="3.5" ry="2" fill="url(#nailGrad)" stroke="#965c36" strokeWidth="0.6" />
            </g>

            {/* Dynamic Opposing Thumb (Circumduction / Adduction-Abduction) */}
            <g>
              <path
                d="M 88 75 C 75 72 65 65 67 52 C 69 40 78 44 86 54 L 98 68 Z"
                fill="url(#skinGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />
              <ellipse cx="71" cy="48" rx="4" ry="2.5" fill="url(#nailGrad)" stroke="#965c36" strokeWidth="0.6" />
            </g>

            {/* Pill-Rolling Focal Interaction Marker */}
            <circle cx="82" cy="38" r="8" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 3" opacity={isPlaying ? "0.9" : "0.3"} />
          </svg>
        </motion.div>

        {/* Live Surface EMG / Accelerometer Trace */}
        <div className="absolute bottom-2 left-4 right-4 h-12 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center px-3 gap-3 shadow-lg">
          <div className="flex items-center gap-1.5 shrink-0 text-teal-400 font-mono text-[11px]">
            <Activity className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">sEMG (Flexor Digitorum):</span>
          </div>

          <div className="flex-1 flex items-center justify-around h-7 overflow-hidden">
            {[...Array(28)].map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? {
                  height: [
                    ((i % 4) + 1) * 3,
                    24 - ((i % 3) * 4),
                    ((i % 5) + 2) * 3,
                    ((i % 4) + 1) * 3,
                  ]
                } : { height: 3 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.42,
                  delay: (i % 6) * 0.07,
                }}
                className="w-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full"
              />
            ))}
          </div>

          <div className="text-[10px] text-teal-300 font-mono shrink-0 font-bold">
            4.8 Hz • 140 µV
          </div>
        </div>
      </div>

      {/* Clinical Diagnosis Callout */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Tanda Kardinal 1: Resting Pill-Rolling Tremor
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Tremor istirahat 4–6 Hz dengan gerakan khas opposisi ibu jari dan jari telunjuk seperti menggulung pil (pill-rolling). Muncul predominan saat otot rileks, mereda sesaat ketika lengan melakukan gerakan volunter (action), dan bertambah nyata saat pasien melakukan konsentrasi mental (stress/hitung mundur).
          </p>
        </div>
      </div>
    </div>
  );
};
