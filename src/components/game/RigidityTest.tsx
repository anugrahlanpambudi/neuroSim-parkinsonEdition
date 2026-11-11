'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cog, RotateCw, Activity, CheckCircle2, ShieldAlert, Gauge, Info } from 'lucide-react';
import { useCaseStore } from '../../store/caseStore';

interface RigidityTestProps {
  caseId?: number;
}

export const RigidityTest: React.FC<RigidityTestProps> = ({ caseId: propCaseId }) => {
  const storeCaseId = useCaseStore((s) => s.currentCaseId);
  const caseId = propCaseId || storeCaseId || 1;

  const [activeLimb, setActiveLimb] = useState<'arm' | 'leg'>('arm');
  const [currentAngle, setCurrentAngle] = useState<number>(20);
  const [isExamining, setIsExamining] = useState<boolean>(false);

  // Determine Rigidity Profile based on Case
  const getCaseRigidityType = () => {
    switch (caseId) {
      case 2:
        // Case 2: Vascular Parkinsonism - Lower body dominant rigidity
        return activeLimb === 'leg' ? 'lower_body_rigid' : 'mild_normal';
      case 3:
        // Case 3: Uremic Encephalopathy - Flaccid / Hypotonic
        return 'flaccid';
      case 4:
        // Case 4: Post-Encephalitic - Lead-Pipe Rigidity (smooth plastic continuous resistance)
        return 'lead_pipe';
      case 5:
        // Case 5: Wilson / Young-Onset - Asymmetric Cogwheel Rigidity
        return 'cogwheel';
      case 1:
      default:
        // Case 1: Idiopathic Parkinson - Classic Cogwheel Rigidity
        return 'cogwheel';
    }
  };

  const rigidityType = getCaseRigidityType();

  // Angular ratcheting sequence for cogwheel vs smooth for lead-pipe/flaccid
  const anglesCogwheel = [15, 30, 26, 48, 44, 68, 64, 88, 84, 102, 98, 110, 85, 60, 40, 20];
  const anglesSmooth = [15, 35, 55, 75, 95, 110, 95, 75, 55, 35, 15];

  const handlePassiveMovement = () => {
    if (isExamining) return;
    setIsExamining(true);

    const steps = rigidityType === 'cogwheel' ? anglesCogwheel : anglesSmooth;
    let idx = 0;

    const interval = setInterval(() => {
      idx++;
      if (idx < steps.length) {
        setCurrentAngle(steps[idx]);
      } else {
        clearInterval(interval);
        setCurrentAngle(25);
        setIsExamining(false);
      }
    }, rigidityType === 'cogwheel' ? 140 : 160);
  };

  // Torque measurement (Nm)
  const getTorqueValue = () => {
    if (!isExamining) return '0.5 Nm (Basal)';
    if (rigidityType === 'cogwheel') {
      return (3.8 + (currentAngle % 7) * 0.6).toFixed(1) + ' Nm (Jerky Ratchet)';
    }
    if (rigidityType === 'lead_pipe') {
      return '5.4 Nm (Uniform Continuous)';
    }
    if (rigidityType === 'lower_body_rigid') {
      return '4.8 Nm (Lower Body Hypertonia)';
    }
    if (rigidityType === 'mild_normal') {
      return '1.2 Nm (Normal Arm Tone)';
    }
    // flaccid
    return '0.4 Nm (Flaccid Hypotonic)';
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
            <span className="text-xs text-slate-500 font-mono">Fleksi-Ekstensi Pasif Sendi</span>
          </div>
          <p className="text-xs text-slate-300">
            Dokter menggerakkan sendi pasien secara pasif secara perlahan dan cepat untuk mengevaluasi tahanan otot
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700">
            <button
              onClick={() => setActiveLimb('arm')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                activeLimb === 'arm' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lengan (Siku / Elbow)
            </button>
            <button
              onClick={() => setActiveLimb('leg')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                activeLimb === 'leg' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tungkai (Lutut / Knee)
            </button>
          </div>

          <button
            onClick={handlePassiveMovement}
            disabled={isExamining}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl shadow-md transition-all ${
              isExamining
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-teal-600 hover:bg-teal-500 text-white border border-teal-500'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isExamining ? 'animate-spin' : ''}`} />
            <span>{isExamining ? 'Memeriksa Pasif...' : 'Gerakkan Sendi Pasif'}</span>
          </button>
        </div>
      </div>

      {/* Visual Simulation Canvas */}
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none shadow-inner">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Realtime Resistance HUD - Top Left */}
        <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 text-xs shadow-md">
          {rigidityType === 'cogwheel' ? (
            <>
              <Cog className={`w-4 h-4 text-amber-400 ${isExamining ? 'animate-spin' : ''}`} />
              <span className="font-mono text-amber-300">
                Sensasi: <strong>Cogwheel Phenomenon (+) (Tahanan Bergerigi)</strong>
              </span>
            </>
          ) : rigidityType === 'lead_pipe' ? (
            <>
              <Activity className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-indigo-300">
                Sensasi: <strong>Lead-Pipe Rigidity (+) (Tahanan Plastis Kontinu)</strong>
              </span>
            </>
          ) : rigidityType === 'lower_body_rigid' ? (
            <>
              <Activity className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-amber-300">
                Sensasi: <strong>Lower Body Parkinsonism (Tahanan Tungkai Nyata)</strong>
              </span>
            </>
          ) : rigidityType === 'flaccid' ? (
            <>
              <Activity className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-sky-300">
                Sensasi: <strong>Flaksid / Hipotonik (Tanpa Tahanan)</strong>
              </span>
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-emerald-300">
                Sensasi: <strong>Tonus Normal (Lengan Relatif Bebas)</strong>
              </span>
            </>
          )}
        </div>

        {/* Torque Gauge HUD - Top Right */}
        <div className="absolute top-3 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-md">
          <Gauge className="w-3.5 h-3.5 text-teal-400" />
          <span>Tahanan: <strong className="text-white">{getTorqueValue()}</strong></span>
        </div>

        {/* Articulated Limb Vector Illustration */}
        <div className="relative flex items-center justify-center">
          {/* Upper Limb / Humerus Anchored by Doctor's Hand */}
          <div className="relative flex items-center">
            {/* Upper Arm Bone & Muscles */}
            <svg width="360" height="200" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
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
              <text x="65" y="74" fill="#64748b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                {activeLimb === 'arm' ? 'HUMERUS' : 'FEMUR'}
              </text>

              {/* Doctor's Left Hand Stabilizing Upper Arm */}
              <g>
                <rect x="70" y="70" width="34" height="60" rx="8" fill="url(#doctorGloveGrad)" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
                <text x="74" y="104" fill="#cffafe" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  DOKTER
                </text>
              </g>

              {/* Elbow / Knee Pivot Joint */}
              <circle cx="150" cy="100" r="14" fill="#cf9062" stroke="#965c36" strokeWidth="1.5" />
              <circle cx="150" cy="100" r="6" fill="#965c36" />

              {/* Cogwheel Teeth Ring (Visible in Parkinson cases to visualize the ratcheting gear) */}
              {rigidityType === 'cogwheel' && (
                <motion.g
                  animate={{ rotate: currentAngle * 3 }}
                  style={{ originX: '150px', originY: '100px' }}
                >
                  <circle cx="150" cy="100" r="22" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
                </motion.g>
              )}

              {/* Articulated Forearm + Hand Rotating Around (150, 100) Pivot */}
              <motion.g
                animate={{ rotate: -currentAngle }}
                transition={{
                  type: rigidityType === 'cogwheel' ? 'spring' : 'tween',
                  stiffness: 550,
                  damping: 18,
                }}
                style={{ originX: '150px', originY: '100px' }}
              >
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

                {/* Doctor's Examining Right Hand Holding Patient's Distal Forearm */}
                <rect x="250" y="76" width="30" height="48" rx="8" fill="url(#doctorGloveGrad)" stroke="#06b6d4" strokeWidth="1.2" opacity="0.9" />
                <text x="252" y="104" fill="#cffafe" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  GERAK
                </text>
              </motion.g>

              {/* Angle Arc Guide */}
              <path
                d="M 230 100 A 80 80 0 0 0 195 44"
                fill="none"
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text x="220" y="70" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                {currentAngle}°
              </text>
            </svg>
          </div>
        </div>

        {/* Bottom Status Callout */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs px-3.5 py-2 bg-slate-950/90 rounded-xl border border-slate-800">
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
