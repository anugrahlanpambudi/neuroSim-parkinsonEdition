'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { DiagnosisChoice } from '../../types/game';
import {
  Brain,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Microscope,
  BookOpen,
  Stethoscope,
  Sparkles,
} from 'lucide-react';

export const DiagnosisStage: React.FC = () => {
  const { diagnosisAttempts, diagnosisSolved, submitDiagnosis, proceedToManagement } = useGameStore();
  const [selectedChoice, setSelectedChoice] = useState<DiagnosisChoice | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
    pointsDelta: number;
  } | null>(null);

  const handleSubmit = () => {
    if (!selectedChoice || diagnosisSolved) return;
    const result = submitDiagnosis(selectedChoice);
    setFeedback(result);
  };

  const diagnoses: {
    id: DiagnosisChoice;
    label: string;
    subtitle: string;
    hint: string;
    color: string;
    borderColor: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'parkinson_disease',
      label: 'Parkinson Disease (PD)',
      subtitle: 'Idiopathic / Primary Parkinsonism',
      hint: 'Onset asimetris, progresif gradual ≥6 tahun, 4 tanda kardinal TRAP (+), tidak ada tanda merah (red flags), penunjang neuroimaging normal → memenuhi kriteria UK PD Brain Bank.',
      color: 'bg-teal-500/10 hover:bg-teal-500/20',
      borderColor: 'border-teal-500/40 hover:border-teal-400',
      icon: <Brain className="w-6 h-6 text-teal-400" />,
    },
    {
      id: 'parkinsonism',
      label: 'Parkinsonism Sekunder / Sindrom Parkinson',
      subtitle: 'Secondary / Atypical Parkinsonism',
      hint: 'Termasuk: Vascular Parkinsonism, Drug-Induced, MSA, PSP, DLB — membutuhkan red flags seperti onset simetris, jatuh berulang dini, disfungsi otonom berat, atau respons buruk terhadap L-Dopa.',
      color: 'bg-rose-500/10 hover:bg-rose-500/20',
      borderColor: 'border-rose-500/30 hover:border-rose-400',
      icon: <AlertTriangle className="w-6 h-6 text-rose-400" />,
    },
  ];

  const criteriaItems = [
    { label: 'Onset asimetris (unilateral)', met: true },
    { label: 'Resting tremor 4–6 Hz pill-rolling', met: true },
    { label: 'Rigiditas cogwheel (+)', met: true },
    { label: 'Bradikinesia progresif (+)', met: true },
    { label: 'Instabilitas postural (+)', met: true },
    { label: 'Tidak ada riwayat jatuh dini', met: true },
    { label: 'Neuroimaging: Normal (tanpa lesi struktural)', met: true },
    { label: 'Tanpa red flags MSA / PSP', met: true },
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Clinical Summary Criteria (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Patient Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Data Klinis Pasien</h3>
                <p className="text-[11px] text-slate-400">Ny. Sugiarti, 60 Tahun • No. RM: 08-29-1964</p>
              </div>
            </div>

            {/* Summary Table */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1.5 uppercase text-[10px] tracking-wider">Anamnesis</span>
                <ul className="space-y-1 text-slate-300">
                  <li>• Tremor tangan <strong>kiri</strong> sejak 6 tahun, memberat progresif</li>
                  <li>• Kekakuan lengan kiri & kedua tungkai</li>
                  <li>• Gaya berjalan festinating (langkah kecil-kecil)</li>
                  <li>• Tidak ada riwayat jatuh berulang</li>
                  <li>• Riwayat hipertensi terkontrol</li>
                </ul>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1.5 uppercase text-[10px] tracking-wider">Pemeriksaan Fisik</span>
                <ul className="space-y-1 text-slate-300">
                  <li>• Resting tremor pill-rolling (+) 4–6 Hz kiri</li>
                  <li>• Re-emergent tremor (+) postural</li>
                  <li>• Rigiditas cogwheel (+) lengan kiri & tungkai</li>
                  <li>• Bradikinesia (+) — finger & toe tapping menurun</li>
                  <li>• Retropulsion Test (+) — 3–4 langkah mundur</li>
                </ul>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1.5 uppercase text-[10px] tracking-wider">Penunjang Neuroimaging</span>
                <ul className="space-y-1 text-slate-300">
                  <li>• CT/MRI Kepala: Normal, tanpa lesi struktural basal ganglia, tanpa perdarahan, infark, massa</li>
                </ul>
              </div>
            </div>
          </div>

          {/* UK PD Brain Bank Criteria Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kriteria UK PD Brain Bank</h4>
            </div>
            <div className="space-y-2">
              {criteriaItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-medium">
              ✓ Semua kriteria inklusi terpenuhi, tidak ada kriteria eksklusi
            </div>
          </div>
        </div>

        {/* Right: Diagnosis Choice (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Instruction */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Pilih Diagnosis Klinis:</span>
            </div>
            <p className="text-xs text-slate-400">
              Berdasarkan data klinis komprehensif di atas, pilih satu diagnosis yang paling tepat sesuai pedoman klinis.
              {diagnosisAttempts > 0 && (
                <span className="text-amber-400"> • Percobaan ke-{diagnosisAttempts + 1} ({diagnosisAttempts > 0 ? '+25 poin' : '+50 poin'})</span>
              )}
            </p>
          </div>

          {/* Diagnosis Cards */}
          <div className="space-y-4">
            {diagnoses.map((d) => (
              <motion.button
                key={d.id}
                whileHover={{ scale: diagnosisSolved ? 1 : 1.01 }}
                whileTap={{ scale: diagnosisSolved ? 1 : 0.99 }}
                onClick={() => !diagnosisSolved && setSelectedChoice(d.id)}
                disabled={diagnosisSolved}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${d.color} ${d.borderColor} ${
                  selectedChoice === d.id ? 'ring-2 ring-teal-400/50' : ''
                } ${diagnosisSolved ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 shrink-0">
                    {d.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-white">{d.label}</h3>
                      {selectedChoice === d.id && !diagnosisSolved && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          Terpilih
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{d.subtitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed opacity-80">{d.hint}</p>
                  </div>
                  <div className="shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === d.id
                        ? 'border-teal-400 bg-teal-500/30'
                        : 'border-slate-600'
                    }`}>
                      {selectedChoice === d.id && <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Submit Button */}
          {!diagnosisSolved && (
            <motion.button
              whileHover={{ scale: selectedChoice ? 1.01 : 1 }}
              whileTap={{ scale: selectedChoice ? 0.99 : 1 }}
              onClick={handleSubmit}
              disabled={!selectedChoice}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                selectedChoice
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Konfirmasi Diagnosis</span>
            </motion.button>
          )}

          {/* Feedback Panel */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border ${
                  feedback.correct
                    ? 'bg-emerald-950/60 border-emerald-500/50'
                    : 'bg-rose-950/60 border-rose-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {feedback.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className={`text-sm font-bold mb-1 ${feedback.correct ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {feedback.correct ? `✓ Diagnosis Benar! (+${feedback.pointsDelta} Poin)` : `✗ Kurang Tepat (${feedback.pointsDelta} Poin)`}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{feedback.message}</p>
                  </div>
                </div>
                {feedback.correct && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={proceedToManagement}
                    className="mt-4 w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all"
                  >
                    <span>Lanjut ke Tatalaksana Pasien</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
