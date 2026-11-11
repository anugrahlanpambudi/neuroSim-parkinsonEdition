'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCaseStore } from '../../store/caseStore';
import { DiagnosisChoice } from '../../types/game';
import { 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Stethoscope, 
  Microscope,
  FileText
} from 'lucide-react';

export const CaseDiagnosisStage: React.FC = () => {
  const { 
    currentCase, 
    diagnosisSolved, 
    diagnosisAttempts, 
    wrongDiagnosisPopup, 
    submitDiagnosis, 
    dismissWrongDiagnosisPopup, 
    proceedToManagement,
    completedExamIds,
    examinedPenunjangIds 
  } = useCaseStore();

  const [selectedChoice, setSelectedChoice] = useState<DiagnosisChoice | null>(null);

  const handleSubmit = () => {
    if (!selectedChoice || diagnosisSolved) return;
    submitDiagnosis(selectedChoice);
  };

  const diagnoses: Array<{
    id: DiagnosisChoice;
    label: string;
    subtitle: string;
    hint: string;
    color: string;
    borderColor: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'parkinson_disease',
      label: 'Parkinson Disease (PD)',
      subtitle: 'Penyakit Parkinson Primer / Idiopatik',
      hint: 'Kelainan neurodegeneratif kronis progresif yang diakibatkan oleh hilangnya neuron dopaminergik pada substansia nigra pars kompakta.',
      color: 'bg-teal-500/10 hover:bg-teal-500/20',
      borderColor: 'border-teal-500/40 hover:border-teal-400',
      icon: <Brain className="w-6 h-6 text-teal-400" />,
    },
    {
      id: 'parkinsonism',
      label: 'Parkinsonism Sekunder / Sindrom Parkinson',
      subtitle: 'Secondary / Atypical Parkinsonism',
      hint: 'Sindrom gangguan gerak dengan spektrum gejala parkinsonisme yang dipicu oleh etiologi sekunder spesifik atau degenerasi multisistem.',
      color: 'bg-rose-500/10 hover:bg-rose-500/20',
      borderColor: 'border-rose-500/30 hover:border-rose-400',
      icon: <AlertTriangle className="w-6 h-6 text-rose-400" />,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Stage Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 4 • Penegakan Diagnosis
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              +50 Poin (Jawaban Pertama Benar)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Penegakan Diagnosis Klinis</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Berdasarkan seluruh data anamnesis, pemeriksaan fisik, dan penunjang — tentukan diagnosis utama pasien.
          </p>
        </div>

        {diagnosisSolved && (
          <button
            onClick={proceedToManagement}
            className="px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all shrink-0"
          >
            <span>Lanjut ke Tatalaksana</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Grid: Left (5 cols) & Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Clinical Data Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Bukti Klinis Pasien</h3>
                <p className="text-[11px] text-slate-400">{currentCase.patientInfo.name}, {currentCase.patientInfo.age} Tahun • Kasus #{currentCase.id}</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1 uppercase text-[10px] tracking-wider">
                  Anamnesis & Keluhan Utama
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {currentCase.patientInfo.summary}
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1 uppercase text-[10px] tracking-wider">
                  Temuan Pemeriksaan Fisik ({completedExamIds.length} Selesai)
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {currentCase.physicalExams
                    .filter((e) => completedExamIds.includes(e.id))
                    .map((ex) => (
                      <li key={ex.id} className="leading-relaxed">
                        • <strong className="text-slate-200">{ex.title}:</strong> {ex.summary}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1 uppercase text-[10px] tracking-wider">
                  Hasil Pemeriksaan Penunjang
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {currentCase.penunjang
                    .filter((p) => examinedPenunjangIds.includes(p.id))
                    .map((p) => (
                      <li key={p.id} className="leading-relaxed">
                        • <strong className="text-slate-200">{p.title}:</strong> {p.findings}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Diagnosis Choice (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Pilih Diagnosis Klinis:</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sintesiskan temuan klinis pasien di samping untuk menentukan diagnosis kerja yang paling tepat.
            </p>
          </div>

          <div className="space-y-4">
            {diagnoses.map((diag) => {
              const isSelected = selectedChoice === diag.id;
              const isSolved = diagnosisSolved;
              const isCorrectDiag = diag.id === currentCase.diagnosis.correctChoice;

              let cardBg = 'bg-slate-900/60 border-slate-800 hover:border-slate-700 cursor-pointer';

              if (isSelected && !isSolved) {
                cardBg = `${diag.color} ${diag.borderColor} ring-1 ring-teal-500/30`;
              }

              if (isSolved) {
                if (isCorrectDiag) {
                  cardBg = 'bg-emerald-500/10 border-emerald-500/80 ring-2 ring-emerald-500/30';
                } else {
                  cardBg = 'bg-slate-950/40 border-slate-800/40 opacity-40 cursor-not-allowed';
                }
              }

              return (
                <div
                  key={diag.id}
                  onClick={() => !isSolved && setSelectedChoice(diag.id)}
                  className={`p-5 rounded-3xl border transition-all ${cardBg}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 shrink-0 mt-0.5">
                      {diag.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-bold text-white">{diag.label}</h3>
                        {isSolved && isCorrectDiag && (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Diagnosis Tepat
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-teal-400 block mb-2">{diag.subtitle}</span>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                        {diag.hint}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          {!diagnosisSolved && (
            <button
              onClick={handleSubmit}
              disabled={!selectedChoice}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                selectedChoice
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-teal-500/25 scale-[1.01]'
                  : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
              }`}
            >
              <span>Tegakkan Diagnosis Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Success Banner */}
          {diagnosisSolved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300 mb-1">Diagnosis Ditegakkan dengan Tepat!</h4>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {currentCase.diagnosis.correctExplanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Wrong Diagnosis Popup Modal */}
      <AnimatePresence>
        {wrongDiagnosisPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full bg-slate-900 border border-rose-500/40 rounded-3xl p-6 shadow-2xl space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Diagnosis Kurang Tepat!</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                {wrongDiagnosisPopup.explanation}
              </p>
              <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-500/20 text-xs text-rose-300 font-mono">
                Penalti: -20 Poin • Patient Trust: -30%
              </div>
              <button
                onClick={dismissWrongDiagnosisPopup}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <RotateCcw className="w-4 h-4 text-teal-400" />
                <span>Ulangi Diagnosis (+25 Poin jika benar)</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
