'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cog, RotateCw, Activity, CheckCircle2 } from 'lucide-react';

export const RigidityTest: React.FC = () => {
  const [activeLimb, setActiveLimb] = useState<'arm' | 'leg'>('arm');
  const [angleIndex, setAngleIndex] = useState<number>(0);
  const [isSwinging, setIsSwinging] = useState<boolean>(false);

  // Discrete ratcheting angles representing the jerky cogwheel sensation
  const cogwheelSteps = [0, 25, 20, 48, 43, 72, 67, 95, 90, 115];

  const handleFlexExtend = () => {
    setIsSwinging(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAngleIndex(step % cogwheelSteps.length);
      if (step >= cogwheelSteps.length * 2) {
        clearInterval(interval);
        setIsSwinging(false);
      }
    }, 180);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-inner">
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Pemeriksaan Tonus & Rigiditas (Cogwheel)</span>
          <p className="text-xs text-slate-400">Pemeriksaan pasif fleksi-ekstensi sendi siku dan lutut oleh dokter</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
            <button
              onClick={() => setActiveLimb('arm')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                activeLimb === 'arm' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lengan Kiri (Elbow)
            </button>
            <button
              onClick={() => setActiveLimb('leg')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                activeLimb === 'leg' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tungkai (Knee)
            </button>
          </div>
          <button
            onClick={handleFlexExtend}
            disabled={isSwinging}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-md transition-all ${
              isSwinging
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSwinging ? 'animate-spin' : ''}`} />
            <span>{isSwinging ? 'Sedang Memeriksa...' : 'Gerakkan Pasif Sendi'}</span>
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-72 bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Realtime Cogwheel Resistance Monitor */}
        <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs text-amber-300">
          <Cog className={`w-4 h-4 text-amber-400 ${isSwinging ? 'animate-spin' : ''}`} />
          <span>Sensasi Raba: <strong>Cogwheel Phenomenon (+)</strong> (Tahanan Bergerigi)</span>
        </div>

        {/* Doctor Hands Indicator */}
        <div className="absolute top-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
          <span>Tangan Dokter Menyangga Sendi Pasien</span>
        </div>

        {/* Animated Limb with Jerky High-Stiffness Spring Motion */}
        <div className="relative flex items-center justify-center">
          {activeLimb === 'arm' ? (
            /* Arm Assembly */
            <div className="relative flex items-center">
              {/* Upper arm (Held firmly by doctor) */}
              <div className="w-28 h-10 bg-gradient-to-r from-slate-700 to-amber-200 rounded-l-lg relative border-y border-amber-400/30">
                <span className="absolute -top-5 left-2 text-[10px] text-slate-500 uppercase font-mono">Humerus</span>
                {/* Doctor holding upper arm */}
                <div className="absolute -top-3 -bottom-3 left-8 w-10 bg-cyan-700/80 rounded-xl border border-cyan-400/40 shadow flex items-center justify-center">
                  <span className="text-[9px] text-cyan-200 font-bold">Dokter</span>
                </div>
              </div>

              {/* Elbow Joint Pivot with Cogwheel gear graphic */}
              <div className="relative w-10 h-10 -mx-3 z-20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: cogwheelSteps[angleIndex] * 2 }}
                  transition={{ type: "spring", stiffness: 450, damping: 12 }}
                  className="absolute"
                >
                  <Cog className="w-12 h-12 text-amber-500/60" />
                </motion.div>
                <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-200 z-10" />
              </div>

              {/* Forearm pivoting around elbow with stiff jerky ratchet spring */}
              <motion.div
                animate={{ rotate: -cogwheelSteps[angleIndex] }}
                transition={{
                  type: "spring",
                  stiffness: 500, // high stiffness as required
                  damping: 10,     // jerky cogwheel catch-release
                  mass: 0.8,
                }}
                style={{ transformOrigin: "left center" }}
                className="relative flex items-center"
              >
                <div className="w-36 h-9 bg-gradient-to-r from-amber-200 to-amber-300 rounded-r-md border border-amber-400/30 flex items-center justify-end px-3">
                  <span className="text-[10px] text-amber-900 font-bold font-mono">Radius-Ulna</span>
                </div>
                {/* Doctor's hand manipulating the wrist */}
                <div className="absolute right-2 -top-4 -bottom-4 w-10 bg-cyan-700/80 rounded-xl border border-cyan-400/40 shadow flex items-center justify-center">
                  <span className="text-[9px] text-cyan-200 font-bold">Dokter</span>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Leg Assembly */
            <div className="relative flex items-center">
              {/* Thigh */}
              <div className="w-28 h-12 bg-gradient-to-r from-slate-700 to-amber-200 rounded-l-lg relative border-y border-amber-400/30">
                <span className="absolute -top-5 left-2 text-[10px] text-slate-500 uppercase font-mono">Femur</span>
                <div className="absolute -top-3 -bottom-3 left-8 w-10 bg-cyan-700/80 rounded-xl border border-cyan-400/40 shadow flex items-center justify-center">
                  <span className="text-[9px] text-cyan-200 font-bold">Dokter</span>
                </div>
              </div>

              {/* Knee Joint with Cogwheel */}
              <div className="relative w-10 h-10 -mx-3 z-20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: cogwheelSteps[angleIndex] * 2 }}
                  transition={{ type: "spring", stiffness: 450, damping: 12 }}
                  className="absolute"
                >
                  <Cog className="w-12 h-12 text-amber-500/60" />
                </motion.div>
                <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-200 z-10" />
              </div>

              {/* Lower leg swinging */}
              <motion.div
                animate={{ rotate: -cogwheelSteps[angleIndex] }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 10,
                  mass: 0.8,
                }}
                style={{ transformOrigin: "left center" }}
                className="relative flex items-center"
              >
                <div className="w-36 h-10 bg-gradient-to-r from-amber-200 to-amber-300 rounded-r-md border border-amber-400/30 flex items-center justify-end px-3">
                  <span className="text-[10px] text-amber-900 font-bold font-mono">Tibia</span>
                </div>
                <div className="absolute right-2 -top-4 -bottom-4 w-10 bg-cyan-700/80 rounded-xl border border-cyan-400/40 shadow flex items-center justify-center">
                  <span className="text-[9px] text-cyan-200 font-bold">Dokter</span>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Real-time resistance graph / ratchet meter */}
        <div className="absolute bottom-2 left-4 right-4 h-11 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300">Profil Resistensi Tonus Otot:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {cogwheelSteps.map((val, idx) => (
              <div
                key={idx}
                className={`w-2.5 h-6 rounded-sm transition-all duration-150 ${
                  idx <= angleIndex
                    ? 'bg-amber-400 shadow-sm shadow-amber-500/50'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-300 font-mono">
            <span>Cogwheel Ratchet</span>
          </div>
        </div>
      </div>

      {/* Clinical Finding Report */}
      <div className="w-full mt-3 p-3 bg-teal-950/30 border border-teal-500/20 rounded-xl text-xs text-slate-300 leading-relaxed flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
        <div>
          <strong className="text-teal-300">Hasil Pemeriksaan:</strong> Rigiditas (+) cogwheel pada lengan kiri dan kedua tungkai. Terdapat tahanan yang konstan dengan sensasi bergerigi (roda gigi) akibat tumpang tindih rigiditas plastik dengan tremor subklinis.
        </div>
      </div>
    </div>
  );
};
