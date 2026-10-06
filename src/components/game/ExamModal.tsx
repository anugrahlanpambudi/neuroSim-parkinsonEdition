'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Award, Activity, ShieldCheck } from 'lucide-react';
import { PhysicalExamType } from '../../types/game';
import { useGameStore } from '../../store/gameStore';
import { RestingTremor } from './RestingTremor';
import { ReemergentTremor } from './ReemergentTremor';
import { RigidityTest } from './RigidityTest';
import { AkinesiaTest } from './AkinesiaTest';
import { RetropulsionTest } from './RetropulsionTest';

interface ExamModalProps {
  examType: PhysicalExamType | null;
  onClose: () => void;
}

export const ExamModal: React.FC<ExamModalProps> = ({ examType, onClose }) => {
  const { physicalExams, completePhysicalExam } = useGameStore();
  const [tremorTab, setTremorTab] = useState<'resting' | 'reemergent'>('resting');

  if (!examType) return null;

  const currentExam = physicalExams[examType];

  const handleFinishExam = () => {
    completePhysicalExam(examType);
    onClose();
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
                      Gejala Kardinal
                    </span>
                  )}
                  {currentExam.completed && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Sudah Diperiksa
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
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* 1. Tremor Modal */}
            {examType === 'tremor' && (
              <div className="space-y-4">
                {/* Tabs */}
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
            )}

            {/* 2. Motorik Modal */}
            {examType === 'motorik' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Pemeriksaan Kekuatan Motorik Manual Muscle Testing (MMT)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs font-semibold text-slate-300 mb-2">Ekstremitas Atas (Lengan & Tangan)</div>
                      <ul className="text-xs text-slate-400 space-y-1.5">
                        <li>• Bahu (Abduksi/Adduksi): <strong>5/5</strong> simetris</li>
                        <li>• Siku (Fleksi/Ekstensi): <strong>5/5</strong> simetris</li>
                        <li>• Pergelangan Tangan & Jari: <strong>5/5</strong> simetris</li>
                      </ul>
                    </div>
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs font-semibold text-slate-300 mb-2">Ekstremitas Bawah (Tungkai & Kaki)</div>
                      <ul className="text-xs text-slate-400 space-y-1.5">
                        <li>• Panggul (Fleksi/Ekstensi): <strong>5/5</strong> simetris</li>
                        <li>• Lutut (Fleksi/Ekstensi): <strong>5/5</strong> simetris</li>
                        <li>• Ankle & Jari Kaki: <strong>5/5</strong> simetris</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-medium">
                    Kekuatan motorik 5/5 keempat ekstremitas, dalam batas normal. Tidak ada defisit paresis fokal (menyingkirkan stroke piramidal atau hemiparesis akut).
                  </div>
                </div>
              </div>
            )}

            {/* 3. Rigiditas Modal */}
            {examType === 'rigiditas' && <RigidityTest />}

            {/* 4. Akinesia Modal */}
            {examType === 'akinesia' && <AkinesiaTest />}

            {/* 5. Instabilitas Postural Modal */}
            {examType === 'instabilitas' && <RetropulsionTest />}

            {/* 6. Sensorik Modal */}
            {examType === 'sensorik' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Pemeriksaan Sensibilitas (Taktil, Nyeri, Proprioseptif)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <div className="font-semibold text-slate-200">Raba Halus (Cotton)</div>
                      <p className="text-slate-400 mt-1">Normal di keempat ekstremitas</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <div className="font-semibold text-slate-200">Nyeri Jarum (Pinprick)</div>
                      <p className="text-slate-400 mt-1">Sensasi utuh bilateral</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <div className="font-semibold text-slate-200">Proprioseptif / Sendi</div>
                      <p className="text-slate-400 mt-1">Uji posisi ibu jari akurat</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-300">
                    Sensorik dalam batas normal. Tidak ada hipestesia glove-and-stocking ataupun defisit sensorik level medula spinalis.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between shrink-0">
            <div className="text-xs text-slate-400">
              {currentExam.completed
                ? 'Hasil pemeriksaan telah tercatat di rekam medis.'
                : 'Klik Simpan untuk merekam temuan ke status rekam medis.'}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={handleFinishExam}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>{currentExam.completed ? 'Selesai & Tutup' : `Catat Hasil (+${currentExam.points} Poin)`}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
