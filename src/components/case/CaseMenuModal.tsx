'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASES_DATA, ClinicalCase } from '../../data/cases';
import { useCaseStore } from '../../store/caseStore';
import { 
  X, 
  Lock, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  User, 
  Activity, 
  Stethoscope, 
  AlertCircle 
} from 'lucide-react';

export const CaseMenuModal: React.FC = () => {
  const { 
    isCaseMenuOpen, 
    closeCaseMenu, 
    currentCaseId, 
    selectCase, 
    caseScores, 
    isCaseUnlocked,
    loadScoresFromStorage 
  } = useCaseStore();

  useEffect(() => {
    loadScoresFromStorage();
  }, [loadScoresFromStorage, isCaseMenuOpen]);

  if (!isCaseMenuOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 border border-teal-400/30">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <span>Daftar Kasus Simulasi Klinis</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold font-mono">
                    5 Kasus
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Pilih skenario klinis pasien di Poli Saraf & UGD. Buka kasus berikutnya dengan meraih minimal <strong>100 Poin</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={closeCaseMenu}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {CASES_DATA.map((c) => {
              const unlocked = isCaseUnlocked(c.id);
              const score = caseScores[c.id] ?? 0;
              const isCurrent = currentCaseId === c.id;

              return (
                <div
                  key={c.id}
                  className={`relative rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'bg-teal-500/10 border-teal-500/60 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/30'
                      : unlocked
                      ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950/90'
                      : 'bg-slate-950/40 border-slate-900 opacity-65'
                  }`}
                >
                  {/* Top Bar: Case Tag & Lock Status */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                        Kasus #{c.id}
                      </span>
                      {unlocked ? (
                        score >= 100 ? (
                          <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Lulus ({score}/200)</span>
                          </span>
                        ) : score > 0 ? (
                          <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                            <span>Skor: {score}/200</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500">Belum Selesai</span>
                        )
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-full">
                          <Lock className="w-3 h-3 text-slate-500" />
                          <span>Terkunci</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-sm font-bold text-white line-clamp-2 mb-1">
                      {c.title}
                    </h3>
                    <p className="text-[11px] text-teal-400 font-medium mb-2">
                      {c.subtitle}
                    </p>

                    {/* Patient summary */}
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 mb-3">
                      {c.patientInfo.summary}
                    </p>

                    {/* Category pill */}
                    <div className="mb-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
                        {c.categoryTag}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    {unlocked ? (
                      <button
                        onClick={() => selectCase(c.id)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                          isCurrent
                            ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <span>{isCurrent ? 'Sedang Dimainkan' : 'Mulai Simulasi'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="w-full py-2 px-3 rounded-xl text-[11px] font-medium text-slate-500 bg-slate-900 border border-slate-800/60 flex items-center justify-center gap-1.5 cursor-not-allowed">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Selesaikan Kasus #{c.id - 1} (≥100 Poin)</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Selesaikan kelima kasus untuk sertifikasi simulasi Parkinson Disease & Parkinsonism.</span>
            </div>
            <button
              onClick={closeCaseMenu}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
