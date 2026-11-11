'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCaseStore } from '../../store/caseStore';
import { CaseExamModal } from './CaseExamModal';
import { 
  Activity, 
  Dumbbell, 
  Cog, 
  Hand, 
  Footprints, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export const CasePhysicalStage: React.FC = () => {
  const { 
    currentCase, 
    completedExamIds, 
    openExamModal, 
    proceedToPenunjang 
  } = useCaseStore();

  const totalExams = currentCase.physicalExams.length;
  const completedCount = completedExamIds.length;
  const cardinalExams = currentCase.physicalExams.filter((e) => e.isCardinal);
  const cardinalCompleted = cardinalExams.filter((e) => completedExamIds.includes(e.id)).length;

  const getExamIcon = (componentName: string) => {
    switch (componentName) {
      case 'resting_reemergent':
      case 'holmes_tremor':
      case 'postural_tremor':
        return <Activity className="w-6 h-6 text-teal-400" />;
      case 'motor_weakness':
      case 'arm_drop':
      case 'motor_general':
        return <Dumbbell className="w-6 h-6 text-indigo-400" />;
      case 'rigidity':
        return <Cog className="w-6 h-6 text-amber-400" />;
      case 'akinesia':
        return <Hand className="w-6 h-6 text-rose-400" />;
      case 'retropulsion':
        return <Footprints className="w-6 h-6 text-sky-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <CaseExamModal />

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
            Lakukan pemeriksaan sistematis pada pasien di ranjang periksa. Pastikan memeriksa seluruh tanda kardinal dan evaluasi motorik.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">Status Pemeriksaan:</div>
            <div className={`text-sm font-bold font-mono ${completedCount === totalExams ? 'text-emerald-400' : 'text-teal-400'}`}>
              {completedCount}/{totalExams} Pemeriksaan Selesai
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

      {/* Hospital Room Perspective (Full-width background with overlay cards) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl min-h-[520px] bg-slate-950 flex flex-col justify-center p-6">
        <Image
          src="/images/bg-hospital-neuro-room.jpg"
          alt="Hospital Room"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50" />

        {/* Interactive Exam Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto w-full py-4">
          {currentCase.physicalExams.map((exam) => {
            const isDone = completedExamIds.includes(exam.id);

            return (
              <motion.div
                key={exam.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openExamModal(exam.id)}
                className={`relative p-5 rounded-2xl border cursor-pointer backdrop-blur-md shadow-xl transition-all flex flex-col justify-between ${
                  isDone
                    ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400'
                    : 'bg-slate-900/85 hover:bg-slate-850/95 border-slate-700 hover:border-teal-500/70 hover:shadow-teal-500/10'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                      {getExamIcon(exam.componentName)}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {exam.isCardinal && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Kardinal
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        +{exam.points} Poin
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base font-bold text-white mb-1">{exam.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{exam.subtitle}</p>
                </div>

                {/* Bottom Status */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  {isDone ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selesai Diperiksa</span>
                    </div>
                  ) : (
                    <span className="text-teal-400 font-medium hover:underline">
                      Klik untuk Periksa →
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
