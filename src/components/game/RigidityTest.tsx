'use client';

import React, { useState, useEffect } from 'react';
import { Cog, RotateCw, Play, Pause, Activity, CheckCircle2, ShieldAlert, Gauge, Info } from 'lucide-react';
import { useCaseStore } from '../../store/caseStore';

interface RigidityTestProps {
  caseId?: number;
}

export const RigidityTest: React.FC<RigidityTestProps> = ({ caseId: propCaseId }) => {
  const storeCaseId = useCaseStore((s) => s.currentCaseId);
  const caseId = propCaseId || storeCaseId || 1;

  const [activeLimb, setActiveLimb] = useState<'arm' | 'leg'>('arm');
  const [currentAngle, setCurrentAngle] = useState<number>(20);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Determine Rigidity Profile based on Case
  const getCaseRigidityType = () => {
    switch (caseId) {
      case 2:
        return activeLimb === 'leg' ? 'lower_body_rigid' : 'mild_normal';
      case 3:
        return 'flaccid';
      case 4:
        return 'lead_pipe';
      case 5:
        return 'cogwheel';
      case 1:
      default:
        return 'cogwheel';
    }
  };

  const rigidityType = getCaseRigidityType();

  // Cogwheel ratchet sequence (jerky catch-and-release) vs smooth continuous
  const anglesCogwheel = [
    18, 28, 24, 40, 36, 54, 50, 68, 64, 82, 78, 96, 92, 105, // Flexion
    100, 88, 92, 76, 80, 62, 66, 48, 52, 34, 38, 20          // Extension
  ];
  const anglesSmooth = [
    18, 30, 45, 60, 75, 90, 105, // Flexion
    95, 80, 65, 50, 35, 20        // Extension
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const sequence = rigidityType === 'cogwheel' ? anglesCogwheel : anglesSmooth;
    const intervalTime = rigidityType === 'cogwheel' ? 120 : 150;
    let stepIdx = 0;

    const timer = setInterval(() => {
      stepIdx = (stepIdx + 1) % sequence.length;
      setCurrentAngle(sequence[stepIdx]);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, rigidityType]);

  // Torque measurement (Nm) dynamically linked to angle
  const getTorqueValue = () => {
    if (!isPlaying) return '0.5 Nm (Diam / Jeda)';
    if (rigidityType === 'cogwheel') {
      const isCatch = (currentAngle % 6) < 3;
      return (isCatch ? 4.6 : 3.2).toFixed(1) + ' Nm (Tahanan Bergerigi)';
    }
    if (rigidityType === 'lead_pipe') {
      return '5.4 Nm (Tahanan Plastis Kontinu)';
    }
    if (rigidityType === 'lower_body_rigid') {
      return '4.8 Nm (Rigiditas Tungkai Bawah)';
    }
    if (rigidityType === 'mild_normal') {
      return '1.2 Nm (Tonus Lengan Normal)';
    }
    return '0.4 Nm (Flaksid / Hipotonik)';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-slate-750 shadow-xl">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
              Evaluasi Tonus & Rigiditas Pasif
            </span>
            <span className="text-xs text-slate-500 font-mono">Gerakan Fleksi-Ekstensi Sendi</span>
          </div>
          <p className="text-xs text-slate-300">
            Dokter menggerakkan sendi pasien secara pasif untuk mengevaluasi resistensi tonus otot
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {/* Limb Selector */}
          <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700">
            <button
              onClick={() => setActiveLimb('arm')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                activeLimb === 'arm' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lengan (Siku)
            </button>
            <button
              onClick={() => setActiveLimb('leg')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                activeLimb === 'leg' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tungkai (Lutut)
            </button>
          </div>

          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all shadow-md ${
              isPlaying
                ? 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                : 'bg-teal-600 hover:bg-teal-500 border-teal-500 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Jeda Gerakan' : 'Mulai Gerakan'}</span>
          </button>
        </div>
      </div>

      {/* Visual Simulation Canvas */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Realtime Resistance HUD - Top Left */}
        <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-xs shadow-md z-20">
          {rigidityType === 'cogwheel' ? (
            <>
              <Cog className={`w-4 h-4 text-amber-400 ${isPlaying ? 'animate-spin' : ''}`} />
              <span className="font-mono text-amber-300">
                Sensasi Raba: <strong>Cogwheel Phenomenon (+) (Tahanan Bergerigi)</strong>
              </span>
            </>
          ) : rigidityType === 'lead_pipe' ? (
            <>
              <Activity className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-indigo-300">
                Sensasi Raba: <strong>Lead-Pipe Rigidity (+) (Tahanan Plastis Kontinu)</strong>
              </span>
            </>
          ) : rigidityType === 'lower_body_rigid' ? (
            <>
              <Activity className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-amber-300">
                Sensasi Raba: <strong>Lower Body Parkinsonism (Rigiditas Tungkai Nyata)</strong>
              </span>
            </>
          ) : rigidityType === 'flaccid' ? (
            <>
              <Activity className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-sky-300">
                Sensasi Raba: <strong>Flaksid / Hipotonik (Lemas Tanpa Tahanan)</strong>
              </span>
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-emerald-300">
                Sensasi Raba: <strong>Tonus Normal (Lengan Bebas Tahanan)</strong>
              </span>
            </>
          )}
        </div>

        {/* Torque Gauge HUD - Top Right */}
        <div className="absolute top-3 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-md z-20">
          <Gauge className="w-3.5 h-3.5 text-teal-400" />
          <span>Torsi: <strong className="text-white">{getTorqueValue()}</strong></span>
        </div>

        {/* Articulated Limb Vector Illustration with 100% Reliable Native SVG Rotation */}
        <div className="relative flex items-center justify-center">
          <svg width="380" height="220" viewBox="0 0 380 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="skinArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c78657" />
                <stop offset="50%" stopColor="#e3a778" />
                <stop offset="100%" stopColor="#cf9062" />
              </linearGradient>
              <linearGradient id="doctorGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
            </defs>

            {/* Upper Arm (Horizontal Anchor, Left side) */}
            <path
              d="M 40 85 C 80 82 120 84 150 86 L 150 114 C 120 116 80 118 40 115 Z"
              fill="url(#skinArmGrad)"
              stroke="#965c36"
              strokeWidth="1.5"
            />
            <text x="60" y="72" fill="#64748b" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {activeLimb === 'arm' ? 'LENGAN ATAS (HUMERUS)' : 'PAHA (FEMUR)'}
            </text>

            {/* Doctor's Hand Stabilizing Upper Arm */}
            <g>
              <rect x="70" y="68" width="34" height="64" rx="8" fill="url(#doctorGloveGrad)" stroke="#06b6d4" strokeWidth="1.2" opacity="0.95" />
              <text x="74" y="104" fill="#cffafe" fontSize="9" fontWeight="bold" fontFamily="monospace">
                STABIL
              </text>
            </g>

            {/* Elbow / Knee Pivot Joint Landmark at (150, 100) */}
            <circle cx="150" cy="100" r="14" fill="#cf9062" stroke="#965c36" strokeWidth="1.5" />
            <circle cx="150" cy="100" r="6" fill="#965c36" />

            {/* Cogwheel Teeth Ring (Visible in Parkinson case) */}
            {rigidityType === 'cogwheel' && (
              <g transform={`rotate(${currentAngle * 2.5}, 150, 100)`}>
                <circle cx="150" cy="100" r="22" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.85" />
              </g>
            )}

            {/* ARTICULATED FOREARM + HAND ROTATING AROUND (150, 100) VIA NATIVE SVG TRANSFORM */}
            <g transform={`rotate(${-currentAngle}, 150, 100)`}>
              {/* Forearm (Radius / Ulna) */}
              <path
                d="M 150 92 L 270 88 C 285 88 290 91 300 93 L 300 107 C 290 109 285 112 270 112 L 150 108 Z"
                fill="url(#skinArmGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />
              {/* Hand at Distal End */}
              <path
                d="M 300 93 C 310 93 325 90 338 90 C 344 90 348 94 345 98 C 342 101 335 101 328 101 L 328 104 C 335 104 340 106 338 109 C 335 111 328 110 320 110 L 300 107 Z"
                fill="url(#skinArmGrad)"
                stroke="#965c36"
                strokeWidth="1.5"
              />

              {/* Doctor's Examining Glove Holding Patient's Distal Forearm */}
              <rect x="250" y="74" width="30" height="52" rx="8" fill="url(#doctorGloveGrad)" stroke="#06b6d4" strokeWidth="1.2" opacity="0.95" />
              <text x="252" y="104" fill="#cffafe" fontSize="8" fontWeight="bold" fontFamily="monospace">
                PASIF
              </text>
            </g>

            {/* Angle Arc Guide */}
            <path
              d="M 230 100 A 80 80 0 0 0 195 44"
              fill="none"
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <text x="225" y="65" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              {Math.round(currentAngle)}°
            </text>
          </svg>
        </div>

        {/* Bottom Status Callout */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs px-3.5 py-2 bg-slate-950/90 rounded-xl border border-slate-800 z-20">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">Hasil Evaluasi:</span>
            {rigidityType === 'cogwheel' ? (
              <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Cogwheel Rigidity (+) Tahanan bergerigi intermiten khas degenerasi ekstrapiramidal</span>
              </span>
            ) : rigidityType === 'lead_pipe' ? (
              <span className="text-indigo-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Lead-Pipe Rigidity (+) Tahanan seragam plastis kontinu tanpa ratchet gear</span>
              </span>
            ) : rigidityType === 'lower_body_rigid' ? (
              <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Lower Body Parkinsonism: Rigiditas dominan tungkai bawah dibanding lengan</span>
              </span>
            ) : rigidityType === 'flaccid' ? (
              <span className="text-sky-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Flaksid Hipotonik: Tonus menurun bilateral, menyingkirkan rigiditas ekstrapiramidal murni</span>
              </span>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tonus Lengan Dalam Batas Normal</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Clinical Notes Card */}
      <div className="mt-3.5 w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">
            Tanda Kardinal 2: Tonus Otot & Rigiditas
          </strong>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Berbeda dengan spastisitas piramidal (fenomena pisau lipat / <em>clasp-knife</em> yang resisten di awal lalu mendadak lemas dan bergantung pada kecepatan regang), <strong>rigiditas ekstrapiramidal</strong> memberikan tahanan konstan di seluruh rentang gerak pasif fleksi maupun ekstensi yang independen terhadap kecepatan gerakan. Fenomena <em>cogwheel</em> terjadi akibat superimposisi tremor subklinis pada rigiditas pipa timah (<em>lead-pipe</em>).
          </p>
        </div>
      </div>
    </div>
  );
};
