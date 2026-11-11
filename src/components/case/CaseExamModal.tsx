'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Award, Activity, ShieldCheck } from 'lucide-react';
import { useCaseStore } from '../../store/caseStore';

// Exam components
import { MotorWeakness } from '../exams/MotorWeakness';
import { PosturalTremor } from '../exams/PosturalTremor';
import { GCS_Exam } from '../exams/GCS_Exam';
import { ArmDropTest } from '../exams/ArmDropTest';
import { HolmesTremor } from '../exams/HolmesTremor';

// Case 1 sub-components
import { RestingTremor } from '../game/RestingTremor';
import { ReemergentTremor } from '../game/ReemergentTremor';
import { RigidityTest } from '../game/RigidityTest';
import { AkinesiaTest } from '../game/AkinesiaTest';
import { RetropulsionTest } from '../game/RetropulsionTest';

export const CaseExamModal: React.FC = () => {
  const { 
    activeExamId, 
    closeExamModal, 
    currentCase, 
    completedExamIds, 
    completeExam 
  } = useCaseStore();

  const [tremorTab, setTremorTab] = useState<'resting' | 'reemergent'>('resting');

  if (!activeExamId) return null;

  const currentExam = currentCase.physicalExams.find((e) => e.id === activeExamId);
  if (!currentExam) return null;

  const isCompleted = completedExamIds.includes(activeExamId);

  const handleFinish = () => {
    completeExam(activeExamId);
  };

  const renderExamContent = () => {
    switch (currentExam.componentName) {
      case 'motor_weakness':
        return <MotorWeakness />;
      case 'postural_tremor':
        return <PosturalTremor caseId={currentCase.id} />;
      case 'gcs_exam':
        return <GCS_Exam eye={3} verbal={4} motor={5} />;
      case 'arm_drop':
        return <ArmDropTest />;
      case 'holmes_tremor':
        return <HolmesTremor />;
      case 'resting_reemergent':
        return (
          <div className="space-y-4">
            <div className="flex rounded-xl bg-slate-800/80 p-1 border border-slate-700 w-fit">
              <button
                onClick={() => setTremorTab('resting')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  tremorTab === 'resting'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Resting Tremor (Pill-Rolling)
              </button>
              <button
                onClick={() => setTremorTab('reemergent')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  tremorTab === 'reemergent'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Re-emergent Tremor (Postural)
              </button>
            </div>
            {tremorTab === 'resting' ? <RestingTremor /> : <ReemergentTremor />}
          </div>
        );
      case 'rigidity':
        return <RigidityTest caseId={currentCase.id} />;
      case 'akinesia':
        return <AkinesiaTest caseId={currentCase.id} />;
      case 'retropulsion':
        return <RetropulsionTest caseId={currentCase.id} />;
      case 'motor_general':
        return (
          <div className="space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Pemeriksaan Kekuatan Motorik Manual Muscle Testing (MMT)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2">Ekstremitas Atas</div>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Bahu & Siku: <strong>5/5</strong> simetris</li>
                  <li>• Pergelangan Tangan & Jari: <strong>5/5</strong> simetris</li>
                </ul>
              </div>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2">Ekstremitas Bawah</div>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Panggul & Lutut: <strong>5/5</strong> simetris</li>
                  <li>• Ankle & Jari Kaki: <strong>5/5</strong> simetris</li>
                </ul>
              </div>
            </div>
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
              Kekuatan motorik 5/5 di seluruh ekstremitas. Tidak ada kelemahan fokal piramidal.
            </div>
          </div>
        );
      case 'sensory_general':
        return (
          <div className="space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Pemeriksaan Sensibilitas Taktil & Proprioseptif
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <div className="font-semibold text-slate-200">Raba Halus</div>
                <p className="text-slate-400 mt-1">Normal di keempat ekstremitas</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <div className="font-semibold text-slate-200">Nyeri Jarum</div>
                <p className="text-slate-400 mt-1">Sensasi utuh bilateral</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <div className="font-semibold text-slate-200">Proprioseptif</div>
                <p className="text-slate-400 mt-1">Uji posisi sendi akurat</p>
              </div>
            </div>
          </div>
        );
      case 'reflex_general':
        return (
          <div className="space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Pemeriksaan Refleks Fisiologis & Patologis
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2">Refleks Fisiologis</div>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• BPR (Biseps): +1 / +1 (Menurun simetris)</li>
                  <li>• TPR (Triseps): +1 / +1 (Menurun simetris)</li>
                  <li>• KPR (Patela): +1 / +1 (Menurun simetris)</li>
                  <li>• APR (Achilles): +1 / +1 (Menurun simetris)</li>
                </ul>
              </div>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2">Refleks Patologis</div>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Babinski: Negatif bilateral</li>
                  <li>• Chaddock: Negatif bilateral</li>
                  <li>• Hoffman-Tromner: Negatif bilateral</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{currentExam.title}</h3>
                  {currentExam.isCardinal && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold uppercase">
                      Tanda Kardinal / Kunci
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Tercatat
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{currentExam.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Award className="w-4 h-4" />
                <span>+{currentExam.points} Poin</span>
              </div>
              <button
                onClick={closeExamModal}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {renderExamContent()}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between shrink-0">
            <div className="text-xs text-slate-400">
              {isCompleted
                ? 'Temuan telah tersimpan di status pemeriksaan fisik.'
                : 'Klik tombol di kanan untuk merekam temuan pemeriksaan.'}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={closeExamModal}
                className="px-4 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>{isCompleted ? 'Selesai & Tutup' : `Catat Hasil (+${currentExam.points} Poin)`}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
