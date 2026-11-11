'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { useCaseStore } from '../../store/caseStore';

interface RetropulsionTestProps {
  caseId?: number;
}

export const RetropulsionTest: React.FC<RetropulsionTestProps> = ({ caseId: propCaseId }) => {
  const storeCaseId = useCaseStore((s) => s.currentCaseId);
  const caseId = propCaseId || storeCaseId || 1;

  // In Case 2 (Vascular Parkinsonism), pull test is NEGATIVE / NORMAL (1 step recovery).
  // In Case 1 and Case 5, pull test is POSITIVE / UNSTABLE (3-4 steps, caught by doctor).
  const isAbnormalPositive = caseId !== 2;

  const [stepPhase, setStepPhase] = useState<number>(0);
  // 0 = ready, 1 = pulled, 2 = step 1, 3 = step 2, 4 = step 3/caught

  const executePullTest = () => {
    setStepPhase(1);

    if (isAbnormalPositive) {
      // Unstable 3-4 steps backward
      setTimeout(() => setStepPhase(2), 350); // step 1
      setTimeout(() => setStepPhase(3), 750); // step 2
      setTimeout(() => setStepPhase(4), 1200); // step 3-4 unstable catch
    } else {
      // Normal 1-step prompt corrective recovery (Case 2)
      setTimeout(() => setStepPhase(2), 400); // step 1 corrective
      setTimeout(() => setStepPhase(5), 900); // stable recovered!
    }
  };

  const resetTest = () => {
    setStepPhase(0);
  };

  // Backward offsets (X axis in pixels)
  // 0: ready, 1: pulled, 2: step 1, 3: step 2, 4: unstable caught, 5: stable 1-step recovery
  const getOffsets = () => {
    if (isAbnormalPositive) {
      return [0, -15, -50, -95, -140];
    }
    return [0, -12, -40, -40, -40, -40];
  };

  const backwardOffsets = getOffsets();

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
              Evaluasi Instabilitas Postural (Pull Test)
            </span>
            <span className="text-xs text-slate-500 font-mono">Tanda Kardinal Keempat</span>
          </div>
          <p className="text-xs text-slate-300">
            Dokter berdiri di belakang pasien, memberi tarikan mendadak ke belakang pada kedua bahu untuk menilai refleks postural
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {stepPhase === 0 ? (
            <button
              onClick={executePullTest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Lakukan Pull Test (Tarik Bahu)</span>
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

      {/* Main Simulation Stage Canvas */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
        {/* Floor Line & Step Position Markers */}
        <div className="absolute bottom-12 left-10 right-10 h-1.5 bg-slate-750 rounded-full" />
        <div className="absolute bottom-4 left-10 flex items-center gap-8 text-[10px] text-slate-500 font-mono tracking-wider">
          <span>[ Titik Tangkapan ]</span>
          <span>[ Langkah 3 ]</span>
          <span>[ Langkah 2 ]</span>
          <span>[ Langkah 1 ]</span>
          <span className="text-teal-400 font-bold">[ Posisi Awal Pasien ]</span>
        </div>

        {/* Realtime Status Banner */}
        <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
          {stepPhase === 0 && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-300 font-mono shadow-md">
              Pasien berdiri tegak. Dokter bersiap di belakang dengan tangan siap menangkap.
            </span>
          )}
          {stepPhase === 1 && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono animate-pulse shadow-md">
              Tarikan mendadak ke belakang diberikan pada kedua bahu pasien!
            </span>
          )}
          {stepPhase >= 2 && stepPhase < 4 && isAbnormalPositive && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono shadow-md">
              Pasien melangkah mundur: Langkah ke-{stepPhase - 1} (Goyah / Kehilangan Keseimbangan)
            </span>
          )}
          {stepPhase === 4 && isAbnormalPositive && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold flex items-center gap-1.5 animate-pulse shadow-md">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Retropulsion Test (+) Pasien mundur &gt;2 langkah tidak terkontrol & ditangkap dokter!
            </span>
          )}
          {stepPhase === 5 && !isAbnormalPositive && (
            <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Pull Test Normal (-): Pasien mengoreksi posisi dalam 1 langkah tanpa jatuh!
            </span>
          )}
        </div>

        {/* Actors: Physician Behind & Patient in Front */}
        <div className="relative flex items-center justify-center w-full">
          {/* Physician Vector Standing Behind (Left Side in Perspective) */}
          <div className="absolute left-1/2 -ml-36 bottom-0 flex flex-col items-center z-10 opacity-95">
            <svg width="120" height="210" viewBox="0 0 120 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
              {/* Doctor Head */}
              <circle cx="60" cy="30" r="16" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M 52 26 C 52 20 68 20 68 26 Z" fill="#475569" />

              {/* Doctor White Coat Body */}
              <path
                d="M 40 46 L 80 46 L 85 140 L 35 140 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Stethoscope */}
              <path d="M 48 50 C 48 75 72 75 72 50" stroke="#0284c7" strokeWidth="2" fill="none" />
              <circle cx="60" cy="74" r="4" fill="#0284c7" />

              {/* Doctor Arms Extended Forward to Catch */}
              <path
                d="M 40 55 C 55 58 75 62 105 65 L 105 78 C 75 75 55 70 40 68 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1.2"
              />
              {/* Cyan Glove */}
              <rect x="100" y="64" width="16" height="15" rx="4" fill="#0891b2" stroke="#06b6d4" strokeWidth="1" />

              {/* Doctor Trousers & Shoes */}
              <rect x="42" y="140" width="16" height="58" fill="#334155" />
              <rect x="62" y="140" width="16" height="58" fill="#334155" />
              <rect x="38" y="198" width="22" height="10" rx="3" fill="#0f172a" />
              <rect x="60" y="198" width="22" height="10" rx="3" fill="#0f172a" />
            </svg>
            <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 -mt-2">
              DOKTER (PEMERIKSA)
            </span>
          </div>

          {/* Patient Vector Being Perturbed Backwards */}
          <motion.div
            animate={{
              x: backwardOffsets[Math.min(stepPhase, backwardOffsets.length - 1)],
              rotate: stepPhase === 4 ? -8 : stepPhase === 1 ? -4 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 22,
            }}
            className="relative flex flex-col items-center z-20 ml-16"
          >
            <svg width="120" height="210" viewBox="0 0 120 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              {/* Patient Head */}
              <circle cx="60" cy="30" r="16" fill="#e3a778" stroke="#965c36" strokeWidth="1.5" />
              <path d="M 50 26 C 50 18 70 18 70 26 Z" fill="#64748b" />

              {/* Patient Hospital Gown / Clothes */}
              <path
                d="M 40 46 L 80 46 L 86 135 L 34 135 Z"
                fill="#0f766e"
                stroke="#115e59"
                strokeWidth="1.5"
              />
              <path d="M 60 46 L 60 135" stroke="#134e4a" strokeWidth="1" strokeDasharray="3 3" />

              {/* Shoulder perturbation impulse indicator */}
              {stepPhase === 1 && (
                <ellipse cx="60" cy="50" rx="28" ry="6" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              )}

              {/* Patient Arms at Side */}
              <rect x="30" y="52" width="10" height="60" rx="4" fill="#0d9488" stroke="#115e59" strokeWidth="1" />
              <rect x="80" y="52" width="10" height="60" rx="4" fill="#0d9488" stroke="#115e59" strokeWidth="1" />

              {/* Patient Legs Stepping Backwards */}
              <rect x="42" y="135" width="15" height="60" fill="#334155" />
              <rect x="63" y="135" width="15" height="60" fill="#334155" />
              <rect x="38" y="195" width="20" height="10" rx="3" fill="#1e293b" />
              <rect x="62" y="195" width="20" height="10" rx="3" fill="#1e293b" />
            </svg>
            <span className="text-[9px] font-mono font-bold text-teal-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 -mt-2">
              PASIEN
            </span>
          </motion.div>
        </div>

        {/* Retropulsion Criterion Note */}
        <div className="absolute bottom-2 right-4 text-[11px] font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
          Kriteria Normal: ≤ 2 langkah korektif mandiri
        </div>
      </div>

      {/* Clinical Notes Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Tanda Kardinal 4: Instabilitas Postural (Pull Test / Retropulsi)
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {isAbnormalPositive ? (
              <>
                <strong>Hasil Positif (+):</strong> Pasien membutuhkan &gt;2 langkah korektif (mengalami <em>festinasi retropulsi</em> 3-4 langkah tak terkendali) dan hampir terjatuh jika tidak segera disangga oleh dokter pemeriksa di belakangnya. Ini menunjukkan hilangnya refleks postural integratif di tingkat ganglia basalis dan batang otak.
              </>
            ) : (
              <>
                <strong>Hasil Normal (-):</strong> Pasien mampu mengoreksi titik berat tubuh (center of gravity) hanya dalam 1 langkah pendek mandiri tanpa perlu ditangkap oleh pemeriksa. Keseimbangan postural terkoordinasi dengan baik (sering dijumpai pada stadium awal atau parkinsonisme vaskular tanpa gangguan postural berat).
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
