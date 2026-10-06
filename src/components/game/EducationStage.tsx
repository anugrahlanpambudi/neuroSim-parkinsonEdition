'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '../../store/gameStore';

import {
  Trophy,
  RefreshCw,
  Star,
  Brain,
  Pill,
  Activity,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Heart,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const EducationStage: React.FC = () => {
  const { score, trust, diagnosisAttempts, skippedCardinalWarning, tambahDataCount, resetGame } = useGameStore();

  const maxScore = 200;
  const scorePercent = Math.round((score / maxScore) * 100);

  useEffect(() => {
    if (score >= 120) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
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
    if (score >= 90) return { grade: 'C', label: 'Cukup', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/40' };
    return { grade: 'D', label: 'Perlu Belajar Lagi', color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-500/40' };
  };

  const gradeInfo = getGrade();

  const keyPoints = [
    {
      icon: <Brain className="w-5 h-5 text-teal-400" />,
      title: '4 Tanda Kardinal Parkinson (TRAP)',
      content: [
        'Tremor istirahat (pill-rolling, 4–6 Hz, asimetris)',
        'Rigiditas (cogwheel / lead-pipe phenomenon)',
        'Akinesia / Bradikinesia (penurunan kecepatan & amplitudo gerak)',
        'Postural Instability / Instabilitas Postural (pull test +)',
      ],
    },
    {
      icon: <Activity className="w-5 h-5 text-rose-400" />,
      title: 'Red Flags: Pikirkan Parkinsonisme Atipik',
      content: [
        'Onset bilateral simetris sejak awal',
        'Jatuh berulang dalam 1 tahun pertama',
        'Disfungsi otonom berat (ortostasis, inkontinensia)',
        'Oftalmoplegia supranuklear (tanda PSP)',
        'Respon buruk terhadap Levodopa',
        'Riwayat paparan obat antidopaminergik',
      ],
    },
    {
      icon: <Pill className="w-5 h-5 text-violet-400" />,
      title: 'Farmakoterapi Lini Pertama',
      content: [
        'Levodopa/Carbidopa: gold standard, terutama usia >65 tahun',
        'Dopamine Agonist (Pramipexole, Ropinirole): pertimbangkan usia muda <65 tahun',
        'MAO-B Inhibitor (Selegiline, Rasagiline): neuroprotektif, adjuvan early PD',
        'Antikolinergik (Trihexyphenidyl): jika tremor dominan, hindari pada lansia',
      ],
    },
    {
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      title: 'Kriteria Diagnosis: UK PD Brain Bank',
      content: [
        'Step 1: Diagnosis Parkinsonism (bradikinesia + salah satu: tremor/rigiditas)',
        'Step 2: Eksklusi kriteria eksklusi (red flags, etiologi sekunder)',
        'Step 3: Konfirmasi kriteria pendukung (≥3 dari: onset unilateral, tremor istirahat, perjalanan progresif, asimetri persisten)',
        'SKDI 3A: Dokter umum mampu mendiagnosis dan merujuk ke spesialis saraf',
      ],
    },
  ];

  const performanceSummary = [
    {
      label: 'Anamnesis Lengkap',
      value: '5/5 Pertanyaan',
      status: 'ok',
    },
    {
      label: 'Pemeriksaan Kardinal',
      value: skippedCardinalWarning ? 'Tidak Lengkap ⚠️' : '4/4 Kardinal ✓',
      status: skippedCardinalWarning ? 'warn' : 'ok',
    },
    {
      label: 'Penunjang Tambah Data',
      value: `${tambahDataCount}× ${tambahDataCount > 2 ? '(Penalti!)' : '(Efisien)'}`,
      status: tambahDataCount > 2 ? 'warn' : 'ok',
    },
    {
      label: 'Percobaan Diagnosis',
      value: `${diagnosisAttempts}× ${diagnosisAttempts === 1 ? '(Full +50 poin)' : '(+25 poin)'}`,
      status: diagnosisAttempts === 1 ? 'ok' : 'warn',
    },
    {
      label: 'Kepercayaan Pasien',
      value: `${trust}%`,
      status: trust >= 80 ? 'ok' : trust >= 50 ? 'warn' : 'err',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
              Tahap 6 • Evaluasi & Edukasi
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
              Simulasi Selesai!
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Evaluasi Klinis & Ringkasan Edukasi</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Lihat performa simulasimu dan pelajari materi kunci Parkinson Disease untuk bekal klinis.
          </p>
        </div>

        <button
          onClick={resetGame}
          className="px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Ulang Simulasi</span>
        </button>
      </div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Score Circle */}
          <div className="text-center shrink-0">
            <div className={`w-32 h-32 rounded-full border-4 ${gradeInfo.bg} flex flex-col items-center justify-center shadow-2xl`}>
              <span className={`text-4xl font-black ${gradeInfo.color}`}>{gradeInfo.grade}</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">{gradeInfo.label}</span>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-black text-white">Skor Akhir: {score} / {maxScore}</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">Kamu telah menyelesaikan simulasi kasus klinis Parkinson Disease secara lengkap.</p>

            {/* Score bar */}
            <div className="w-full max-w-md h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scorePercent}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <span className="text-xs text-slate-400 font-mono">{scorePercent}% dari total poin</span>

            {/* Stars */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${star <= Math.ceil(scorePercent / 20) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                />
              ))}
              <span className="text-xs text-slate-400 ml-1">{Math.ceil(scorePercent / 20)}/5 bintang</span>
            </div>
          </div>

          {/* Trust */}
          <div className="text-center shrink-0">
            <div className="w-24 h-24 rounded-full border-4 border-rose-500/40 bg-rose-500/10 flex flex-col items-center justify-center">
              <Heart className={`w-5 h-5 fill-current mb-0.5 ${trust >= 80 ? 'text-emerald-400' : trust >= 50 ? 'text-amber-400' : 'text-rose-400'}`} />
              <span className={`text-2xl font-black ${trust >= 80 ? 'text-emerald-400' : trust >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                {trust}%
              </span>
              <span className="text-[10px] text-slate-400">Trust</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" />
          Ringkasan Performa Per Tahap
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {performanceSummary.map((item, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border text-center ${
                item.status === 'ok'
                  ? 'bg-emerald-950/40 border-emerald-500/30'
                  : item.status === 'warn'
                  ? 'bg-amber-950/40 border-amber-500/30'
                  : 'bg-rose-950/40 border-rose-500/30'
              }`}
            >
              <div className={`text-xs font-semibold mb-1 ${
                item.status === 'ok' ? 'text-emerald-300' : item.status === 'warn' ? 'text-amber-300' : 'text-rose-300'
              }`}>
                {item.value}
              </div>
              <div className="text-[10px] text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2 px-1">
          <BookOpen className="w-5 h-5 text-teal-400" />
          Materi Edukasi Klinis: Parkinson Disease
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {keyPoints.map((kp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">{kp.icon}</div>
                <h4 className="text-sm font-bold text-white">{kp.title}</h4>
              </div>
              <ul className="space-y-2">
                {kp.content.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/30 rounded-3xl p-6 text-center shadow-xl"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <h4 className="text-base font-bold text-white">Simulasi Parkinson Disease Selesai!</h4>
        </div>
        <p className="text-xs text-slate-400 max-w-lg mx-auto mb-4">
          Kamu telah mempraktikkan alur klinis lengkap: dari anamnesis, pemeriksaan fisik neurologi, penunjang, diagnosis, hingga tatalaksana Parkinson Disease berbasis evidence-based medicine.
        </p>
        <button
          onClick={resetGame}
          className="px-8 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/25 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Mulai Ulang Simulasi</span>
        </button>
      </motion.div>
    </div>
  );
};
