'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCaseStore } from '../../store/caseStore';
import { ManagementChoice } from '../../types/game';
import {
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Home,
  Building2,
  AlertTriangle,
  Pill,
  BookOpenCheck
} from 'lucide-react';

export const CaseManagementStage: React.FC = () => {
  const { 
    currentCase,
    selectedManagement, 
    managementSolved, 
    submitManagement, 
    proceedToEducation 
  } = useCaseStore();

  const getOptionIcon = (id: ManagementChoice) => {
    switch (id) {
      case 'rawat_jalan':
        return <Home className="w-6 h-6 text-teal-400" />;
      case 'rawat_inap_neuro':
        return <Building2 className="w-6 h-6 text-amber-400" />;
      case 'rawat_inap_non_neuro':
        return <AlertTriangle className="w-6 h-6 text-rose-400" />;
    }
  };

  const getNeutralDescription = (id: ManagementChoice) => {
    switch (id) {
      case 'rawat_jalan':
        return 'Penatalaksanaan komprehensif pasien secara rawat jalan melalui kontrol berkala di poli spesialis saraf, titrasi medikamentosa, serta program edukasi & fisioterapi rutin.';
      case 'rawat_inap_neuro':
        return 'Pasien diadmisi ke bangsal perawatan spesialis neurologi untuk penanganan kondisi kegawatdaruratan, observasi defisit neurologis fokal akut, atau pemantauan komplikasi berat.';
      case 'rawat_inap_non_neuro':
        return 'Pasien diadmisi ke bangsal penyakit dalam atau rawat umum untuk penatalaksanaan komorbiditas medis sistemik di luar spesialisasi neurologi.';
    }
  };

  const handleChoose = (choice: ManagementChoice) => {
    if (selectedManagement) return;
    submitManagement(choice);
  };

  const selectedOptionData = currentCase.management.options.find(
    (o) => o.id === selectedManagement
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Stage Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 5 • Tatalaksana
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              +30 Poin (Pilihan Tepat)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Tatalaksana & Rencana Terapi Pasien</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Diagnosis telah ditegakkan: <strong className="text-teal-300">{currentCase.diagnosis.correctLabel}</strong>. Tentukan rencana tatalaksana yang paling tepat.
          </p>
        </div>

        {managementSolved && (
          <button
            onClick={proceedToEducation}
            className="px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all shrink-0"
          >
            <span>Lihat Evaluasi & Ringkasan Edukasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Grid: Left 7 cols (Choices & Feedback) and Right 5 cols (Guideline/Protocol) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Management Choices */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-4">
            {currentCase.management.options.map((option) => {
              const isChosen = selectedManagement === option.id;
              const isSolved = managementSolved;

              let cardStyle = 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/80 cursor-pointer';

              if (selectedManagement) {
                if (isChosen) {
                  cardStyle = option.isCorrect
                    ? 'border-emerald-500/80 bg-emerald-500/10 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'border-rose-500/80 bg-rose-500/10 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/30';
                } else if (option.isCorrect) {
                  cardStyle = 'border-emerald-500/50 bg-emerald-500/5 opacity-80';
                } else {
                  cardStyle = 'border-slate-800/40 bg-slate-950/40 opacity-40 cursor-not-allowed';
                }
              }

              return (
                <motion.div
                  key={option.id}
                  whileHover={!selectedManagement ? { y: -2 } : {}}
                  onClick={() => handleChoose(option.id)}
                  className={`p-5 rounded-3xl border transition-all ${cardStyle}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 shrink-0 mt-0.5">
                      {getOptionIcon(option.id)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-bold text-white">{option.label}</h3>
                        {selectedManagement && isChosen && (
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                              option.isCorrect
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {option.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {option.isCorrect ? 'Tepat (+30 Poin)' : 'Kurang Tepat'}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-teal-400 block mb-2">{option.subtitle}</span>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                        {getNeutralDescription(option.id)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Feedback Banner after selection */}
          <AnimatePresence>
            {selectedOptionData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-3xl border ${
                  selectedOptionData.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {selectedOptionData.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">
                      {selectedOptionData.isCorrect ? 'Tatalaksana Tepat! (+30 Poin)' : 'Tatalaksana Kurang Tepat'}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {selectedOptionData.feedback}
                    </p>
                  </div>
                </div>

                {managementSolved && (
                  <button
                    onClick={proceedToEducation}
                    className="mt-4 w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    <span>Lanjut ke Evaluasi & Ringkasan Edukasi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Pharmacotherapy protocol (revealed once decided) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Panduan Terapi & Farmakoterapi</h4>
                <p className="text-[11px] text-slate-400">Protokol Klinis Kasus #{currentCase.id}</p>
              </div>
            </div>

            {selectedManagement ? (
              <div className="space-y-2.5">
                {currentCase.management.medications.map((med, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{med.drug}</span>
                      <span className="font-mono text-teal-300 text-[11px] font-semibold">{med.dose}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{med.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
                <ClipboardList className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  Tentukan rencana tatalaksana di sebelah kiri untuk membuka rekomendasi protokol terapi & medikamentosa.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
