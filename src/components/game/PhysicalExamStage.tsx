'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { PhysicalExamType } from '../../types/game';
import { ExamModal } from './ExamModal';
import { 
  Activity, 
  Dumbbell, 
  Cog, 
  Hand, 
  Footprints, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Award,
  ShieldAlert
} from 'lucide-react';

export const PhysicalExamStage: React.FC = () => {
  const { 
    physicalExams, 
    skippedCardinalWarning, 
    proceedToPenunjang 
  } = useGameStore();

  const [activeModal, setActiveModal] = useState<PhysicalExamType | null>(null);

  const examKeys: PhysicalExamType[] = ['tremor', 'motorik', 'rigiditas', 'akinesia', 'instabilitas', 'sensorik'];

  const iconMap: Record<PhysicalExamType, React.ReactNode> = {
    tremor: <Activity className="w-6 h-6 text-teal-400" />,
    motorik: <Dumbbell className="w-6 h-6 text-indigo-400" />,
    rigiditas: <Cog className="w-6 h-6 text-amber-400" />,
    akinesia: <Hand className="w-6 h-6 text-rose-400" />,
    instabilitas: <Footprints className="w-6 h-6 text-sky-400" />,
    sensorik: <Sparkles className="w-6 h-6 text-emerald-400" />,
  };

  const completedCount = Object.values(physicalExams).filter((e) => e.completed).length;
  const cardinalCompleted = ['tremor', 'rigiditas', 'akinesia', 'instabilitas'].filter(
    (k) => physicalExams[k as PhysicalExamType].completed
  ).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Stage Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 2 • Pemeriksaan Fisik
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              +70 Poin Maksimal
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Pemeriksaan Fisik Neurologi</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Lakukan pemeriksaan sistematis pada pasien di ranjang periksa. Pastikan memeriksa seluruh <strong>4 tanda kardinal Parkinson</strong> untuk menghindari penalti -20 poin.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">Status Kardinal:</div>
            <div className={`text-sm font-bold font-mono ${cardinalCompleted === 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {cardinalCompleted}/4 Tanda Kardinal
            </div>
          </div>

          <button
            onClick={() => proceedToPenunjang()}
            className="px-5 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all"
          >
            <span>Lanjut ke Penunjang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Warning if skipped cardinal */}
      {skippedCardinalWarning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 flex items-center gap-3 shadow-lg"
        >
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
          <div className="text-xs md:text-sm">
            <strong className="font-bold">Penalti Diterapkan (-20 Poin):</strong> Pemeriksaan kardinal Parkinson tidak lengkap! (Tremor, Rigiditas, Akinesia, dan Instabilitas Postural adalah pilar diagnosis klinis penyakit Parkinson).
          </div>
        </motion.div>
      )}

      {/* Hospital Room POV Presentation with Examination Grid (3x2) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        {/* Background Room Photo */}
        <div className="relative w-full h-[540px]">
          <Image
            src="/images/bg-hospital-neuro-room.jpg"
            alt="Ruang Pemeriksaan Neurologi RSUD - Poli Saraf"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />

          {/* Interactive Floating Patient Badge & Desk Notice */}
          <div className="absolute top-5 left-6 hidden sm:flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 shadow-lg text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">POV Dokter Pemeriksa • Pasien Duduk di Ranjang Periksa Neurologi</span>
          </div>

          {/* Examination Grid (3x2) */}
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
              {examKeys.map((key) => {
                const item = physicalExams[key];
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal(key)}
                    className={`relative p-5 rounded-2xl border cursor-pointer backdrop-blur-md shadow-xl transition-all flex flex-col justify-between ${
                      item.completed
                        ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400'
                        : 'bg-slate-900/85 hover:bg-slate-850/95 border-slate-700 hover:border-teal-500/70 hover:shadow-teal-500/10'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                          {iconMap[key]}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {item.isCardinal && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              Kardinal
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            +{item.points} Poin
                          </span>
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.subtitle}</p>
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      {item.completed ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Selesai Diperiksa</span>
                        </div>
                      ) : (
                        <span className="text-teal-400 font-medium hover:underline">
                          Klik untuk Periksa →
                        </span>
                      )}

                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.completed ? 'Temuan tercatat' : 'Belum diuji'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner Status Summary */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>Progress Pemeriksaan Fisik: <strong>{completedCount} dari 6</strong> modalitas selesai.</span>
          </div>
          <div className="text-slate-400">
            Tanda Kardinal Parkinson: <em>Tremor istirahat, Rigiditas, Bradikinesia (Akinesia), Instabilitas Postural (TRAP).</em>
          </div>
        </div>
      </div>

      {/* Examination Modal Dialog */}
      <ExamModal
        examType={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};
