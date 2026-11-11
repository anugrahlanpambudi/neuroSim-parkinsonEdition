'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useCaseStore } from '../../store/caseStore';
import {
  Trophy,
  RefreshCw,
  Brain,
  Pill,
  Activity,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  ArrowRight,
  ListOrdered,
} from 'lucide-react';

export const CaseEducationStage: React.FC = () => {
  const { 
    currentCase, 
    currentCaseId, 
    score, 
    trust, 
    diagnosisAttempts, 
    tambahDataCount, 
    resetCase, 
    openCaseMenu, 
    selectCase 
  } = useCaseStore();

  const maxScore = 200;
  const scorePercent = Math.round((score / maxScore) * 100);
  const isPassed = score >= 100;

  useEffect(() => {
    if (score >= 100) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [score]);

  const getGrade = () => {
    if (score >= 180) return { grade: 'A+', label: 'Luar Biasa!', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/40' };
    if (score >= 150) return { grade: 'A', label: 'Sangat Baik', color: 'text-teal-400', bg: 'bg-teal-500/20 border-teal-500/40' };
    if (score >= 120) return { grade: 'B', label: 'Baik', color: 'text-indigo-400', bg: 'bg-indigo-500/20 border-indigo-500/40' };
    if (score >= 100) return { grade: 'C+', label: 'Lulus Kompetensi', color: 'text-cyan-400', bg: 'bg-cyan-500/20 border-cyan-500/40' };
    if (score >= 80) return { grade: 'C', label: 'Cukup', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/40' };
    return { grade: 'D', label: 'Perlu Belajar Lagi', color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-500/40' };
  };

  const gradeInfo = getGrade();

  const performanceSummary = [
    {
      label: 'Skor Klinis Akhir',
      value: `${score} / 200`,
      sub: `${scorePercent}% Pencapaian`,
      color: 'text-indigo-400',
    },
    {
      label: 'Patient Trust',
      value: `${trust}%`,
      sub: trust >= 80 ? 'Sangat Kooperatif' : trust >= 50 ? 'Cukup Puas' : 'Kurang Percaya',
      color: trust >= 80 ? 'text-emerald-400' : 'text-amber-400',
    },
    {
      label: 'Penegakan Diagnosis',
      value: `${diagnosisAttempts}x Upaya`,
      sub: diagnosisAttempts === 1 ? 'Langsung Tepat (+50)' : 'Melalui Revisi (+25)',
      color: 'text-teal-400',
    },
    {
      label: 'Efisiensi Penunjang',
      value: `${tambahDataCount}x Tambah Data`,
      sub: tambahDataCount <= 2 ? 'Efisien & Tepat Sasaran' : 'Penalti Over-Investigation',
      color: tambahDataCount <= 2 ? 'text-emerald-400' : 'text-rose-400',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Hero Performance Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Simulasi Selesai</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Evaluasi Klinis & Pembahasan Kasus
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl">
              Kamu telah menyelesaikan alur klinis pasien. Diagnosis: <strong className="text-teal-300">{currentCase.education.diagnosisTitle}</strong> ({currentCase.education.diseaseCategory}).
            </p>
          </div>

          {/* Grade Badge */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-xl shrink-0">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1">Nilai Evaluasi</span>
            <div className={`text-4xl md:text-5xl font-black font-mono ${gradeInfo.color}`}>
              {gradeInfo.grade}
            </div>
            <span className={`mt-2 text-xs font-bold px-3 py-0.5 rounded-full border ${gradeInfo.bg} ${gradeInfo.color}`}>
              {gradeInfo.label}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          {performanceSummary.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block mb-1">{item.label}</span>
              <div className={`text-base md:text-lg font-bold font-mono ${item.color}`}>
                {item.value}
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Debriefing & Keypoints */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-400" />
          <h2 className="text-base font-bold text-white">Poin Pembelajaran Klinis Utama</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCase.education.keyPoints.map((kp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-md space-y-3"
            >
              <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                <Brain className="w-4 h-4 text-teal-400" />
                <h3>{kp.title}</h3>
              </div>
              <ul className="space-y-2">
                {kp.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/30 rounded-3xl p-6 text-center shadow-xl space-y-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <h4 className="text-base font-bold text-white">Kasus #{currentCase.id} Telah Selesai Ditangani!</h4>
        </div>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Kamu telah mempraktikkan alur klinis lengkap: anamnesis, pemeriksaan fisik, penunjang, penegakan diagnosis, hingga tatalaksana berbasis evidence-based medicine.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={resetCase}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 inline-flex items-center gap-2 transition-all shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Mulai Ulang Kasus #{currentCase.id}</span>
          </button>

          <button
            onClick={openCaseMenu}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 inline-flex items-center gap-2 transition-all shadow-md"
          >
            <ListOrdered className="w-4 h-4 text-teal-400" />
            <span>Daftar 5 Kasus</span>
          </button>

          {isPassed && currentCaseId < 5 && (
            <button
              onClick={() => selectCase(currentCaseId + 1)}
              className="px-8 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all"
            >
              <span>Lanjut ke Kasus #{currentCaseId + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
