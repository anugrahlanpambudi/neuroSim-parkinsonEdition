'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FingerTapping } from './FingerTapping';
import { Footprints, Hand, CheckCircle2, Play, RotateCcw, AlertCircle } from 'lucide-react';

export const AkinesiaTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finger' | 'toe'>('finger');
  const [toeTapIndex, setToeTapIndex] = useState<number>(0);
  const [toeRunning, setToeRunning] = useState<boolean>(false);

  const toeDurations = [280, 340, 420, 520, 640];
  const toeAmplitudes = [1.0, 0.85, 0.7, 0.55, 0.45];

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
  }, [toeRunning, toeTapIndex]);

  const startToeTap = () => {
    setToeTapIndex(0);
    setToeRunning(true);
  };

  return (
    <div className="flex flex-col p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-inner">
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Pemeriksaan Bradikinesia / Akinesia</span>
          <p className="text-xs text-slate-400">Evaluasi penurunan kecepatan (slowness) dan amplitudo gerakan berulang</p>
        </div>
        <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
          <button
            onClick={() => setActiveTab('finger')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-all ${
              activeTab === 'finger' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>Finger Tapping</span>
          </button>
          <button
            onClick={() => setActiveTab('toe')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-all ${
              activeTab === 'toe' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Toe Tapping</span>
          </button>
        </div>
      </div>

      {activeTab === 'finger' ? (
        <FingerTapping />
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs text-slate-300 font-semibold">Uji Ketukan Ujung Kaki (Toe Tapping Test)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={startToeTap}
                disabled={toeRunning}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg shadow transition-all ${
                  toeRunning ? 'bg-slate-700 text-slate-400' : 'bg-teal-600 hover:bg-teal-500 text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{toeRunning ? `Ketukan #${toeTapIndex + 1}...` : 'Mulai Toe Tapping'}</span>
              </button>
              <button
                onClick={() => { setToeRunning(false); setToeTapIndex(0); }}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Floor line */}
            <div className="absolute bottom-10 left-8 right-8 h-1 bg-slate-700/80 rounded" />
            <div className="absolute bottom-4 left-8 text-[10px] text-slate-500 font-mono">Lantai Ruang Periksa</div>

            {/* Foot Animation: Heel planted on floor, toe tapping up and down with progressive slowness */}
            <div className="relative flex items-end ml-10">
              {/* Lower leg */}
              <div className="w-12 h-28 bg-gradient-to-t from-amber-300 to-amber-200 rounded-t-lg -mr-2 z-10 border border-amber-400/30" />
              
              {/* Heel & Foot (Heel fixed on ground, forefoot rotating upwards) */}
              <motion.div
                animate={{
                  rotate: toeRunning ? [0, -22 * (toeAmplitudes[toeTapIndex] || 0.5), 0] : 0,
                }}
                transition={{
                  duration: (toeDurations[toeTapIndex] || 400) / 1000,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "left bottom" }}
                className="relative flex items-center"
              >
                <div className="w-32 h-10 bg-amber-200 rounded-r-2xl border border-amber-400/40 shadow flex items-center justify-end px-3">
                  <span className="text-[10px] text-amber-900 font-bold font-mono">Kaki Kiri</span>
                </div>
              </motion.div>
            </div>

            {/* Metric overlay */}
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                Ketukan: <strong className="text-teal-400">{Math.min(toeTapIndex, 5)}/5</strong>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                Hesitasi / Slowness: <strong className="text-rose-400">Positif (+)</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Clinical Finding */}
      <div className="w-full mt-3 p-3 bg-teal-950/30 border border-teal-500/20 rounded-xl text-xs text-slate-300 leading-relaxed flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
        <div>
          <strong className="text-teal-300">Hasil Pemeriksaan Akinesia:</strong> Bradykinesia (+) pada lengan dan tungkai. Terlihat penurunan kecepatan progresif (fatigue), penurunan amplitudo gerakan berulang secara drastis, serta jeda / hesitasi gerak.
        </div>
      </div>
    </div>
  );
};
